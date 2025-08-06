import { mixed } from "yup";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const imageValidation = mixed()
  .required("Foto wajib diunggah")
  .test("fileSize", "Ukuran foto maksimal 5MB", (value) => {
    return value && value.size <= MAX_FILE_SIZE;
  })
  .test("fileFormat", "Format foto harus JPG/PNG", (value) => {
    return (
      value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
    );
  });

export const pdfValidation = mixed()
  .required("File wajib diunggah")
  .test("fileSize", "Ukuran file maksimal 5MB", (value) => {
    return value && value.size <= MAX_FILE_SIZE;
  })
  .test("fileFormat", "Format file harus PDF", (value) => {
    return value && value.type === "application/pdf";
  });

export const ExampleOption = [
  { value: "Laki-laki", label: "Laki-laki" },
  { value: "Perempuan", label: "Perempuan" },
];
