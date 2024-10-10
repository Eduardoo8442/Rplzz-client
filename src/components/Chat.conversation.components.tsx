  'use client';
  import { useEffect, useState } from "react";
  import { Socket } from "socket.io-client";
  import api from "@/api";
  import ImageFocus from "./Chat.imageFocus.components";
  import isBrowser from "@/functions/isBrowser";
  import NoChat from "./shared/Chat.noChat.components";
  import EmbedInfoMessage from "./Chat.embedInfoMessage.components";
  import EmbedProfile from "./shared/Profile.embed.components";
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
    idUser: string;
  };

  type MessageInfo = {
    id: string;
    index: string;
  }

  type Account = {
    name: string;
    image: string;
    idUser: string;
  }
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
    const [idMessageInfo, setIdMessageInfo] = useState<MessageInfo | null>(null);
     const [showEmbedProfile, setShowEmbedProfile] = useState<boolean>(false); //código do embedinfomessage, para mostrar a conta
     const [account, setAccount] = useState<Account>(); //código do embedinfomessage, para mostrar a conta
     const [x, setX] = useState(0.0);  //código do embedinfomessage, para mostrar a conta
     const [y, setY] = useState(0.0);  //código do embedinfomessage, para mostrar a conta
    const idUser = isBrowser() ? window.sessionStorage.getItem("idUser") : null;
    function getListChat(): void {
      set([]);
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
    function handleDeleteMessage(id: string, idFriend: string, index: string) {
     if(idUser === id || idUser === idFriend) {
      set((currentList: any) => {
        const updatedList = [...currentList];
        updatedList.splice(Number(index), 1);
        return updatedList; 
      });
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
        socket.on('emitDeleteMessage', handleDeleteMessage);
      return () => {
        socket.off("emitMessage", handleNewMessage);
        socket.off('emitDeleteMessage', handleDeleteMessage);
      };
    }, [set, socket]);
    function handleLeftClick(event: React.MouseEvent<HTMLDivElement>) {
      event.preventDefault();
      const clickedElement = event.currentTarget; 
      const className = clickedElement.className; 
    
      const regex = /id-(\d+)-(\d+)/; //pegar esse formato do id que fiz com regex
      const match = className.match(regex);
    
      if (match) {
        const idDynamicUser = match[1];
        const index = match[2];
          setIdMessageInfo({
            id: idDynamicUser,
            index: index,
          });
      } else {
        console.log("div não segue o padrão esperado.");
      }
    }
    return (
      <div>
        {chatArg.length === 0 ? <NoChat /> : (
          <div>
        {chatArg.map((message, index) => (
          <div key={index}>
            <div onClick={handleLeftClick} className={`relative inline-flex justify-center id-${message.idUser}-${index}`}>
              {idMessageInfo && idMessageInfo.id === message.idUser && idMessageInfo.index === String(index) ? <EmbedInfoMessage setY={setY} setX={setX} setAccount={setAccount} showEmbedProfile={showEmbedProfile} setShowEmbedProfile={setShowEmbedProfile} idAccountOfMessage={idMessageInfo.id} id={idUser} idFriend={idFriend} index={index} hideEmbed={setIdMessageInfo} /> : null }
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
          {showEmbedProfile ? <EmbedProfile x={x} y={y} set={setShowEmbedProfile} account={account} /> : null}
      </div>
    );
  }
