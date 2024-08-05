import { useSelector } from "react-redux";
import { RootState } from "@/store";
import InputChat from "./Chat.input.components";
import Conversation from "./Chat.conversation.components";
import { io, Socket } from "socket.io-client";
import api from "@/api";
import { useEffect, useState } from "react";

type Chat = {
  name: string;
  image: string;
  message: string;
}

export default function ChatMain() {
  const socket: Socket = io(api);
  const [chat, setChat] = useState<Chat[]>([]);
  const idUser = useSelector((state: RootState) => state.setIdUserReducer.setIdUser);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div>
      <Conversation socket={socket} idFriend={idUser || ''} set={setChat} chatArg={chat} />
      <InputChat socket={socket} set={setChat} idFriend={idUser || ''} />
    </div>
  );
}
