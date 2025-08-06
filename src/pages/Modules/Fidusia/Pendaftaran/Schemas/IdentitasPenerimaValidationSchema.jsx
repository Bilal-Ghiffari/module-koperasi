import * as Yup from 'yup';

export const initialValuesIdentitasPenerima = {
  // Existing initial values for step 1
  // penerima_fisudia: {
  jenisPendaftaran: '',
  jenisKorporasi: '',
  jenisSubKorporasi: '',
  jenisBadanHukum: '',
  kewarganegaraan: '',
  jenisPenggunaan: '',
  jenisSubPenggunaan: '',
  namaPenerima: '',
  jenisKelamin: '',
  email: '',
  noTelp: '',
  npwp: '',
  nik: '',
  noPaspor: '',
  noSK: '',
  kantorCabang: '',
  negaraAsal: '',
  namaDebitur: '',
  alamat: '',
  provinsi: '',
  kabupaten: '',
  kecamatan: '',
  kelurahan: '',
  rt: '',
  rw: '',
  kodePos: '',
  // penerima_fisudia: '',
  // },
};

export const CustomeIdentitasPenerimaValidationSchema = Yup.object({
  jenisPendaftaran: Yup.string().when('penerima_fisudia', {
    is: (penerima_fisudia) => penerima_fisudia && penerima_fisudia.length > 0,
    then: (schema) => schema.notRequired(), // Jika ada penerima_fisudia, maka tidak wajib
    otherwise: (schema) => schema.required('Wajib diisi'), // Jika tidak ada, wajib diisi
  }),

  // Jika jenisPendaftaran === 'korporasi' maka ini wajib
  jenisKorporasi: Yup.string().when(['jenisPendaftaran', 'penerima_fisudia'], {
    is: (jenisPendaftaran, penerima_fisudia) =>
      penerima_fisudia && penerima_fisudia.length > 0
        ? false
        : jenisPendaftaran === 'korporasi', // Jika ada penerima_fisudia, tidak wajib
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),

  jenisSubKorporasi: Yup.string().when(
    ['jenisPendaftaran', 'penerima_fisudia'],
    {
      is: (jenisPendaftaran, penerima_fisudia) =>
        penerima_fisudia && penerima_fisudia.length > 0
          ? false
          : jenisPendaftaran === 'korporasi',
      then: (schema) => schema.required('Wajib diisi'),
      otherwise: (schema) => schema.notRequired(),
    }
  ),

  jenisBadanHukum: Yup.string().when(['jenisKorporasi', 'penerima_fisudia'], {
    is: (jenisPendaftaran, penerima_fisudia) =>
      penerima_fisudia && penerima_fisudia.length > 0
        ? false
        : jenisPendaftaran === 'indonesia',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),

  // Validasi untuk kewarganegaraan berdasarkan jenisPendaftaran
  kewarganegaraan: Yup.string().when('jenisPendaftaran', {
    is: 'perseorangan',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),

  // Informasi Umum
  namaPenerima: Yup.string().required('Wajib diisi'),
  email: Yup.string().email('Format email tidak valid').required('Wajib diisi'),
  noTelp: Yup.string().required('Wajib diisi'),
  namaDebitur: Yup.string().required('Wajib diisi'),

  // NPWP, NIK, dan NoSK tergantung jenis pendaftaran
  npwp: Yup.string().when(['jenisPendaftaran', 'kewarganegaraan'], {
    is: (jenisPendaftaran, kewarganegaraan) =>
      (jenisPendaftaran === 'korporasi' &&
        !['asing'].includes(kewarganegaraan)) ||
      (jenisPendaftaran === 'perseorangan' && kewarganegaraan === 'wni'),
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),

  nik: Yup.string().when(['jenisPendaftaran', 'kewarganegaraan'], {
    is: (jenisPendaftaran, kewarganegaraan) =>
      jenisPendaftaran === 'perseorangan' && kewarganegaraan === 'wni',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),

  noPaspor: Yup.string().when('kewarganegaraan', {
    is: 'wna',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),

  negaraAsal: Yup.string().when(['jenisKorporasi', 'kewarganegaraan'], {
    is: (jenisKorporasi, kewarganegaraan) =>
      jenisKorporasi === 'asing' || kewarganegaraan === 'wna',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),

  // Field hanya untuk korporasi domestik
  noSK: Yup.string().when('jenisPendaftaran', {
    is: 'perseorangan',
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.required('Wajib diisi'),
  }),

  kantorCabang: Yup.string().when('jenisPendaftaran', {
    is: 'perseorangan',
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.required('Wajib diisi'),
  }),

  // Alamat hanya untuk domestik (Indonesia/WNI)
  alamat: Yup.string().when(['jenisKorporasi', 'kewarganegaraan'], {
    is: (jenisKorporasi, kewarganegaraan) =>
      jenisKorporasi !== 'asing' && kewarganegaraan !== 'wna',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),
  provinsi: Yup.string().when(['jenisKorporasi', 'kewarganegaraan'], {
    is: (jenisKorporasi, kewarganegaraan) =>
      jenisKorporasi !== 'asing' && kewarganegaraan !== 'wna',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),
  kabupaten: Yup.string().when(['jenisKorporasi', 'kewarganegaraan'], {
    is: (jenisKorporasi, kewarganegaraan) =>
      jenisKorporasi !== 'asing' && kewarganegaraan !== 'wna',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),
  kecamatan: Yup.string().when(['jenisKorporasi', 'kewarganegaraan'], {
    is: (jenisKorporasi, kewarganegaraan) =>
      jenisKorporasi !== 'asing' && kewarganegaraan !== 'wna',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),
  kelurahan: Yup.string().when(['jenisKorporasi', 'kewarganegaraan'], {
    is: (jenisKorporasi, kewarganegaraan) =>
      jenisKorporasi !== 'asing' && kewarganegaraan !== 'wna',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),
  rt: Yup.string().when(['jenisKorporasi', 'kewarganegaraan'], {
    is: (jenisKorporasi, kewarganegaraan) =>
      jenisKorporasi !== 'asing' && kewarganegaraan !== 'wna',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),
  rw: Yup.string().when(['jenisKorporasi', 'kewarganegaraan'], {
    is: (jenisKorporasi, kewarganegaraan) =>
      jenisKorporasi !== 'asing' && kewarganegaraan !== 'wna',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),
  kodePos: Yup.string().when(['jenisKorporasi', 'kewarganegaraan'], {
    is: (jenisKorporasi, kewarganegaraan) =>
      jenisKorporasi !== 'asing' && kewarganegaraan !== 'wna',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const IdentitasPenerimaValidationSchema = Yup.object({
  ...CustomeIdentitasPenerimaValidationSchema.fields,
  penerima_fisudia: Yup.array()
    .min(1, 'Minimal satu penerima fidusia harus diisi')
    .of(
      Yup.object({
        ...CustomeIdentitasPenerimaValidationSchema.fields,
      })
    ),
});

export default IdentitasPenerimaValidationSchema;
