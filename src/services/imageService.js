// services/imageService.js

const CLOUD_NAME = "dbzam0tvg";
const UPLOAD_PRESET = "gantz_upload";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  if (data.error) throw new Error(data.error.message);

  return data.secure_url;
};

export const deleteImage = async (publicId) => {
  // Cloudinary delete desde frontend requiere firma del servidor
  // por ahora lo dejamos como placeholder
  console.warn("deleteImage requiere backend firmado:", publicId);
};
