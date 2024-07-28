import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrConfigure } from "react-icons/gr";
import { FaMicrophone } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa";
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
        if(embed) setEmbed(false);
        else setEmbed(true)
    }
    function handleClickUser(event: React.MouseEvent<HTMLDivElement>) {
        const id = event.currentTarget.id;
        if (id) {
        dispatch(idUser(id));
        router.push('/chat');
        }
    }
    function handleClickAmigos() {
        router.push('/home');
    }
    function Bar() {
        return(
            <div className="z-50 flex bg-gray-800 h-screen w-80 fixed flex-col items-center">
            {mobile ? null :  <GiHamburgerMenu onClick={handleClick} className="fixed left-0"/> }


       <div onClick={handleClickAmigos} className="flex items-center justify-center bg-gray-700 mt-10 rounded w-60 h-10 hover:bg-gray-900"> {/* div conteúdo principal "amigos"*/}
           <p className="geist">amigos</p>
          </div>

         
         {/* Usuários que o usuário conversou */}
             
          <div>

            {users.map((user, index) => (
                <div key={index}>
                        <div onClick={handleClickUser} id={user.id} className="flex pl-4 w-60 rounded pb-2 pt-2 items-center mt-5 hover:bg-gray-700">
                            <img className="w-8 h-8  mr-2 rounded-full" src={user.image}/>
                               {user.name}
                            </div>
  
                        </div>
                      ))}

                 </div>

        {/* perfil do usuário */}

          <div className="absolute bottom-0 bg-gray-900 w-full h-12 flex justify-center items-center">
           <p className="roboto">Seu nick</p>
           <GrConfigure className="absolute right-0 size-5"/>
           <FaMicrophone className="absolute right-8 size-5 text-red-600"/>
           <FaHeadphones className="absolute right-16 size-5 text-red-600"/>
          </div>
       </div>
        )
    }


    useEffect(() => {
        setMobile(window.innerWidth >= 770 ? true : false);
        //apagar quando a api for integrada
        setUsers([]);
       function addObject(name: string, image: string, id: string) {
        setUsers(current => [...current, { name: name, image: image, id: id}]);
       }
       addObject('Eduardo8442', '/images/profile.png', '849264');
       addObject('RafaelStonks', '/images/profile.png', '248692');
    }, []);
    return (
        <div>
        {embed ? <Bar /> : <GiHamburgerMenu className="fixed z-50" onClick={handleClick}/> }
       </div>
    );
}
