export default function AddComponent({ embedState }: any) {
    function handleClick() {
        embedState(false);
    }
    return (
        <div>
            <div onClick={handleClick} className="fixed w-full h-full bg-black bg-opacity-50 z-10"></div>
            <div className="absolute w-full h-full z-50 flex justify-center items-center">
                <div className="fixed bottom-1/2 pl-20 pr-20 rounded-lg h-64 bg-white dark:bg-gray-800 p-6 flex justify-center flex-col items-center shadow-lg">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Adicionar Amigo</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Coloque o id do usuário para adicioná-lo!</p>
                    <input 
                        type="text" 
                        placeholder="Id do usuário" 
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-900 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">Enviar</button>
                </div>
            </div>
        </div>
    );
}
