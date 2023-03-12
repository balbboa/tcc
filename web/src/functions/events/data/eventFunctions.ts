import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { getAPIClient } from "../../../services/axios";
import { IApproach } from "../../../pages/eventos/espera";

const getEvents = async (
  id: number,
  context?: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  const api = getAPIClient(context);

  let event: IApproach = {} as IApproach;

  await api.get("approachs/" + id).then((request) => {
    event = request.data;
  });

  return event;
};

export default getEvents;
