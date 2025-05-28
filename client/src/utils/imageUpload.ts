import axios from "axios";

const cloudName = "ddlwhkn3b";
const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

export const uploadFile = async (file: File): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "images_preset");
    formData.append("folder", "SIDESONE");

    const res = await axios.post<{ secure_url: string }>(api, formData);
    return res.data.secure_url;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};
