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
import Regions from "@/pages/Modules/PartaiPolitik/components/RegionsCustom";

export default function InformasiPemohon({ formik }) {
  console.log("🚀 ~ InformasiPemohon ~ formik:", formik);
  return (
    <>
      <FormHeader title={"Informasi Pemohon"} />
      <Row>
        <Col xs="12" md="6" lg="6" xl="6">
          <FormInput
            formik={formik}
            name="nama_lengkap"
            type="text"
            placeholder="Tulis nomor NIK sesuai identitas"
            title="Nama Lengkap"
            required
          />
        </Col>
        <Col xs="12" md="3" lg="3" xl="3">
          <FormInput
            formik={formik}
            name="nik"
            type="number"
            placeholder="Tulis nomor NIK sesuai identitas"
            title="NIK"
            required
          />
        </Col>
        <Col xs="12" md="3" lg="3" xl="3">
          <FormInput
            formik={formik}
            name="npwp"
            type="number"
            placeholder="Tulis nomor NPWP sesuai identitas"
            title="Nomor NPWP"
            required
          />
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="3" lg="3" xl="3">
          <SearchableFormSelect
            formik={formik}
            name="jenis_kelamin"
            placeholder="Pilih Jenis Kelamin"
            title="Jenis Kelamin"
            options={ExampleOption}
            required={true}
            debounceMs={200}
            maxHeight="300px"
            searchPlaceholder="Cari jenis kelamin..."
            noDataText="Data tidak ditemukan"
          />
        </Col>
        <Col xs="12" md="3" lg="3" xl="3">
          <SearchableFormSelect
            formik={formik}
            name="kewarganegaraan"
            placeholder="Pilih Kewarganegaraan"
            title="Kewarganegaraan"
            options={ExampleOption}
            required={true}
            debounceMs={200}
            maxHeight="300px"
            searchPlaceholder="Cari kewarganegaraan..."
            noDataText="Data tidak ditemukan"
          />
        </Col>
        <Col xs="12" md="3" lg="3" xl="3">
          <SearchableFormSelect
            formik={formik}
            name="tempat_lahir"
            placeholder="Pilih Tempat Lahir"
            title="Tempat Lahir"
            options={ExampleOption}
            required={true}
            debounceMs={200}
            maxHeight="300px"
            searchPlaceholder="Cari Tempat Lahir..."
            noDataText="Data tidak ditemukan"
          />
        </Col>
        <Col xs="12" md="3" lg="3" xl="3">
          <FormInput
            formik={formik}
            name="tanggal_lahir"
            type="date"
            placeholder="Pilih Tanggal Lahir"
            title="Tanggal Lahir"
            required
          />
        </Col>
        <Col xs="12" md="3" lg="3" xl="3">
          <FormInput
            formik={formik}
            name="email"
            type="email"
            placeholder="Tulis alamat email aktif"
            title="Email"
            required
          />
        </Col>
        <Col xs="12" md="3" lg="3" xl="3">
          <FormInput
            formik={formik}
            name="nomor_telepon"
            type="number"
            placeholder="Tulis nomor telepon aktif"
            title="Nomor Telepon"
            required
          />
        </Col>
        <Regions
          formik={formik}
          disabled={false}
          provinsiKey="provinsi"
          kabupatenKey="kabkota"
          col="3"
          showKelurahan={false}
          showKecamatan={false}
          showNegara={false}
          required
        />
        <Col xs="12" md="6" lg="6" xl="6">
          <AutoUploadFormFile
            formik={formik}
            name="fotokopi_ktp"
            label="Fotokopi KTP"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
            // onAutoUpload={autoUploadFile}
            // uploadState={uploadStates.file_ktp}
          />
        </Col>
        <Col xs="12" md="3" lg="3" xl="3">
          <FormInput
            formik={formik}
            name="pekerjaan"
            type="text"
            placeholder="Pilih Pekerjaan"
            title="Perkerjaan"
            required
          />
        </Col>
        <Col xs="12" md="3" lg="3" xl="3">
          <SearchableFormSelect
            formik={formik}
            name="jabatan"
            placeholder="Pilih Jabatan"
            title="Jabatan"
            options={ExampleOption}
            required={true}
            debounceMs={200}
            maxHeight="300px"
            searchPlaceholder="Cari jabatan..."
            noDataText="Data tidak ditemukan"
          />
        </Col>
        <Col xs="12" md="6" lg="6" xl="6">
          <AutoUploadFormFile
            formik={formik}
            name="fotokopi_npwp"
            label="Fotokopi NPWP"
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
