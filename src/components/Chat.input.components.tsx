import { useRef } from "react";
import { Socket } from "socket.io-client";

interface InputChatProps {
    set: any;
    socket: Socket;
    idFriend: string;
}

export default function InputChat({ set, socket, idFriend }: InputChatProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const image = window.sessionStorage.getItem('image');
    function handleClick(): void {
        const input = inputRef.current?.value;
        if (input) {
            if (!input.trim()) return;
            const data = {
                name: window.sessionStorage.getItem('name'),
                image: image,
                message: input,
                idUser: window.sessionStorage.getItem('idUser'),
                idFriend: idFriend
            };
            inputRef.current.value = '';
            socket.emit('updateSideBarNotification', { id: window.sessionStorage.getItem('idUser'), idFriend: idFriend });
            socket.emit('sendMessage', data);
        }
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleClick();
        }
    }

    return (
        <div className="fixed bg-gray-800 w-full bottom-0 h-16 flex">
            <input
                onKeyDown={handleKeyDown}
                ref={inputRef}
                className="m-2 ml-5 bg-slate-950 rounded placeholder:text-center text-white"
                placeholder="Enviar mensagem"
            />
            <button onClick={handleClick} className="geist text-white bg-blue-800 m-2 pl-4 pr-4 rounded hover:bg-blue-900">
                Enviar
            </button>
        </div>
    );
}
