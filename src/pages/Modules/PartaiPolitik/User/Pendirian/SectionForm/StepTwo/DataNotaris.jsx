import {
  FormHeader,
  FormHeaderWithButton,
} from "@/components/Common/FormField";
import {
  AutoUploadFormFile,
  FormInput,
} from "@/pages/Modules/PartaiPolitik/components/FormField";
import { CustomButton } from "@/components/Common/CustomBUtton";
import React from "react";
import { Col, Row } from "reactstrap";
import { FieldArray } from "formik";
import { Add, Delete } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

export default function DataNotaris({ formik }) {
  console.log("🚀 ~ DataNotaris ~ formik:", formik);
  return (
    <>
      <FormHeaderWithButton
        title={"Data Notaris"}
        buttonText={"Tambah"}
        onButtonClick={() =>
          formik.setFieldValue("data_notaris", [
            ...formik.values.data_notaris,
            {
              nama_notaris: "",
              kedudukan_notaris: "",
              nomor_akta: "",
              tanggal_akta: "",
              prihal_akta: "",
              file_akta: null,
            },
          ])
        }
      />
      <FieldArray name="data_notaris">
        {({ push, remove }) => (
          <>
            {formik.values.data_notaris.map((notaris, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                {/* Header for each notaris entry */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                    p: 1,
                    backgroundColor: "#f8f9fa",
                    borderRadius: 1,
                    // border: "1px solid #e9ecef",
                  }}
                >
                  <Typography
                    variant="h8"
                    sx={{ fontWeight: "bold", color: "#041662" }}
                  >
                    Data Notaris {index + 1}
                  </Typography>
                  {formik.values.data_notaris.length > 1 && (
                    <IconButton
                      onClick={() => remove(index)}
                      sx={{
                        color: "#dc3545",
                        "&:hover": {
                          backgroundColor: "rgba(220, 53, 69, 0.1)",
                        },
                      }}
                    >
                      <Delete />
                    </IconButton>
                  )}
                </Box>

                {/* Form fields for each notaris */}
                <Row>
                  <Col xs="12" md="6" lg="6" xl="6">
                    <FormInput
                      formik={formik}
                      name={`data_notaris.${index}.nama_notaris`}
                      type="text"
                      placeholder="Tulis nama notaris"
                      title="Nama Notaris"
                      required
                    />
                  </Col>
                  <Col xs="12" md="6" lg="6" xl="6">
                    <FormInput
                      formik={formik}
                      name={`data_notaris.${index}.kedudukan_notaris`}
                      type="text"
                      placeholder="Tulis kedudukan notaris"
                      title="Kedudukan"
                      required
                    />
                  </Col>
                  <Col xs="12" md="6" lg="6" xl="6">
                    <FormInput
                      formik={formik}
                      name={`data_notaris.${index}.nomor_akta`}
                      type="text"
                      placeholder="Tulis nomor akta"
                      title="Nomor Akta"
                      required
                    />
                  </Col>
                  <Col xs="12" md="6" lg="6" xl="6">
                    <FormInput
                      formik={formik}
                      name={`data_notaris.${index}.tanggal_akta`}
                      type="date"
                      placeholder="Tulis tanggal akta"
                      title="Tanggal Akta"
                      required
                    />
                  </Col>
                  <Col xs="12" md="6" lg="6" xl="6">
                    <FormInput
                      formik={formik}
                      name={`data_notaris.${index}.prihal_akta`}
                      type="textarea"
                      placeholder="Tulis perihal akta"
                      title="Perihal Akta"
                      required
                    />
                  </Col>
                  <Col xs="12" md="6" lg="6" xl="6">
                    <AutoUploadFormFile
                      formik={formik}
                      name={`data_notaris.${index}.file_akta`}
                      label="Dokumen Akta"
                      acceptedFileTypes={["application/pdf"]}
                      maxFileSizeMB={5}
                      required
                      // onAutoUpload={autoUploadFile}
                      // uploadState={uploadStates.file_ktp}
                    />
                  </Col>
                </Row>
              </Box>
            ))}

            {/* Add new notaris button */}
            {/* <Box
              sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 2 }}
            >
              <CustomButton
                onClick={() =>
                  push({
                    nama_notaris: "",
                    kedudukan_notaris: "",
                    nomor_akta: "",
                    tanggal_akta: "",
                    prihal_akta: "",
                    file_akta: null,
                  })
                }
                text="Tambah Data Notaris"
                leftIcon={<Add />}
                bgColor="transparent"
                border="2px dashed #041662"
                textColor="#041662"
                hoverColor="rgba(4, 22, 98, 0.1)"
              />
            </Box> */}
          </>
        )}
      </FieldArray>
    </>
  );
}
