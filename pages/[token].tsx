import { getDatabase, getModel } from "@/core/database";
import { ISantaModelType, SantaSchema } from "@/models";
import { GetSantaService } from "@/services";
import { ISanta, ISantaParticipation } from "@/types";
import { Box, Heading, Text } from "@chakra-ui/react";
import { NextPageContext } from "next";
import jwt from "jsonwebtoken";

export default function ParticipantPage({
  name,
  participantName,
  target,
  notes,
}: ISantaParticipation) {
  return (
    <>
      <Heading as="h1">Bonjour {participantName}</Heading>
      <Text my={6} as="p">
        Vous êtes invités à participer au Secret Santa{" "}
        <Text as="strong">{name}</Text> !
      </Text>
      <Text my={6} as="p">
        Le tirage au sort a désigné secrètement le destinataire du cadeau de
        chaque participant. En ce qui vous concerne, vous êtes invités à offrir
        votre cadeau à :
      </Text>
      <Box my={8}>
        <Text textAlign="center" textStyle="h2" my={2} as="p">
          {target.name}
        </Text>
        <Text textAlign="center" my={2} as="p">
          {target.email}
        </Text>
      </Box>
      <Text mt={6}>Note de l&apos;organisateur :</Text>
      <Text mt={2}>{notes}</Text>
    </>
  );
}

export async function getServerSideProps({ query }: NextPageContext) {
  const { token } = query;
  let Santa;

  try {
    const db = await getDatabase();
    Santa = getModel<ISanta, ISantaModelType>(db, "santas", SantaSchema);
    if (Santa === undefined) throw new Error();
  } catch (err) {
    throw new Error();
  }

  const GetSanta = GetSantaService(Santa);

  try {
    const decodedToken = await new Promise<{
      santaId: string;
      participantId: string;
    }>((resolve, reject) =>
      jwt.verify(token as string, process.env.JWT_SECRET, (error, decoded) => {
        if (error) reject();
        resolve(decoded as { santaId: string; participantId: string });
      })
    );
    const result = await GetSanta({
      santaId: decodedToken.santaId,
      participantId: decodedToken.participantId,
    });

    if (result.isFailure()) {
      return { notFound: true };
    } else {
      return { props: { ...result.getResponse() } };
    }
  } catch (err) {
    return { notFound: true };
  }
}
