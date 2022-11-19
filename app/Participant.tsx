import { Button, Input } from "@/components";
import { IParticipant } from "@/types";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

type ParticipantProps = IParticipant & {
  noDelete?: boolean;
  onNameChange: (name: string) => void;
  onEmailChange: (email: string) => void;
  onDelete: () => void;
};

export default function Participant({
  noDelete,
  name,
  email,
  onNameChange,
  onEmailChange,
  onDelete,
}: ParticipantProps) {
  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    onNameChange(event.target.value);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    onEmailChange(event.target.value);
  };

  return (
    <article className="flex items-center bg-gray-100 p-4 my-4 rounded-xl border border-grey-50">
      <div className="flex-grow mx-2">
        <Input label="Nom" value={name} onChange={handleName} />
      </div>
      <div className="flex-grow mx-2">
        <Input label="Email" value={email} onChange={handleEmail} />
      </div>
      <div className="flex-grow-0 mx-2">
        <Button icon onClick={onDelete} disabled={noDelete}>
          <RiDeleteBin6Line />
        </Button>
      </div>
    </article>
  );
}
