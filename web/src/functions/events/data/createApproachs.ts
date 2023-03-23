import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { IApproach } from "../../../pages/meus-tcos";
import { IApproachRegister } from "../../../pages/tco";
import { getAPIClient } from "../../../services/axios";

const createApproach = async (
  data: IApproachRegister,
  context?: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const api = getAPIClient(context);
  let event: IApproach = {} as IApproach;

  await api.post("approachs/", data).then((request) => {
    event = request.data;
  });

  return event;
};

export default createApproach;
