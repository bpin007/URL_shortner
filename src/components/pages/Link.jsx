import useFetch from "@/hooks/use-fetch";
import React, { useEffect } from "react";
import { deletUrl, getUrl } from "../db/apiUrl";
import { getClicksForUrl, getClicksForUrls } from "../db/apiClicks";
import { BarLoader, BeatLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";
import { userState } from "@/context";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import LocationStat from "@/reUsecomponents/location-stat";
import DeviceStat from "@/reUsecomponents/device-stat";

const Link = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = userState();

  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, { id, user_id: user?.id });

  const {
    loading: loadingStat,
    data: stats,
    fn: fnState,
  } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deletUrl, id);

  useEffect(() => {
    fn();
    fnState();
  }, []);

  if (error) {
    navigate("/dashboard");
  }

  let link = "";

  if (url) {
    link = url?.custom_url ? url?.custom_url : url?.short_url;
  }

  const downloadUrl = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;
    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.append(anchor);

    anchor.click();

    document.body.removeChild(anchor);
  };

  const { loading: deleteLoading, fn: deleteUrl } = useFetch(deletUrl, url?.id);
  console.log(url?.qr);

  return (
    <>
      {(loading || loadingStat) && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
      <div className="flex flex-col gap-8 sm:flex-row justify-between">
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className="text-6xl font-extrabold hover:underline cursor-pointer">
            {url?.title}
          </span>
          <a
            href={`http://localhost:5173/${link}`}
            target="_blank"
            className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer"
          >
            http://localhost:5173/{link}
          </a>
          <a
            href={url?.original_url}
            target="_blank"
            className="flex items-center gap-1 hover:underline cursor-pointer"
          >
            <LinkIcon className="p-1" />
            {url?.original_url}
          </a>
          <span className="flex items-end font-extralight text-sm">
            {new Date(url?.created_at).toLocaleString()}
          </span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() =>
                navigator.clipboard.writeText(
                  `http://localhost:5173/${url?.short_url}`
                )
              }
            >
              <Copy />
            </Button>
            <Button variant="ghost" onClick={downloadUrl}>
              <Download />
            </Button>
            <Button variant="ghost" onClick={() => deleteUrl()}>
              {loading ? <BeatLoader size={5} color="white" /> : <Trash />}
            </Button>
          </div>
          <img
            src={url?.qr}
            className="w-full self-center sm:self-start ring ring-blue-500 p-1 object-contain"
            alt="qr code"
          />
        </div>

        <Card className="sm:w-3/5">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold">Stats</CardTitle>
          </CardHeader>
          {stats && stats.length ? (
            <CardContent className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{stats?.length}</p>
                </CardContent>
              </Card>
              <CardTitle>Location Data</CardTitle>
              {<LocationStat stats={stats} />}
              <CardTitle>Device Info</CardTitle>
              {<DeviceStat stats={stats} />}
            </CardContent>
          ) : (
            <CardContent>
              {loadingStat === false ? "No Statics Yet" : "loading statics"}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default Link;
