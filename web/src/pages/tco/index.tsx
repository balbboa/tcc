// Chakra UI
import {
  Box,
  Button,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Input,
  ListItem,
  OrderedList,
  SimpleGrid,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
// Componentes interno
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { AiOutlineCheckSquare } from "react-icons/ai";
import Card from "../../components/Card";
import Layout from "../../components/Layout";
import getEvents from "../../functions/events/data/eventFunctions";
import { TUser } from "../contexts";
import { IApproach } from "../meus-tcos";

import submitSOAPRequest from "../../services/soap";

// Componente principal
const ApproachView = () => {
  const [event, setEvent] = useState<IApproach>({} as IApproach);

  const handleGetData = async () => {
    // Obtem o usuário logado
    const { user: user } = parseCookies();
    const parseUser = JSON.parse(user);
    const userSession: TUser = parseUser;

    // Obtem o ID passado pela URL
    const getevent: IApproach = await getEvents(userSession.id);
    setEvent(getevent);
  };
  useEffect(() => {
    handleGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout props={{ title: "Visualizando evento" }}>
      <SimpleGrid minChildWidth="420px" spacing="10px">
        <Box>
          <Card
            props={{
              title: "Dados do evento",
            }}
          >
            <Box p={3}>
              <FormLabel>Descrição</FormLabel>
              <Textarea
                value={event.description}
                onChange={() => ""}
                placeholder="Descrição do evento"
                bg={useColorModeValue("white", "gray.700")}
              />
            </Box>
          </Card>
          <Card
            props={{
              title: "Localização",
            }}
          >
            <Box p={3}>
              <SimpleGrid minChildWidth="120px" spacing="5px">
                <Box>
                  <FormLabel>Latitude</FormLabel>
                  <Input
                    type="text"
                    value={event.latitude}
                    onChange={() => ""}
                    placeholder="Descrição do evento"
                    bg={useColorModeValue("white", "gray.700")}
                  />
                </Box>
                <Box>
                  <FormLabel>Longitude</FormLabel>
                  <Input
                    type="text"
                    value={event.longitude}
                    onChange={() => ""}
                    placeholder="Descrição do evento"
                    bg={useColorModeValue("white", "gray.700")}
                  />
                </Box>
              </SimpleGrid>
            </Box>
            <Box p={3}>
              <Grid templateColumns="repeat(3, 1fr)" gap={1}>
                <GridItem colSpan={2}>
                  <FormLabel>Rua</FormLabel>
                  <Input
                    type="text"
                    value={event.address?.street}
                    onChange={() => ""}
                    placeholder="Nome da rua"
                    bg={useColorModeValue("white", "gray.700")}
                  />
                </GridItem>
                <GridItem colSpan={1}>
                  <FormLabel>Bairro</FormLabel>
                  <Input
                    type="text"
                    value={event.address?.district}
                    onChange={() => ""}
                    placeholder="Nome do evento"
                    bg={useColorModeValue("white", "gray.700")}
                  />
                </GridItem>
              </Grid>
            </Box>
            <Box p={3}>
              <SimpleGrid minChildWidth="120px" spacing="5px">
                <Box>
                  <FormLabel>Cidade</FormLabel>
                  <Input
                    type="text"
                    value={event.address?.city}
                    onChange={() => ""}
                    placeholder="Nome da cidade"
                    bg={useColorModeValue("white", "gray.700")}
                  />
                </Box>
                <Box>
                  <FormLabel>Estado</FormLabel>
                  <Input
                    type="text"
                    value={event.address?.state}
                    onChange={() => ""}
                    placeholder="Nome do estado"
                    bg={useColorModeValue("white", "gray.700")}
                  />
                </Box>
              </SimpleGrid>
            </Box>
          </Card>
          <Button
            leftIcon={<AiOutlineCheckSquare />}
            colorScheme="green"
            variant="solid"
            onClick={() => submitSOAPRequest()}
            mt={5}
          >
            Aprovar evento
          </Button>
        </Box>
        <Box>
          <Card
            props={{
              title: "Imagens do evento",
            }}
          >
            <SimpleGrid minChildWidth="200px" spacing="5px" p={3}>
              {event.photos?.map((photo, index) => {
                return (
                  <Box key={index} p={1}>
                    <a
                      href={
                        process.env.NEXT_PUBLIC_API_URL +
                        "/uploads/" +
                        photo.url
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_API_URL +
                          "/uploads/" +
                          photo.url
                        }
                        alt="Foto da abordagem"
                        key={index}
                        borderRadius={4}
                      />
                    </a>
                    <Box
                      p={2}
                      bg={"gray.700"}
                      color="white"
                      borderRadius={4}
                      mt={2}
                    >
                      {photo.description}
                    </Box>
                  </Box>
                );
              })}
            </SimpleGrid>
          </Card>
          <Card
            props={{
              title: "Pessoas vinculadas",
            }}
          >
            <Box p={2}>
              <OrderedList ml={5}>
                {event.peoples?.map((people, index) => {
                  return (
                    <a
                      href={`../pessoas/` + people.id}
                      key={index}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ListItem>{people.name}</ListItem>
                    </a>
                  );
                })}
              </OrderedList>
            </Box>
          </Card>
          <Card
            props={{
              title: "Veículos vinculados",
            }}
          >
            <Box p={2}>
              <OrderedList ml={5}>
                {event.vehicles?.map((vehicle, index) => {
                  return (
                    <a
                      href={event.id + `/veiculos/` + vehicle.id}
                      key={index}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ListItem>{vehicle.plate}</ListItem>
                    </a>
                  );
                })}
              </OrderedList>
            </Box>
          </Card>
        </Box>
      </SimpleGrid>
    </Layout>
  );
};

export default ApproachView;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { ["nextauth.token"]: token } = parseCookies(context);

  // Verifica se o usuário está logado
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
