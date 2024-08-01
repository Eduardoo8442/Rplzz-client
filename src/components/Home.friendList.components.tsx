import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import api from "@/api";

type Friend = {
  name: string;
  image: string;
};

export default function FriendsList() {
   const [friends, setFriends] = useState<Friend[]>([]);
   const idUser = useSelector((state: RootState) => state.setIdUserReducer.setIdUser);

   useEffect(() => {
       setFriends([]);
       const idUser = window.localStorage.getItem('idUser'); 
       fetch(`${api}/friendslist`, {
           method: 'POST',
           headers: {
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
           console.log('Dados recebidos:', data);
           const friendsData = JSON.parse(data.friends);
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
            <div className="inline-flex pl-4 rounded pb-2 pt-2 pr-4 items-center mt-5 hover:bg-gray-600">
              <img className="w-8 h-8  mr-2 rounded-full" src={friend.image}/>
              {friend.name}
              </div>
             
            </div>
        ))}

          </div>
        </div>
    );
}
