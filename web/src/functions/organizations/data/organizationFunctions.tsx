// Chakra UI
import { ToastId, UseToastOptions } from "@chakra-ui/react";
// React
import { Dispatch, SetStateAction } from "react";
// Axios
import { getAPIClient } from "../../../services/axios";
// Dado estático
import { ORGANIZATION_INITIAL_DATA } from "../../../pages/organizacoes";
// Interfaces
import api from "../../../services/api";
import {
  IOrganizationRegister,
  IOrganizationRequest
} from "./organizationsInterfaces";

export const getOrganizations = async (
) => {

  let organization: IOrganizationRequest = {
    count: 0,
    organizations: [],
  } as IOrganizationRequest;

  await api.get("organizations").then((request) => {
    organization = request.data;
  });

  return organization;
};

// Salva a organização
export const handleSaveOrganization = async (
  registerOrganization: IOrganizationRegister,
  setOrganizationRequest: Dispatch<SetStateAction<IOrganizationRequest>>,
  setRegisterOrganization: Dispatch<SetStateAction<IOrganizationRegister>>,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  setFormError: Dispatch<SetStateAction<string>>
) => {
  const api = getAPIClient();
  if (registerOrganization.name !== "") {
    await api
      .post("organizations", registerOrganization)
      .then(async () => {
        // Reinicia o formulário
        setRegisterOrganization(ORGANIZATION_INITIAL_DATA);
        // Atualiza a listagem de organizações
        setOrganizationRequest(await getOrganizations());
        // Mensagem de sucesso
        toast({
          title: "Sucesso!",
          description: "Organização cadastrada.",
          status: "success",
          position: "top",
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Erro ao cadastrar a organização",
          description: error.status,
          status: "error",
          position: "top",
          isClosable: true,
        });
      });
  } else {
    // Informa o erro do formulário
    setFormError("registerOrganization");
    toast({
      title: "Erro ao cadastrar a organização",
      description: "Campo NOME inválido",
      status: "error",
      position: "top",
      isClosable: true,
    });
  }
};

// Edita a organização
const handleEditOrganization = async (
  registerOrganization: IOrganizationRegister,
  setOrganizationRequest: Dispatch<SetStateAction<IOrganizationRequest>>,
  setRegisterOrganization: Dispatch<SetStateAction<IOrganizationRegister>>,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  setFormError: Dispatch<SetStateAction<string>>
) => {
  const api = getAPIClient();
  if (registerOrganization.name !== "") {
    await api
      .patch("organizations/" + registerOrganization.id, registerOrganization)
      .then(async () => {
        // Reinicia o formulário
        setRegisterOrganization(ORGANIZATION_INITIAL_DATA);
        // Atualiza a listagem de organizações
        setOrganizationRequest(await getOrganizations());
        // Mensagem de sucesso
        toast({
          title: "Sucesso!",
          description: "Organização editada.",
          status: "success",
          position: "top",
          isClosable: true,
        });
      })
      .catch(() => {
        // Informa o erro vindo da API
        toast({
          title: "Ocorreu um erro na API ao organização",
          status: "error",
          position: "top",
          isClosable: true,
        });
      });
  } else {
    // Informa o erro do formulário
    setFormError("registerOrganization");
    toast({
      title: "Erro ao cadastrar a organização",
      description: "Campo NOME inválido",
      status: "error",
      position: "top",
      isClosable: true,
    });
  }
};

export default handleEditOrganization;
