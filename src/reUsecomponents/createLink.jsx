import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { userState } from "@/context";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Error from "@/components/Error/Error";
import { Card } from "@/components/ui/card";
import * as yup from "yup";
import { QRCode } from "react-qrcode-logo";
import useFetch from "@/hooks/use-fetch";
import { createUrl } from "@/components/db/apiUrl";
import { BeatLoader } from "react-spinners";

const CreateLink = () => {
  const { user } = userState();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const longlink = searchParams.get("createNew");

  const ref = useRef();

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longlink ? longlink : "",
    customUrl: "",
  });

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup
      .string()
      .url("Must be a valid URL")
      .required("Long URL is required"),
    customUrl: yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await schema.validate(formValues, { abortEarly: false });
      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));
      await fnCreateUrl(blob);
    } catch (validationErrors) {
      const formattedErrors = validationErrors.inner.reduce((acc, err) => {
        return { ...acc, [err.path]: err.message };
      }, {});
      setErrors(formattedErrors);
    }
  };

  const {
    loading,
    error,
    data,
    fn: fnCreateUrl,
  } = useFetch(createUrl, { ...formValues, user_id: user?.id });

  useEffect(() => {
    if (error === null && data) {
      navigate(`/link/${data[0].id}`);
    }
  }, [error, data]);

  return (
    <>
      <Dialog
        defaultOpen={longlink}
        onOpenChange={(isOpen) => {
          if (!isOpen) setSearchParams({});
        }}
      >
        <DialogTrigger>
          <Button variant="destructive">Create Link</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
          </DialogHeader>
          {formValues?.longUrl && (
            <QRCode value={formValues?.longUrl} size={250} ref={ref} />
          )}
          <Input
            id="title"
            placeholder="Short Link's Title"
            onChange={handleChange}
            value={formValues.title}
          />
          {errors.title && <Error message={errors.title} />}
          <Input
            id="longUrl"
            placeholder="Enter your long URL"
            onChange={handleChange}
            value={formValues.longUrl}
          />
          {errors.longUrl && <Error message={errors.longUrl} />}
          <div className="flex items-center gap-2">
            <Card className="p-2">trimrr.in</Card>/
            <Input
              id="customUrl"
              placeholder="Custom Link (optional)"
              onChange={handleChange}
              value={formValues.customUrl}
            />
          </div>
          {errors.customUrl && <Error message={errors.customUrl} />}
          {error && <Error message={error.message} />}
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              disabled={loading}
              variant="destructive"
              onClick={handleSubmit}
            >
              {loading ? <BeatLoader size={10} color="white" /> : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateLink;
