'use client'
import { useEffect, useRef } from "react";
import { idUser } from "@/store/actions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

type PropsEmbedProfile = {
    x: number;
    y: number;
    set: any;
    account: Account | any;
}

type Account = {
    name: string;
    image: string;
    idUser: string;
}

export default function EmbedProfile({ set, y, x, account }: PropsEmbedProfile) {
    const embedRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const router = useRouter();
    
    function handleClick() {
        if(account.idUser) {
            dispatch(idUser(account.idUser));
            router.push('/chat');
        }
    }

    useEffect(() => {
        const handleDblClick = () => {
            set(false);
        };

        const handleMouseDown = (event: MouseEvent) => {
            event.preventDefault();
            const element = embedRef.current;
            if (element) {
                const initialX = event.clientX;
                const initialY = event.clientY;
                const initialLeft = element.offsetLeft;
                const initialTop = element.offsetTop;

                const handleMouseMove = (moveEvent: MouseEvent) => {
                    const deltaX = moveEvent.clientX - initialX;
                    const deltaY = moveEvent.clientY - initialY;
                    element.style.left = initialLeft + deltaX + 'px';
                    element.style.top = initialTop + deltaY + 'px';
                };

                const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                };

                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
            }
        };

        const element = embedRef.current;
        if (element) {
            element.addEventListener('mousedown', handleMouseDown);
            element.style.left = x-60 + 'px';
            element.style.top = y+10 + 'px';
            element.style.display = 'block';

            // Animação de entrada
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            setTimeout(() => {
                element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 0);
        }

        document.addEventListener('dblclick', handleDblClick);
        return () => {
            document.removeEventListener('dblclick', handleDblClick);
            if (element) {
                element.removeEventListener('mousedown', handleMouseDown);
            }
        };
    }, [set, x, y]);

    return (
        <div
            className="absolute rounded-xl shadow-xl bg-gradient-to-br from-gray-700 to-gray-900 z-50 cursor-move"
            ref={embedRef}
            style={{ display: 'none' }}
        >
            <div className="bg-gray-800 p-6 rounded-xl border-r-4 border-yellow-500 relative shadow-lg">
                <div className="flex items-center pt-2">
                    <img className="w-20 h-20 mr-4 rounded-full cursor-pointer hover:opacity-90 transition-opacity duration-300" src={account.image.replace(/"/g, '')} alt="Profile"/>
                    <div className="ml-4">
                        <p className="text-3xl font-semibold text-white">{account.name}</p>
                        <p className="text-gray-400">id do usuário: {account.idUser}</p>
                    </div>
                </div>
                <div className="mt-10">
                    <p className="text-gray-400">Biografia: </p>
                    <p className="text-white geist">Em desenvolvimento...</p>
                </div>
                <div className="mt-10 flex justify-center">
                    <button 
                        onClick={handleClick} 
                        className="bg-blue-600 text-white geist p-2 w-full rounded-2xl hover:bg-blue-800 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                    >
                        Enviar mensagem
                    </button>
                </div>
            </div>
        </div>
    );
}
