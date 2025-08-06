export const STEP_FIELDS = [
  // Step 0 input voucher
  ["voucher"],

  // Step 1 Identitas Pemohon
  [
    // Informasi Anak
    "namaLengkapAnak",
    "jenisKelAnak",
    "tempatLahirAnak",
    "tanggalLahirAnak",
    "emailAnak",
    "kewarganegaraanAsalAnak",
    "tmpTglAnak",
    "negaraAnak",
    "provinsiAnak",
    "kabkotAnak",
    "AlamatTmpTglAnak",

    // Informasi pengangkatan Anak
    "nomorPenetapan",
    "tanggalPenetapan",

    // Informasi paspor asing
    "nomorPasporAsing",
    "wlyTerbPasporAsing",
    "tglKedalPasporAsing",
  ],

  // Step 2 Identitas Ortu
  [
    // Informasi data ayah
    "namaLengkapAyah",
    "nikAyah",
    "emailAyah",
    "noHpAyah",
    "kewarganegaraanAyah",
    "statusKawinAyah",
    "alamatTglAyah",
    "tmptLahirAyah",
    "tglLahirAyah",
    "pekerjaanAyah",

    // Informasi data ibu
    "namaLengkapIbu",
    "nikIbu",
    "emailIbu",
    "noHpIbu",
    "kewarganegaraanIbu",
    "statusKawinIbu",
    "alamatTglIbu",
    "tmptLahirIbu",
    "tglLahirIbu",
    "pekerjaanIbu",
  ],
  // Step 3 Surat permohonan
  ["suratPermohonan"],
  // Step 4 Unggah Dokumen
  [
    "kutipanAktaKelahiran",
    "IzinKeimigrasian",
    "skTmpTinggal",
    "pasporAnak",
    "penetapanKeadilan",
    "srtPerwaNgrAsal",
    "kutipanAktaKelaOrtu",
    "pasporKtpOrtu",
    "kutipanAktaPerkawinan",
    "pasfoto",
  ],
];
