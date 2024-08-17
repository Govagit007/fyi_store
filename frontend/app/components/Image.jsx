"use client";
import { useState } from "react";

export default function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      postDetails(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const postDetails = (pics) => {
    if (!pics) {
      return console.log("select a pic");
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "dd3qo1ji4");
      fetch("https://api.cloudinary.com/v1_1/dd3qo1ji4/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return console.log("pic selection failed");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    // Handle the form submission here, e.g., send the image to an API endpoint
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {selectedImage && (
          <div>
            <img
              src={selectedImage}
              alt="Selected"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        )}
        <button type="submit">Upload Image</button>
      </form>
    </div>
  );
}
