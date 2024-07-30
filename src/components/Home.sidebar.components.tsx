import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrConfigure } from "react-icons/gr";
import { FaMicrophone, FaHeadphones } from "react-icons/fa";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { idUser } from "@/store/actions";

type Users = {
    name: string;
    image: string;
    id: string;
};

export default function SideBar() {
    const [mobile, setMobile] = useState(true);
    const [embed, setEmbed] = useState(true);
    const [users, setUsers] = useState<Users[]>([]);
    const router = useRouter();
    const dispatch = useDispatch();

    function handleClick() {
        setEmbed(!embed);
    }

    function handleClickUser(event: React.MouseEvent<HTMLDivElement>) {
        const id = event.currentTarget.id;
        if (id) {
            dispatch(idUser(id));
            router.push('/chat');
        }
    }

    function handleConfig() {
        router.push('/config');
    }

    function handleClickAmigos() {
        router.push('/home');
    }

    function Bar() {
        return (
            <div className="z-50 flex bg-gray-800 h-screen w-80 fixed flex-col items-center shadow-lg">
                {mobile ? null : <GiHamburgerMenu onClick={handleClick} className="fixed left-4 top-4 text-white cursor-pointer text-2xl hover:text-gray-400 transition duration-200" />}

                <div onClick={handleClickAmigos} className="flex items-center justify-center bg-gray-700 mt-10 rounded w-60 h-10 hover:bg-gray-900 transition duration-200 cursor-pointer">
                    <p className="text-lg font-semibold text-white">Amigos</p>
                </div>

                <div className="mt-6 w-full px-4">
                    {users.map((user, index) => (
                        <div key={index} onClick={handleClickUser} id={user.id} className="flex items-center p-2 mt-2 bg-gray-700 rounded-lg hover:bg-gray-900 transition duration-200 cursor-pointer">
                            <img className="w-10 h-10 rounded-full mr-4" src={user.image} alt={`${user.name} profile`} />
                            <p className="text-white">{user.name}</p>
                        </div>
                    ))}
                </div>
                     {/* parte de baixo do sidebar onde mostra informações do usuário*/}
                <div className="absolute bottom-0 bg-gray-900 w-full h-16 flex items-center justify-between px-4">
                    <div className="flex items-center">
                        <img className="w-10 h-10 rounded-full mr-2" src='/images/profile.png' alt="Profile" />
                        <p className="text-white">Seu nick</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <FaMicrophone className="text-red-600 text-xl cursor-pointer" />
                        <FaHeadphones className="text-red-600 text-xl cursor-pointer" />
                        <GrConfigure onClick={handleConfig} className="text-white text-xl cursor-pointer hover:text-gray-400 transition duration-200" />
                    </div>
                </div>
            </div>
        );
    }

    useEffect(() => {
        setMobile(window.innerWidth >= 770 ? true : false);
        setUsers([]);
        //apagar quando for integrar com a API
        function addObject(name: string, image: string, id: string) {
            setUsers(current => [...current, { name, image, id }]);
        }
        addObject('Eduardo8442', '/images/profile.png', '849264');
        addObject('RafaelStonks', '/images/profile.png', '248692');
    }, []);

    return (
        <div>
            {embed ? <Bar /> : <GiHamburgerMenu className="fixed z-50 text-white text-2xl cursor-pointer left-4 top-4 hover:text-gray-400 transition duration-200" onClick={handleClick} />}
        </div>
    );
}
