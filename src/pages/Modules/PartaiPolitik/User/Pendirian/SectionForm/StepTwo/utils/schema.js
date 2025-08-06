import {
  pdfValidation,
  imageValidation,
} from "../../../../utils/validationFile";
import { array, string, object } from "yup";

export const validationSchema = object().shape({
  file_lambang_partai: imageValidation,
  nama_partai: string().required("Nama partai wajib diisi"),
  singkatan_partai: string().required("Singkatan partai wajib diisi"),
  arti_nama_partai: string().required("Arti nama partai wajib diisi"),
  asas: string().required("Asas wajib diisi"),
  visi: string().required("Visi wajib diisi"),
  misi: string().required("Misi wajib diisi"),
  file_salinan_sah: pdfValidation,
  aggrement_lambang_partai: string().required("Rules wajib di centang"),
  aggrement_visi_partai: string().required("Rules wajib di centang"),

  data_notaris: array().of(
    object({
      nama_notaris: string().required("Nama notaris wajib diisi"),
      kedudukan_notaris: string().required("Kedudukan notaris wajib diisi"),
      nomor_akta: string().required("Nomor akta wajib diisi"),
      tanggal_akta: string().required("Tanggal akta wajib diisi"),
      prihal_akta: string().required("Prihal akta wajib diisi"),
      file_akta: pdfValidation,
    })
  ),

  nomor_surat_pemohon: string().required("Nomor surat wajib diisi"),
  tanggal_surat_pemohon: string().required("Tanggal surat wajib diisi"),
  file_pemohon: pdfValidation,
  nama_bank: string().required("Nama bank wajib diisi"),
  nomor_rekening: string().required("Nomor rekening wajib diisi"),
  file_buku_tabungan: pdfValidation,
  status_kantor: string().required("Status kantor wajib diisi"),
  file_status_kantor: pdfValidation,

  alamat_kantor_pusst: string().required("Alamat kantor wajib diisi"),
  provinsi_kantor_pusst: string().required("Provinsi wajib diisi"),
  kabkota_kantor_pusst: string().required("Kabupaten/Kota wajib diisi"),
  kecamatan_kantor_pusst: string().required("Kecamatan wajib diisi"),
  kelurahan_kantor_pusst: string().required("Kelurahan wajib diisi"),
  rt_kantor_pusst: string().required("RT wajib diisi"),
  rw_kantor_pusst: string().required("RW wajib diisi"),
  kode_pos_kantor_pusst: string().required("Kode pos wajib diisi"),
  latitude: string().required("Latitude wajib diisi"),
  longitude: string().required("Longitude wajib diisi"),

  file_kantor_depan: imageValidation,
  file_kantor_belakang: imageValidation,
});
