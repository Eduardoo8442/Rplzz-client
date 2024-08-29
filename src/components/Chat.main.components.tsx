import { useSelector } from "react-redux";
import { RootState } from "@/store";
import InputChat from "./Chat.input.components";
import Conversation from "./Chat.conversation.components";
import { io, Socket } from "socket.io-client";
import api from "@/api";
import { useEffect, useState } from "react";
import ErrorSendImageVideo from "./Chat.embedErrorSendImageVideo.components";
type Chat = {
  name: string;
  image: string;
  message: string;
  imageMessage: string;
}

export default function ChatMain() {
  const socket: Socket = io(api);
  const [chat, setChat] = useState<Chat[]>([]);
  const idUser = useSelector((state: RootState) => state.setIdUserReducer.setIdUser);
  const [failure, setFailure] = useState<boolean>(false);
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div className="relative">
      <Conversation socket={socket} idFriend={idUser || ''} set={setChat} chatArg={chat} />
      <InputChat socket={socket} setFailure={setFailure} set={setChat} idFriend={idUser || ''} />
      {failure ? <ErrorSendImageVideo set={setFailure} /> : null }
    </div>
  );
}
