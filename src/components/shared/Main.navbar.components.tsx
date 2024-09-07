import Link from 'next/link';
import { useRouter } from 'next/router';
export default function NavBar() {
    const router = useRouter();
    function handleClick() {
     router.push('/register');
    }
    return (
        <nav className="bg-gray-950 p-4 fixed top-0 w-full left-0">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex space-x-6">
                    <Link href="/about" legacyBehavior>
                        <p className="text-white geist cursor-pointer hover:text-gray-500">Sobre</p>
                    </Link>
                    <Link href="/" legacyBehavior>
                        <p className="text-white geist cursor-pointer hover:text-gray-500">Início</p>
                    </Link>
                    <Link href="/team" legacyBehavior>
                        <p className="text-white geist cursor-pointer hover:text-gray-500">Equipe</p>
                    </Link>
                </div>
                <div>
                    <button onClick={handleClick} className="bg-blue-500 geist text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                        Criar conta
                    </button>
                </div>
            </div>
        </nav>
    );
}
