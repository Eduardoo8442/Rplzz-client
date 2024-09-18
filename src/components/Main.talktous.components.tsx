export default function TalkToUse() {
    return (
      <div className="h-auto bg-gradient-to-r from-gray-800 to-gray-900 py-16 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-white font-bold text-4xl mb-4">Fale Conosco</h1>
          <p className="text-gray-400 text-lg mb-8">
            Tem dúvidas ou sugestões? Envie-nos um email e responderemos o mais rápido possível!
          </p>
  
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Seu email"
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <textarea
              placeholder="Escreva sua mensagem"
              rows={4}
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-all duration-300"
            >
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    );
  }
  