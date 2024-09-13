import Link from 'next/link';
import { useRouter } from 'next/router';
import { LuGithub } from "react-icons/lu";
export default function NavBar() {
    const router = useRouter();
    function handleClick() {
     router.push('/register');
    }
    function handleGitHub() {
        return window.location.href = 'https://github.com/Eduardoo8442/Rplzz-client';
    }
    return (
        <nav className="p-4 fixed top-0 w-full left-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex space-x-6">
                <LuGithub className='text-white text-2xl'/>
                    <div>
                        <p onClick={handleGitHub} className="text-white text-sm md:text-base geist cursor-pointer hover:text-gray-500">GitHub</p>
                    </div>
                    <Link href="/" legacyBehavior>
                        <p className="text-white geist cursor-pointer text-sm md:text-base hover:text-gray-500">Início</p>
                    </Link>
                    <Link href="/team" legacyBehavior>
                        <p className="text-white geist cursor-pointer text-sm md:text-base hover:text-gray-500">Equipe</p>
                    </Link>
                </div>
                <div>
                    <button onClick={handleClick} className="bg-blue-500 geist text-white md:px-4 py-1 px-1 text-sm md:text-base md:py-2 rounded hover:bg-blue-600 transition duration-300">
                        Criar conta
                    </button>
                </div>
            </div>
        </nav>
    );
}
