'use client'
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrConfigure } from "react-icons/gr";
import { FaMicrophone, FaHeadphones } from "react-icons/fa";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { idUser } from "@/store/actions";
import { RootState } from "@/store";
import api from "@/api";
import { usersAction } from "@/store/actions";
import { io } from "socket.io-client";
import EmbedProfile from "./shared/Profile.embed.components";
import isBrowser from "@/functions/isBrowser";
interface User {
    idUser: string;
    image: string;
    name: string;
    notification: string;
}

type Friend = {
    name: string;
    image: string;
};

type Account = {
    name: string;
    image: string;
    idUser: string;
};


export default function SideBar() {
    const [mobile, setMobile] = useState(true);
    const [embed, setEmbed] = useState(true);
    const image = isBrowser() ? window.sessionStorage.getItem('image') || '/images/profile.png' : '/images/profile.png';
    const socket = io(api);
    const router = useRouter();
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.setUsersReducer.setUsers) as User[] | null;
    const [name, setName] = useState<string>('');
    const [showEmbedProfile, setShowEmbedProfile] = useState<boolean>(false);
    const [account, setAccount] = useState<Account>();
    const [x, setX] = useState(0.0);
    const [y, setY] = useState(0.0);

    function handleClick() {
        setEmbed(!embed);
    }

    function handleClickUser(event: React.MouseEvent<HTMLDivElement>) {
        const id = event.currentTarget.id;
        if (id) {
            dispatch(idUser(id));
            router.push('/chat');
        }
    }

    function handleConfig() {
        router.push('/config');
    }

    function handleClickAmigos() {
        router.push('/home');
    }

    function updateList() {
        const idUser = isBrowser() ? window.sessionStorage.getItem('idUser') : null;
        setName(isBrowser() ? window.sessionStorage.getItem('name') || 'sem nick' : 'sem nick');
        const token = isBrowser() ? sessionStorage.getItem('auth-token') : null;
        fetch(`${api}/friendslist`, {
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
            const friendsData = data.friends ? data.friends.map((friend: Friend) => ({
                ...friend,
                image: friend.image.replace(/"/g, '')  
            })) : [];
            dispatch(usersAction(friendsData));
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    }

    function handleContextMenu(event: React.MouseEvent) {
        event.preventDefault();
        const elementId = (event.currentTarget as HTMLElement).id;
        if (!showEmbedProfile) {
            setY(event.clientY);
            setX(event.clientX);
            const token = isBrowser() ? sessionStorage.getItem('auth-token') : null;
            fetch(`${api}/getaccount`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: elementId }) 
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
                setAccount(data.account);
                setShowEmbedProfile(true);
            })
            .catch(error => {
                console.error('Erro:', error);
            });
        }
    }

    function Bar() {
        return (
            <div className="z-40 flex bg-gray-800 h-screen w-80 fixed flex-col items-center shadow-lg">
                {mobile ? null : <GiHamburgerMenu onClick={handleClick} className="fixed left-4 top-4 text-white cursor-pointer text-2xl hover:text-gray-400 transition duration-200" />}

                <div onClick={handleClickAmigos} className="flex items-center justify-center bg-gray-700 mt-10 rounded w-60 h-10 hover:bg-gray-900 transition duration-200 cursor-pointer">
                    <p className="text-lg font-semibold text-white">Amigos</p>
                </div>

                <div className="mt-6 w-full px-4">
                    {users ? users.map((user: User, index: number) => (
                        <div key={index}>
                        <div onClick={handleClickUser} onContextMenu={handleContextMenu} id={`${user.idUser}`} className="flex items-center p-2 mt-2 bg-gray-700 relative rounded-lg hover:bg-gray-900 transition duration-200 cursor-pointer">
                            <img className="w-10 h-10 rounded-full mr-4" src={`${user.image}`} alt={`${user.name} profile`} />
                            <p className="text-white">{user.name}</p>
                            {user.notification ? (
                            <div>
                               <span className="absolute top-0 -right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                               {user.notification}
                             </span>        
                            </div>
                        ) : null}
                        </div>
                        
                        </div>
                    )) : null}
                </div>
                
                <div className="absolute bottom-0 bg-gray-900 w-full h-16 flex items-center justify-between px-4">
                    <div className="flex items-center">
                        <img className="w-10 h-10 rounded-full mr-2" src={`${image.replace(/"/g, '')}` || '/images/profile.png'} alt="Profile" />
                        <p className="text-white">{name}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaMicrophone className="text-red-600 text-xl cursor-pointer" />
                        <FaHeadphones className="text-red-600 text-xl cursor-pointer" />
                        <GrConfigure onClick={handleConfig} className="text-white text-xl cursor-pointer hover:text-gray-400 transition duration-200" />
                    </div>
                </div>
            </div>
        );
    }

    useEffect(() => {
        setMobile(isBrowser() && window.innerWidth >= 770);
        updateList();
        socket.on('alertEmitUpdateListSideBar', (id: number, idFriend: number) => {
            const idYou = isBrowser() ? window.sessionStorage.getItem('idUser') : null; //função pra atualizar a lista de amigos toda vez que aceitarem alguma solicitação de amizade
            if (Number(id) === Number(idYou) || Number(idYou) === Number(idFriend)) {
                updateList();  
            }
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            {embed ? <Bar /> : <GiHamburgerMenu className="fixed z-40 text-white text-2xl cursor-pointer left-2 top-10 hover:text-gray-400 transition duration-200" onClick={handleClick} />}
            {showEmbedProfile ? <EmbedProfile x={x} y={y} set={setShowEmbedProfile} account={account} /> : null}
        </div>
    );
}
