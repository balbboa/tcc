// Chakra UI
import {
  Alert, AlertDescription, AlertIcon,
  AlertTitle, Box,
  Button,
  FormLabel, Input, SimpleGrid,
  Textarea,
  useColorModeValue
} from "@chakra-ui/react";
// Componentes interno
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import { AiOutlineCheckSquare } from "react-icons/ai";
import Card from "../../components/Card";
import Layout from "../../components/Layout";
import createApproach from "../../functions/events/data/createApproachs";
import submitSOAPRequest from "../../services/soap";
import { AuthContext } from "../contexts";

export interface IApproachRegister {
  city: string;
  description: string;
  district: string;
  latitude: string,
  longitude: string,
  number: string;
  organizationsId: number;
  state: string;
  street: string;
  userId: number;
}

export const APPR_INITIAL_DATA: IApproachRegister = {
  description: "",
  street: '',
  district: '',
  number: '',
  city: '',
  state: '',
  latitude: '',
  longitude: '',
  organizationsId: 0,
  userId: 0
};

// Componente principal
const ApproachView = () => {
  const { user } = useContext(AuthContext);
  const [approach, setApproach] = useState<IApproachRegister>(APPR_INITIAL_DATA);

  // Obtem a geolocalização
  const getLocation = async () => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setApproach({
          ...approach,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        });
      })
    }

    else {
      <Alert status='error'>
        <AlertIcon />
        <AlertTitle>Ocorreu um erro! 🚨</AlertTitle>
        <AlertDescription>Você precisa permitir o acesso a localização.</AlertDescription>
      </Alert>
    }
  };

  const setUserId = async () => {
      approach.userId = user.id;
      approach.organizationsId = user.organizations.id;
  };

  const handleSaveApproach = async (newApproach: IApproachRegister) => {
    submitSOAPRequest();
    try {
      await createApproach(newApproach);
      <Alert status='success'>
        <AlertIcon />
        Sucesso! ✨, TCO cadastrado </Alert>
    } catch (error) {
      <Alert status='error'>
        <AlertIcon />
        <AlertTitle>Ocorreu um erro! 🚨</AlertTitle>
        <AlertDescription>Não foi possível realizar o cadastro do TCO.</AlertDescription>
      </Alert>
    }
  }

  useEffect(() => {
    getLocation();
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
                value={approach?.description}
                onChange={(event) => (setApproach({
                  ...approach,
                  description: event.currentTarget.value,
                }))}
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
                    readOnly
                    type="text"
                    value={approach?.latitude}
                    placeholder="Latitude"
                    bg={useColorModeValue("white", "gray.700")}
                  />
                </Box>
                <Box>
                  <FormLabel>Longitude</FormLabel>
                  <Input
                    readOnly
                    type="text"
                    value={approach?.longitude}
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
                    value={approach.street}
                    onChange={(event) => (setApproach({
                      ...approach,
                      street: event.currentTarget.value,
                    }))}
                    placeholder="Rua"
                    bg={useColorModeValue("white", "gray.700")}
                  />
                </Box>
                <Box>
                  <FormLabel>Bairro</FormLabel>
                  <Input
                    type="text"
                    value={approach.district}
                    onChange={(event) => (setApproach({
                      ...approach,
                      district: event.currentTarget.value,
                    }))}
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
                    value={approach.city}
                    onChange={(event) => (setApproach({
                      ...approach,
                      city: event.currentTarget.value,
                    }))}
                    placeholder="Cidade"
                    bg={useColorModeValue("white", "gray.700")}
                  />
                </Box>
                <Box>
                  <FormLabel>Estado</FormLabel>
                  <Input
                    type="text"
                    value={approach.state}
                    onChange={(event) => (setApproach({
                      ...approach,
                      state: event.currentTarget.value,
                    }))}
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
            onClick={() => (
              setUserId(),
              handleSaveApproach(approach)
            )}
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

