import { IoIosCloseCircleOutline } from "react-icons/io";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from 'react';

interface EmbedProfileProps {
  setChangeEmail: Dispatch<SetStateAction<boolean>>;
  setChangePassWord: Dispatch<SetStateAction<boolean>>;
}
export default function EmbedProfile({ setChangeEmail, setChangePassWord}: EmbedProfileProps) {
    const router = useRouter();
    function handleClick() {
        router.push('/home');
    }
    function handleEmail() {
        setChangeEmail(true);
    }
    function handlePassWord() {
        setChangePassWord(true);
    }
    return (
        <div className="bg-gray-800 p-6 rounded-lg border-r-4 border-yellow-500 relative shadow-lg">
            <IoIosCloseCircleOutline 
                onClick={handleClick} 
                className="absolute text-white cursor-pointer text-2xl right-4 top-4 hover:text-gray-400 transition duration-200"
            />

            <div className="flex items-center pt-2">
                <img className="w-20 h-20 mr-4 rounded-full" src='/images/profile.png' alt="Profile"/>
                <div className="ml-4">
                    <p className="text-3xl font-semibold text-white">Seu Nick</p>
                    <p className="text-gray-400">seu id: 000000</p>
                </div>
            </div>

            <div className="bg-gray-900 mt-6 mb-6 p-4 rounded-xl shadow-inner">
                <div className="mb-6">
                    <p className="text-white mb-2">Email:</p>
                    <div className="relative">
                        <p className="text-gray-400 mb-2  ">Meuemail@gmail.com</p>
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
