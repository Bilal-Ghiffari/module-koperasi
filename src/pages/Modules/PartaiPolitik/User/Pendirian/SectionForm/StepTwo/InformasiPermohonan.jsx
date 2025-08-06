import { FormHeader } from "@/components/Common/FormField";
import {
  AutoUploadFormFile,
  FormInput,
  SearchableFormSelect,
} from "@/pages/Modules/PartaiPolitik/components/FormField";
import React from "react";
import { Col } from "reactstrap";
import { Row } from "reactstrap";
import { ExampleOption } from "../../../utils/validationFile";

export default function InformasiPermohonan({ formik }) {
  return (
    <>
      <FormHeader title={"Informasi Permohonanan"} />
      <Row>
        <Col xs="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            name="nomor_surat_pemohon"
            type="text"
            placeholder="Tulis nomor surat pemohon"
            title="Nomor Surat Pemohonan"
            required
          />
        </Col>
        <Col xs="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            name="tanggal_surat_pemohon"
            type="date"
            placeholder="Tulis tanggal surat pemohon"
            title="Tanggal Surat Pemohonan"
            required
          />
        </Col>
        <Col xs="12" md="12" lg="12" xl="12">
          <AutoUploadFormFile
            formik={formik}
            name="file_pemohon"
            label="Surat permohonan ditandatangani oleh Ketua Umum dan Sekeretaris Jendral (atau sebutan sesuai AD/ART partai plolitik)"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
            // onAutoUpload={autoUploadFile}
            // uploadState={uploadStates.file_ktp}
          />
        </Col>
        <Col xs="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            name="nama_bank"
            type="text"
            placeholder="Tulis nama bank"
            title="Nama Bank"
            required
          />
        </Col>
        <Col xs="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            name="nomor_rekening"
            type="number"
            placeholder="Tulis nomor rekening"
            title="Nomor Rekening Partai Politik"
            required
          />
        </Col>
        <Col xs="12" md="12" lg="12" xl="12">
          <AutoUploadFormFile
            formik={formik}
            name="file_buku_tabungan"
            label="Foto Buku Nomor Rekening"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
            // onAutoUpload={autoUploadFile}
            // uploadState={uploadStates.file_ktp}
          />
        </Col>
        <Col xs="12" md="12" lg="12" xl="12">
          <SearchableFormSelect
            formik={formik}
            name="status_kantor"
            placeholder="Pilih status kantor"
            title="Status Kantor"
            options={ExampleOption}
            required={true}
            debounceMs={200}
            maxHeight="300px"
            searchPlaceholder="Cari status kantor..."
            noDataText="Data tidak ditemukan"
          />
        </Col>
        <Col xs="12" md="12" lg="12" xl="12">
          <AutoUploadFormFile
            formik={formik}
            name="file_status_kantor"
            label="Surat Status Kantor"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
            // onAutoUpload={autoUploadFile}
            // uploadState={uploadStates.file_ktp}
          />
        </Col>
      </Row>
    </>
  );
}
