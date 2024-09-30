'use client';
import React, { Dispatch, SetStateAction } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import isBrowser from '@/functions/isBrowser';
interface EmbedProfileProps {
  set: Dispatch<SetStateAction<boolean>>;
}

export default function ErrorSendImageVideo({ set }: EmbedProfileProps) {
  function handleClick() {
    if (isBrowser()) {
      set(false);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-950 opacity-80 absolute inset-0"></div>
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-sm relative z-10">
        <div className="text-center mb-4">
          <FaExclamationCircle className="text-red-500 text-4xl mx-auto mb-2" />
          <h1 className="text-white text-2xl font-semibold">Falha ao enviar o arquivo</h1>
        </div>

        <p className="text-gray-400 mb-4">
          Não foi possível enviar o arquivo. Alguns possíveis motivos incluem:
        </p>
        <ul className="text-gray-400 mb-4 list-disc list-inside">
          <li>O arquivo tem mais de 5 MB.</li>
          <li>Podemos estar enfrentando problemas internos.</li>
        </ul>

        <button 
          onClick={handleClick} 
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 ease-in-out"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
