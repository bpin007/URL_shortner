import { useNavigate } from "react-router-dom";
import { userState } from "./context";
import { BarLoader } from "react-spinners";
import { useEffect } from "react";

function RequireAuth({ children }) {
  const navigate = useNavigate();

  const { isAuthenticate, loading } = userState();

  useEffect(() => {
    if (!isAuthenticate && loading == false) return navigate("/auth");
  }, [isAuthenticate, loading]);
  if (loading) return <BarLoader width={"100%"} color="#36d7b7" />;
  if (isAuthenticate) return children;
}

export default RequireAuth;
