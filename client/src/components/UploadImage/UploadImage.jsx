import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./UploadImage.css";

const UploadImage = ({
  nextStep,
  prevStep,
  propertDetails,
  setPropertDetails,
}) => {
  const [imageURL, setImageURL] = useState(propertDetails?.image);

  function handleImageUpload(e) {
    e.preventDefault();
    console.log();
  }



  return (
    <div className="flexColCenter uploadWrapper">
        {!imageURL ? (
          <>
            
            <div className="flexColCenter uploadZone">
              <AiOutlineCloudUpload size={50} color="grey" />
              <span>Upload Image</span>
            </div>
          </>
        ) : (
          <div className="uploadImage">
            <img src={imageURL} alt="uploaded image" />
          </div>
        )}
    </div>
  );
};

export default UploadImage;
