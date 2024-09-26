import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "../auth/Login";
import Singup from "../auth/Singup";
import { userState } from "@/context";

const AuthPage = () => {
  const [paramUrl] = useSearchParams();
  const longLink = paramUrl.get("createNew");

  const navigate = useNavigate();

  const { isAuthenticate, loading } = userState();

  useEffect(() => {
    if (isAuthenticate && !loading) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [isAuthenticate, loading]);

  return (
    <>
      <div className="flex flex-col mt-20 items-center gap-10">
        <h1 className="text-5xl font-extrabold">
          {longLink ? "Hold up, please Login first" : "login/singup"}
        </h1>
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">signup</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login />
          </TabsContent>
          <TabsContent value="signup">
            <Singup />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AuthPage;
