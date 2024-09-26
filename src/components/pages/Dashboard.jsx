import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarLoader } from "react-spinners";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Filter, FilterIcon } from "lucide-react";
import Error from "../Error/Error";
import useFetch from "@/hooks/use-fetch";
import { userState } from "@/context";
import { getClicksForUrls } from "../db/apiClicks";
import { getUrls } from "../db/apiUrl";
import LinksCrad from "@/reUsecomponents/link-card";
import CreateLink from "@/reUsecomponents/createLink";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = userState();

  const {
    loading,
    data: urls,
    error,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);

  const {
    loading: loadingClicks,
    data: clicks,
    error: clickError,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length) {
      fnClicks();
    }
  }, [urls?.length]);

  const filterUlr = urls?.filter((url) =>
    url.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(filterUlr);

  return (
    <div className="flex flex-col gap-8">
      {(loading || loadingClicks) && (
        <BarLoader width={"100%"} color="#36d7d7" />
      )}
      <div className="grid grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-extrabold">My links</h1>
        <CreateLink />
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Filter links"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
      <div>
        {(filterUlr || []).map((url, index) => {
          return <LinksCrad {...{ url, index, fnUrls }} />;
        })}
      </div>
      {(error || clickError) && <Error message={error.message} />}
    </div>
  );
};

export default Dashboard;
