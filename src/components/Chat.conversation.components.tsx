'use client';
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import api from "@/api";
import ImageFocus from "./Chat.imageFocus.components";
import isBrowser from "@/functions/isBrowser";
import NoChat from "./shared/Chat.noChat.components";
type Message = {
  name: string;
  imageorvideo: ImageVideo;
  message: string;
  idFriend: string;
  idUser: string;
};

type ImageVideo = {
  url: string | null;
  type: boolean; // false = imagem / true = video
};

type Chat = {
  name: string;
  image: string;
  message: string;
  imageorvideo?: ImageVideo; 
  date: string;
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
    const idUser = isBrowser() ? window.sessionStorage.getItem("idUser") : null;
    const token = isBrowser() ? window.sessionStorage.getItem('auth-token') : null;

    fetch(`${api}/getchatlist`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
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
        console.log(chatData);
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
      const currentUserId = isBrowser() ? window.sessionStorage.getItem("idUser") : null;
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
      {chatArg.length === 0 ? <NoChat /> : (
        <div>
      {chatArg.map((message, index) => (
        <div key={index}>
          <div className="inline-flex justify-center">
            <img
              className="w-8 h-8 mr-2 rounded-full"
              src={message.image.replace(/"/g, "")}
              alt={message.name}
            />
            <div className="text-white">
              <div className="flex justify-center items-center">
              <p className="mr-2">{message.name}</p>
              <p className="text-gray-500 text-sm">{message.date}</p> 
              </div>
              {message.message ? <p className="break-all">{message.message}</p> : null}
              {message.imageorvideo?.url && message.imageorvideo.type ? (
                <div>
                  <video width="400" controls>
                    <source src={message.imageorvideo.url} type="video/mp4" />
                    Seu navegador não suporta vídeo.
                  </video>
                </div>
              ) : null}
              {message.imageorvideo?.url && !message.imageorvideo.type ? (
                <div>
                  <img
                    onClick={handleImageFocus}
                    className="max-w-80 max-h-64 cursor-pointer hover:brightness-50"
                    src={message.imageorvideo.url}
                    alt={message.name}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ))}
      <div className={chatArg.length >= 11 ? "mt-16" : ""}></div>
      {imageFocus ? <ImageFocus func={setImageFocus} srcImage={imageFocus} /> : null}
        </div>
      )}
    </div>
  );
}
