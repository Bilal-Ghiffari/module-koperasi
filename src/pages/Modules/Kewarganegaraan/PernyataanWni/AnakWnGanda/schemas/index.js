import {
  imageValidation,
  pdfValidation,
} from "@/helpers/services/fileValidation";
import { object, string, number, date, mixed, array } from "yup";

export const validationSchemas = {
  0: object({
    voucher: string().required("Voucher wajib diisi"),
  }),
  1: object({
    namaLengkapAnak: string()
      .min(2, "Nama lengkap minimal 2 karakter")
      .max(100, "Nama lengkap maksimal 100 karakter")
      .matches(
        /^[A-Za-zÀ-ÿ' -]+$/,
        "Nama hanya boleh berisi huruf, apostrof (') dan tanda hubung (-)"
      )
      .required("Nama lengkap wajib diisi"),
    niknit: string()
      .matches(/^[0-9]{16}$/, "NIK harus terdiri dari 16 digit angka")
      .required("NIK wajib diisi"),
    nomorHpAnak: string()
      .matches(/^[0-9]+$/, "Nomor telepon harus angka")
      .required("Nomor handphone wajib diisi"),
    nomorTelpAnak: string()
      .matches(/^[0-9]+$/, "Nomor telepon harus angka")
      .required("Nomor telepon wajib diisi"),
    jenisKelAnak: string().required("Jenis kelamin wajib diisi"),
    statusKawinAnak: string().required("Status pernikahan wajib diisi"),
    emailAnak: string()
      .email("Email tidak valid")
      .required("Email wajib diisi"),
    pekerjaanAnak: string().required("Pekerjaan wajib diisi"),
    tempatLahirAnak: string().required("Tempat lahir wajib diisi"),
    tanggalLahirAnak: date()
      .max(new Date(), "Tanggal lahir tidak boleh di masa depan")
      .required("Tanggal lahir wajib diisi"),
    kewarganegaraanAnak: string().oneOf(
      ["Indonesia"],
      "kewarganegaraan tidak dapat diubah"
    ),
    kewarganegaraanAsingAnak: string().required(
      "Kewarganegaraan asing anak wajib diisi"
    ),

    // Data alamat
    tempatTinggalAnak: string().required("Tempat tinggal wajib diisi"),
    negaraAnak: string().when("tempatTinggalAnak", {
      is: "Luar Negeri",
      then: (schema) => schema.required("Negara wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    provinsiAnak: string().when("tempatTinggalAnak", {
      is: "Dalam Negeri",
      then: (schema) => schema.required("Provinsi wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    kabkotAnak: string().when("tempatTinggalAnak", {
      is: "Dalam Negeri",
      then: (schema) => schema.required("Kabupaten atau kota wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    alamatTmpTglAnak: string().required("Alamat rumah wajib diisi"),

    // Dokumen kelahiran
    nomorAktaAnak: string()
      .matches(
        /^[A-Za-z0-9\/-]+$/,
        "Nomor akta hanya boleh huruf, angka, '/' atau '-'"
      )
      .required("Nomor akta wajib diisi"),
    tanggalAktaAnak: date().required("Tanggal akta wajib diisi"),

    // Dokumen perkawinan
    nomorAktaPerkawinan: string()
      .matches(
        /^[A-Za-z0-9./-]+$/,
        "Nomor akta perkawinan hanya boleh huruf, angka, '.', '/' atau '-'"
      )
      .required("Nomor akta perkawinan wajib diisi"),
    tanggalAktaPerkawinan: date().required(
      "Tanggal akta perkawinan wajib diisi"
    ),

    // Dokumen perjalanan
    nomorPasporRI: string()
      .matches(
        /^[A-Za-z0-9]{9}$/,
        "Nomor Paspor RI harus 9 karakter, hanya huruf dan angka"
      )
      .required("Nomor Paspor RI wajib diisi"),
    wilTerbitPasporRI: string()
      .min(2, "Wilayah terbit paspor minimal 2 karakter")
      .max(50, "Wilayah terbit paspor maksimal 50 karakter")
      .required("Wilayah terbit paspor wajib diisi"),
    tglKedaluwarsaPasporRI: date().required(
      "Tanggal kedaluwarsa paspor wajib diisi"
    ),
    nomorPasporKeb: string()
      .matches(
        /^[A-Za-z0-9\s\/-]+$/,
        "Nomor Paspor Kebangsaan hanya boleh huruf, angka, spasi, '/' atau '-'"
      )
      .min(5, "Nomor Paspor Kebangsaan minimal 5 karakter")
      .max(30, "Nomor Paspor Kebangsaan maksimal 30 karakter")
      .required("Nomor Paspor Kebangsaan wajib diisi"),
    wilTerbitPasporKeb: string()
      .min(2, "Wilayah terbit paspor kebangsaan minimal 2 karakter")
      .max(50, "Wilayah terbit paspor kebangsaan maksimal 50 karakter")
      .required("Wilayah terbit paspor kebangsaan wajib diisi"),
    tglKedaluwarsaPasporKeb: date().required(
      "Tanggal kedaluwarsa paspor kebangsaan wajib diisi"
    ),
    nomorSkWni: string()
      .required("Nomor SK wajib diisi")
      .matches(
        /^[A-Za-z0-9\s\/-]+$/,
        "Nomor SK hanya boleh berisi huruf, angka, spasi, '/' atau '-'"
      ),
    tglSkWni: date()
      .required("Tanggal dikeluarkannya SK wajib")
      .max(new Date(), "Tanggal tidak boleh di masa depan"),
  }),
  2: object({
    namaLengkapAyah: string()
      .min(2, "Nama lengkap minimal 2 karakter")
      .max(100, "Nama lengkap maksimal 100 karakter")
      .matches(
        /^[A-Za-zÀ-ÿ' -]+$/,
        "Nama hanya boleh berisi huruf, apostrof (') dan tanda hubung (-), tanpa karakter khusus lainnya"
      )
      .required("Nama lengkap wajib diisi"),
  }),
  3: object({
    suratPermohonan: string().required("Rules wajib dicentang"),
  }),
  4: object({
    kutipanAktaKelahiran: pdfValidation,
    kutipanAktaPerkawinan: pdfValidation,
    pasporRepublik: pdfValidation,
    ktp: pdfValidation,
    srtPernyataanPelepasan: pdfValidation,
    keputusanMenteri: pdfValidation,
    pasFoto: imageValidation,
  }),
};
