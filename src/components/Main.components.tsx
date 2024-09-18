import TitleMain from "./Main.title.components";
import NavBar from "./shared/Main.navbar.components";
import EmbedDetails from "./Main.embedDetails.components";
import Statistic from "./Main.statistic.components";
import TalkToUse from "./Main.talktous.components";
export default function MainComponent() {
    return (
           <div>
            <NavBar />
            <TitleMain />
            <Statistic />
            <EmbedDetails />
            <TalkToUse />
           </div>
    );
}
