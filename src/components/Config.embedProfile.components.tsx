import { IoIosCloseCircleOutline } from "react-icons/io";
import { useRouter } from "next/router";
export default function EmbedProfile() {
    const router = useRouter();
    function handleClick() {
        router.push('/home');
    }
    return(
 <div className="bg-gray-800 pl-10 pr-60 rounded border-r-4 border-yellow-500 relative">
 <IoIosCloseCircleOutline  onClick={handleClick} className="absolute text-white cursor-pointer size-10 right-0 hover:text-gray-400"/>

<div className="flex items-center pt-2">
<img className="w-20 h-20  mr-2 rounded-full" src='/images/profile.png'/>
<div className="m-2 ml-10">
    <p className="text-3xl geist text-white">Seu Nick</p>
    <p>seu id: 000000</p>
</div>
</div>


<div className="bg-gray-950 mt-10 mb-10 p-2 rounded-xl">
  <div>
       <p className="text-white roboto ml-2">Email:</p>
       <div className="relative">
         <p className="text-gray-400 geist ml-2">Meuemail@gmail.com</p>
         <button className="absolute right-1 text-sm pl-2 pr-2 rounded top-0 bg-blue-800 text-white geist">Editar</button>
       </div>
      
  </div>
  <div className="mt-10">
       <p className="text-white roboto ml-2">Senha:</p>
       <div className="relative">
         <p className="text-gray-400 geist ml-2">***********</p>
         <button className="absolute right-1 text-sm pl-2 pr-2 rounded top-0 bg-blue-800 text-white geist">Editar</button>
       </div>
      
  </div>
</div>
</div>
    )
}