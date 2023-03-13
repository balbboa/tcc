// Chakra UI
import {
  Box,
  Button,
  FormLabel, Input, SimpleGrid,
  Textarea,
  useColorModeValue
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
    <Layout props={{ title: "Criar tco" }}>
      <SimpleGrid minChildWidth="300px" spacing="15px">
        <Box>
          <Card
            props={{
              title: "Dados do TCO",
            }}
          >
            <Box p={5}>
              <FormLabel>Descrição</FormLabel>
              <Textarea
                value={event.description}
                onChange={() => ""}
                placeholder="Descrição do TCO"
                bg={useColorModeValue("white", "gray.700")}
              />
            </Box>
          </Card>
          <Card
            props={{
              title: "Localização",
            }}
          >
            <Box p={5}>
              <SimpleGrid minChildWidth="120px" spacing="15px">
                <Box>
                  <FormLabel>Latitude</FormLabel>
                  <Input
                    type="text"
                    value={event.latitude}
                    onChange={() => ""}
                    placeholder="Latitude"
                    bg={useColorModeValue("white", "gray.700")}
                  />
                </Box>
                <Box>
                  <FormLabel>Longitude</FormLabel>
                  <Input
                    type="text"
                    value={event.longitude}
                    onChange={() => ""}
                    placeholder="Longitude"
                    bg={useColorModeValue("white", "gray.700")}
                  />
                </Box>
              </SimpleGrid>
            </Box>
            <Box p={5} pt={0}>
              <SimpleGrid minChildWidth="120px" spacing="15px">
                <Box>
                  <FormLabel>Rua</FormLabel>
                  <Input
                    type="text"
                    value={event.address?.street}
                    onChange={() => ""}
                    placeholder="Rua"
                    bg={useColorModeValue("white", "gray.700")}
                  />
                </Box>
                <Box>
                  <FormLabel>Bairro</FormLabel>
                  <Input
                    type="text"
                    value={event.address?.district}
                    onChange={() => ""}
                    placeholder="Bairro"
                    bg={useColorModeValue("white", "gray.700")}
                  />
                </Box>
              </SimpleGrid>
            </Box>
            <Box p={5} pt={0}>
              <SimpleGrid minChildWidth="120px" spacing="15px">
                <Box>
                  <FormLabel>Cidade</FormLabel>
                  <Input
                    type="text"
                    value={event.address?.city}
                    onChange={() => ""}
                    placeholder="Cidade"
                    bg={useColorModeValue("white", "gray.700")}
                  />
                </Box>
                <Box>
                  <FormLabel>Estado</FormLabel>
                  <Input
                    type="text"
                    value={event.address?.state}
                    onChange={() => ""}
                    placeholder="Estado"
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
            Criar TCO
          </Button>
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
