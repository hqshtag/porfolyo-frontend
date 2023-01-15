/* 
  filename: Dropzone.js 
*/

import React from "react";

// Import the useDropzone hooks from react-dropzone
import { useDropzone } from "react-dropzone";


export const MyDropzone = ({ onDrop, accept, imgsrc = "" }) => {
  // Initializing useDropzone hooks with options
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  });

  /* 
    useDropzone hooks exposes two functions called getRootProps and getInputProps
    and also exposes isDragActive boolean
  */

  const aff = (imgsrc) => {
    if (imgsrc && imgsrc !== "") {
      return (
        <img className="dropzone-image" alt="upload preview" src={imgsrc} />
      );
    } else
      return (
        <>
          <h5 className="dropzone-content">
            Drag 'n' drop some files here, or click to select files
          </h5>
        </>
      );
  };

  return (
    <div className="dropzone" {...getRootProps()}>
      <input className="dropzone-input" {...getInputProps()} />
      <div className="text-center">
        {!isDragActive ? (
          <h5 className="dropzone-content">Release to drop the files here</h5>
        ) : (
          aff(imgsrc)
        )}
      </div>
    </div>
  );
};

export const PortfolioDropzone = ({ onDrop, accept, imgs }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  });

  const aff = (imgs) => {
    if (imgs && imgs.length > 0) {
      return (
        <div className="offer-images-display">
          {imgs.map((img, i) => {
            return (
              <img
                className="offer-dropzone-image"
                src={img.src}
                alt={`offer elm ${i}`}
                key={img.id}
              />
            );
          })}
        </div>
      );
    } else
      return (
        <>
          <div className="text-center">
            <h5 className="dropzone-content">Drag & Drop pictures in here</h5>
          </div>{" "}
        </>
      );
  };
  return (
    <div className="offer-dropzone" {...getRootProps()}>
      <input className="dropzone-input" {...getInputProps()} />

      {isDragActive ? (
        <h5 className="dropzone-content">Release to drop the photos here</h5>
      ) : (
        aff(imgs)
      )}
    </div>
  );
};

