'use client'
import { FaLongArrowAltRight } from "react-icons/fa";
import { useRouter } from "next/router";

export default function TitleMain() {
    const router = useRouter();

    function handleClick() {
        router.push('/login');
    }

    return (
        <div className="h-screen w-screen relative flex flex-col justify-center items-center">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute right-0 top-0 w-0 h-0 bg-transparent rounded-full shadow-[0_0_200px_250px_rgba(0,51,204,0.3)]"></div>
                <div className="absolute left-0 bottom-0 w-0 h-0 bg-transparent rounded-full shadow-[0_0_200px_250px_rgba(0,51,204,0.3)]"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center max-w-3xl px-4 space-y-5">
                <div
                    onClick={handleClick}
                    className="background-embed-title-main cursor-pointer rounded-md flex justify-center items-center transform transition-transform duration-300 hover:scale-105 bg-blue-600 p-2 text-sm md:text-lg md:p-4"
                >
                    <p className="geist font-medium text-white z-10 mr-2">🚀 Comece a conversar agora mesmo aqui!</p>
                    <FaLongArrowAltRight className="text-white" />
                </div>

                <div>
                    <p className="text-white geist font-semibold text-4xl text-center">
                        Converse com <span className="text-blue-300">pessoas</span> aleatórias e totalmente anônimas
                    </p>
                </div>
                <div>
                    <p className="geist text-gray-500">O rplzz é uma plataforma de interação online entre usuários.</p>
                </div>
                <div className="m-0">
                    <p className="geist m-0 text-gray-500">Faça login e divirta-se</p>
                </div>
            </div>
        </div>
    );
}
