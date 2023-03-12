// Chakra UI
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Td,
  Tr, useColorModeValue, useToast
} from "@chakra-ui/react";
//NextJS
import { GetServerSideProps } from "next";
// Cookies
import { parseCookies } from "nookies";
// React
import { Fragment, useEffect, useState } from "react";
// Icones
import { BsPlusSquare } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
// Layout
import Layout from "../../components/Layout";
// Componentes
import Card from "../../components/Card";
import DefaultTable from "../../components/Table";
// Cores
import { colors } from "../../utils/colors";
// Interfaces
import {
  IOrganizationRegister,
  IOrganizationRequest
} from "../../functions/organizations/data/organizationsInterfaces";
// Funções
import handleEditOrganization, {
  getOrganizations,
  handleSaveOrganization
} from "../../functions/organizations/data/organizationFunctions";

export const ORGANIZATION_INITIAL_DATA: IOrganizationRegister = {
  name: "",
};

// Componente principal
const Pessoas = () => {
  // hooks

  // Organização
  const [registerOrganization, setRegisterOrganization] =
    useState<IOrganizationRegister>(ORGANIZATION_INITIAL_DATA);
  // Requisisões das organizações
  const [organizationRequest, setOrganizationRequest] =
    useState<IOrganizationRequest>({} as IOrganizationRequest);
  // Erros do formulário
  const [formError, setFormError] = useState("");
  // Avisos
  const toast = useToast();
  // Verifica se é para editar
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleGetData = async () => {
    // Obtem as organizações
    const organization = await getOrganizations();
    setOrganizationRequest(organization);
  }

  useEffect(() => {
    handleGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const colorButtonEdit = useColorModeValue("gray.300", colors.graySky);

  return (
    <Layout props={{ title: "Pessoas" }}>
      <Card
        props={{
          title: isEdit ? "Editar pessoa" : "Cadastrar pessoa",
          maxW: 500,
        }}
      >
        <FormControl padding={5}>
          <FormLabel>Nome</FormLabel>
          <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <Input
              type="text"
              value={registerOrganization.name}
              isInvalid={formError === "registerOrganization"}
              onChange={(event) => {
                setRegisterOrganization({
                  ...registerOrganization,
                  name: event.currentTarget.value.toUpperCase(),
                });
                setFormError("");
              }}
            />
            <Button
              leftIcon={isEdit ? <FiEdit /> : <BsPlusSquare />}
              colorScheme="green"
              variant="solid"
              onClick={() => {
                isEdit
                  ? handleEditOrganization(
                    registerOrganization,
                    setOrganizationRequest,
                    setRegisterOrganization,
                    toast,
                    setFormError
                  )
                  : handleSaveOrganization(
                    registerOrganization,
                    setOrganizationRequest,
                    setRegisterOrganization,
                    toast,
                    setFormError
                  );
              }}
              ml={5}
            >
              Salvar
            </Button>
          </Box>
        </FormControl>
      </Card>
      <DefaultTable
        props={{
          tableName: "Pessoas",
          header: ["Nome"],
          count: organizationRequest.count,
        }}
      >
        {organizationRequest.organizations?.length > 0 ? (
          organizationRequest.organizations.map(
            (organization: IOrganizationRegister, index: number) => {
              return (
                <Fragment key={index}>
                  <Tr>
                    <Td width={5}>{organization.id}</Td>
                    <Td>{organization.name}</Td>
                    <Td>
                      <Button
                        leftIcon={<FiEdit />}
                        colorScheme={"gray"}
                        variant="solid"
                        bg={colorButtonEdit}
                        onClick={() => {
                          toast({
                            title:
                              "Organização " +
                              organization.name +
                              " selecionada",
                            status: "info",
                            position: "top",
                            isClosable: true,
                          });
                          setRegisterOrganization(organization),
                            setIsEdit(true);
                        }}
                      >
                        Editar
                      </Button>
                    </Td>
                  </Tr>
                </Fragment>
              );
            }
          )
        ) : (
          <Tr>
            <Td>Nenhuma pessoa</Td>
          </Tr>
        )}
      </DefaultTable>
    </Layout>
  );
};

export default Pessoas;

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
