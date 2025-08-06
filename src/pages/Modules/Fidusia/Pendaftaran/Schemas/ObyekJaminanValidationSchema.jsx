import * as Yup from 'yup';

// Export initial values separately
export const initialValuesObyekJaminan = {
  // Jenis Objek Jaminan
  kategoriObyek: '',
  subKategoriObyek: '',
  alamatTinggal: '',
  merk: '',
  tipe: '',
  nomorRangka: '',
  nomorMesin: '',
  buktiObyek: '',

  // Nilai Objek
  nilaiObyek: '',
  jumlahNilai: '',

  // Nilai Penjaminan
  kategoriNilaiPenjaminan: '',
  nilaiPenjaminanList: [],

  //aggrement
  agreement: '',
};

// Create and export the validation schema as the default export
const ObyekJaminanValidationSchema = Yup.object({
  // Jenis Objek Jaminan
  kategoriObyek: Yup.string().required('Kategori objek wajib dipilih'),
  subKategoriObyek: Yup.string().required('Sub kategori objek wajib dipilih'),
  alamatTinggal: Yup.string().optional(),
  merk: Yup.string().required('Merk wajib diisi'),
  tipe: Yup.string().required('Tipe wajib diisi'),
  nomorRangka: Yup.string().required('Nomor rangka wajib diisi'),
  nomorMesin: Yup.string().required('Nomor mesin wajib diisi'),
  buktiObyek: Yup.string().required('Bukti objek wajib diisi'),

  // Nilai Objek
  nilaiObyek: Yup.string().required('Mata uang wajib dipilih'),
  jumlahNilai: Yup.string()
    .required('Jumlah nilai wajib diisi')
    .matches(/^[0-9]+$/, 'Jumlah nilai harus berupa angka'),

  agreement: Yup.string().required('Agreement wajib dipilih'), // Pastikan field wajib ada
  // Nilai Penjaminan
  kategoriNilaiPenjaminan: Yup.string().required(
    'Kategori nilai penjaminan wajib dipilih'
  ),
});

export default ObyekJaminanValidationSchema;
