import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Checkbox,
  Box,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TableKegiatanUsaha from "./TableKegiatanUsaha";
import MaksudTujuan from "./Popup/MaksudTujuan";
import Modal from "./Popup/Modal";
import PemegangSaham from "./Popup/PemegangSaham";
import PemilikManfaat from "./Popup/PemilikManfaat";

const PopupTable = ({
  formik,
  type,
  setOpen,
  open,
  editingIndex,
  setEditingIndex,
  setEditOpen,
}) => {
  // Dummy data tabel
  const tableData = [
    { id: 1, kode: "1234", judul: "Judul KBLI A", uraian: "Uraian singkat A" },
    { id: 2, kode: "5678", judul: "Judul KBLI B", uraian: "Uraian singkat B" },
    { id: 3, kode: "9012", judul: "Judul KBLI C", uraian: "Uraian singkat C" },
  ];

  const handleOpen = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
    setEditingIndex(null);
  };
  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
    setEditOpen(false);
    setEditingIndex(null);
  };

  return (
    <div>
      <button
        type="button"
        className="px-2 py-2 border-0 text-primary d-flex align-items-center gap-1 px-3"
        onClick={(e) => handleOpen(e)}
        style={{
          backgroundColor: "#E7E7E7", // abu-abu muda
          borderRadius: "6px", // optional: biar agak rounded
        }}
      >
        + Tambah
      </button>

      <Dialog
        open={open}
        onClose={(e) => {
          handleClose(e);
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          <div className="text-center w-100">
            <p className="m-0 p-0 fs-5 fw-bold">{type}</p>
          </div>
          <IconButton
            onClick={(e) => {
              handleClose(e);
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {type == "Maksud dan Tujuan" && (
            <MaksudTujuan
              formik={formik}
              editingIndex={editingIndex}
              setEditingIndex={setEditingIndex}
            />
          )}
          {type == "Kegiatan Usaha" && (
            <TableKegiatanUsaha
              data={tableData}
              formik={formik}
              type={"Kegiatan Usaha"}
            />
          )}

          {type == "Modal Dasar" && (
            <Modal
              formik={formik}
              fieldName="modal_dasar"
              editingIndex={editingIndex}
              setEditingIndex={setEditingIndex}
            />
          )}
          {type == "Modal Ditempatkan" && (
            <Modal
              formik={formik}
              fieldName="modal_ditempatkan"
              editingIndex={editingIndex}
              setEditingIndex={setEditingIndex}
            />
          )}
          {type == "Pengurus dan Pemegang Saham" && (
            <PemegangSaham
              formik={formik}
              editingIndex={editingIndex}
              setEditingIndex={setEditingIndex}
            />
          )}
          {type == "Pemilik Manfaat" && (
            <PemilikManfaat
              formik={formik}
              editingIndex={editingIndex}
              setEditingIndex={setEditingIndex}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopupTable;
