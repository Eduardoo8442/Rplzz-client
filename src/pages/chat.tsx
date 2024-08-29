import ChatMain from "@/components/Chat.main.components";
import '../app/globals.css';
import SideBar from "@/components/Home.sidebar.components";
import { useEffect, useState } from "react";
export default function Chat() {
    const [mobile, setMobile] = useState(false);

    useEffect(() => {
        setMobile(window.innerWidth >= 770 ? true : false);
    }, []);
  return (
    <div className="bg-gray-900 min-h-screen">
  <SideBar />
  {mobile ? (
                 
                 <div className='ml-80'>
                 <ChatMain />
                 </div>
               ) : (
                <div>
                 <ChatMain />
             </div>
               )}
    </div>
  );
}
