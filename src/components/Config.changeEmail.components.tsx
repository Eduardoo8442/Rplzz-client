import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { isEmail } from 'validator';
import ChangedEmail from './Config.changedEmail.components';
import api from '@/api';
interface EmbedProfileProps {
    setChangeEmail: Dispatch<SetStateAction<boolean>>;
  }

export default function ChangeEmail({setChangeEmail}: EmbedProfileProps) {
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const idUser = window.sessionStorage.getItem('idUser'); 
    const inputRef = useRef<HTMLInputElement>(null);
    function handleClick() {
     setChangeEmail(false);
    }
    function handleButton() {
      const value = inputRef.current?.value;
        if(!value?.trim()) {
            setError('Input vázio');
            return;
        }
        if(!isEmail(value)) {
          setError('Formato do email inválido');
            return;
        }
      const token = sessionStorage.getItem('auth-token');
      fetch(`${api}/changeemail`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: idUser, newEmail: value }) 
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
        window.sessionStorage.setItem('email', data.newEmail);
        setSuccess(true);
    })
    .catch(error => {
        setError('Ocorreu um erro ao tentar alterar o email');
    });
    }
    return (
      <div>
        <div onClick={handleClick} className="z-30 fixed top-0 left-0 h-full w-full bg-gray-950 opacity-80"></div>
        <div className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="text-center mb-4">
            <h1 className="text-white text-2xl font-semibold">Alterar Email</h1>
          </div>
          <div className="flex flex-col space-y-4">
            <input
              ref={inputRef}
              type="email"
              placeholder="Digite seu novo email"
              className="px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={handleButton} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Confirmar
            </button>
            {error ? (
              <div className='flex justify-center'>
                <p className='text-red-600 geist'>{error}</p>
              </div>
            ) : null}
          </div>
        </div>
        {success ? <ChangedEmail set={setSuccess}/> : null}
      </div>
    );
  }
  