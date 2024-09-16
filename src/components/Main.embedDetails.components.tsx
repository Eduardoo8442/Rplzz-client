export default function EmbedDetails() {
    return (
        <div className="bg-gray-950 min-h-screen py-10 px-5 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Eduardo Card */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg transform transition duration-500 hover:scale-105 flex flex-col justify-between">
                    <div className="flex flex-col items-center">
                        <p className="text-blue-400 text-xl font-semibold mb-2">Eduardoo8442</p>
                        <p className="text-white text-sm text-center">Engenheiro de Sistemas do projeto, com foco em arquitetura de software. Especialista no desenvolvimento de soluções tanto no servidor quanto no cliente, é responsável pela integração completa dos sistemas. Administra a infraestrutura de banco de dados, garantindo segurança e alta performance.</p>
                    </div>
                    <div className="bg-gray-800 p-4 mt-6 rounded-lg shadow-lg">
                        <img src='/images/eduardocontent.png' alt="Banner" className="rounded-lg shadow-md w-full h-auto transition-transform duration-300 ease-in-out hover:scale-110"/>
                    </div>
                </div>

                {/* Rafael Card */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg transform transition duration-500 hover:scale-105 flex flex-col justify-between">
                    <div className="flex flex-col items-center">
                        <p className="text-blue-400 text-xl font-semibold mb-2">Rafael8442</p>
                        <p className="text-white text-sm text-center mt-2">Tester da aplicação. Responsável por garantir que todas as funcionalidades sejam implementadas conforme especificações. Trabalha com automação de testes e busca garantir a estabilidade e desempenho do sistema em ambientes de produção.</p>
                    </div>
                    <div className="bg-gray-800 p-4 mt-6 rounded-lg shadow-lg">
                        <img src='/images/rafaelcontent.png' alt="Banner" className="rounded-lg shadow-md w-80 h-auto transition-transform duration-300 ease-in-out hover:scale-110"/>
                    </div>
                </div>

                {/* João Carlos Card */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg transform transition duration-500 hover:scale-105 flex flex-col justify-between">
                    <div className="flex flex-col items-center">
                        <p className="text-blue-400 text-xl font-semibold mb-2">João Carlos</p>
                        <p className="text-white text-sm text-center">Analista de Sistemas dedicado à integridade e logística dos sistemas integrados. Monitora e otimiza fluxos de dados, garantindo que todas as interações entre os serviços sejam executadas de forma eficiente e sem erros. Atua também na resolução de problemas e na análise de melhorias.</p>
                    </div>
                    <div className="bg-gray-800 p-4 mt-6 rounded-lg shadow-lg">
                        <img src='/images/joaocarloscontent.png' alt="Banner" className="rounded-lg shadow-md w-80 h-auto transition-transform duration-300 ease-in-out hover:scale-110"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
