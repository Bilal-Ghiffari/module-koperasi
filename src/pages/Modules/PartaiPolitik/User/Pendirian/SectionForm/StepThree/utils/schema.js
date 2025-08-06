import { object, string } from "yup";
import { pdfValidation } from "../../../../utils/validationFile";

export const validationSchema = object().shape({
  // Informasi Pengurus Pusat
  jenisKepengurusan: string().required("Jenis Kepengurusan harus diisi"),
  jabatan: string().required("Jabatan harus diisi"),
  nomorSK: string().required("Nomor SK harus diisi"),
  tanggalSK: string().required("Tanggal SK harus diisi"),
  namaLengkap: string().required("Nama Lengkap harus diisi"),
  nik: string().required("NIK harus diisi"),
  nomorNPWP: string().required("Nomor NPWP harus diisi"),
  jenisKelamin: string().required("Jenis Kelamin harus dipilih"),
  kewarganegaraan: string().required("Kewarganegaraan harus dipilih"),
  tempatLahir: string().required("Tempat Lahir harus diisi"),
  tanggalLahir: string().required("Tanggal Lahir harus diisi"),
  email: string()
    .email("Format email tidak valid")
    .required("Email harus diisi"),
  nomorHP: string()
    .matches(/^\+?\d{8,14}$/, "Nomor HP harus valid")
    .required("Nomor HP harus diisi"),
  provinsi: string().required("Provinsi harus dipilih"),
  kabupatenKota: string().required("Kabupaten/Kota harus dipilih"),
  pekerjaan: string().required("Pekerjaan harus diisi"),

  // Alamat Pengurus
  alamatLengkap: string().required("Alamat Lengkap harus diisi"),
  provinsiAlamat: string().required("Provinsi harus dipilih"),
  kabupatenKotaAlamat: string().required("Kabupaten/Kota harus dipilih"),
  kecamatan: string().required("Kecamatan harus dipilih"),
  kelurahan: string().required("Kelurahan harus dipilih"),
  rt: string().required("RT harus diisi"),
  rw: string().required("RW harus diisi"),
  kodePos: string().required("Kode Pos harus diisi"),

  // Surat Pernyataan
  suratPernyataan: pdfValidation,
});
