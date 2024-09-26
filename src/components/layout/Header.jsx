import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LinkIcon, LucideLogOut } from "lucide-react";
import { userState } from "@/context";
import { logOut } from "../db/apiAuth";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";

const Header = () => {
  const navigate = useNavigate();
  const { user, fetchUser } = userState();
  console.log(user?.user_metadata?.profile_pic);

  const { loading, fn: logoutFn } = useFetch(logOut);

  return (
    <nav className="py-4 flex justify-between items-center ">
      <Link to="/">
        <img src={logo} className="h-16" alt="trimer_logo" />
      </Link>
      <div>
        {!user ? (
          <Button onClick={() => navigate("/auth")}>Login</Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
              <Avatar>
                <AvatarImage
                  src={user.user_metadata?.profile_pic}
                  className="object-contain"
                />
                <AvatarFallback>BK</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user.user_metadata?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <LinkIcon className="mr-2 h-4 w-4 flex" />
                <Link to="/dashboard">My Links</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-400 hover:!text-red-400 cursor-pointer">
                <LucideLogOut className="mr-2 w-4 h-4" />{" "}
                <span
                  onClick={() => {
                    logoutFn().then(() => {
                      fetchUser();
                      navigate("/auth");
                    });
                  }}
                >
                  Logout
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7d7" />}
    </nav>
  );
};

export default Header;
