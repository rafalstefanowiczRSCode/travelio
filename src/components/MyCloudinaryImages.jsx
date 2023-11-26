import React, { useEffect, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import "../../styles/myCloudinaryImages.css";
import { format } from "@cloudinary/url-gen/actions/delivery";
import { sepia } from "@cloudinary/url-gen/actions/effect";
import { png } from "@cloudinary/url-gen/qualifiers/format";

import {
  // AdvancedImage,
  accessibility,
  responsive,
  lazyload,
  placeholder,
} from "@cloudinary/react";
import { scale } from "@cloudinary/url-gen/actions/resize";

const cloudName = "dduk3mqt0";
const MyCloudinaryImages = () => {
  const [images, setImages] = useState([]);

  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  useEffect(() => {
    const fetchImages = async () => {
      const url = `https://res.cloudinary.com/${cloudName}/image/list/trip.json`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setImages(data.resources);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  console.log(images);

  const mapImages = images.map((image) => {
    const myImage = cld.image(image.public_id);
    myImage
      .quality("auto") // Automatic quality
      .format("auto");

    const myImage2 = cld
      .image(image.public_id)
      .resize(scale().width(400))
      .quality("auto") // Automatic quality
      .format("auto");
    // .effect("e_sharpen");

    return (
      <div key={image.public_id}>
        <AdvancedImage
          style={{ width: "400px" }}
          cldImg={myImage}
          plugins={[lazyload(), placeholder({ mode: "blur" })]}
          // plugins={[lazyload(), responsive(100), placeholder()]}
        />

        {/* <AdvancedImage
          style={{ width: "400px" }}
          cldImg={myImage2}
          plugins={[placeholder({ mode: "blur" })]}
          // plugins={[lazyload(), responsive(100), placeholder()]}
        /> */}
      </div>
    );
  });

  return (
    <div>
      MyCloudinaryImages
      {mapImages}
    </div>
  );
};

export default MyCloudinaryImages;
