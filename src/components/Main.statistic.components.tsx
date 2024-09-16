export default function Statistic() {
    return (
        <div className="flex flex-col lg:flex-row lg:justify-center items-center mb-48 px-4">
            {/* Estatísticas */}
            <div className="flex flex-col space-y-4 items-center lg:items-start">
                <div className="flex space-x-4">
                    <div className="bg-gradient-to-r from-blue-900 to-blue-600 rounded-lg shadow-lg w-36 sm:w-64 h-36 flex justify-center items-center flex-col">
                        <p className="text-3xl md:text-5xl font-bold text-white">2,422</p>
                        <p className="text-gray-300 text-sm tracking-wide">Usuários Ativos</p>
                    </div>
                    <div className="bg-gradient-to-r from-green-900 to-green-600 rounded-lg shadow-lg w-36 sm:w-64 h-36 flex justify-center items-center flex-col">
                        <p className="text-3xl md:text-5xl font-bold text-white">16,866</p>
                        <p className="text-gray-300 text-sm tracking-wide">Usuários Totais</p>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <div className="bg-gradient-to-r from-purple-900 to-purple-600 rounded-lg shadow-lg w-36 sm:w-64 h-36 flex justify-center items-center flex-col">
                        <p className="text-3xl md:text-5xl font-bold text-white">4</p>
                        <p className="text-gray-300 text-sm tracking-wide">Administradores</p>
                    </div>
                    <div className="bg-gradient-to-r from-red-900 to-red-600 rounded-lg shadow-lg w-36 sm:w-64 h-36 flex justify-center items-center flex-col">
                        <p className="text-3xl md:text-5xl font-bold text-white">0</p>
                        <p className="text-gray-300 text-sm tracking-wide">Donativos</p>
                    </div>
                </div>
            </div>

            {/* Texto */}
            <div className="lg:ml-12 flex flex-col justify-center items-center lg:items-start space-y-4 mt-8 lg:mt-0">
                <p className="text-2xl font-semibold text-blue-400 mb-2">Rplzz Platform</p>
                <p className="text-gray-400 text-lg mb-2 text-center lg:text-left">
                    Qual será o próximo passo para o Rplzz?
                </p>
                <div className="w-72">
                    <p className="text-gray-300 leading-relaxed text-center lg:text-left">
                        O projeto está em desenvolvimento contínuo no GitHub. Por enquanto, a equipe não tem planos de expandir além de uma demonstração inicial, focando na estabilidade e otimização da plataforma.
                    </p>
                </div>
            </div>
        </div>
    );
}
