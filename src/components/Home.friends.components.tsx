import { useState } from "react"
import AddComponent from "./Home.add.components";
import FriendsList from "./Home.friendList.components";
import Pading from "./Home.pading.components";
import Block from "./Home.block.components";
export default function Friends() {
    const [embedFriends, setEmbedFriends] = useState(false);
    const [contentLocal, setContentLocal] = useState(0);
    function handleClick() {
        setEmbedFriends(embedFriends ? false : true);
    }
    function handleAmigos() {
        setContentLocal(0);
    }
    function handlePendente() {
        setContentLocal(1)
    }
    function handleBloqueado() {
        setContentLocal(2)
    }
    return(
        <div className="relative">
            <div>
            {embedFriends ? <AddComponent embedState={setEmbedFriends}/> : null } 
            <div className="flex justify-center items-center bg-gray-800 w-full h-10 geist text-white">
                <p className="m-2 cursor-pointer" onClick={handleAmigos} >Amigos</p>
                <p className="m-2 cursor-pointer" onClick={handlePendente}>Pendente</p>
                <p className="m-2 cursor-pointer" onClick={handleBloqueado}>Bloqueado</p>
                <button className="bg-green-600 m-2 pl-4 pr-4 rounded hover:bg-green-800" onClick={handleClick}>Adicionar</button>
            </div>
            </div>
           {contentLocal === 0 ? <FriendsList /> : null}
           {contentLocal === 1 ? <Pading /> : null}
           {contentLocal === 2 ? <Block /> : null}
        </div>
    )
}