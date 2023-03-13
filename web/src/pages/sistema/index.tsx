import {
  Badge, Box,
  Button, Heading, ListItem, Popover, PopoverArrow, PopoverBody, PopoverCloseButton,
  PopoverContent, PopoverHeader, PopoverTrigger, Spinner, Td, Text, Tr, UnorderedList, useColorModeValue, useDisclosure, useToast
} from "@chakra-ui/react";
// React
import { Fragment, ReactNode, useEffect, useState } from "react";
// Next
import { GetServerSideProps } from "next";
// Icones
import { FiEdit } from "react-icons/fi";
// Layout
import Layout from "../../components/Layout";
import DefaultModal from "../../components/Modal";
import DefaultTable from "../../components/Table";
// Cores
import { colors } from "../../utils/colors";
// Cookies
import { parseCookies } from "nookies";
import { BsPlusSquare } from "react-icons/bs";
// Formulário
import UserForm, {
  IGroup,
  IGroupRequest
} from "../../components/Users/userForm";
// Interfaces
import { getOrganizations } from "../../functions/organizations/data/organizationFunctions";
import {
  IGroupsRegister, IUserRegister, IUserRequest, IUsersRequest
} from "../../functions/system/data/userInterfaces";
// Funções
import handleEditUser, {
  getGroups,
  getUsers, handleSaveUser
} from "../../functions/system/data/userFunctions";

import { IOrganizationRequest } from "../../functions/organizations/data/organizationsInterfaces";
import { TUser } from "../contexts";

export const USER_INITIAL_DATA: IUserRegister = {
  name: "",
  email: "",
  password: "",
  registration: "",
  organizationId: 0,
  status: true,
  groups: [],
};

interface StatsCardProps {
  title: string;
  stat: string;
  icon: ReactNode;
}

