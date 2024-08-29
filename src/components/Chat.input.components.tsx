import { useRef } from "react";
import { Socket } from "socket.io-client";
import { FaImages } from "react-icons/fa";
import api from "@/api";

interface InputChatProps {
    set: any;
    socket: Socket;
    idFriend: string;
    setFailure: any;
}

export default function InputChat({ set, setFailure, socket, idFriend }: InputChatProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const inputFileRef = useRef<HTMLInputElement>(null);
    const image = window.sessionStorage.getItem('image');
    async function formatMediaURL(file: any): Promise<{ url: string | null, isVideo: boolean }> {
        const fileURL = file[0];
        const url = `${api}/uploadimagemessage`;
        const token = sessionStorage.getItem('auth-token');
        const formData = new FormData();
        formData.append('file', fileURL);
        let mediaLink = null;
        let isVideo = false;
    
        const videoExtensions = /\.(mp4|mkv|webm|avi|mov)$/i;
        if (fileURL.name.match(videoExtensions)) {
            isVideo = true;
        }
        await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, 
            },
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            mediaLink = result.imageURL; 
        })
        .catch(error => {
            setFailure(true);
            console.error('Error during file upload:', error);
        });
    
        return { url: mediaLink, isVideo };
    }

    async function handleClick(origin: 'input' | 'image'): Promise<void> {
        const input = inputRef.current?.value;
        let mediaResult: {url: string | null, isVideo: boolean} = { url: null, isVideo: false };
    
        if (origin === 'image' && inputFileRef.current) {
            const files = inputFileRef.current.files;
            if (files && files.length !== 0) {
                mediaResult = await formatMediaURL(files);
            }
        }
    
        if (input || mediaResult.url) {
            const newInputValue = input ? input : 'Ei, olhe essa mídia!';
            if (!newInputValue.trim()) return;
            const data = {
                name: window.sessionStorage.getItem('name'),
                image: image,
                message: newInputValue,
                idUser: window.sessionStorage.getItem('idUser'),
                idFriend: idFriend,
                imageorvideo: {
                    url: mediaResult.url,
                    type: mediaResult.isVideo // false = imagem / true = video
                }
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
            <input type="file" ref={inputFileRef} id="imageInput" accept="image/*,video/*" style={{ display: 'none' }} onChange={() => handleClick('image')} />       
        </div>
    );
}
