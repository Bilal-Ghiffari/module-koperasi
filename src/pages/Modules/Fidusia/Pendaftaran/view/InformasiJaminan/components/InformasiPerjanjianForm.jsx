import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Box, Button, Typography, Grid, Snackbar, Alert } from '@mui/material';
import TableInformasiPerjanjianPokok from './TableInformasiPerjanjianPokok';
import ModalFormKurs from './ModalFormKurs';
import {
  FormInputNested,
  FormHeaderWithButton,
} from '@/components/Common/FormFieldNested';
import { Col } from 'reactstrap';
import {
  numberToWords,
  calculateNominalRupiah,
  formatRupiah,
} from '@/utils/currencyIDR';

const InformasiPerjanjianForm = ({ formik }) => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [tableData, setTableData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        // Gunakan beberapa API untuk mendapatkan rates terbaru
        const apis = [
          'https://open.er-api.com/v6/latest/IDR',
          'https://api.exchangerate.host/latest?base=IDR',
        ];

        for (const apiUrl of apis) {
          try {
            const response = await axios.get(apiUrl);
            const rates = apiUrl.includes('er-api')
              ? response.data.rates
              : response.data.rates;

            // Validasi rates
            if (rates['USD'] && rates['IDR']) {
              setExchangeRates(rates);

              // Contoh konversi untuk validasi
              const testConversion = 100 * (1 / rates['USD']);

              return;
            }
          } catch (apiError) {
            console.warn(`Gagal mengambil dari ${apiUrl}`, apiError);
          }
        }

        // Fallback manual jika API gagal
        const manualRates = {
          USD: 1,
          IDR: 15000, // Contoh rate manual
        };
        setExchangeRates(manualRates);
      } catch (error) {
        console.error('Error fatal dalam mengambil rates:', error);

        // Rates fallback terakhir
        const fallbackRates = {
          USD: 1,
          IDR: 15000, // Rate estimasi
        };
        setExchangeRates(fallbackRates);
      }
    };

    fetchExchangeRates();
  }, []);

  const handleSaveModal = (kurs, nominal) => {
    try {
      // Validasi
      if (!kurs) throw new Error('Pilih mata uang');
      if (nominal <= 0) throw new Error('Nominal tidak valid');

      const nominalNumber = Number(nominal);
      const nominalRupiah = calculateNominalRupiah(
        kurs,
        nominalNumber,
        exchangeRates
      );
      const sebutanRupiah = numberToWords(Math.floor(nominalRupiah));

      const newEntry = {
        id: editingRow ? editingRow.id : Date.now(),
        kurs: kurs.label === 'IDR' ? 'IDR' : kurs,
        nominal: nominalNumber,
        nominalRupiah,
        nominalRupiahFormatted: formatRupiah(nominalRupiah),
        sebutan: sebutanRupiah,
      };

      const updatedData = editingRow
        ? tableData.map((item) => (item.id === editingRow.id ? newEntry : item))
        : [...tableData, newEntry];

      setTableData(updatedData);
      formik.setFieldValue('information_jaminan.perjanjianPokok', updatedData);

      // Reset state
      setOpenModal(false);
      setEditingRow(null);

      // Optional: Tampilkan sukses
      toast.success(
        editingRow ? 'Data berhasil diupdate' : 'Data berhasil ditambahkan'
      );
    } catch (error) {
      console.error('Kesalahan:', error);
      toast.error(error.message);
    }
  };
  const resetFormFields = () => {
    try {
      // Pastikan identityPenerima tidak undefined
      const currentIdentityPenerima = formik.values.information_jaminan || {};

      formik.setFieldValue('information_jaminan', {
        ...currentIdentityPenerima,
        kurs: '',
        nominal: '',
      });
    } catch (error) {
      console.error('Error resetting form fields:', error);
    }
  };
  const handleOpenModal = () => {
    setOpenModal(true);
    resetFormFields();
  };

  // Handler Edit Baris
  const handleEditRow = (row) => {
    setEditingRow(row);
    setOpenModal(true);
  };

  // Handler Hapus Baris
  const handleDeleteRow = (id) => {
    const updatedData = tableData.filter((item) => item.id !== id);
    setTableData(updatedData);
    formik.setFieldValue('information_jaminan.perjanjianPokok', updatedData);
  };

  // Handler Tutup Error Message
  const handleCloseErrorMessage = () => {
    setErrorMessage(null);
  };

  // Buat currencyData dengan struktur label dan value
  const currencyData = useMemo(() => {
    return Object.keys(exchangeRates).map((key) => ({
      label: key,
      value: key,
    }));
  }, [exchangeRates]);

  return (
    <Box sx={{ mt: 3, mb: 3 }}>
      {/* Snackbar untuk Error Message */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={handleCloseErrorMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseErrorMessage}
          severity="error"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Informasi Perjanjian Pokok
      </Typography>

      <FormHeaderWithButton
        title="Informasi Perjanjian Pokok"
        buttonText="+ Tambah"
        onButtonClick={handleOpenModal}
      />

      <TableInformasiPerjanjianPokok
        data={tableData}
        formik={formik}
        exchangeRates={exchangeRates}
        onEditRow={handleEditRow}
        onDeleteRow={handleDeleteRow}
        calculateNominalRupiah={calculateNominalRupiah}
      />

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} sm={6} md={6}>
          <FormInputNested
            formik={formik}
            name="information_jaminan.namaPerjanjian"
            title="Nama / Jenis Perjanjian"
            placeholder="Tulis nama / jenis perjanjian"
            required
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <FormInputNested
            formik={formik}
            name="information_jaminan.nomorPerjanjian"
            title="Nomor Perjanjian"
            placeholder="Tulis nomor perjanjian"
            required
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <Col xs="12" md="12" lg="12" xl="12">
            <FormInputNested
              formik={formik}
              name="information_jaminan.tanggalPerjanjian"
              title="Jangka Perjanjian"
              placeholder="Tulis jangka Perjanjian"
              type="date"
              required
              fullWidth
              sx={{ mb: 2 }}
            />
          </Col>
        </Grid>

        {/* Jangka Waktu Mulai (Date) */}
        <Grid item xs={6} sm={3} md={3}>
          <FormInputNested
            formik={formik}
            name="information_jaminan.jangkaWaktuMulai"
            title="Jangka Waktu Mulai"
            placeholder="Tulis jangka waktu mulai"
            type="date"
            required
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>

        {/* Jangka Waktu Selesai (Date) */}
        <Grid item xs={6} sm={3} md={3}>
          <FormInputNested
            formik={formik}
            name="information_jaminan.jangkaWaktuSelesai"
            title="Jangka Waktu Selesai"
            placeholder="Tulis jangka waktu selesai"
            type="date"
            required
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>

      <ModalFormKurs
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSaveModal}
        editingRow={editingRow}
        formik={formik}
        currencyData={currencyData}
        // currencyData={Object.keys(exchangeRates).map((key) => key)}
      />
    </Box>
  );
};

export default InformasiPerjanjianForm;
