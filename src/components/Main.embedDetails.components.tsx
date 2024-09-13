export default function EmbedDetails() {
    return (
        <div className="bg-gray-950 md:h-screen">
            <div className="flex flex-col md:flex-row md:justify-center">
                <div className="bg-gray-900 md:mx-2 p-4 rounded-md m-5">
                    <div>
                        <p className="geist text-blue-400 background-embed-details-main p-2 rounded-md">Eduardoo8442</p>
                    </div>
                    <div className="mt-5">
                        <p className="geist text-white text-sm w-full">Engenheiro de Sistemas do projeto. Responsável pelo desenvolvimento e apuração dos sistemas, tanto no servidor como no cliente.</p>
                       <p className="geist text-white text-sm w-full">Responsável pela administração e manipulação do banco de dados.</p>
                     </div>
                     <div className="bg-gray-900 p-4 m-6 rounded-lg shadow-lg flex justify-center">
                    <img src='/images/bannermain.png' className="border border-gray-700 rounded-md shadow-md w-3/4 h-auto transition-transform duration-300 ease-in-out hover:scale-105"/>
              </div>

                </div>
                <div className="bg-gray-900 md:mx-2 p-6 h-72 rounded-md m-5">
                    <div>
                        <p className="geist text-blue-400 background-embed-details-main p-2 rounded-md">Rafael8442</p>
                    </div>
                    <div className="mt-10">
                        <p className="geist text-white text-sm m-2">Tester do projeto.</p>
                     </div>
                </div>
                <div className="bg-gray-900 md:mx-2 p-6 h-72 rounded-md m-5">
                    <div>
                        <p className="geist text-blue-400 background-embed-details-main p-2 rounded-md">João Carlos</p>
                    </div>
                    <div className="mt-10">
                        <p className="geist text-white text-sm md:w-40">Analista de Sistemas. Responsável pela integridade e logistica dos sistemas integrados na aplicação.</p>
                     </div>
                   
                </div>
            </div>
        </div>
    );
}
