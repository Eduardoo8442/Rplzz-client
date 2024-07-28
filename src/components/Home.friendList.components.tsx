import { useEffect, useState } from "react"

type Friend = {
  name: string;
  image: string;
};

export default function FriendsList() {
   const [friends, setFriends] = useState<Friend[]>([]);
   
   //desenvolvimento, apagar quando for integrar com a API
   useEffect(() => {
       setFriends([]);
       function addObject(name: string, image: string) {
        setFriends(current => [...current, { name: name, image: image}]);
       }
       addObject('Eduardo8442', '/images/profile.png');
       addObject('RafaelStonks', '/images/profile.png');
   }, []);
    return(
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
    )
}