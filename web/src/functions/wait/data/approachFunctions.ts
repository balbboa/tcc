// NextJS
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { IApproachRequest } from "../../../pages/meus-tcos";
// AXIOS
import { getAPIClient } from "../../../services/axios";

const getApproachesWaiting = async (
  organizationId: number,
  context?: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const api = getAPIClient(context);
  let approach: IApproachRequest = {
    count: 0,
    approachs: [],
  } as IApproachRequest;
  await api
    .get(`approachs?status=false&organizationId=${organizationId}`)
    .then((request) => {
      approach = request.data;
    });

  return approach;
};

export default getApproachesWaiting;
