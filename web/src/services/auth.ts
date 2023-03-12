import axios from "axios";
import { parseCookies } from "nookies";

type TSignInRequestData = {
  email: string;
  password: string;
};

export async function signInRequest(data: TSignInRequestData) {
  return await axios.post(process.env.NEXT_PUBLIC_API_LOGIN + "/login", data);
}

export async function recoverUserInformation() {
  const { user: user } = parseCookies();
  const parseUser = JSON.parse(user);
  return parseUser;
}
