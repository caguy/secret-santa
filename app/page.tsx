import Participants from "./Participants";

export default function Home() {
  return (
    <div>
      <h1>Organisez votre Secret Santa</h1>
      <p>Qui participe ?</p>
      <div className="mt-8">
        <Participants />
      </div>
    </div>
  );
}
