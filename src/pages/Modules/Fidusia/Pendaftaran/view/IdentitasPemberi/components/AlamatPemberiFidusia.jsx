import SkeletonFormFields from '@/components/Common/SkeletonFormFields';
import AlamatIndonesia from '../SectionForm/AlamatIndonesia';
import AlamatAsing from '../SectionForm/AlamatAsing';

const AlamatPemberiFidusia = ({ formik }) => {
  const jenis = formik.values.identity_pemberi.jenisPendaftaran?.toLowerCase();
  const kewarganegaraan =
    formik.values.identity_pemberi.kewarganegaraan?.toLowerCase();
  const jenisKorporasi =
    formik.values.identity_pemberi.jenisKorporasi?.toLowerCase();

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

export default AlamatPemberiFidusia;
