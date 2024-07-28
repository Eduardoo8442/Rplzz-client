export default function AddComponent({ embedState }: any) {
    function handleClick() {
        embedState(false);
    }
    return(
        <div>
        <div onClick={handleClick} className="fixed w-full h-full bg-gray-500 opacity-35 z-10">
        </div>
        <div className="absolute w-full h-full z-50 flex justify-center items-center">
        <div className="fixed bottom-1/2 pl-20 pr-20 rounded h-64 bg-gray-800 p-2 flex justify-center flex-col items-center opacity-100">
            <h1 className="geist text-white">Adicionar Amigo</h1>
            <p className="geist text-gray-400 mb-5">Coloque o id do usuário para adicioná-lo!</p>

            <input placeholder="Id do usuário" className="mb-5 bg-gray-900 placeholder:text-gray-400 text-center"/>
            <button className="bg-blue-800 geist pl-5 pr-5 rounded hover:bg-blue-900">Enviar</button>
            </div>
        </div>
      
        </div>

    )
}