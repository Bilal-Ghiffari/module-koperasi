import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { DynamicDropdown } from '@/components/DynamicDropdown'; // Import DynamicDropdown

const ModalFormKurs = ({ open, onClose, onSave, formik, currencyData }) => {
  const [kurs, setKurs] = useState(''); // State for Kurs
  const [nominal, setNominal] = useState(''); // State for Nominal

  const handleSave = () => {
    onSave(kurs, nominal); // Trigger onSave with kurs and nominal values
    onClose(); // Close the modal after saving
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: '16px',
        },
      }}
      disableEscapeKeyDown
      disableBackdropClick
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 600 }}>
        Tambah Nilai
      </DialogTitle>
      <DialogContent>
        <Typography
          variant="body2"
          sx={{ marginBottom: 2, textAlign: 'center', color: '#6c757d' }}
        >
          Silakan tambah nilai jaminan
        </Typography>

        <div style={{ marginBottom: '20px' }}>
          <DynamicDropdown
            formik={formik}
            fieldName="kurs"
            data={currencyData}
            label="Pilih KURS"
            required={true}
            isDisabled={false}
            onChange={(value) => {
              setKurs(value);
              formik.setFieldValue('information_jaminan.kurs', value);
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <TextField
            label="Nominal"
            type="number"
            value={nominal}
            onChange={(e) => setNominal(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
            InputProps={{
              style: {
                borderRadius: '12px',
                padding: '10px 16px',
              },
            }}
          />
        </div>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', padding: '20px' }}>
        <Button
          onClick={onClose}
          color="primary"
          variant="outlined"
          sx={{
            width: '30%',
            borderRadius: '20px',
            marginRight: '10px',
            fontSize: '14px',
            textTransform: 'none',
            color: '#041662',
            borderColor: '#041662',
          }}
        >
          Kembali
        </Button>
        <Button
          onClick={handleSave}
          color="primary"
          variant="contained"
          sx={{
            width: '30%',
            borderRadius: '20px',
            fontSize: '14px',
            textTransform: 'none',
            backgroundColor: '#041662',
            color: '#fff',
          }}
        >
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalFormKurs;
