"use client";

import { useState } from "react";
import { v4 as uuid } from "uuid";
import { IParticipant } from "@/types";
import { AnimatedList, Button } from "@/components";
import Participant from "./Participant";

const newParticipant = () => ({ id: uuid(), name: "", email: "" });

export default function Participants() {
  const [participants, setParticipants] = useState<IParticipant[]>([
    newParticipant(),
  ]);

  const onAdd = () =>
    setParticipants((participants) => [...participants, newParticipant()]);

  const onDelete = (id: string) => () =>
    setParticipants((participants) =>
      participants.filter((participant) => participant.id !== id)
    );

  const onChange = (id: string, field: "name" | "email") => (value: string) =>
    setParticipants((participants) =>
      participants.map((participant) =>
        participant.id === id ? { ...participant, [field]: value } : participant
      )
    );

  return (
    <div>
      <AnimatedList>
        {participants.map((participant) => (
          <AnimatedList.Item key={participant.id}>
            <Participant
              {...participant}
              noDelete={participants.length <= 1}
              onDelete={onDelete(participant.id)}
              onEmailChange={onChange(participant.id, "email")}
              onNameChange={onChange(participant.id, "name")}
            />
          </AnimatedList.Item>
        ))}
        <AnimatedList.Item>
          <div className="mt-8">
            <Button onClick={onAdd}>Ajouter un participant</Button>
          </div>
        </AnimatedList.Item>
      </AnimatedList>
    </div>
  );
}
