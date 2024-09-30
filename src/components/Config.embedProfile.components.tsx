'use client'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import api from "@/api";
import isBrowser from "@/functions/isBrowser";
interface EmbedProfileProps {
  setChangeEmail: Dispatch<SetStateAction<boolean>>;
  setChangePassword: Dispatch<SetStateAction<boolean>>;
}

export default function EmbedProfile({ setChangeEmail, setChangePassword }: EmbedProfileProps) {
    const router = useRouter();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const inputFileRef = useRef<HTMLInputElement>(null);
    
    function handleClick() {
        router.push('/home');
    }

    function handleEmail() {
        setChangeEmail(true);
    }

    function handlePassWord() {
        setChangePassword(true);
    }

    function handleFileChange() {
        if (!inputFileRef.current) {
            console.error('Referência ao input de arquivo não está disponível.');
            return;
        }

        const files = inputFileRef.current.files;
        if (!files || files.length === 0) {
            console.error('Nenhum arquivo foi selecionado.');
            return;
        }

        const file = files[0];
        const url = `${api}/upload`;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('id', id);
        const token = sessionStorage.getItem('auth-token');
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, 
            },
            body: formData,
        })
        .then(response => response.json())
        .then(result => {
            const imageLink = result.imageLink;
            if (isBrowser()) {
                window.sessionStorage.setItem('image', imageLink);
            }
            setImage(imageLink);
        })
        .catch(error => {
            console.error('Erro na requisição fetch:', error);
        });
    }

    useEffect(() => {
        if (isBrowser()) {
            setName(window.sessionStorage.getItem('name') || 'Sem nick');
            setEmail(window.sessionStorage.getItem('email') || 'Sem email');
            setId(window.sessionStorage.getItem('idUser') || 'Sem id');
            setImage(window.sessionStorage.getItem('image') || '/images/profile.png');
        }
    }, []);

    return (
        <div className="bg-gray-800 p-6 rounded-lg border-r-4 border-yellow-500 relative shadow-lg">
            <IoIosCloseCircleOutline 
                onClick={handleClick} 
                className="absolute text-white cursor-pointer text-2xl right-4 top-4 hover:text-gray-400 transition duration-200"
            />
            <div className="flex items-center pt-2">
                <label htmlFor="imageInput" style={{ cursor: 'pointer' }}>
                    <img id="imageButton" className="w-20 h-20 mr-4 rounded-full cursor-pointer" src={image.replace(/"/g, '')} alt="Profile" />
                </label>
                <input type="file" ref={inputFileRef} id="imageInput" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
                <div className="ml-4">
                    <p className="text-3xl font-semibold text-white">{name}</p>
                    <p className="text-gray-400">seu id: {id}</p>
                </div>
            </div>
            <div className="bg-gray-900 mt-6 mb-6 p-4 rounded-xl shadow-inner">
                <div className="mb-6">
                    <p className="text-white mb-2">Email:</p>
                    <div className="relative">
                        <p className="text-gray-400 mb-2">{email}</p>
                        <button onClick={handleEmail} className="absolute right-2 top-0 text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition duration-200">Editar</button>
                    </div>
                </div>
                <div>
                    <p className="text-white mb-2">Senha:</p>
                    <div className="relative">
                        <p className="text-gray-400 mb-2">***********</p>
                        <button onClick={handlePassWord} className="absolute right-2 top-0 text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition duration-200">Editar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
