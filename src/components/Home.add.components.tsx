import { useRef, useState } from "react";
import api from "@/api";
export default function AddComponent({ embedState }: any) {
    const [error, setError] = useState<string>();
    const [success, setSuccess] = useState<string>();
    const inputRef = useRef<HTMLInputElement>(null);
    function handleClick(): void {
        embedState(false);
    }
    function handleButton(): void {
        const value = inputRef.current?.value;
        if(!value?.trim()) {
            setError('Input vázio');
            return;
        }
        const idUser = window.sessionStorage.getItem('idUser'); 
        if(idUser === value.trim()) {
            setError('Você não pode adicionar a si mesmo');
            return;
        }
        const token = sessionStorage.getItem('auth-token');
        fetch(`${api}/addfriends`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idInput: value, id: idUser }) 
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
         setSuccess('Pedido enviado');
         if (inputRef.current) {
            inputRef.current.value = '';
          }
        })
        .catch(error => {
            console.error('Erro:', error);
            setError('ID inválido');
        });
    }
    return (
        <div>
            <div onClick={handleClick} className="fixed w-full h-full bg-black bg-opacity-50 z-10"></div>
            <div className="absolute w-full h-full z-50 flex justify-center items-center">
                <div className="fixed bottom-1/2 pl-20 pr-20 rounded-lg h-64 bg-gray-800 p-6 flex justify-center m-2 sm:m-0 flex-col items-center shadow-lg">
                    <h1 className="text-2xl font-semibold text-white mb-2">Adicionar Amigo</h1>
                    <p className="text-gray-400 mb-4">Coloque o id do usuário para adicioná-lo!</p>
                    <input 
                        ref={inputRef}
                        type="text" 
                        placeholder="Id do usuário" 
                        className="w-full p-2 mb-4 border rounded-md bg-gray-900 border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button onClick={handleButton} className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">Enviar</button>
                   {error ? <p className="text-red-600 geist">{error}</p> : null}
                   {success ? <p className="text-green-600 geist">{success}</p> : null}
                </div>
            </div>
        </div>
    );
}
