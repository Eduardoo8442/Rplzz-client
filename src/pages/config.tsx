'use client';
import { useState } from 'react';
import '../app/globals.css'
import EmbedProfile from '@/components/Config.embedProfile.components';
import ChangeEmail from '@/components/Config.changeEmail.components';
import ChangePassWord from '@/components/Config.changePassword.components';
export default function Config() {
    const [changeEmail, setChangEmail] = useState<boolean>(false);
    const [changePassWord, setChangePassWord] = useState(false);
    return (
        <div className="bg-gray-900 h-screen flex items-center justify-center">
        {changeEmail ? <ChangeEmail setChangeEmail={setChangEmail}/> : null}
        {changePassWord ? <ChangePassWord setChangePassword={setChangePassWord}/> : null}
         <EmbedProfile setChangeEmail={setChangEmail} setChangePassword={setChangePassWord}/>
        </div>
    );
}
