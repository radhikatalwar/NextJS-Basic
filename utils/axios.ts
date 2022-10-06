import axios from "axios";
import { getSession } from "next-auth/react";

const baseURL = process.env.NEXTAUTH_URL || "http://localhost:3000";

const ApiClient = () => {
  const defaultOptions = {
    baseURL,
  };

  const $axios = axios.create(defaultOptions);

  $axios.interceptors.request.use(async (request: any) => {
    const session = await getSession();
    if (session) {
      request.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }
    return request;
  });

  $axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(`error`, error);
    }
  );

  return $axios;
};

export default ApiClient();
