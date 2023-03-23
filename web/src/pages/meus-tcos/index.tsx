// Chakra UI
import { Button, Td, Tr, useColorModeValue } from "@chakra-ui/react";
// NextJS
import { GetServerSideProps } from "next";
// Cookies
import { parseCookies } from "nookies";
// React
import { Fragment, useEffect, useState } from "react";
// Icones
import { BiSearchAlt2 } from "react-icons/bi";
import { BsMap } from "react-icons/bs";
// Componentes interno
import Layout from "../../components/Layout";
import DefaultTable from "../../components/Table";
// Funções global
import { recoverUserInformation } from "../../services/auth";
import { colors } from "../../utils/colors";
// Interfaces
import { TUser } from "../contexts";
// Funções interna
import getApproachesWaiting from "../../functions/wait/data/approachFunctions";

export interface IAddres {
  id: number;
  street: string;
  district: string;
  number: string;
  city: string;
  state: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface IPeople {
  id: number;
  status: boolean;
  name: string;
  aka: string;
  motherName: string;
  sex: string;
  birthday: string;
  userId: 1;
  document: string;
  filiationsId: number;
  approachId: number;
  addressId: number;
  createdAt: string;
  updatedAt: string;
  photos: IPhotos[];
}

export interface IPhotos {
  id: number;
  url: string;
  description: string;
  type: string;
  userId: number;
  vehicleId: number | null;
  approachId: 1;
  peopleId: number | null;
  createdAt: string;
}

export interface IVehicle {
  id: number;
  plate: string;
  userId: number;
  approachId: number;
  photos: IPhotos[];
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  id: number;
  name: string;
  organizations: {
    id: number;
    name: string;
  };
}

export interface IApproach {
  id: number;
  status: boolean;
  description: string;
  latitude: string;
  longitude: string;
  userId: number;
  addressId: number;
  createdAt: string;
  updatedAt: string;
  address: IAddres;
  users: IUser;
}

export interface IApproachRequest {
  count: number;
  approachs: IApproach[];
}

export interface IApprochRequest {
  count: number;
  approachs: IApproach[];
}

interface IApproachesWaiting {
  userLogged: TUser;
  approachs: IApprochRequest;
}

// Componente interno
const ApproachesWaiting = () => {
  const [approachsList, setApproachList] = useState<IApproach[] | any>();
  const handleGetData = async () => {
    // Obtem o usuário logado
    const userLogged = await recoverUserInformation();

    // Obtem as abordagens
    const approachs = await getApproachesWaiting(userLogged.organizations.id);
    setApproachList(approachs);
  };

  useEffect(() => {
    handleGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(approachsList);

  // Cor do botão de visualizar
  const colorButtonView = useColorModeValue("gray.300", colors.graySky);
  return (
    <Layout props={{ title: "Eventos em espera" }}>
      {/* Tabela */}
      <DefaultTable
        props={{
          tableName: "Eventos em espera",
          header: ["Descrição", "Mapa", "Pessoas", "Veículos", "Cadastrado"],
          count: approachsList?.approachs.length,
        }}
      >
        {approachsList?.approachs.length > 0 ? (
          approachsList.approachs.map((approach: IApproach, index: number) => {
            return (
              <Fragment key={index}>
                <Tr>
                  <Td width={5}>{approach.id}</Td>
                  <Td>{approach.description.slice(0, 50)}...</Td>
                  <Td>
                    {/* ${approach.latitude},${approach.longitude} */}
                    <a
                      target={"_blank"}
                      href={`https://www.google.com/maps/place/${
                        approach.address?.street +
                        "+" +
                        approach.address?.district +
                        "+" +
                        approach.address?.city +
                        "+" +
                        approach.address?.state
                      }`}
                      rel="noreferrer"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      Mapa <BsMap style={{ marginLeft: 5 }} />
                    </a>
                  </Td>
                  <Td>
                    {new Date(approach.createdAt).toLocaleString("pt-BR", {
                      timeZone: "America/Recife",
                    })}
                  </Td>
                  <Td>
                    <a href={`/eventos/` + approach.id}>
                      <Button
                        leftIcon={<BiSearchAlt2 />}
                        colorScheme={"gray"}
                        variant="solid"
                        bg={colorButtonView}
                        onClick={() => ""}
                      >
                        Visualizar
                      </Button>
                    </a>
                  </Td>
                </Tr>
              </Fragment>
            );
          })
        ) : (
          <Tr>
            <Td>Nenhuma abordagem</Td>
          </Tr>
        )}
      </DefaultTable>
    </Layout>
  );
};

export default ApproachesWaiting;

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
