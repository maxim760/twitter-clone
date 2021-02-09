import { axios } from "../core/axios";

interface UploadeImage {
  size: number;
  width: number;
  height: number;
  url: string;
}

export const uploadImage: (image:any) => Promise<UploadeImage> = async (image: any) => {
  const formData = new FormData();
  formData.append("image", image);

  const { data } = await axios.post("/upload", formData, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });

  return data;
};
