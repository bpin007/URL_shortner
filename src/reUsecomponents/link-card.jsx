import { deletUrl } from "@/components/db/apiUrl";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { Copy, Delete, Download, Trash } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const LinksCrad = ({ url, fnUrls }) => {
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

  const { loading, fn: deleteUrl } = useFetch(deletUrl, url?.id);
  console.log(url?.qr);

  return (
    <div>
      {" "}
      <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">
        <img
          src={url?.qr}
          className="h-32 object-contain ring ring-blue-500 self-start "
          alt="qr"
        />
        <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
          <span className="text-3xl font-extrabold hover:underline cursor-pointer">
            {url?.title}
          </span>
          <span className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer">
            http://localhost:5173/
            {url?.custom_url ? url?.custom_url : url.short_url}
          </span>
          <span className="flex items-center gap-1 hover:underline cursor-pointer">
            {url?.original_url}
          </span>
          <span className="flex items-end font-extralight text-sm flex-1">
            {new Date(url?.created_at).toLocaleString()}
          </span>
        </Link>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() =>
              navigator.clipboard.writeText(
                ` http://localhost:5173/${url?.short_url}`
              )
            }
          >
            <Copy />
          </Button>
          <Button variant="ghost" onClick={downloadUrl}>
            <Download />
          </Button>
          <Button
            variant="ghost"
            onClick={() =>
              deleteUrl().then(() => {
                fnUrls();
              })
            }
          >
            {loading ? <BeatLoader size={5} color="white" /> : <Trash />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LinksCrad;
