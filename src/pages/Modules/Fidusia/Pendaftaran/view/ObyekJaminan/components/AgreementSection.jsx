import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';

const AgreementSection = ({ formik, value }) => {
  const currentValue = formik.values.object_jaminan.agreement;
  const isChecked = currentValue === value;
  const handleChange = (e) => {
    formik.setFieldValue(
      'object_jaminan.agreement',
      e.target.checked ? value : ''
    );
  };
  return (
    <Box>
      {formik.errors.object_jaminan?.agreement &&
        formik.touched.object_jaminan?.agreement && (
          <Typography variant="body2" color="error">
            {formik.errors.object_jaminan.agreement}
          </Typography>
        )}
      <FormControlLabel
        control={
          <Checkbox
            // checked={formik.values.object_jaminan.agreement}
            checked={isChecked}
            onChange={(e) => handleChange(e)}
            name="object_jaminan.agreement"
          />
        }
        label="Saya menyatakan bahwa:"
      />

      {[
        'Seluruh data yang saya isi dalam permohonan Pendaftaran Jaminan Fidusia adalah benar dan menjadi tanggung jawab saya sebagai pemohon.',
        'Kementerian Hukum dan Hak Asasi Manusia Republik Indonesia tidak bertanggung jawab atas kebenaran materiil data yang diajukan, termasuk kesalahan pengisian.',
        'Data elektronik dan penyimpanan dokumen fisik sepenuhnya menjadi tanggung jawab Penerima Fidusia, kuasa, atau wakilnya.',
      ].map((text, index) => (
        <Typography key={index} variant="body2" sx={{ marginLeft: 4 }}>
          {index + 1}. {text}
        </Typography>
      ))}
    </Box>
  );
};

export default AgreementSection;
