import * as Yup from 'yup';

export const initialValuesInformasiJaminan = {
  nomorAkta: '',
  tanggalAkta: '',
  namaNotaris: '',
  namaPerjanjian: '',
  nomorPerjanjian: '',
  tanggalPerjanjian: '',
  jangkaWaktuMulai: '',
  jangkaWaktuSelesai: '',
  perjanjianPokok: [],
};

export const InformasiJaminanValidationSchema = Yup.object({
  nomorAkta: Yup.string().required('Wajib diisi'),
  tanggalAkta: Yup.date().required('Wajib diisi'),
  namaNotaris: Yup.string().required('Wajib diisi'),

  perjanjianPokok: Yup.array().of(
    Yup.object({
      kurs: Yup.string().required('Wajib diisi'),
      nominal: Yup.string().required('Wajib diisi'),
      // nominalRupiah: Yup.string().required('Wajib diisi'),
      // sebutan: Yup.string().required('Wajib diisi'),
    })
  ),

  namaPerjanjian: Yup.string().required('Wajib diisi'),
  nomorPerjanjian: Yup.string().required('Wajib diisi'),
  tanggalPerjanjian: Yup.string().required('Wajib diisi'),
  jangkaWaktuMulai: Yup.date().required('Wajib diisi'),
  jangkaWaktuSelesai: Yup.date().required('Wajib diisi'),
});

export default InformasiJaminanValidationSchema;
