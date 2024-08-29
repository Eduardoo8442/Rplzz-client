import { useEffect, useState } from "react"
import api from "@/api";
import { io } from "socket.io-client";
import EmbedProfile from "./shared/Profile.embed.components";

type Friend = {
  name: string;
  image: string;
  idUser: string;
};

type Account = {
    name: string;
    image: string;
    idUser: string;
  }

export default function Pading() {
   const [pading, setPading] = useState<Friend[]>([]);
   const socket = io(api);
   const idUser = window.sessionStorage.getItem('idUser'); 
   const [showEmbedProfile, setShowEmbedProfile] = useState<boolean>(false);
   const [account, setAccount] = useState<Account>();
   const [x, setX] = useState(0.0);
   const [y, setY] = useState(0.0);



   function handleContextMenu(event: React.MouseEvent) {
    event.preventDefault();
    const elementId = (event.currentTarget as HTMLElement).id;
    if(!showEmbedProfile) {
        setY(event.clientY);
        setX(event.clientX);
        const token = sessionStorage.getItem('auth-token');
        fetch(`${api}/getaccount`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: elementId }) 
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


   const handleButton = (idFriend: string, action: boolean) => {
    if(action)  {//ou seja, true = confirmado 
     const token = sessionStorage.getItem('auth-token');
    fetch(`${api}/confirmfriend`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: idUser, idFriend: idFriend }) 
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
        socket.emit('sendEmitUpdateListSideBar', { id: idUser, idFriend: idFriend});  //função pra atualizar a lista de amigos toda vez que aceitarem alguma solicitação de amizade
            updateList(); 
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

    if(!action) { //ou seja, false = recusado
        const token = sessionStorage.getItem('auth-token');
        fetch(`${api}/recusefriend`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: idUser, idFriend: idFriend }) 
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
            updateList();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    }
  
};
   function updateList() {
    const idUser = window.sessionStorage.getItem('idUser'); 
    const token = sessionStorage.getItem('auth-token');
       fetch(`${api}/listpending`, {
           method: 'POST',
           headers: {
            'Authorization': `Bearer ${token}`,
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({ id: idUser }) 
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
           const pendingData = JSON.parse(data.pending);
           if(pendingData) setPading(pendingData);
       })
       .catch(error => {
           console.error('Erro:', error);
       });
   }
   useEffect(() => {
       setPading([]);
       updateList();
       socket.on('sendFriendship', (id) => {
        if(String(idUser) === String(id)) {
            updateList();
        }
        })
       return () => {
        socket.disconnect();
      };
   }, [idUser]);
    return(
        <div>
          <div className="mt-5 ml-5">
             <p className="geist text-white mb-5">Pendente - {pading.length}</p>

             {pading.map((pending, index) => (
            <div key={index}>
            <div onContextMenu={handleContextMenu} id={`${pending.idUser}`} className="inline-flex pl-4 rounded pb-2 pt-2 pr-4 items-center mt-5 hover:bg-gray-600">
              <img className="w-8 h-8  mr-2 rounded-full" src={`${pending.image.replace(/"/g, '')}` || '/images/profile.png'}/>            
              <p className="text-white">{pending.name}</p>
              <button 
                        className="bg-green-500 geist text-white text-sm ml-5 rounded"
                        onClick={() => handleButton(pending.idUser, true)}
                    >
                         Aceitar
                         </button>
              <button 
              className="bg-red-500 geist text-white text-sm ml-2 rounded"
              onClick={() => handleButton(pending.idUser, false)}>
                Recusar
                </button>
              </div>
             
            </div>
        ))}

          </div>
          {showEmbedProfile ? <EmbedProfile x={x} y={y} set={setShowEmbedProfile} account={account} /> : null}
        </div>
    )
}