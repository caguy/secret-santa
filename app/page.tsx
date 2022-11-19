import { NB_MAX_PARTICIPANTS } from "@/settings";
import Participants from "./Participants";

export default function Home() {
  return (
    <div>
      <h1>Organisez votre Secret Santa</h1>
      <p>
        Ajoutez jusqu&apos;à {NB_MAX_PARTICIPANTS} participants à votre Secret
        Santa, l&apos;application se charge du tirage au sort et de la
        communication aux participants en toute discrétion !
      </p>
      <div className="mt-8">
        <Participants />
      </div>
    </div>
  );
}
