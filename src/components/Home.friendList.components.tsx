import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import api from "@/api";
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

export default function FriendsList() {
   const [friends, setFriends] = useState<Friend[]>([]);
   const idUser = useSelector((state: RootState) => state.setIdUserReducer.setIdUser);
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
   useEffect(() => {
       setFriends([]);
       const idUser = window.sessionStorage.getItem('idUser'); 
       const token = sessionStorage.getItem('auth-token');
       fetch(`${api}/friendslist`, {
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
           const friendsData = data.friends ? data.friends.map((friend: Friend) => ({
               ...friend,
               image: friend.image.replace(/"/g, '')  
           })) : [];
           setFriends(friendsData);
       })
       .catch(error => {
           console.error('Erro:', error);
       });
   }, [idUser]);

    return (
        <div>
          <div className="mt-5 ml-5">
             <p className="geist text-white mb-5">Lista de amigos - {friends.length}</p>

             {friends.map((friend, index) => (
                <div key={index}>
                    <div onContextMenu={handleContextMenu} id={`${friend.idUser}`} className="inline-flex pl-4 rounded pb-2 pt-2 pr-4 items-center mt-5 hover:bg-gray-600">
                      <img className="w-8 h-8 mr-2 rounded-full" src={friend.image} alt={`Foto de ${friend.name}`} />
                      <p className="text-white">
                      {friend.name}
                      </p>
                    </div>
                </div>
             ))}

          </div>
          {showEmbedProfile ? <EmbedProfile x={x} y={y} set={setShowEmbedProfile} account={account} /> : null}
        </div>
    );
}
