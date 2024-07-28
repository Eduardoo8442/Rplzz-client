
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import InputChat from "./Chat.input.components";
import Conversation from "./Chat.conversation.components";
  export default function ChatMain() {
    const idUser = useSelector((state: RootState) => state.setIdUserReducer.setIdUser);
    return (
      <div>
        <Conversation />
        <InputChat />
      </div>
    );
  }
  