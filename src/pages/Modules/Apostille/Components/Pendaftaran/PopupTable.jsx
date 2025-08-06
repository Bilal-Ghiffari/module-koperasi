import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Header from "../../../Fidusia/Header";
import { Row, Col, Label } from "reactstrap";
import Checked from "@/components/Common/Checked";
import { FormInput } from "@/components/Common/FormField";
import { DynamicDropdown } from "@/components/DynamicDropdown";
import FileUploadComponent from "@/components/Common/UploadFile";
import ButtonCustom from "@/components/Common/ButtonCustom";
import { removeWord } from "@/helpers/services/convert";
import { dummyJenisDocument } from "../mock";

const PopupTable = ({
  formik,
  open,
  setOpen,
  setDataDocuments,
  dataDocuments,
}) => {
  const handleClose = () => setOpen(false);

  const handleSaveDocument = () => {
    const currentDocIdx = dataDocuments[0];
    const newDoc = formik.values.data_document[currentDocIdx];

    // Hapus slot kosong (null atau doc kosong)
    const existingDocs = formik.values.data_document.filter(
      (doc, idx) =>
        idx !== currentDocIdx && doc && doc.nama_document?.trim() !== ""
    );

    // Tambah doc baru ke list lama
    const updatedDocs = [...existingDocs, newDoc];

    // Tambahkan slot kosong baru untuk berikutnya
    const initialDocumentObject = {
      tipe_document: "dokumen_konvesional",
      jenis_document: "",
      nama_document: "",
      nama_pemilik_document: "",
      jumlah_document: "",
      tanggal_document: "",
      tempat_cetak: "",
      instansi_pejabat: "",
      nama_pejabat: "",
      jabatan: "",
      lampiran_document: [null],
    };

    formik.setFieldValue("data_document", [
      ...updatedDocs,
      initialDocumentObject,
    ]);

    // Reset index pointer ke slot kosong
    setDataDocuments([updatedDocs.length]);
  };

  return (
    <div>
      <button
        className="px-2 py-2 border-0 text-primary d-flex align-items-center gap-1 px-3"
        onClick={() => {
          // Hitung index baru
          const nextIndex = formik.values.data_document.length;

          // Set dataDocuments ke index baru untuk render form kosong
          setDataDocuments([nextIndex]);

          // Buka popup
          setOpen(true);
        }}
        style={{ backgroundColor: "#E7E7E7", borderRadius: "6px" }}
      >
        + Tambah
      </button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Header label="Data Dokumen" />
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {dataDocuments.map((docIndex, docIdx) => {
            return (
              <div key={docIdx} className="border rounded-2 mb-3 p-3">
                {/* Tipe Dokumen */}
                <Row>
                  <Label>
                    Tipe Dokumen{" "}
                    {removeWord(formik.values?.document, "Dokumen")}
                    <span className="text-danger">*</span>
                  </Label>
                  <Col
                    xs="12"
                    style={{ padding: "0px 40px" }}
                    className="d-flex gap-5 mb-3"
                  >
                    <Checked
                      label={`Dokumen ${removeWord(
                        formik?.values.document || "",
                        "Dokumen"
                      )} Konvesional`}
                      value="Dokumen Konvesional"
                      fieldName={`data_document[${docIndex}].tipe_document`}
                      formik={formik}
                    />
                    <Checked
                      label={`Dokumen ${removeWord(
                        formik?.values.document || "",
                        "Dokumen"
                      )} Elektronik`}
                      value="Dokumen Elektronik"
                      fieldName={`data_document[${docIndex}].tipe_document`}
                      formik={formik}
                    />
                  </Col>
                </Row>

                {/* Input fields */}
                <Row>
                  <Col xs="12" md="6" lg="4" xl="6" className="px-3">
                    <DynamicDropdown
                      formik={formik}
                      fieldName={`data_document[${docIndex}].jenis_document`}
                      data={dummyJenisDocument}
                      label={`Jenis Dokumen ${removeWord(
                        formik?.values.document || "",
                        "Dokumen"
                      )}`}
                      required
                    />
                  </Col>
                  <Col xs="12" md="6" lg="4" xl="6" className="px-3">
                    <FormInput
                      formik={formik}
                      name={`data_document[${docIndex}].nama_document`}
                      type="text"
                      placeholder={`Nama Dokumen ${removeWord(
                        formik?.values.document || "",
                        "Dokumen"
                      )}`}
                      required
                    />
                  </Col>
                  <Col xs="12" md="6" lg="4" xl="6" className="px-3">
                    <FormInput
                      formik={formik}
                      name={`data_document[${docIndex}].nomor_document`}
                      type="text"
                      placeholder={`Nomor Dokumen ${removeWord(
                        formik?.values.document || "",
                        "Dokumen"
                      )}`}
                      required
                    />
                  </Col>
                  <Col xs="12" md="6" lg="4" xl="6" className="px-3">
                    <FormInput
                      formik={formik}
                      name={`data_document[${docIndex}].nama_pemilik_document`}
                      type="text"
                      placeholder={`Nama Pemilik Dokumen ${removeWord(
                        formik?.values.document || "",
                        "Dokumen"
                      )}`}
                      required
                    />
                  </Col>
                  <Col xs="12" md="6" lg="4" xl="6" className="px-3">
                    <FormInput
                      formik={formik}
                      name={`data_document[${docIndex}].jumlah_document`}
                      type="number"
                      placeholder={`Jumlah Dokumen ${removeWord(
                        formik?.values.document || "",
                        "Dokumen"
                      )}`}
                      required
                    />
                  </Col>
                  <Col xs="12" md="6" lg="4" xl="6" className="px-3">
                    <FormInput
                      formik={formik}
                      name={`data_document[${docIndex}].tanggal_document`}
                      type="date"
                      placeholder={`Tanggal Dokumen ${removeWord(
                        formik?.values.document || "",
                        "Dokumen"
                      )}`}
                      required
                    />
                  </Col>
                  <Col xs="12" md="6" lg="4" xl="6" className="px-3">
                    <DynamicDropdown
                      formik={formik}
                      fieldName={`data_document[${docIndex}].tempat_cetak`}
                      data={[]}
                      label="Tempat Cetak Sticker Legalisasi"
                      required
                    />
                  </Col>
                </Row>

                {/* Lampiran */}
                <Col xs="12" className="px-3 border p-2 rounded-2 mt-3">
                  <Label>
                    Lampiran Dokumen{" "}
                    {removeWord(formik?.values.document, "Dokumen")}{" "}
                    <span className="text-danger">*</span>
                  </Label>
                  <Row>
                    {(Array.isArray(
                      formik.values.data_document?.[docIndex]?.lampiran_document
                    )
                      ? formik.values.data_document?.[docIndex]
                          ?.lampiran_document
                      : [null]
                    ).map((file, idx) => {
                      return (
                        <Row key={idx} className="mt-2">
                          <Col xs="8">
                            <FileUploadComponent
                              text={`Pilih file Anda ${idx + 1}`}
                              name={`data_document[${docIndex}].lampiran_document[${idx}]`}
                              fieldValue={
                                formik.values?.data_document?.[docIndex]
                                  ?.lampiran_document?.[idx]
                              }
                              resFile={(newFile) => {
                                const updatedDocs =
                                  formik.values.data_document.map(
                                    (doc, dIdx) => {
                                      if (dIdx !== docIndex) return doc;
                                      return {
                                        ...doc,
                                        lampiran_document: (Array.isArray(
                                          doc.lampiran_document
                                        )
                                          ? doc.lampiran_document
                                          : [null]
                                        ).map((f, fIdx) =>
                                          fIdx === idx ? newFile : f
                                        ),
                                      };
                                    }
                                  );
                                formik.setFieldValue(
                                  "data_document",
                                  updatedDocs
                                );
                              }}
                              maxSizeMb={10}
                              validType="pdf"
                              specified
                              required
                            />
                          </Col>
                          <Col
                            xs="4"
                            className="d-flex align-items-center gap-2"
                          >
                            {idx ===
                              (formik.values.data_document?.[docIndex]
                                ?.lampiran_document?.length ?? 0) -
                                1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedDocs =
                                    formik.values.data_document.map(
                                      (doc, dIdx) => {
                                        if (dIdx !== docIndex) return doc;
                                        return {
                                          ...doc,
                                          lampiran_document: [
                                            ...(Array.isArray(
                                              doc.lampiran_document
                                            )
                                              ? doc.lampiran_document
                                              : [null]),
                                            null,
                                          ],
                                        };
                                      }
                                    );
                                  formik.setFieldValue(
                                    "data_document",
                                    updatedDocs
                                  );
                                }}
                                className="btn btn-light border"
                              >
                                +
                              </button>
                            )}

                            {(formik.values.data_document?.[docIndex]
                              ?.lampiran_document?.length ?? 0) > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedDocs =
                                    formik.values.data_document.map(
                                      (doc, dIdx) => {
                                        if (dIdx !== docIndex) return doc;
                                        return {
                                          ...doc,
                                          lampiran_document: (Array.isArray(
                                            doc.lampiran_document
                                          )
                                            ? doc.lampiran_document
                                            : [null]
                                          ).filter((_, i) => i !== idx),
                                        };
                                      }
                                    );
                                  formik.setFieldValue(
                                    "data_document",
                                    updatedDocs
                                  );
                                }}
                                className="btn btn-danger border"
                              >
                                -
                              </button>
                            )}
                          </Col>
                        </Row>
                      );
                    })}
                  </Row>
                </Col>

                {/* Data Pejabat */}
                <Col xs="12" className="mt-4">
                  <Header label="Data Pejabat" />
                </Col>
                <Row>
                  <Col xs="12" md="6" lg="4" xl="4" className="px-3">
                    <DynamicDropdown
                      formik={formik}
                      fieldName={`data_document[${docIndex}].instansi_pejabat`}
                      data={[]}
                      label="Instansi Pejabat Publik"
                      required
                    />
                  </Col>
                  <Col xs="12" md="6" lg="4" xl="4" className="px-3">
                    <FormInput
                      formik={formik}
                      name={`data_document[${docIndex}].nama_pejabat`}
                      type="text"
                      placeholder="Nama Pejabat Publik"
                      required
                    />
                  </Col>
                  <Col xs="12" md="6" lg="4" xl="4" className="px-3">
                    <DynamicDropdown
                      formik={formik}
                      fieldName={`data_document[${docIndex}].jabatan`}
                      data={[]}
                      label="Jabatan"
                      required
                    />
                  </Col>
                </Row>
              </div>
            );
          })}

          {/* Tombol Simpan */}
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <ButtonCustom onClick={handleSaveDocument} label="Simpan" />
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopupTable;
