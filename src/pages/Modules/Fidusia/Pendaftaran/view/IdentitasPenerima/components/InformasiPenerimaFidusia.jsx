import FormKoperasi from '../SectionForm/FormInformasiKorporasi';
import FormPerseorangan from '../SectionForm/FormInformasiPerseorangan';
import FormAsing from '../SectionForm/FormInformasiKoperasiAsing';
import SkeletonFormFields from '@/components/Common/SkeletonFormFields';

const InformasiPenerimaFidusia = ({ formik }) => {
  const jenis = formik.values.identity_penerima.jenisPendaftaran?.toLowerCase();
  const jenisKorporasi =
    formik.values.identity_penerima.jenisKorporasi?.toLowerCase();

  if (!jenis)
    return (
      <SkeletonFormFields
        count={3}
        infoMessage="Pilih Jenis  Pendaftaran terlebih dahulu"
      />
    );

  if (jenis === 'perseorangan') return <FormPerseorangan formik={formik} />;

  if (jenis === 'korporasi' && jenisKorporasi === 'asing') {
    return <FormAsing formik={formik} />;
  }

  if (jenis === 'korporasi') return <FormKoperasi formik={formik} />;

  return null;
};

export default InformasiPenerimaFidusia;
