import { AnimatedList, TextField } from "@/ui";
import { NB_MAX_PARTICIPANTS } from "@/settings";
import { useFieldArray, useForm } from "react-hook-form";
import { IParticipant } from "@/types";
import { emailRegex } from "@/utils";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Card,
  CardBody,
  chakra,
  IconButton,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";

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
            <Alert status="error">
              <AlertIcon />
              Le formulaire comporte des erreurs.
            </Alert>
          </AnimatedList.Item>
        )}
        <AnimatedList.Item key="generalInformations">
          <Box my={6}>
            <TextField
              label="Nom de l'évènement"
              isRequired
              isInvalid={!!errors.name}
              helperText={errors.name?.message}
              {...register("name", { required: "Obligatoire" })}
            />
          </Box>{" "}
          <Box my={6}>
            <TextField
              isMultiline
              label="Note aux participants"
              isInvalid={!!errors.notes}
              helperText={errors.notes?.message}
              placeholder="Date et lieu de l'évènenement, budget, ..."
              {...register("notes")}
            />
          </Box>
        </AnimatedList.Item>
        <Box mb={-2}>
          <Text fontWeight="bold">Participants ({nbParticipants})</Text>
        </Box>
        {participants.fields.map((participant, index) => (
          <AnimatedList.Item key={participant.id}>
            <Card as="article" my={4}>
              <CardBody display="flex" p={3}>
                <Box flexGrow={1} mx={2}>
                  <TextField
                    isRequired
                    label="Nom"
                    isInvalid={!!errors.participants?.[index]?.name}
                    helperText={errors.participants?.[index]?.name?.message}
                    {...register(`participants.${index}.name`, {
                      required: "Obligatoire",
                    })}
                  />
                </Box>
                <Box flexGrow={1} mx={2}>
                  <TextField
                    isRequired
                    label="Email"
                    isInvalid={!!errors.participants?.[index]?.email}
                    helperText={errors.participants?.[index]?.email?.message}
                    {...register(`participants.${index}.email`, {
                      required: "Obligatoire",
                      validate: (val) =>
                        !!val.match(emailRegex) || "Email invalide",
                    })}
                  />
                </Box>
                <Box flexGrow={0} mx={2} alignSelf="center">
                  <IconButton
                    aria-label="Supprimer le participant"
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onDeleteParticipant(index)}
                    disabled={!canDeleteParticipant}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardBody>
            </Card>
          </AnimatedList.Item>
        ))}
        {nbParticipants < NB_MAX_PARTICIPANTS && (
          <AnimatedList.Item key="addButton">
            <chakra.button
              type="button"
              onClick={onAddParticipant}
              width="100%"
            >
              <Card as="span">
                <CardBody as="span">
                  <AddIcon />
                  <Text as="span" fontWeight="bold" pl={4}>
                    Ajouter un participant
                  </Text>
                </CardBody>
              </Card>
            </chakra.button>
          </AnimatedList.Item>
        )}
        <AnimatedList.Item key="sendButton">
          <Box textAlign="center" my={12}>
            <Button type="submit">
              Tirer au sort et notifier les participants
            </Button>
          </Box>
        </AnimatedList.Item>
      </AnimatedList>
    </form>
  );
}
