
import { useSelector } from "react-redux";
import { RootState } from "@/store";
  export default function ChatMain() {
    const idUser = useSelector((state: RootState) => state.setIdUserReducer.setIdUser);
    return (
      <div>
        Chat: {idUser}
      </div>
    );
  }
  