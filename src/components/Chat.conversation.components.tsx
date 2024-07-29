import { useEffect, useState } from "react"

type Message = {
    name: string;
    image: string;
    message: string;
  };

export default function Conversation() {
    const [chat, setChat] = useState<Message[]>([]);
    //desenvolvimento, apagar quando for integrar com a API
   useEffect(() => {
    setChat([]);
    function addObject(name: string, image: string, message: string) {
     setChat(current => [...current, { name: name, image: image, message: message }]);
    }
    addObject('Eduardo8442', '/images/profile.png', 'eae');
    addObject('RafaelStonks', '/images/profile.png', 'oi');

}, []);
    return(
        <div>
           {chat.map((message, index) => (
            <div key={index}>
              <div className="inline-flex justify-center">
                  <img className="w-8 h-8 mr-2 rounded-full" src={message.image} />
                           <div>
                     <p>{message.name}:</p>
                   <p className="break-all">{message.message}</p>
              </div>
           </div>

             
            </div>
        ))}

        </div>
    )
}