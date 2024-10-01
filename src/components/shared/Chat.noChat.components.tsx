import { IoIosChatboxes } from "react-icons/io";

export default function NoChat() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <IoIosChatboxes className="text-6xl text-blue-500 animate-bounce" />
        </div>
        <h1 className="text-white text-3xl font-semibold mb-2">
          Comece uma Conversa
        </h1>
        <p className="text-gray-300 text-lg mb-4">
          Parece que você ainda não conversou com este usuário.
        </p>
        <p className="text-gray-400 mb-6">
          Envie uma mensagem para iniciar o diálogo!
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
          Envie um Olá👋
        </button>
      </div>
    </div>
  );
}
