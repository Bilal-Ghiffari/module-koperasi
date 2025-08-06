import LineDashed from '@/components/Common/Line/Dashed';
import { useEffect, useRef } from 'react';
import AlamatPemberiFidusia from './components/AlamatPemberiFidusia';
import InformasiPemberiFidusia from './components/InformasiPemberiFidusia';
import JenisPemberiFidusia from './components/JenisPemberiFidusia';
const FormIdentitasPemberi = ({ formik, disabled = false }) => {
  const { values } = formik;

  const identity_pemberi = values.identity_pemberi;

  const prevJenisPendaftaran = useRef();
  const prevJenisKorporasi = useRef();
  const prevKewarganegaraan = useRef();

  // Reset berdasarkan jenisPendaftaran
  useEffect(() => {
    const current = identity_pemberi.jenisPendaftaran;
    if (
      prevJenisPendaftaran.current &&
      prevJenisPendaftaran.current !== current
    ) {
      if (current === 'perseorangan') {
        formik.setFieldValue('identity_pemberi.jenisKorporasi', '');
        formik.setFieldValue('identity_pemberi.jenisSubKorporasi', '');
        formik.setFieldValue('identity_pemberi.jenisBadanHukum', '');
      } else if (current === 'korporasi') {
        formik.setFieldValue('identity_pemberi.kewarganegaraan', '');
        formik.setFieldValue('identity_pemberi.jenisPenggunaan', '');
        formik.setFieldValue('identity_pemberi.jenisSubPenggunaan', '');
      }
    }
    prevJenisPendaftaran.current = current;
  }, [identity_pemberi.jenisPendaftaran]);

  // Reset berdasarkan jenisKorporasi
  useEffect(() => {
    const current = identity_pemberi.jenisKorporasi;
    if (prevJenisKorporasi.current && prevJenisKorporasi.current !== current) {
      if (current === 'asing') {
        formik.setFieldValue('identity_pemberi.npwp', '');
        formik.setFieldValue('identity_pemberi.noSK', '');
        formik.setFieldValue('identity_pemberi.kantorCabang', '');
      }
    }
    prevJenisKorporasi.current = current;
  }, [identity_pemberi.jenisKorporasi]);

  // Reset berdasarkan kewarganegaraan
  useEffect(() => {
    const current = identity_pemberi.kewarganegaraan;
    if (
      prevKewarganegaraan.current &&
      prevKewarganegaraan.current !== current
    ) {
      if (current === 'wna') {
        formik.setFieldValue('identity_pemberi.npwp', '');
        formik.setFieldValue('identity_pemberi.nik', '');
      } else if (current === 'wni') {
        formik.setFieldValue('identity_pemberi.negaraAsal', '');
        formik.setFieldValue('identity_pemberi.noPaspor', '');
      }
    }
    prevKewarganegaraan.current = current;
  }, [identity_pemberi.kewarganegaraan]);

  return (
    <>
      <JenisPemberiFidusia formik={formik} />
      <LineDashed />
      <InformasiPemberiFidusia formik={formik} />
      <LineDashed />
      <AlamatPemberiFidusia formik={formik} disabled={disabled} />
    </>
  );
};

export default FormIdentitasPemberi;
