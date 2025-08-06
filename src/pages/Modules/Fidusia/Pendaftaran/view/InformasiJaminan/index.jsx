import { Box } from '@mui/material';
import AktaNotarisForm from './components/AktaNotarisForm';
import InformasiPerjanjianForm from './components/InformasiPerjanjianForm';
Box;
const FormInformasiJaminan = ({ formik }) => {
  return (
    <>
      <AktaNotarisForm formik={formik} />
      <InformasiPerjanjianForm formik={formik} />
    </>
  );
};

export default FormInformasiJaminan;
