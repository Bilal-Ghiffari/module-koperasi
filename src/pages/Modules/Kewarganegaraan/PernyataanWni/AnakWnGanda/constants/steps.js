export const STEP_FIELDS = [
  // Step 0 input voucher
  ["voucher"],

  // Step 1 Identitas Pemohon
  [
    // Informasi Anak
    "namaLengkapAnak",
    "niknit",
    "nomorHpAnak",
    "nomorTelpAnak",
    "jenisKelAnak",
    "statusKawinAnak",
    "emailAnak",
    "pekerjaanAnak",
    "tempatLahirAnak",
    "tanggalLahirAnak",
    "kewarganegaraanAnak",
    "kewarganegaraanAsingAnak",

    // Data Alamat
    "tempatTinggalAnak",
    "negaraAnak",
    "provinsiAnak",
    "kabkotAnak",
    "alamatTmpTglAnak",

    // Dokumen Kelahiran
    "nomorAktaAnak",
    "tanggalAktaAnak",

    // Dokumen Perkawinan Orang Tua
    "nomorAktaPerkawinan",
    "tanggalAktaPerkawinan",

    // Dokumen Perjalanan,
    "nomorPasporRI",
    "wilTerbitPasporRI",
    "tglKedaluwarsaPasporRI",
    "nomorPasporKeb",
    "wilTerbitPasporKeb",
    "tglKedaluwarsaPasporKeb",

    // Dokumen Keimigrasian
    "nomorSkWni",
    "tglSkWni",
  ],

  // Step 2 Identitas Ortu
  [
    // Informasi data ayah
    "namaLengkapAyah",
    "statusKawinAyah",
    "emailAyah",
    "noHpAyah",
    "kewarganegaraanAyah",
    "alamatTglAyah",
    "tmptLahirAyah",
    "tglLahirAyah",

    // Informasi data ibu
    "namaLengkapIbu",
    "statusKawinIbu",
    "emailIbu",
    "noHpIbu",
    "kewarganegaraanIbu",
    "alamatTglIbu",
    "tmptLahirIbu",
    "tglLahirIbu",
  ],
  // Step 3 Surat permohonan
  ["suratPermohonan"],
  // Step 4 Unggah Dokumen
  [
    "kutipanAktaKelahiran",
    "kutipanAktaPerkawinan",
    "pasporRepublik",
    "ktp",
    "srtPernyataanPelepasan",
    "keputusanMenteri",
    "pasFoto",
  ],
];
