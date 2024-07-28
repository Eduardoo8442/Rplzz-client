import React from 'react';

export default function LoginEmbed() {

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">Login</h1>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-white" htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="w-full mt-2 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500" 
                            placeholder="Digite seu email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-white" htmlFor="password">Senha</label>
                        <input 
                            type="password" 
                            id="password" 
                            className="w-full mt-2 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500" 
                            placeholder="Digite sua senha"
                        />
                    </div>
                    <button 
                        type="submit" 
                       className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                    >
                         Entrar
                    </button>
                </form>
                <p className="text-center text-white mt-4">
                    Não tem uma conta? 
                    <a href="#" className="text-blue-500 hover:underline"> Clique aqui</a>
                </p>
            </div>
        </div>
    );
}
