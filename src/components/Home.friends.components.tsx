'use client'
import { useEffect, useState } from "react";
import AddComponent from "./Home.add.components";
import FriendsList from "./Home.friendList.components";
import Pading from "./Home.pading.components";
import Block from "./Home.block.components";
import api from "@/api";
import { io } from "socket.io-client";
import isBrowser from "@/functions/isBrowser";
export default function Friends() {
    const [embedFriends, setEmbedFriends] = useState(false);
    const [contentLocal, setContentLocal] = useState(0);
    const [nFriendship, setNFriendship] = useState(0);
    const socket = io(api);
    const idUser = isBrowser() ? window.sessionStorage.getItem('idUser') : null;

    function handleClick() {
        setEmbedFriends(!embedFriends);
    }

    function handleAmigos() {
        setContentLocal(0);
    }

    function handlePendente() {
        setContentLocal(1);
    }

    function handleBloqueado() {
        setContentLocal(2);
    }

    function listPending() {
        const token = isBrowser() ? sessionStorage.getItem('auth-token') : null;
        fetch(`${api}/listpending`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: idUser })
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`Erro ${response.status}: ${text}`);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados recebidos:', data);
            let pendingData;
            if (typeof data.pending === 'string') {
                pendingData = JSON.parse(data.pending);
            } else {
                pendingData = data.pending;
            }
            setNFriendship(pendingData.length);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    }

    useEffect(() => {
        setNFriendship(0);
        listPending();
        socket.on('sendFriendship', (id) => {
            if (String(idUser) === String(id)) {
                listPending();
            }
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className="relative">
            <div>
                {embedFriends ? <AddComponent embedState={setEmbedFriends} /> : null}
                <div className="flex justify-center items-center bg-gray-800 w-full h-10 geist text-sm sm:text-base text-white">
                    <p className="m-2 cursor-pointer" onClick={handleAmigos}>Amigos</p>
                    <div className="relative flex items-center m-2">
                        <p className="m-2 cursor-pointer" onClick={handlePendente}>Pendente</p>
                        {nFriendship ? (
                            <span className="absolute top-0 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {nFriendship}
                            </span>
                        ) : null}
                    </div>
                    <p className="m-2 cursor-pointer" onClick={handleBloqueado}>Bloqueado</p>
                    <button className="bg-green-600 m-2 pl-4 pr-4 rounded hover:bg-green-800" onClick={handleClick}>Adicionar</button>
                </div>
            </div>
            {contentLocal === 0 ? <FriendsList /> : null}
            {contentLocal === 1 ? <Pading /> : null}
            {contentLocal === 2 ? <Block /> : null}
        </div>
    );
}
