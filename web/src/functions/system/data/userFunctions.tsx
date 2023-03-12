import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { IGroupRequest } from "../../../components/Users/userForm";
import { USER_INITIAL_DATA } from "../../../pages/sistema";
import api from "../../../services/api";
import { getAPIClient } from "../../../services/axios";
import { IUserRegister, IUsersRequest } from "./userInterfaces";

export const getUsers = async () => {
  let user: IUsersRequest = {
    count: 0,
    users: [],
  } as IUsersRequest;
  const request = await api.get("users");
  user = request.data;

  return user;
};

// Grupos

export const getGroups = async (): Promise<IGroupRequest> => {
  let group: IGroupRequest = {
    count: 0,
    groups: [],
  } as IGroupRequest;

  await api.get("groups").then((request) => {
    group = request.data;
  });

  return group;
};

// Salva a organização
export const handleSaveUser = async (
  userRegister: IUserRegister,
  setUserRegister: Dispatch<SetStateAction<IUserRegister>>,
  setUserRequest: Dispatch<SetStateAction<IUsersRequest>>,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  onClose: () => void
) => {
  const api = getAPIClient();
  await api
    .post("users", userRegister)
    .then(async () => {
      // Reinicia o formulário
      setUserRegister(USER_INITIAL_DATA);
      // Atualiza a listagem de organizações
      setUserRequest(await getUsers());
      // Mensagem de sucesso
      toast({
        title: "Sucesso!",
        description: "Usuário cadastradado.",
        status: "success",
        position: "top",
        isClosable: true,
      });
      // Fecha o modal
      onClose();
    })
    .catch((error) => {
      toast({
        title: "Erro ao cadastrar o usuário",
        description: error.status,
        status: "error",
        position: "top",
        isClosable: true,
      });
    });
};

// Edita a organização
const handleEditUser = async (
  userRegister: IUserRegister,
  setUserRegister: Dispatch<SetStateAction<IUserRegister>>,
  setUserRequest: Dispatch<SetStateAction<IUsersRequest>>,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  onClose: () => void
) => {
  const api = getAPIClient();

  // Deleta o campo senha caso não tenha inserido a senha
  if (!userRegister.password) {
    delete userRegister.password;
  }

  await api
    .patch("users/" + userRegister.id, userRegister)
    .then(async () => {
      // Reinicia o formulário
      setUserRegister(USER_INITIAL_DATA);
      // Atualiza a listagem de organizações
      setUserRequest(await getUsers());
      // Mensagem de sucesso
      toast({
        title: "Sucesso!",
        description: "Usuário editado.",
        status: "success",
        position: "top",
        isClosable: true,
      });
      // Fecha o modal
      onClose();
    })
    .catch((error) => {
      toast({
        title: "Erro ao editar o usuário",
        description: error.status,
        status: "error",
        position: "top",
        isClosable: true,
      });
    });
};

export default handleEditUser;
