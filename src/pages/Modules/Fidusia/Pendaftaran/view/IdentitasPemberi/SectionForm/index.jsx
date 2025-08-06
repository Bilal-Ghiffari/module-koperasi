import FormKoperasi from './FormInformasiKorporasi';
import FormPerseorangan from './FormInformasiPerseorangan';

const InformasiPemberiFidusia = ({ formik }) => {
  const jenis = formik.values.identity_pemberi.jenisPendaftaran?.toLowerCase();

  if (jenis === 'koperasi' || jenis === 'korporasi') {
    return <FormKoperasi formik={formik} />;
  }

  if (jenis === 'perseorangan') {
    return <FormPerseorangan formik={formik} />;
  }

  return null;
};

export default InformasiPemberiFidusia;
