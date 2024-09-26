import useFetch from "@/hooks/use-fetch";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getLongUrl, storeClicks } from "../db/apiUrl";
import { getClicksForUrls } from "../db/apiClicks";
import { BarLoader } from "react-spinners";

const RedirectLink = () => {
  const { id } = useParams();
  console.log(id);
  const { loading, data, fn: fnGetUrl } = useFetch(getLongUrl, id);

  console.log(data);

  const {
    loading: clickLoading,
    data: clickData,
    fn: fnClick,
  } = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  });

  useEffect(() => {
    fnGetUrl();
  }, []);

  useEffect(() => {
    if (data && !loading) {
      fnClick();
    }
  }, [loading, data]);

  if (loading || clickLoading)
    return (
      <>
        <BarLoader />
        <br />
        <p>Redirecting.......</p>
      </>
    );

  return null;
};

export default RedirectLink;
