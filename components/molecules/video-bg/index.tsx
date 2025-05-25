"use client";

import { useEffect, useState } from "react";

export const Video = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [file, setFile] = useState<Blob>();
  useEffect(() => {
    fetch("video.mp4")
      .then((response: Response) => response.blob())
      .then((blob: any) => {
        setFile(blob);
      });
  }, []);
  return (
    <>
      <video
        className="fixed"
        style={
          !isLoading
            ? {
                minWidth: "100%",
                minHeight: "100%",
                right: 0,
                bottom: 0,
                zIndex: -1,
                objectFit: "cover",
              }
            : {
                display: "none",
              }
        }
        autoPlay
        muted
        loop
        src={file && URL.createObjectURL(file)}
        onCanPlayThrough={() => {
          setLoading(false);
        }}
      ></video>
      {isLoading && (
        <img
          className="fixed"
          src="bg.webp"
          style={{
            minWidth: "100vw",
            minHeight: "100vh",
            right: 0,
            bottom: 0,
            zIndex: -1,
            objectFit: "cover",
          }}
        />
      )}
    </>
  );
};
