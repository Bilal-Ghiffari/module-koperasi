import React from 'react';
import { Box, Typography } from '@mui/material';

// Import custom components
import { FormHeader } from '@/components/Common/FormField';
import { DynamicDropdown } from '@/components/DynamicDropdown';
import TableNilaiPenjamin from './TableNilaiPenjamin';
import { RENTANG_NOMINAL } from '../../../Constants/master';

const NilaiPenjaminanSection = ({
  data = [],
  formik,
  showSelect = true,
  exchangeRates,
  onEditRow,
  onDeleteRow,
  calculateNominalRupiah,
  kurs,
}) => {
  return (
    <>
      <FormHeader title="Nilai Penjaminan" />
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        Jaminan ini diberikan untuk menjamin pelunasan utang pemberi fidusia
        sejumlah:
      </Typography>

      {/* Table for Nilai Penjaminan */}
      <TableNilaiPenjamin
        data={data}
        formik={formik}
        exchangeRates={exchangeRates}
        onEditRow={onEditRow}
        onDeleteRow={onDeleteRow}
        calculateNominalRupiah={calculateNominalRupiah}
      />

      {/* DynamicDropdown for Kategori Nilai Penjaminan */}
      <Box sx={{ marginTop: 2 }}>
        <DynamicDropdown
          formik={formik}
          fieldName="object_jaminan.kategoriNilaiPenjaminan"
          label="Kategori Nilai Penjaminan *"
          data={RENTANG_NOMINAL}
          placeholder="Pilih kategori nilai penjaminan"
          required
        />
      </Box>
    </>
  );
};

export default NilaiPenjaminanSection;
