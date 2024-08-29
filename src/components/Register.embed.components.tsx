import React, { useRef, useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import api from '@/api';
import validator from 'validator';
import { idUser } from '@/store/actions';


export default function RegisterEmbed() {
    const router = useRouter();
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    
    const [error, setError] = useState<string>();
    const [success, setSuccess] = useState<boolean>(false);
     
    function handleClick() {
        router.push('/');
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();


        const name = nameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        
        if(!name?.trim() || !email?.trim() || !password?.trim()) {
            setError('Campo(s) vázio!');
            return;
        }
        if(!validator.isEmail(email)) {
            setError('Email inválido');
            return;
        }
        if(password.length < 6) {
          setError('Senha inválida');
          return;
        }
        if(name.length < 6) {
            setError('Nome inválido');
            return;
        }
        const token = sessionStorage.getItem('auth-token');
        fetch(`${api}/register`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, email: email, password: password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao fazer a requisição');
            }
            return response.json();
        })
        .then(data => {
            window.sessionStorage.setItem('idUser', data.id);
            window.sessionStorage.setItem('name', data.name);
            window.sessionStorage.setItem('email', data.email);
            window.sessionStorage.setItem('image', data.image);
            window.sessionStorage.setItem('auth-token', data.token);
            setSuccess(true);
            setError(undefined);
            router.push('/home');
        })
        .catch(error => {
            console.error('Erro:', error);
            setError('Login ou senha inválido');
        });
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">Registro</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-white" htmlFor="email">Email</label>
                        <input 
                            ref={emailRef}
                            type="email" 
                            id="email" 
                            className="w-full mt-2 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500" 
                            placeholder="Digite seu email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-white" htmlFor="password">Senha</label>
                        <input 
                            ref={passwordRef}
                            type="password" 
                            id="password" 
                            className="w-full mt-2 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500" 
                            placeholder="Digite sua senha"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-white" htmlFor="name">Nome</label>
                        <input 
                            ref={nameRef}
                            type="text" 
                            id="name" 
                            className="w-full mt-2 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500" 
                            placeholder="Digite seu nome"
                        />
                    </div>
                    {error ? (
                        <div className="mb-4 w-full bg-red-600 py-2 px-4 rounded flex justify-center">
                           <p className='geist text-white'>{error}</p>
                        </div>
                    ) : null}

                      {success ? (
                        <div className="mb-4 w-full bg-green-600 py-2 px-4 rounded flex justify-center">
                           <p className='geist text-white'>Registrado! Redirecionando...</p>
                        </div>
                    ) : null}
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                    >
                        Registrar
                    </button>
                </form>
                <p className="text-center text-white mt-4">
                    já tem uma conta? 
                    <a onClick={handleClick} className="text-blue-500 hover:underline"> Clique aqui</a>
                </p>
            </div>
        </div>
    );
}
