import { CancelOutlined, SaveAs } from "@mui/icons-material";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import get from "lodash/get";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Komponen Import
import { CustomButton } from "@/components/Common/CustomBUtton";
import { FormHeaderWithButton } from "@/components/Common/FormField";
import LineDashed from "@/components/Common/Line/Dashed";
import { ToastifyService } from "@/components/Toastify/toastifyService";
import AlamatPenerimaFidusia from "./components/AlamatPenerimaFidusia";
import InformasiPenerimaFidusia from "./components/InformasiPenerimaFidusia";
import JenisPenerimaFidusia from "./components/JenisPenerimaFidusia";

const FormIdentitasPenerima = ({ formik, disabled = false }) => {
  const [showForm, setShowForm] = useState(false);
  const toastifyService = new ToastifyService();

  const identityPenerima = get(formik.values, "identity_penerima", {});
  const penerima_fidusia = Array.isArray(
    formik.values?.identity_penerima?.penerima_fisudia
  )
    ? formik.values.identity_penerima.penerima_fisudia
    : identityPenerima.penerima_fidusia || [];

  // Fungsi reset field
  const resetFormFields = () => {
    try {
      // Pastikan identityPenerima tidak undefined
      const currentIdentityPenerima = formik.values.identity_penerima || {};

      formik.setFieldValue("identity_penerima", {
        ...currentIdentityPenerima,
        jenisPendaftaran: "",
        jenisKorporasi: "",
        namaPenerima: "",
        email: "",
        noTelp: "",
        kewarganegaraan: "",
        alamat: "",
        penerima_fidusia: penerima_fidusia,
      });
    } catch (error) {
      console.error("Error resetting form fields:", error);
    }
  };

  // Tampilkan form input
  const handleTambah = () => {
    setShowForm(true);
    resetFormFields();
  };

  const setNestedTouched = (formik, errors) => {
    const newTouched = { ...formik.touched };

    const markNestedTouched = (errorObj, currentPath = "") => {
      Object.keys(errorObj).forEach((key) => {
        const fullPath = currentPath ? `${currentPath}.${key}` : key;

        if (typeof errorObj[key] === "object" && errorObj[key] !== null) {
          // Jika masih berbentuk objek (nested), rekursif
          if (!newTouched[key]) {
            newTouched[key] = {};
          }
          markNestedTouched(errorObj[key], fullPath);
        } else {
          // Jika sudah leaf node, set touched
          if (currentPath) {
            const [parent, child] = fullPath.split(".");
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

  const validateFormErrors = async () => {
    try {
      const errors = await formik.validateForm();

      if (Object.keys(errors).length > 0) {
        // Set all errors
        formik.setErrors(errors);

        // Create a comprehensive touched object
        const touchedFields = {};
        const markAllTouched = (errorObj, prefix = "") => {
          Object.keys(errorObj).forEach((key) => {
            const fullPath = prefix ? `${prefix}.${key}` : key;

            if (typeof errorObj[key] === "object" && errorObj[key] !== null) {
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
      console.error("Validation error:", error);
      return { isValid: false, errors: {} };
    }
  };

  const handleSimpan = async () => {
    try {
      const validation = await validateFormErrors();

      if (Object.keys(validation.errors).length > 0) {
        setNestedTouched(formik, validation.errors);
        formik.setErrors(validation.errors);
        return;
      }

      if (validation.isValid) {
        // Ambil data dari values identity_penerima
        const newPenerimaFidusia = {
          id: uuidv4(), // Generate unique ID
          ...formik.values.identity_penerima, // Spread seluruh data identity_penerima
        };

        // Dapatkan daftar penerima_fidusia saat ini
        const currentPenerimaFidusia =
          formik.values.identity_penerima?.penerima_fidusia || [];

        // Tambahkan entri baru ke daftar
        const updatedPenerimaFidusia = [
          ...currentPenerimaFidusia,
          newPenerimaFidusia,
        ];

        formik.setFieldValue(
          "identity_penerima.penerima_fidusia",
          updatedPenerimaFidusia
        );

        toastifyService.successUpdate("Penerima Fidusia berhasil ditambahkan");
        setShowForm(false);
      }
    } catch (error) {
      console.error("Validation error:", error);
      toastifyService.customWarningMsg("Terjadi kesalahan saat menyimpan");
    }
  };

  const handleBatal = () => {
    setShowForm(false);
  };

  // Hapus entri
  const handleDelete = (id) => {
    const updatedEntries = penerima_fidusia.filter((entry) => entry.id !== id);

    formik.setFieldValue("identity_penerima.penerima_fisudia", updatedEntries);
    toastifyService.successUpdate("Penerima Fidusia berhasil dihapus");
  };

  return (
    <Box>
      <FormHeaderWithButton
        title="Informasi Penerima Fidusia"
        buttonText="+ Tambah"
        onButtonClick={handleTambah}
      />

      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>No Telepon</TableCell>
              <TableCell>Jenis Korporasi</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {penerima_fidusia.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Data
                </TableCell>
              </TableRow>
            ) : (
              penerima_fidusia?.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.namaPenerima}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.noTelp}</TableCell>
                  <TableCell>{row.jenisKorporasi}</TableCell>
                  <TableCell>
                    <Button color="error" onClick={() => handleDelete(row.id)}>
                      Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Form Input */}
      {showForm && (
        <Box sx={{ border: "1px solid #e0e0e0", borderRadius: 2, p: 2, mb: 2 }}>
          <JenisPenerimaFidusia formik={formik} />
          <LineDashed />
          <InformasiPenerimaFidusia formik={formik} />
          <LineDashed />
          <AlamatPenerimaFidusia formik={formik} disabled={disabled} />

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <CustomButton
              text={"Batal"}
              bgColor="transparent"
              border="1px solid #E7E7E7"
              textColor="#041662"
              onClick={handleBatal}
              leftIcon={<CancelOutlined fontSize="14" />}
            />
            <CustomButton
              onClick={handleSimpan}
              text="Simpan"
              leftIcon={<SaveAs fontSize="14" />}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FormIdentitasPenerima;
