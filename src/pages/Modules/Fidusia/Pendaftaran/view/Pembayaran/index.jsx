import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Modal,
  Paper,
  Divider,
  Dialog,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ahulinkLogo from '@/assets/logo/image 70.png';
import Header from '../../Header';

// Importing the PaymentSection component
import PaymentSection from './PaymentSections'; // Adjust the path to where PaymentSection is located
import { PaymentOutlined } from '@mui/icons-material';

const PaymentPage = ({ formik }) => {
  const [openPaymentMethodModal, setOpenPaymentMethodModal] = useState(false);
  const [dataPayment, setDataPayment] = useState(
    {
      'Kode Voucher': '8202506255023667',
      'Nama Pemohon': 'ANA',
      'Email Pemohon': 'riffana856@gmail.com',
      'Nomor HP': '085893118367',
      Wilayah: 'DKI JAKARTA',
      'Tanggal Transaksi': '25 Juni 2025 15:02:29',
      'Tanggal Expired': '02 Juli 2025 23:59:00',
      Tagihan: '15000000',
      Status: 'BELUM BAYAR',
      // highlight: true,
    } || null
  );

  const handleOpenPaymentMethodModal = (boolean) => {
    setOpenPaymentMethodModal(boolean);
  };

  const handlePayment = (paymentInfo) => {
    console.log('data');
    setDataPayment({ ...dataPayment, Status: paymentInfo });
  };
  const PaymentMethodModal = () => {
    return (
      <Modal
        keepMounted
        open={openPaymentMethodModal}
        onClose={() => handleOpenPaymentMethodModal(false)}
        disableEscapeKeyDown
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <Box
          sx={{
            width: '90%',
            maxWidth: 600,
            minWidth: 300,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* Integrate the PaymentSection here */}
          <PaymentSection
            formik={formik}
            dataPayment={dataPayment}
            onHandlePayment={handlePayment}
            onHandleClose={() => handleOpenPaymentMethodModal(false)}
          />
        </Box>
      </Modal>
    );
  };

  return (
    <>
      <Header label="Tagihan Pembayaran" isEdit={false} />
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          {/* Logo Kementerian */}
          <Box
            component="img"
            src={ahulinkLogo}
            alt="Kemenhumham Logo"
            sx={{
              height: 100,
              mb: 2,
              mx: 'auto',
              display: 'block',
            }}
          />

          <Typography variant="h5" gutterBottom>
            DIREKTORAT JENDERAL AHU
          </Typography>
          <Typography variant="subtitle1" color="green" gutterBottom>
            BUKTI PEMESANAN NOMOR VOUCHER
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Pendaftaran Fidusia - Kementerian Hukum dan HAM
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Voucher Details */}
          {Object.keys(dataPayment).map((key, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                py: 1,
                borderBottom:
                  index < Object.keys(dataPayment).length - 1
                    ? '1px solid'
                    : 'none',
                borderColor: 'divider',
                color:
                  key === 'Status' && dataPayment[key] === 'BELUM BAYAR'
                    ? 'error.main' // Warna merah untuk status 'BELUM BAYAR'
                    : key === 'Status' && dataPayment[key] === 'SUKSES'
                    ? 'success.main' // Warna hijau untuk status 'SUKSES'
                    : 'inherit',
                fontWeight:
                  key === 'Status' && dataPayment[key] === 'BELUM BAYAR'
                    ? 'bold'
                    : key === 'Status' && dataPayment[key] === 'SUKSES'
                    ? 'bold' // Menebalkan font untuk status 'SUKSES'
                    : 'normal',
              }}
            >
              <Typography>{key}</Typography>
              <Typography>
                {key === 'Tagihan'
                  ? new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    }).format(dataPayment[key])
                  : dataPayment[key]}
              </Typography>
            </Box>
          ))}
        </Paper>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 3,
            gap: 2,
            mb: 4,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            sx={{
              width: 'auto',
              backgroundColor: '#fff',
              color: '#041662',
              border: '1px solid #041662',
            }}
          >
            Download
          </Button>
          <Button
            startIcon={<PaymentOutlined />}
            variant="contained"
            color="primary"
            fullWidth
            disabled={dataPayment.Status === 'SUKSES'}
            onClick={() => {
              setDataPayment(dataPayment);
              handleOpenPaymentMethodModal(true);
            }}
            sx={{
              width: 'auto',
              mr: 1,
              backgroundColor: '#041662',
              color: '#fff',
              border: '1px solid transparent',
              px: 2,
              py: 1,
              textTransform: 'initial',
              '&:hover': {
                backgroundColor: '#041992',
                color: '#fff',
              },
            }}
          >
            {dataPayment.Status === 'BELUM BAYAR'
              ? 'Bayar Sekarang'
              : 'Sudah Bayar'}
          </Button>
        </Box>

        <PaymentMethodModal />
      </Container>
    </>
  );
};

export default PaymentPage;
