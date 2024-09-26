import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import banner from "../../assets/banner.jpeg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");

  const navigate = useNavigate();

  const handelSubmit = () => {
    if (longUrl) {
      navigate(`/auth?createNew=${longUrl}`);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        <h2>The only URL Shortner you'll ever need!👇</h2>

        <form
          className="mt-10 flex flex-col md:flex-row justify-center items-center gap-2"
          onSubmit={handelSubmit}
        >
          <Input
            type="url"
            placeholder="Enter your loooong URL"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="h-full flex-1 p-4 "
          />
          <Button className="h-full" type="submit" variant="destructive">
            Shortner
          </Button>
        </form>
        <img src={banner} alt="banner_img" className="w-full my-11 md:px-11" />
        <Accordion type="multiple" collapsible className="w-full md:px-11">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-2xl">
              How does URL Shortner Works?
            </AccordionTrigger>
            <AccordionContent>
              When you enter the long URL, Our System generates a Shorter
              version of that URL.This shortner URL redirects to the original
              long URL when accessed
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Do i need an account to use the app?
            </AccordionTrigger>
            <AccordionContent>
              Yes. Creating an account allows you to manage your URL's, View
              analytics, and customize your short URL's
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              What analytics are available for my shortened URL's
            </AccordionTrigger>
            <AccordionContent>
              You can view the number of clicks, geolocation data of the clicks
              and device types (mobile/desktop) for each of your shortened URL's
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default LandingPage;
