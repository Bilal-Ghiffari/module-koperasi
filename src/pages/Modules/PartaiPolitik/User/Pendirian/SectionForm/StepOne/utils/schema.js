import { string } from "yup";
import { object } from "yup";
import { pdfValidation } from "../../../../utils/validationFile";

export const validationSchema = object().shape({
  nama_lengkap: string()
    .min(2, "Nama lengkap minimal 2 karakter")
    .required("Nama lengkap wajib diisi"),
  nik: string()
    .matches(/^[0-9]{16}$/, "NIK harus terdiri dari 16 angka")
    .required("NIK wajib diisi"),
  npwp: string()
    .matches(/^[0-9]{16}$/, "NPWP harus terdiri dari 16 angka")
    .required("NIK wajib diisi"),
  jenis_kelamin: string().required("Jenis kelamin wajib diisi"),
  kewarganegaraan: string().required("Kewarganegaraan wajib diisi"),
  tempat_lahir: string().required("Tempat lahir wajib diisi"),
  tanggal_lahir: string().required("Tanggal lahir wajib diisi"),
  email: string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),
  nomor_telepon: string()
    .required("Nomor telepon wajib diisi")
    .matches(/^[0-9]{10,15}$/, "Nomor telepon harus terdiri dari 10–15 digit"),
  provinsi: string().required("Provinsi wajib diisi"),
  kabkota: string().required("Kabupaten/Kota wajib diisi"),
  fotokopi_ktp: pdfValidation,
  pekerjaan: string().required("Pekerjaan wajib diisi"),
  jabatan: string().required("Jabatan wajib diisi"),
  fotokopi_npwp: pdfValidation,

  alamat_lengkap: string().required("Alamat wajib diisi"),
  provinsi_pemohon: string().required("Provinsi wajib diisi"),
  kabkota_pemohon: string().required("Kabupaten/Kota wajib diisi"),
  kecamatan_pemohon: string().required("Kecamatan wajib diisi"),
  kelurahan_pemohon: string().required("Kelurahan wajib diisi"),
  rt: string()
    .required("RT wajib diisi")
    .length(3, "RT harus terdiri dari 3 digit")
    .matches(/^[0-9]{3}$/, "RT harus berupa 3 digit angka"),

  rw: string()
    .required("RW wajib diisi")
    .length(3, "RW harus terdiri dari 3 digit")
    .matches(/^[0-9]{3}$/, "RW harus berupa 3 digit angka"),

  kode_pos_pemohon: string()
    .matches(/^[0-9]{5}$/, "Kode pos harus 5 digit")
    .required("Kode pos wajib diisi"),
});
