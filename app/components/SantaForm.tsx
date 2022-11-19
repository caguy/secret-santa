"use client";

import { AnimatedList, Button, Input } from "@/ui";
import { NB_MAX_PARTICIPANTS } from "@/settings";
import { useFieldArray, useForm } from "react-hook-form";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IParticipant } from "@/types";
import { emailRegex } from "@/utils";

export interface ISantaForm {
  name: string;
  notes: string;
  participants: IParticipant[];
}

export default function SantaForm() {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitted, isValid },
  } = useForm<ISantaForm>({
    defaultValues: {
      name: "",
      notes: "",
      participants: [{ name: "", email: "" }],
    },
  });

  const participants = useFieldArray<ISantaForm>({
    control,
    name: "participants",
  });

  const nbParticipants = participants.fields.length;
  const canDeleteParticipant = participants.fields.length > 1;

  const onAddParticipant = () => participants.append({ name: "", email: "" });
  const onDeleteParticipant = (index: number) => participants.remove(index);

  const onSubmit = handleSubmit(
    (data) => console.log("ok", data),
    (error) => console.warn("error", error)
  );

  return (
    <form onSubmit={onSubmit}>
      <AnimatedList>
        {isSubmitted && !isValid && (
          <AnimatedList.Item key="alert">
            <div className="my-8 p-4 rounded-md bg-red-100 text-red-900">
              Oups, il y a des erreurs dans le formulaire. Vérifiez votre
              saisie.
            </div>
          </AnimatedList.Item>
        )}
        <AnimatedList.Item key="generalInformations">
          <div className="my-8">
            <Input
              required
              label="Nom du Secret Santa"
              {...register("name", { required: "Obligatoire" })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </div>
          <div className="my-8">
            <Input
              multiple
              label="Note aux participants"
              {...register("notes")}
              error={!!errors.notes}
              helperText={errors.notes?.message}
            />
          </div>
          <p className="font-bold -mb-2 text-red-700">
            Participants ({nbParticipants})
          </p>
        </AnimatedList.Item>
        {participants.fields.map((participant, index) => (
          <AnimatedList.Item key={participant.id}>
            <article className="flex bg-gray-100 p-4 my-4 rounded-xl border border-grey-50">
              <div className="flex-grow mx-2">
                <Input
                  label="Nom"
                  required
                  {...register(`participants.${index}.name`, {
                    required: "Obligatoire",
                  })}
                  error={!!errors.participants?.[index]?.name}
                  helperText={errors.participants?.[index]?.name?.message}
                />
              </div>
              <div className="flex-grow mx-2">
                <Input
                  label="Email"
                  required
                  {...register(`participants.${index}.email`, {
                    required: "Obligatoire",
                    validate: (val) =>
                      !!val.match(emailRegex) || "Email invalide",
                  })}
                  error={!!errors.participants?.[index]?.email}
                  helperText={errors.participants?.[index]?.email?.message}
                />
              </div>
              <div className="flex-grow-0 mx-2 self-center">
                <Button
                  type="button"
                  icon
                  onClick={() => onDeleteParticipant(index)}
                  disabled={!canDeleteParticipant}
                >
                  <RiDeleteBin6Line />
                </Button>
              </div>
            </article>
          </AnimatedList.Item>
        ))}
        {nbParticipants < NB_MAX_PARTICIPANTS && (
          <AnimatedList.Item key="addButton">
            <div className="mt-8">
              <Button type="button" onClick={onAddParticipant}>
                Ajouter un participant
              </Button>
            </div>
          </AnimatedList.Item>
        )}
        <AnimatedList.Item key="sendButton">
          <div className="py-4">
            <Button type="submit">
              Tirer au sort et notifier les participants
            </Button>
          </div>
        </AnimatedList.Item>
      </AnimatedList>
    </form>
  );
}
