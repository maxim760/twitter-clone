export const urlFromPhoto = (file: File): string => {
  const fileBlob = new Blob([file]);
  return URL.createObjectURL(fileBlob);
};