const System = () => {
  // hooks
  // Usuários
  const [userRegister, setUserRegister] =
    useState<IUserRegister>(USER_INITIAL_DATA);
  // Usuário logado
  const [userLogged, setUserLogged] = useState<TUser>({} as TUser);
  // grupos
  const [group, setGroup] = useState<IGroupRequest>({} as IGroupRequest);
  // Requisisões dos usuários
  const [usersRequest, setUsersRequest] = useState<IUsersRequest>(
    {} as IUsersRequest
  );
  // Organizações
  const [organization, setOrganization] = useState<IOrganizationRequest>(
    {} as IOrganizationRequest
  );
  // Avisos
  const toast = useToast();
  // Verifica se é para editar
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Cor do botão de editar
  const colorButtonEdit = useColorModeValue("gray.300", colors.graySky);
  // Grupos disponiveis
  const [groupSelect, setGroupSelect] = useState<IGroupRequest>(
    {} as IGroupRequest
  );
  // Loading
  const [loading, setLoading] = useState<boolean>(true);

  // Funções
  const handleGetData = async () => {
    setLoading(true);

    // Obtem o usuário logado
    const { user: user } = parseCookies();
    const parseUser = JSON.parse(user);
    setUserLogged(parseUser);
    const userSession: TUser = parseUser;
    // Obtem as organizações
    const organization = await getOrganizations();
    setOrganization(organization);
    // Obtem os grupos
    const group: IGroupRequest = await getGroups();
    setGroup(group);

    // Obtem os usuários
    const userData = await getUsers();
    setUsersRequest(userData);

    // verifica os grupos que o usuário pode vincular a outros usuários
    // Verifica se é somente gestor
    const { groups } = userSession;
    if (userSession.groups.length >= 1) {
      const onlyManager = groups.find((data) => data.group.name === "GESTOR");
      if (onlyManager) {
        // Adiciona apenas o ostensivo como vinculo
        const query = group.groups.find((data) => data.name === "OSTENSIVO");
        if (query) {
          const offensive: IGroup = {
            id: query.id,
            name: query.name,
          };
          setGroupSelect({
            ...groupSelect,
            count: 1,
            groups: [offensive],
          });
        }
      } else {
        const query = group.groups
          .filter((data) => data.name !== "MASTER")
          .filter((data) => data.name !== "ADMINISTRADOR");
        setGroupSelect({
          count: query.length,
          groups: query,
        });
      }
    }
    // Se o usuário for master, cadastra tudo
    if (groups.find((data) => data.group.name === "MASTER")) {
      setGroupSelect(group);
      // Se o usuário for administrador, acessa tudo
    } else if (groups.find((data) => data.group.name === "ADMINISTRADOR")) {
      const query = group.groups.filter((data) => data.name !== "MASTER");
      setGroupSelect({
        count: query.length,
        groups: query,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // JSX
  return (
    <Layout props={{ title: "Sistema" }}>
      {loading ? (
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <Text mt={2}>Carregando...</Text>
        </Box>
      ) : (
        <>
          {/* Cabeçalho */}
          <Heading
            // eslint-disable-next-line react-hooks/rules-of-hooks
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
            mt={5}
          >
            Usuários do Sistema
          </Heading>
          
          {/* Formulário */}
          <DefaultModal
            props={{
              isEdit,
              isOpen,
              onClose: () => {
                setIsEdit(false), setUserRegister(USER_INITIAL_DATA), onClose();
              },
              onOpen,
              name: "Cadastrar Usuário",
              action: () => {
                isEdit
                  ? handleEditUser(
                      userRegister,
                      setUserRegister,
                      setUsersRequest,
                      toast,
                      onClose
                    )
                  : handleSaveUser(
                      userRegister,
                      setUserRegister,
                      setUsersRequest,
                      toast,
                      onClose
                    );
              },
            }}
          >
            <UserForm
              props={{
                group,
                groupSelect,
                organization,
                isEdit,
                setUserRegister,
                userRegister,
                userLogged,
              }}
            />
          </DefaultModal>
          <Button
            leftIcon={isEdit ? <FiEdit /> : <BsPlusSquare />}
            colorScheme="green"
            variant="solid"
            onClick={() => {
              setUserRegister(USER_INITIAL_DATA);
              onOpen();
            }}
            mt={5}
          >
            Cadastrar usuário
          </Button>
          {/* Tabela */}
          <DefaultTable
            props={{
              tableName: "Usuários cadastrados",
              header: [
                "Nome",
                "Matricula",
                "Permissôes",
                "Status",
                "Cadastrado",
              ],
              count: usersRequest.count,
            }}
          >
            {usersRequest.users.length > 0 ? (
              usersRequest.users.map((user: IUserRequest, index: number) => {
                return (
                  <Fragment key={index}>
                    <Tr>
                      <Td width={5}>{user.id}</Td>
                      <Td>{user.name}</Td>
                      <Td>{user.organizations.name}</Td>
                      <Td>
                        <Popover>
                          <PopoverTrigger>
                            <Button
                              colorScheme={"gray"}
                              variant="solid"
                              bg={colorButtonEdit}
                            >
                              Visualizar
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent padding={0}>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>
                              Permissões deste usuário
                            </PopoverHeader>
                            <PopoverBody>
                              <UnorderedList styleType={"none"} ml={-3}>
                                {user.groups.map((data, index) => {
                                  const name = data.group.name;
                                  let colorName = "gray";
                                  if (name === "ADMINISTRADOR") {
                                    colorName = "red";
                                  } else if (name === "GESTOR") {
                                    colorName = "yellow";
                                  } else if (name === "COORDENADOR") {
                                    colorName = "purple";
                                  } else if (name === "MASTER") {
                                    colorName = "blue";
                                  }
                                  // Retorno
                                  return (
                                    <Fragment key={index}>
                                      <ListItem>
                                        <Badge ml={2} colorScheme={colorName}>
                                          {name}
                                        </Badge>
                                      </ListItem>
                                    </Fragment>
                                  );
                                })}
                              </UnorderedList>
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </Td>
                      <Td>
                        <Badge
                          ml="1"
                          fontSize="0.8em"
                          colorScheme={user.status ? "green" : "red"}
                        >
                          {user.status ? "Ativo" : "Desativado"}
                        </Badge>
                      </Td>
                      <Td>{user.createdAt}</Td>

                      <Td>
                        <Button
                          leftIcon={<FiEdit />}
                          colorScheme={"gray"}
                          variant="solid"
                          bg={colorButtonEdit}
                          onClick={() => {
                            // Converte a requisição para edição dos grupos
                            const groupsTMP: IGroupsRegister[] = [];
                            for (let i = 0; i < user.groups.length; i++) {
                              groupsTMP.push({
                                group: {
                                  userId: user.id,
                                  groupId: user.groups[i].group.id,
                                },
                              });
                            }
                            setIsEdit(true);
                            setUserRegister({
                              email: user.email,
                              name: user.name,
                              organizationId: user.organizationId,
                              groups: groupsTMP,
                              id: user.id,
                              registration: user.registration,
                              status: user.status,
                            });
                            toast({
                              title: "Usuário " + user.name + " selecionado",
                              status: "info",
                              position: "top",
                              isClosable: true,
                            });
                            onOpen();
                          }}
                        >
                          Editar
                        </Button>
                      </Td>
                    </Tr>
                  </Fragment>
                );
              })
            ) : (
              <Tr>
                <Td>Nenhuma organização</Td>
              </Tr>
            )}
          </DefaultTable>
        </>
      )}
    </Layout>
  );
};

export default System;

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
