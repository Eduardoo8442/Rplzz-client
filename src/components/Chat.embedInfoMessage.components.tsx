import { useEffect, useRef } from "react";
import api from "@/api";
import isBrowser from "@/functions/isBrowser";



export default function EmbedInfoMessage({id, setY, setX, idFriend, index, hideEmbed, idAccountOfMessage, setAccount, showEmbedProfile, setShowEmbedProfile} : any) {
  const embedRef = useRef<HTMLDivElement>(null);


  function handleAccount(event: React.MouseEvent) {
    event.preventDefault();
    if (!showEmbedProfile) {
        setY(event.clientY);
        setX(event.clientX);
        const token = isBrowser() ? sessionStorage.getItem('auth-token') : null;
        fetch(`${api}/getaccount`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: idAccountOfMessage }) 
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`Erro ${response.status}: ${text}`);
                });
            }
            return response.json();
        })
        .then(data => {
            setAccount(data.account);
            setShowEmbedProfile(true);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    }
}

  function handleDeleteMessage() {
    const token = isBrowser() ? window.sessionStorage.getItem('auth-token') : null;

    fetch(`${api}/deletemessageinchat`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, idFriend: idFriend, index: index }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`Erro ${response.status}: ${text}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        hideEmbed(null); 
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (embedRef.current && !embedRef.current.contains(event.target as Node)) {
        hideEmbed(null); 
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hideEmbed]);

  return (
    <div
    ref={embedRef}
    className="absolute left-20 z-50 bg-gray-800 text-white rounded-lg shadow-xl p-3 w-44 transition-transform transform hover:scale-105 duration-200"
  >
    {id === idAccountOfMessage ?   <button onClick={handleDeleteMessage} className="w-full text-left py-2 px-3 hover:bg-red-600 rounded-md text-sm font-medium bg-red-500 transition-colors duration-200">
      Apagar mensagem
    </button> : null }
    <button onClick={handleAccount} className="w-full text-left py-2 px-3 hover:bg-blue-600 rounded-md text-sm font-medium bg-blue-500 mt-2 transition-colors duration-200">
      Abrir perfil do usuário
    </button>
  </div>
  );
}
