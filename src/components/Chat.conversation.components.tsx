import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import api from "@/api";
import ImageFocus from "./Chat.imageFocus.components";
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
  imageMessage: string;
};

export default function Conversation({
  chatArg,
  socket,
  set,
  idFriend,
}: {
  chatArg: Chat[];
  socket: Socket;
  set: any;
  idFriend: string;
}) {

  const [imageFocus, setImageFocus] = useState<null | string>(null);


  function getListChat(): void {
    set([]);
    const idUser = window.sessionStorage.getItem("idUser");
    fetch(`${api}/getchatlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: idUser, idFriend: idFriend }),
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
        const chatData = data.chat ? data.chat : [];
        console.log(chatData)
        set(chatData);
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }
  function handleImageFocus(event: React.MouseEvent<HTMLImageElement>) {
    const target = event.target as HTMLImageElement;
    if (!imageFocus) {
      setImageFocus(target.src);
    }
  }
  useEffect(() => {
    getListChat();
  }, []);

  useEffect(() => {
    const handleNewMessage = (data: Message) => {
      const currentUserId = window.sessionStorage.getItem("idUser");
      console.log(data)
      if (data.idFriend === currentUserId || data.idUser === currentUserId) {
        set((currentList: any) => [...currentList, data]);
      }
    };

    socket.on("emitMessage", handleNewMessage);

    return () => {
      socket.off("emitMessage", handleNewMessage);
    };
  }, [set, socket]);

  return (
    <div>
      {chatArg.map((message, index) => (
        <div key={index}>
          <div className="inline-flex justify-center">
            <img
              className="w-8 h-8 mr-2 rounded-full"
              src={message.image.replace(/"/g, '')}
              alt={message.name}
            />
            <div className="text-white">
              <p>{message.name}:</p>
             
             {message.message ?  <p className="break-all">{message.message}</p> : null }
             
              {message.imageMessage ? (
                <div>
                    <img
                    onClick={handleImageFocus}
                    className="max-w-80 max-h-64 cursor-pointer hover:brightness-50"
                    src={message.imageMessage}
                    alt={message.name}
                   />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ))}
      <div className={chatArg.length >= 11 ? 'mt-16' : ''}></div>
      {imageFocus ? <ImageFocus func={setImageFocus} srcImage={imageFocus}/> : null}
    </div>
  );
}
