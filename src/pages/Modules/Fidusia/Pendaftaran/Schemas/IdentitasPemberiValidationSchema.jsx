import * as Yup from 'yup';

export const initialValuesIdentitasPemberi = {
  // Existing initial values for step 1
  jenisPendaftaran: '',
  jenisKorporasi: '',
  jenisSubKorporasi: '',
  jenisBadanHukum: '',
  kewarganegaraan: '',
  jenisPenggunaan: '',
  jenisSubPenggunaan: '',
  namaPemberi: '',
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
};

export const IdentitasPemberiValidationSchema = Yup.object({
  jenisPendaftaran: Yup.string().required('Wajib diisi'),

  // Jika jenisPendaftaran === 'korporasi' maka ini wajib
  jenisKorporasi: Yup.string().when('jenisPendaftaran', {
    is: 'korporasi',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),
  jenisSubKorporasi: Yup.string().when('jenisPendaftaran', {
    is: 'korporasi',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),
  jenisBadanHukum: Yup.string().when('jenisKorporasi', {
    is: 'indonesia',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),

  // Jika perseorangan maka cek kewarganegaraan
  kewarganegaraan: Yup.string().when('jenisPendaftaran', {
    is: 'perseorangan',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),

  // Informasi Umum
  namaPemberi: Yup.string().required('Wajib diisi'),
  email: Yup.string().email('Format email tidak valid').required('Wajib diisi'),
  noTelp: Yup.string().required('Wajib diisi'),
  namaDebitur: Yup.string().required('Wajib diisi'),

  // Khusus untuk perseorangan, field-field ini menjadi not required
  kantorCabang: Yup.string().when('jenisPendaftaran', {
    is: 'perseorangan',
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.required('Wajib diisi'),
  }),

  nik: Yup.string().when('jenisPendaftaran', {
    is: 'perseorangan',
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.required('Wajib diisi'),
  }),

  noSK: Yup.string().when('jenisPendaftaran', {
    is: 'perseorangan',
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.required('Wajib diisi'),
  }),

  npwp: Yup.string().when('jenisPendaftaran', {
    is: 'perseorangan',
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.required('Wajib diisi'),
  }),

  // Validasi untuk WNA
  noPaspor: Yup.string().when(['jenisPendaftaran', 'kewarganegaraan'], {
    is: (jenisPendaftaran, kewarganegaraan) =>
      jenisPendaftaran === 'perseorangan' && kewarganegaraan === 'wna',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),

  negaraAsal: Yup.string().when(['jenisPendaftaran', 'kewarganegaraan'], {
    is: (jenisPendaftaran, kewarganegaraan) =>
      jenisPendaftaran === 'perseorangan' && kewarganegaraan === 'wna',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
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
      jenisKorporasi !== 'asing' && kewarganegaraan === 'wni',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),
  kabupaten: Yup.string().when(['jenisKorporasi', 'kewarganegaraan'], {
    is: (jenisKorporasi, kewarganegaraan) =>
      jenisKorporasi !== 'asing' && kewarganegaraan === 'wni',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),
  kecamatan: Yup.string().when(['jenisKorporasi', 'kewarganegaraan'], {
    is: (jenisKorporasi, kewarganegaraan) =>
      jenisKorporasi !== 'asing' && kewarganegaraan === 'wni',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),
  kelurahan: Yup.string().when(['jenisKorporasi', 'kewarganegaraan'], {
    is: (jenisKorporasi, kewarganegaraan) =>
      jenisKorporasi !== 'asing' && kewarganegaraan === 'wni',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),
  rt: Yup.string().when(['jenisKorporasi', 'kewarganegaraan'], {
    is: (jenisKorporasi, kewarganegaraan) =>
      jenisKorporasi !== 'asing' && kewarganegaraan === 'wni',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),
  rw: Yup.string().when(['jenisKorporasi', 'kewarganegaraan'], {
    is: (jenisKorporasi, kewarganegaraan) =>
      jenisKorporasi !== 'asing' && kewarganegaraan === 'wni',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),
  kodePos: Yup.string().when(['jenisKorporasi', 'kewarganegaraan'], {
    is: (jenisKorporasi, kewarganegaraan) =>
      jenisKorporasi !== 'asing' && kewarganegaraan === 'wni',
    then: (schema) => schema.required('Wajib diisi'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export default IdentitasPemberiValidationSchema;
