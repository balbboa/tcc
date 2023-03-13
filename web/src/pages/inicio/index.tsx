// Next
import {
  Box,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
// Cookies
import { parseCookies } from "nookies";
import { ReactNode, useContext, useEffect, useState } from "react";
// Layout
import { FaUser } from "react-icons/fa";
import Layout from "../../components/Layout";
import getApproachesWaiting from "../../functions/wait/data/approachFunctions";
import { recoverUserInformation } from "../../services/auth";
import { colors } from "../../utils/colors";
import { AuthContext } from "../contexts";
import { IApproach } from "../meus-tcos";

interface StatsCardProps {
  title1: string;
  title2: string;
  username: string;
  events: string;
  icon: ReactNode;
}

const Home = () => {
  const { user } = useContext(AuthContext);

  const [approachsList, setApproachList] = useState<IApproach[] | any>();

  const handleMessage = async () => {
    // Obtem o usuário logado
    const userLogged = await recoverUserInformation();

    // Obtem as abordagens
    const approachs = await getApproachesWaiting(userLogged.organizations.id);
    setApproachList(approachs);
  };

  useEffect(() => {
    handleMessage();
  }, []);

  const StatsCard = (props: StatsCardProps) => {
    const { title1, title2, username, events, icon } = props;
    return (
      <Stat
        m={"20"}
        px={{ base: 2, md: 10 }}
        py={"10"}
        shadow={"lg"}
        bg={useColorModeValue("white", colors.grayWolf)}
        rounded={"lg"}
      >
        <Flex justifyContent={"space-between"}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={"medium"}>{title1}</StatLabel>
            <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
              {username}
            </StatNumber>
          </Box>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={"medium"}>{title2}</StatLabel>
            <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
              {events}
            </StatNumber>
          </Box>
          <Box
            my={"auto"}
            color={useColorModeValue("gray.800", "gray.200")}
            alignContent={"center"}
          >
            {icon}
          </Box>
        </Flex>
      </Stat>
    );
  };

  return (
    <Layout props={{ title: "Início" }}>
      Bem-vindo ao sistema,
      <StatsCard
        title1={"Nome"}
        title2={"Eventos pendentes"}
        username={user.name}
        events={approachsList?.count}
        icon={<FaUser size={"3em"} />}
      />
    </Layout>
  );
};

export default Home;

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
