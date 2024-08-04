import { useRef } from "react"
import { Socket } from "socket.io-client"
export default function InputChat({ set, socket, idFriend }: {set: any, socket: Socket, idFriend: string}) {
    const inputRef = useRef<HTMLInputElement>(null);
    function handleClick(): void {
        const input = inputRef.current?.value;
        if(input) {
            if(!input.trim()) return;
            const data = {
                name: window.sessionStorage.getItem('name'),
                image: '/images/profile.png',
                message: input,
                idUser: window.sessionStorage.getItem('idUser'),
                idFriend: idFriend
            }
            inputRef.current.value = '';
            socket.emit('sendMessage', data)
        }
    }
    return(
        <div className="fixed bg-gray-800 w-full bottom-0 h-16 flex ">
        <input ref={inputRef} className="m-2 ml-5 bg-slate-950 rounded placeholder:text-center text-white" placeholder="Enviar mensagem"/>
        <button onClick={handleClick} className="geist bg-blue-800 m-2 pl-4 pr-4 rounded hover:bg-blue-900">Enviar</button>
            </div>
    )
}