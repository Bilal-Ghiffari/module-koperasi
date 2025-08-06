import LineDashed from '@/components/Common/Line/Dashed';

// Import custom components
import { FormHeaderWithButton } from '@/components/Common/FormFieldNested';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AgreementSection from './components/AgreementSection';
import JenisObjekJaminanSection from './components/JenisObjekJaminanSection';
import NilaiPenjaminanSection from './components/NilaiPenjaminanSection';
import PerhatianSection from './components/PerhatianSection';
import {
  calculateNominalRupiah,
  numberToWords,
  formatRupiah,
} from '@/utils/currencyIDR';
import { v4 as uuidv4 } from 'uuid';
import { ToastifyService } from '@/components/Toastify/toastifyService';

// Main Component
const ObyekJaminan = ({ formik }) => {
  const toastifyService = new ToastifyService();
  const [exchangeRates, setExchangeRates] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [tableData, setTableData] = useState([]);

  const objectJaminan = formik.values.object_jaminan;

  const handleCekObyek = () => {
    console.log('Cek Objek clicked');
  };

  const resetFormFields = () => {
    try {
      // Pastikan identityPenerima tidak undefined
      const currentIdentityPenerima = formik.values.object_jaminan || {};

      formik.setFieldValue('object_jaminan', {
        ...currentIdentityPenerima,
      });
    } catch (error) {
      console.error('Error resetting form fields:', error);
    }
  };

  const handleTambah = () => {
    setShowForm(true);
    resetFormFields();
  };

  const handleClose = () => {
    setShowForm(false);
  };

  const setNestedTouched = (formik, errors) => {
    const newTouched = { ...formik.touched };

    const markNestedTouched = (errorObj, currentPath = '') => {
      Object.keys(errorObj).forEach((key) => {
        const fullPath = currentPath ? `${currentPath}.${key}` : key;

        if (typeof errorObj[key] === 'object' && errorObj[key] !== null) {
          // Jika masih berbentuk objek (nested), rekursif
          if (!newTouched[key]) {
            newTouched[key] = {};
          }
          markNestedTouched(errorObj[key], fullPath);
        } else {
          // Jika sudah leaf node, set touched
          if (currentPath) {
            const [parent, child] = fullPath.split('.');
            if (!newTouched[parent]) {
              newTouched[parent] = {};
            }
            newTouched[parent][child] = true;
          } else {
            newTouched[key] = true;
          }
        }
      });
    };

    // Proses marking touched untuk semua error
    markNestedTouched(errors);

    // Set touched di formik
    formik.setTouched(newTouched, true);
  };

  const validateFormErrors = async (fieldName) => {
    try {
      const errors = await formik.validateForm(
        fieldName ? fieldName : undefined
      );

      if (Object.keys(errors).length > 0) {
        // Set all errors
        formik.setErrors(errors);

        // Create a comprehensive touched object
        const touchedFields = {};
        const markAllTouched = (errorObj, prefix = '') => {
          Object.keys(errorObj).forEach((key) => {
            const fullPath = prefix ? `${prefix}.${key}` : key;

            if (typeof errorObj[key] === 'object' && errorObj[key] !== null) {
              markAllTouched(errorObj[key], fullPath);
            } else {
              touchedFields[fullPath] = true;
            }
          });
        };

        markAllTouched(errors);

        // Set all fields as touched
        formik.setTouched(touchedFields, true);

        return { isValid: false, errors };
      }

      return { isValid: true, errors: {} };
    } catch (error) {
      console.error('Validation error:', error);
      return { isValid: false, errors: {} };
    }
  };
  // Handle save action
  const handleSimpan = async (data) => {
    const fieldsToValidate = [
      'object_jaminan.agreement',
      'object_jaminan.kategoriObyek',
      'object_jaminan.subKategoriObyek',
      'object_jaminan.alamatTinggal',
      'object_jaminan.merk',
      'object_jaminan.tipe',
      'object_jaminan.nomorRangka',
      'object_jaminan.nomorMesin',
      'object_jaminan.buktiObyek',
    ];
    try {
      const validation = await validateFormErrors(fieldsToValidate);

      if (Object.keys(validation.errors).length > 0) {
        setNestedTouched(formik, validation.errors);
        formik.setErrors(validation.errors);
        return;
      }

      if (validation.isValid) {
        const nominalNumber = Number(data.nilai);
        const nominalRupiah = calculateNominalRupiah(
          data.kurs,
          nominalNumber,
          exchangeRates
        );
        const sebutanRupiah = numberToWords(Math.floor(nominalRupiah));
        // Ambil data dari values object_jaminan

        const newNilaiPenjamin = {
          id: uuidv4(),
          ...formik.values.object_jaminan,
          kurs: data.kurs === 'IDR' ? 'IDR' : data.kurs,
          nominal: nominalNumber,
          nominalRupiah: nominalRupiah,
          nominalRupiahFormatted: formatRupiah(nominalRupiah),
          sebutan: sebutanRupiah,
        };

        const currentNilaiPenjamin =
          formik.values.object_jaminan?.nilaiPenjaminanList || [];

        // Tambahkan entri baru ke daftar
        const updatedNilaiPenjamin = [
          ...currentNilaiPenjamin,
          newNilaiPenjamin,
        ];

        formik.setFieldValue(
          'object_jaminan.nilaiPenjaminanList',
          updatedNilaiPenjamin
        );

        setTableData((prevJaminan) => [
          ...prevJaminan,
          ...updatedNilaiPenjamin,
        ]);

        toastifyService.successUpdate('Penerima Penjamin berhasil ditambahkan');
        setShowForm(false);
      }
    } catch (error) {
      console.error('Validation error:', error);
      toastifyService.customWarningMsg('Terjadi kesalahan saat menyimpan');
    }
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
    formik.setFieldValue('object_jaminan.nilaiPenjaminanList', updatedData);
  };

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

  return (
    <>
      <PerhatianSection formik={formik} onCekObyek={handleCekObyek} />
      <LineDashed />
      <FormHeaderWithButton
        title="Jenis Objek Jaminan"
        buttonText="+ Tambah"
        onButtonClick={handleTambah}
      />

      {showForm && (
        <JenisObjekJaminanSection
          formik={formik}
          onCancel={handleClose}
          onSave={handleSimpan}
          currencyData={Object.keys(exchangeRates).map((key) => ({
            value: key,
            label: key,
          }))}
        />
      )}
      <LineDashed />
      <NilaiPenjaminanSection
        data={tableData}
        formik={formik}
        exchangeRates={exchangeRates}
        onEditRow={handleEditRow}
        onDeleteRow={handleDeleteRow}
        calculateNominalRupiah={calculateNominalRupiah}
      />
      <LineDashed />
      <AgreementSection formik={formik} value={'1'} />
    </>
  );
};

export default ObyekJaminan;
