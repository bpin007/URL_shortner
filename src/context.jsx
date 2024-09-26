import { createContext, useContext, useEffect } from "react";
import { getCurrentUser } from "./components/db/apiAuth";
import useFetch from "./hooks/use-fetch";

const UrlContext = createContext();

const UrlProvider = ({ children }) => {
  const {
    data: user,
    loading,
    error,
    fn: fetchUser,
  } = useFetch(getCurrentUser);

  const isAuthenticate = user?.role === "authenticated";

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UrlContext.Provider
      value={{ user, isAuthenticate, loading, error, fetchUser }}
    >
      {children}
    </UrlContext.Provider>
  );
};

export const userState = () => {
  return useContext(UrlContext);
};

export default UrlProvider;
