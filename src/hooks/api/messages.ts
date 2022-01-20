import qs from "query-string";
import useSWR, { KeyedMutator } from "swr";
import { MessageType } from 'types/api/message';
import API from "API";

type useLoadMessagesType = (params: { chatId: number }) =>
  {
    messages: MessageType[] | undefined,
    mutate: KeyedMutator<Partial<MessageType>[]>,
    isLoading: boolean,
  };

export const useLoadMessages: useLoadMessagesType = (params) => {
  const { data, isValidating, mutate } = useSWR(
    `/api/messages?${qs.stringify(params)}`,
    (url: string) => API("GET", url),
  );

  return {
    mutate,
    messages: data,
    isLoading: isValidating,
  };
};
