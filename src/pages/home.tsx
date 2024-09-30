'use client';
import '../app/globals.css'
import SideBar from '@/components/Home.sidebar.components';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import Friends from '@/components/Home.friends.components';
import { useEffect, useState } from 'react';
export default function Index() {
    const content = useSelector((state: RootState) => state.setContentReducer.setContent);
    const [mobile, setMobile] = useState(false);
    useEffect(() => {
      if (typeof window !== 'undefined') {
        setMobile(window.innerWidth >= 770 ? true : false);
      }
    }, []);
    return (
        <div className="bg-gray-900 min-h-screen">
               <SideBar />
               {mobile ? (
                 
                 <div className='ml-80'>
                 {content ? <p>Conteúdo true</p> : <Friends/>}
                 </div>
               ) : (
                <div>
                {content ? <p>Conteúdo true</p> : <Friends />}
             </div>
               )}
              
        </div>
    );
}
