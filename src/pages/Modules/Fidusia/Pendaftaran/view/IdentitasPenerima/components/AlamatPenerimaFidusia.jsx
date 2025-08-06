import SkeletonFormFields from '@/components/Common/SkeletonFormFields';
import AlamatIndonesia from '../SectionForm/AlamatIndonesia';
import AlamatAsing from '../SectionForm/AlamatAsing';

const AlamatPenerimaFidusia = ({ formik }) => {
  const jenis = formik.values.identity_penerima.jenisPendaftaran?.toLowerCase();
  const kewarganegaraan =
    formik.values.identity_penerima.kewarganegaraan?.toLowerCase();
  const jenisKorporasi =
    formik.values.identity_penerima.jenisKorporasi?.toLowerCase();

  // if (!jenis && !kewarganegaraan && !jenisKorporasi)
  //   return <SkeletonFormFields count={3} />;

  if (
    kewarganegaraan === 'wni' ||
    jenisKorporasi === 'indonesia' ||
    jenisKorporasi === 'lainnya'
  ) {
    return <AlamatIndonesia formik={formik} />;
  }

  if (kewarganegaraan === 'wna' || jenisKorporasi === 'asing') {
    return <AlamatAsing formik={formik} />;
  }

  return (
    <SkeletonFormFields
      count={3}
      infoMessage="Pilih Jenis Sub Pendaftaran terlebih dahulu"
    />
  );
};

export default AlamatPenerimaFidusia;
