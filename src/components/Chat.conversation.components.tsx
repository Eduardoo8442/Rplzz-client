import { useEffect } from "react";
import { Socket } from "socket.io-client";

type Message = {
  name: string;
  image: string;
  message: string;
  idFriend: string;
  idUser: string;
};
type Chat = {
    name: string;
  image: string;
  message: string;
}

export default function Conversation({ chatArg, socket, set }: { chatArg: Chat[], socket: Socket, set: any }) {
  useEffect(() => {
    const handleNewMessage = (data: Message) => {
      const currentUserId = window.sessionStorage.getItem('idUser');
      console.log(currentUserId, data.idFriend, data.idUser)
      if (data.idFriend === currentUserId || data.idUser === currentUserId) {
        set((currentList: any) => [...currentList, data]);
      }
    };

    socket.on('emitMessage', handleNewMessage);

    return () => {
      socket.off('emitMessage', handleNewMessage);
    };
  }, [socket, set]);

  return (
    <div>
      {chatArg.map((message, index) => (
        <div key={index}>
          <div className="inline-flex justify-center">
            <img className="w-8 h-8 mr-2 rounded-full" src={message.image} alt={message.name} />
            <div>
              <p>{message.name}:</p>
              <p className="break-all">{message.message}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
