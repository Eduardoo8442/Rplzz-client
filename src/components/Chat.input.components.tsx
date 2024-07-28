export default function InputChat() {
    return(
        <div className="fixed bg-gray-800 w-full bottom-0 h-12 flex ">
        <input className="m-2 ml-5 bg-slate-950 rounded placeholder:text-center text-white" placeholder="Enviar mensagem"/>
        <button className="geist bg-blue-800 m-2 pl-4 pr-4 rounded hover:bg-blue-900">Enviar</button>
            </div>
    )
}