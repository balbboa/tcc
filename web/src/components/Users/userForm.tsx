import {
  Box,
  Checkbox,
  Divider,
  FormLabel,
  Heading,
  Input,
  ListItem,
  Select,
  SimpleGrid,
  UnorderedList,
  Text,
  Badge,
} from "@chakra-ui/react";
// React
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { TUser } from "../../pages/contexts";
import {
  IOrganizationRegister,
  IOrganizationRequest,
} from "../../functions/organizations/data/organizationsInterfaces";
import { IUserRegister } from "../../functions/system/data/userInterfaces";
// Interfaces

export interface IGroup {
  id: number;
  name: string;
}

export interface IGroupRequest {
  count: number;
  groups: IGroup[];
}

interface IUserForm {
  props: {
    group: IGroupRequest;
    groupSelect: IGroupRequest;
    organization: IOrganizationRequest;
    isEdit: boolean;
    userRegister: IUserRegister;
    setUserRegister: Dispatch<SetStateAction<IUserRegister>>;
    userLogged: TUser;
  };
}

const UserForm = ({ props }: IUserForm) => {
  // Erros do formulário
  const [formError, setFormError] = useState("");
  const [organizations, setOrganizations] = useState<IOrganizationRegister[]>(
    []
  );

  // Filtra as organizações
  const handleOrganizationfilter = () => {
    const { groups } = props.userLogged;
    const onlyMaster = groups.filter((g) => g.group.name === "MASTER");
    if (onlyMaster.length > 0) {
      setOrganizations(props.organization.organizations);
    } else {
      setOrganizations(
        props.organization.organizations.filter(
          (org) => org.id === props.userLogged.organizations.id
        )
      );
    }
  };

  useEffect(() => {
    handleOrganizationfilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {props.isEdit && (
        <Checkbox
          size="md"
          colorScheme="green"
          defaultChecked
          isChecked={props.userRegister.status}
          onChange={() => {
            props.setUserRegister({
              ...props.userRegister,
              status: !props.userRegister.status,
            });
          }}
        >
          Ativo
        </Checkbox>
      )}
      <Box mt={props.isEdit ? 5 : 0}>
        <FormLabel>Nome</FormLabel>
        <Input
          isInvalid={formError === "name"}
          value={props.userRegister.name}
          onChange={(data) => {
            props.setUserRegister({
              ...props.userRegister,
              name: data.currentTarget.value.toUpperCase(),
            });
            setFormError("");
          }}
          type="text"
          placeholder="Nome e sobrenome"
        />
      </Box>
      <SimpleGrid columns={[2, null, 2]} spacing="10px" mt={5}>
        <Box>
          <FormLabel>Email</FormLabel>
          <Input
            isInvalid={formError === "email"}
            value={props.userRegister.email}
            onChange={(data) => {
              props.setUserRegister({
                ...props.userRegister,
                email: data.currentTarget.value,
              });
              setFormError("");
            }}
            type={"email"}
            placeholder="exemplo@email.com"
          />
        </Box>
        <Box>
          <FormLabel>Matricula</FormLabel>
          <Input
            isInvalid={formError === "registration"}
            value={props.userRegister.registration}
            onChange={(data) => {
              props.setUserRegister({
                ...props.userRegister,
                registration: data.currentTarget.value.toUpperCase(),
              });
              setFormError("");
            }}
            placeholder="Matricula institucional"
          />
        </Box>
      </SimpleGrid>
      <SimpleGrid columns={[2, null, 2]} spacing="10px" mt={5}>
        <Box>
          <FormLabel>Senha</FormLabel>
          <Input
            isInvalid={formError === "password"}
            value={props.userRegister.password}
            onChange={(data) => {
              props.setUserRegister({
                ...props.userRegister,
                password: data.currentTarget.value,
              });
              setFormError("");
            }}
            type={"password"}
            placeholder="Senha forte"
          />
        </Box>
        <Box>
          <FormLabel>Repetir senha</FormLabel>
          <Input type={"password"} placeholder="Repetir senha forte" />
        </Box>
      </SimpleGrid>
      <SimpleGrid columns={[2, null, 2]} spacing="10px" mt={5}>
        <Box>
          <FormLabel>Permissões</FormLabel>
          <Select
            placeholder="Selecione"
            value={0}
            onChange={(data) => {
              const value = Number(data.currentTarget.value);
              if (value !== 0) {
                const isSelected = props.userRegister.groups.find(
                  (group) => group.group.groupId === value
                );
                if (!isSelected) {
                  props.setUserRegister({
                    ...props.userRegister,
                    groups: [
                      ...props.userRegister.groups,
                      {
                        group: {
                          groupId: value,
                          userId: props.userRegister.id || 0,
                        },
                      },
                    ],
                  });
                }
              }
            }}
          >
            {props.groupSelect.groups.map((group, index) => (
              <option value={group.id} key={index}>
                {group.name}
              </option>
            ))}
          </Select>
          <Divider />
          <Box mt={5}>
            <Heading as="h4" size="sm">
              Lista de permissões
            </Heading>
            <UnorderedList mt={2}>
              {props.userRegister.groups.map((group, index) => {
                const name =
                  props.group.groups.find(
                    (groupName) => groupName.id === group.group.groupId
                  )?.name || "";
                return (
                  <Fragment key={index}>
                    <ListItem>
                      <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <Text>{name}</Text>
                        <a
                          href="#remover"
                          onClick={() => {
                            const newGroups = props.userRegister.groups.filter(
                              (newGroup) =>
                                newGroup.group.groupId !== group.group.groupId
                            );
                            props.setUserRegister({
                              ...props.userRegister,
                              groups: newGroups,
                            });
                          }}
                        >
                          <Badge colorScheme="red">Remover</Badge>
                        </a>
                      </Box>
                    </ListItem>
                  </Fragment>
                );
              })}
              {props.userRegister.groups.length === 0 && (
                <ListItem>Sem permissão</ListItem>
              )}
            </UnorderedList>
          </Box>
        </Box>
        <Box>
          <FormLabel>Organização</FormLabel>
          <Select
            placeholder="Selecione"
            value={props.userRegister.organizationId}
            onChange={(data) => {
              props.setUserRegister({
                ...props.userRegister,
                organizationId: Number(data.currentTarget.value),
              });
            }}
          >
            {organizations.map((organization, index) => (
              <option value={organization.id} key={index}>
                {organization.name}
              </option>
            ))}
          </Select>
        </Box>
      </SimpleGrid>
    </>
  );
};

export default UserForm;
