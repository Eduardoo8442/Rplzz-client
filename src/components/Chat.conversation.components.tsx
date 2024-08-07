import { useEffect } from "react";
import { Socket } from "socket.io-client";
import api from "@/api";

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
        set(chatData);
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }

  useEffect(() => {
    getListChat();
  }, []);

  useEffect(() => {
    const handleNewMessage = (data: Message) => {
      const currentUserId = window.sessionStorage.getItem("idUser");

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
              src={message.image}
              alt={message.name}
            />
            <div className="text-white">
              <p>{message.name}:</p>
              <p className="break-all">{message.message}</p>
            </div>
          </div>
        </div>
      ))}
      <div className={chatArg.length >= 11 ? 'mt-16' : ''}></div>
    </div>
  );
}
