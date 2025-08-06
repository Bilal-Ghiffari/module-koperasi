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
    // Informasi Anak
    namaLengkapAnak: string()
      .min(2, "Nama lengkap minimal 2 karakter")
      .max(100, "Nama lengkap maksimal 100 karakter")
      .matches(
        /^[A-Za-zÀ-ÿ' -]+$/,
        "Nama hanya boleh berisi huruf, apostrof (') dan tanda hubung (-)"
      )
      .required("Nama lengkap wajib diisi"),
    jenisKelAnak: string().required("Jenis kelamin wajib diisi"),
    tempatLahirAnak: string().required("Tempat lahir wajib diisi"),
    tanggalLahirAnak: date()
      .max(new Date(), "Tanggal lahir tidak boleh di masa depan")
      .required("Tanggal lahir wajib diisi"),
    emailAnak: string()
      .email("Format email tidak valid")
      .required("Email wajib diisi"),
    kewarganegaraanAsalAnak: string().required(
      "Kewarganegaraan asing anak wajib diisi"
    ),

    // Alamat tempat tinggal anak
    tmpTglAnak: string().required("Tempat tinggal wajib diisi"),
    negaraAnak: string().when("tmpTglAnak", {
      is: "Luar Negeri",
      then: (schema) => schema.required("Negara wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    provinsiAnak: string().when("tmpTglAnak", {
      is: "Dalam Negeri",
      then: (schema) => schema.required("Provinsi wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    kabkotAnak: string().when("tmpTglAnak", {
      is: "Dalam Negeri",
      then: (schema) => schema.required("Kabupaten atau kota wajib diisi"),
      otherwise: (schema) => schema.notRequired(),
    }),
    AlamatTmpTglAnak: string().required("Alamat rumah wajib diisi"),

    // Informasi pengangkatan anak
    nomorPenetapan: string()
      .matches(
        /^[A-Za-z0-9\/\.\-]+$/,
        "Nomor Penetapan hanya boleh berisi huruf, angka, '/', '.', dan '-'"
      )
      .min(5, "Nomor Penetapan minimal 5 karakter")
      .max(50, "Nomor Penetapan maksimal 50 karakter")
      .required("Nomor Penetapan wajib diisi"),
    tanggalPenetapan: date().required("Tanggal penetapan wajib diisi"),

    // Informasi paspor asing
    nomorPasporAsing: string()
      .matches(
        /^[A-Za-z0-9\s\/-]+$/,
        "Nomor Paspor hanya boleh berisi huruf, angka, spasi, '/' dan '-'"
      )
      .required("Nomor Paspor wajib diisi"),
    wlyTerbPasporAsing: string().required("Wilayah terbit paspor wajib diisi"),
    tglKedalPasporAsing: date().required(
      "Tanggal kedaluwarsa paspor wajib diisi"
    ),
  }),
  2: object({
    // Data ayah
    namaLengkapAyah: string()
      .min(2, "Nama lengkap minimal 2 karakter")
      .max(100, "Nama lengkap maksimal 100 karakter")
      .matches(
        /^[A-Za-zÀ-ÿ' -]+$/,
        "Nama hanya boleh berisi huruf, apostrof (') dan tanda hubung (-), tanpa karakter khusus lainnya"
      )
      .required("Nama lengkap wajib diisi"),
    nikAyah: string()
      .matches(/^[0-9]{16}$/, "NIK harus terdiri dari 16 digit angka")
      .min(16, "NIK harus 16 digit")
      .max(16, "NIK harus 16 digit")
      .required("NIK wajib diisi"),
    emailAyah: string()
      .email("Format email tidak valid")
      .required("Email wajib diisi"),
    noHpAyah: string()
      .matches(/^[0-9]+$/, "Nomor handphone harus angka")
      .min(10, "Nomor handphone minimal 10 digit")
      .max(15, "Nomor handphone maksimal 15 digit")
      .required("Nomor handphone wajib diisi"),
    kewarganegaraanAyah: string().required(
      "Kewarganegaraan pasangan wajib diisi"
    ),
    statusKawinAyah: string().required("Status pernikahan wajib diisi"),
    alamatTglAyah: string()
      .min(5, "Alamat rumah minimal 5 karakter")
      .max(200, "Alamat rumah maksimal 200 karakter")
      .required("Alamat rumah wajib diisi"),
    tmptLahirAyah: string().required(
      "Tempat lahir wajib diisi dan sesuai identitas"
    ),
    tglLahirAyah: date()
      .max(new Date(), "Tanggal lahir tidak boleh di masa depan")
      .required("Tanggal lahir wajib diisi"),
    pekerjaanAyah: string()
      .min(2, "Pekerjaan minimal 2 karakter")
      .max(50, "Pekerjaan maksimal 50 karakter")
      .required("Pekerjaan wajib diisi"),

    // Data Ibu
    namaLengkapIbu: string()
      .min(2, "Nama lengkap minimal 2 karakter")
      .max(100, "Nama lengkap maksimal 100 karakter")
      .matches(
        /^[A-Za-zÀ-ÿ' -]+$/,
        "Nama hanya boleh berisi huruf, apostrof (') dan tanda hubung (-), tanpa karakter khusus lainnya"
      )
      .required("Nama lengkap wajib diisi"),
    nikIbu: string()
      .matches(/^[0-9]{16}$/, "NIK harus terdiri dari 16 digit angka")
      .min(16, "NIK harus 16 digit")
      .max(16, "NIK harus 16 digit")
      .required("NIK wajib diisi"),
    emailIbu: string()
      .email("Format email tidak valid")

      .required("Email wajib diisi"),
    noHpIbu: string()
      .matches(/^[0-9]+$/, "Nomor handphone harus angka")
      .min(10, "Nomor handphone minimal 10 digit")
      .max(15, "Nomor handphone maksimal 15 digit")
      .required("Nomor handphone wajib diisi"),
    kewarganegaraanIbu: string().required(
      "Kewarganegaraan pasangan wajib diisi"
    ),
    statusKawinIbu: string().required("Status pernikahan wajib diisi"),
    alamatTglIbu: string()
      .min(5, "Alamat rumah minimal 5 karakter")
      .max(200, "Alamat rumah maksimal 200 karakter")
      .required("Alamat rumah wajib diisi"),
    tmptLahirIbu: string().required(
      "Tempat lahir wajib diisi dan sesuai identitas"
    ),
    tglLahirIbu: date()
      .max(new Date(), "Tanggal lahir tidak boleh di masa depan")
      .required("Tanggal lahir wajib diisi"),
    pekerjaanIbu: string()
      .min(2, "Pekerjaan minimal 2 karakter")
      .max(50, "Pekerjaan maksimal 50 karakter")
      .required("Pekerjaan wajib diisi"),
  }),
  3: object({
    suratPermohonan: string().required("Rules wajib dicentang"),
  }),
  4: object({
    kutipanAktaKelahiran: pdfValidation,
    IzinKeimigrasian: pdfValidation,
    skTmpTinggal: pdfValidation,
    pasporAnak: pdfValidation,
    penetapanKeadilan: pdfValidation,
    srtPerwaNgrAsal: pdfValidation,
    kutipanAktaKelaOrtu: pdfValidation,
    pasporKtpOrtu: pdfValidation,
    kutipanAktaPerkawinan: pdfValidation,
    pasfoto: imageValidation,
  }),
};
