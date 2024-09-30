'use client';
import '../app/globals.css'
import LoginEmbed from '@/components/LoginEmbed.components';

export default function Login() {
    return (
        <div className="bg-gray-900 h-screen flex items-center justify-center">
            <div className='flex justify-center'>
                <LoginEmbed />
            </div>
        </div>
    );
}
