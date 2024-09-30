'use client';
import '../app/globals.css'
import RegisterEmbed from '@/components/Register.embed.components';

export default function Register() {
    return (
        <div className="bg-gray-900 h-screen flex items-center justify-center">
            <div className='flex justify-center'>
                <RegisterEmbed />
            </div>
        </div>
    );
}
