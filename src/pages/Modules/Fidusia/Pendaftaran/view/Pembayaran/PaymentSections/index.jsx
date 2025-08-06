import { Box, Button } from '@mui/material';
import { useState } from 'react';
import PaymentMethodSection from './PaymentMethodSection';
import VoucherPaymentSection from './VoucherPaymentSection';
import PaymentSucces from './PaymentSucces';

const PaymentSection = ({
  formik,
  onHandleClose,
  dataPayment,
  onHandlePayment,
}) => {
  const [step, setStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState('');

  const handleNext = () => {
    if (step === 1) {
      // Pastikan metode pembayaran sudah dipilih sebelum lanjut
      if (selectedMethod) {
        setStep(2);
      }
    } else if (step === 2) {
      // Lanjut ke halaman sukses
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    // Kembali ke halaman awal
    setStep(1);
    setSelectedMethod('');
  };

  console.log('selectedMethod', selectedMethod);

  return (
    <>
      {step === 1 && (
        <PaymentMethodSection
          selectedMethod={selectedMethod}
          setSelectedMethod={setSelectedMethod}
          formik={formik}
          dataPayment={dataPayment}
        />
      )}
      {step === 2 && (
        <VoucherPaymentSection
          selectedMethod={selectedMethod}
          onNext={handleNext}
          formik={formik}
          dataPayment={dataPayment}
        />
      )}
      {step === 3 && (
        <PaymentSucces
          invoiceNumber="INV-2025-0345"
          amount={dataPayment.Tagihan}
          bankName={`Bank ${selectedMethod}`}
          onBackToHome={onHandleClose}
          dataPayment={dataPayment}
          onHandlePayment={onHandlePayment}
        />
      )}

      {/* Tampilkan tombol navigasi hanya di step 1 dan 2 */}
      {step !== 3 && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            variant="outlined"
            onClick={handleBack}
            sx={{ borderColor: '#1A237E', color: '#1A237E' }}
            disabled={step === 1}
          >
            Kembali
          </Button>
          <Button
            variant="contained"
            disabled={
              (step === 1 && selectedMethod === '') ||
              (step === 2 && !formik.isValid)
            }
            sx={{
              backgroundColor: '#1A237E',
              '&:hover': { backgroundColor: '#283593' },
            }}
            onClick={handleNext}
          >
            {step === 1 ? 'Selanjutnya' : 'Konfirmasi Pembayaran'}
          </Button>
        </Box>
      )}
    </>
  );
};

export default PaymentSection;
