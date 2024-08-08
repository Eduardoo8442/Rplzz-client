import { useRef } from "react";
import { Socket } from "socket.io-client";
import { FaImages } from "react-icons/fa";
import api from "@/api";

interface InputChatProps {
    set: any;
    socket: Socket;
    idFriend: string;
}

export default function InputChat({ set, socket, idFriend }: InputChatProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const inputFileRef = useRef<HTMLInputElement>(null);
    const image = window.sessionStorage.getItem('image');

    async function formatImageURL(file: any): Promise<any> {
        const fileURL = file[0];
        const url = `${api}/uploadimagemessage`;
        const formData = new FormData();
        formData.append('file', fileURL);
        let imageLink = null;
        await fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(result => {
                imageLink = result.imageURL;
            })
            .catch(error => {
                console.log(error);
            });
        return imageLink;
    }

    async function handleClick(origin: 'input' | 'image'): Promise<void> {
        const input = inputRef.current?.value;
        let urlImageMessage = null;

        if (origin === 'image' && inputFileRef.current) {
            const files = inputFileRef.current.files;
            if (files && files.length !== 0) {
                urlImageMessage = await formatImageURL(files);
            }
        }

        if (input || urlImageMessage) {
            const newInputValue = input ? input : 'Ei, olhe essa imagem!';
            if (!newInputValue.trim()) return;
            const data = {
                name: window.sessionStorage.getItem('name'),
                image: image,
                message: newInputValue,
                idUser: window.sessionStorage.getItem('idUser'),
                idFriend: idFriend,
                imageMessage: urlImageMessage
            };
            if (input) inputRef.current.value = '';
            socket.emit('updateSideBarNotification', { id: window.sessionStorage.getItem('idUser'), idFriend: idFriend });
            socket.emit('sendMessage', data);
        }
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleClick('input');
        }
    }

    return (
        <div className="fixed bg-gray-800 w-full bottom-0 h-16 flex items-center">
            <input
                onKeyDown={handleKeyDown}
                ref={inputRef}
                className="m-2 ml-5 h-10 bg-slate-950 rounded placeholder:text-center text-white"
                placeholder="Enviar mensagem"
            />
            <button onClick={() => handleClick('input')} className="geist h-10 text-white bg-blue-800 m-2 pl-4 pr-4 rounded hover:bg-blue-900">
                Enviar
            </button>
            <label htmlFor="imageInput" style={{ cursor: 'pointer' }}>
                <div className="bg-blue-800 rounded h-10 p-4 flex justify-center items-center">
                    <FaImages className="text-white" />
                </div>
            </label>
            <input type="file" ref={inputFileRef} id="imageInput" accept="image/*" style={{ display: 'none' }} onChange={() => handleClick('image')} />
        </div>
    );
}
