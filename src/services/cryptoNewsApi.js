
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "Ocp-Apim-Subscription-Key": process.env.REACT_APP_BING_NEW_API
};

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });
const baseUrl = "https://api.bing.microsoft.com/v7.0"

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&OffSet=0&count=${count}`
        ),
    }),
  }),
});
export const { useGetCryptoNewsQuery } = cryptoNewsApi;
