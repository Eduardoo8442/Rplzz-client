import React, { Dispatch, SetStateAction } from 'react';


interface EmbedProfileProps {
    setChangePassWord: Dispatch<SetStateAction<boolean>>;
  }

export default function ChangePassWord({setChangePassWord}: EmbedProfileProps) {
    function handleClick() {
     setChangePassWord(false)
    }
    return (
      <div>
        <div onClick={handleClick} className="z-30 fixed top-0 left-0 h-full w-full bg-gray-950 opacity-80"></div>
        <div className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="text-center mb-4">
            <h1 className="text-white text-2xl font-semibold">Alterar senha</h1>
          </div>
          <div className="flex flex-col space-y-4">
            <input
              type="password"
              placeholder="Digite sua nova senha"
              className="px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Confirmar
            </button>
          </div>
        </div>
      </div>
    );
  }
  