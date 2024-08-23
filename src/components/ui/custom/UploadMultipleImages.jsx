import React, { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../config/firebaseConfig";
import { db } from "../../../../config/index";
import { CarImages } from "../../../../config/schema";
import { useNavigate, useNavigation } from "react-router-dom";

const UploadMultipleImages = ({
  triggerUploadImges,
  uploading,
  setUploading,
}) => {
  const [images, setImages] = useState([]);
  const navi = useNavigate();

  useEffect(() => {
    if (triggerUploadImges) {
      uploadImages();
    }

    return () => {};
  }, [triggerUploadImges, uploading]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (preview) => {
    setImages((prevImages) =>
      prevImages.filter((img) => img.preview !== preview)
    );
  };

  const uploadImages = async () => {
    setUploading(true);
    images.forEach((image, index) => {
      const fileName = `${Date.now()}-${index}.jpeg`;
      const storageRef = ref(storage, `car-images/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, image.file);

      uploadTask.on(
        "state_changed",
        async (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.error("Upload failed:", error);
        },
        async () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const id = await db
              .insert(CarImages)
              .values({
                imageUrl: downloadURL,
                carListingId: triggerUploadImges,
              })
              .returning({ id: CarImages.id });

            if (id) {
              setUploading(false);
              navi("/profile");
            }

            // You can update your state or database with the download URL here
          });
        }
      );
    });
    setUploading(false);
  };

  return (
    <div className="my-12">
      <h2 className="text-xl font-primaryBold">Upload Images</h2>
      <div className="flex gap-5 items-center my-6">
        <div className="flex flex-wrap gap-5">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative"
              style={{
                width: "100px",
                height: "100px",
                position: "relative",
              }}
            >
              <img
                src={image.preview}
                alt={`upload-${index}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={() => handleRemoveImage(image.preview)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <div
          className="bg-red-200 p-4 w-[100px] h-[100px] rounded-lg flex justify-center items-center 
        cursor-pointer"
        >
          <label
            htmlFor="upload-images"
            className="flex items-center justify-center w-full h-full
            cursor-pointer"
          >
            <div className="text-3xl cursor-pointer">+</div>
            <input
              id="upload-images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
      </div>
      {/* <button
        onClick={uploadImages}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Images"}
      </button> */}
    </div>
  );
};

export default UploadMultipleImages;
