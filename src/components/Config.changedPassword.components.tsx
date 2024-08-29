import React, { Dispatch, SetStateAction } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

interface EmbedProfileProps {
  set: Dispatch<SetStateAction<boolean>>;
}

export default function ChangedPassword({ set }: EmbedProfileProps) {
  function handleClick() {
    set(false);
  }

  return (
    <div>
      <div 
        onClick={handleClick} 
        className="z-30 fixed top-0 left-0 h-full w-full bg-gray-950 opacity-80 transition-opacity duration-300 ease-in-out"
      ></div>

      <div className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-sm">
        <div className="text-center mb-4">
          <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-2" />
          <h1 className="text-white text-2xl font-semibold">Senha alterada com sucesso!</h1>
        </div>

        <p className="text-gray-400 mb-4">
          Sua senha foi atualizada com sucesso. Caso precise de mais alguma coisa, estamos aqui para ajudar!
        </p>

        <button 
          onClick={handleClick} 
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 ease-in-out"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
