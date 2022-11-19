import { NB_MAX_PARTICIPANTS } from "@/settings";
import { SantaForm } from "./components";

export default function Home() {
  return (
    <>
      <h1>Organisez votre Secret Santa</h1>
      <p>
        Ajoutez jusqu&apos;à {NB_MAX_PARTICIPANTS} participants à votre Secret
        Santa, l&apos;application se charge du tirage au sort et de le
        communiquer individuellement aux participants en toute discrétion !
      </p>
      <div className="mt-8">
        <SantaForm />
      </div>
    </>
  );
}
