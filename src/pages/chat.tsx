'use client';
import ChatMain from "@/components/Chat.main.components";
import '../app/globals.css';
import SideBar from "@/components/Home.sidebar.components";
import { useEffect, useState } from "react";

export default function Chat() {
    const [mobile, setMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== 'undefined') {
                setMobile(window.innerWidth < 770);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize); 

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="bg-gray-900 min-h-screen">
            <SideBar />
            {mobile ? (
                <div>
                    <ChatMain />
                </div>
            ) : (
                <div className='ml-80'>
                    <ChatMain />
                </div>
            )}
        </div>
    );
}
