import { FormHeader } from "@/components/Common/FormField";
import {
  FormInput,
  SearchableFormSelect,
} from "@/pages/Modules/PartaiPolitik/components/FormField";
import React from "react";
import { Col } from "reactstrap";
import { Row } from "reactstrap";
import { ExampleOption } from "../../../utils/validationFile";
import Regions from "@/pages/Modules/PartaiPolitik/components/RegionsCustom";

export default function InformasiPengurusSurat({ formik }) {
  return (
    <>
      <FormHeader title={"Informasi Pengurus Pusat"} />
      <Row>
        <Col xs="12" md="12" lg="3" xl="3">
          <SearchableFormSelect
            formik={formik}
            name="jenisKepengurusan"
            placeholder="Pilih jenis kepengurusan"
            title="Jenis Kepengurusan"
            options={ExampleOption}
            required={true}
            debounceMs={200}
            maxHeight="300px"
            searchPlaceholder="Cari jenis kepengurusan..."
            noDataText="Data tidak ditemukan"
          />
        </Col>
        <Col xs="12" md="12" lg="3" xl="3">
          <SearchableFormSelect
            formik={formik}
            name="jabatan"
            placeholder="Pilih jabatan"
            title="Jabatan"
            options={ExampleOption}
            required={true}
            debounceMs={200}
            maxHeight="300px"
            searchPlaceholder="Cari jabatan..."
            noDataText="Data tidak ditemukan"
          />
        </Col>
        <Col xs="12" md="12" lg="3" xl="3">
          <SearchableFormSelect
            formik={formik}
            name="nomorSk"
            placeholder="Pilih nomor SK"
            title="Nomor SK"
            options={ExampleOption}
            required={true}
            debounceMs={200}
            maxHeight="300px"
            searchPlaceholder="Cari nomor SK..."
            noDataText="Data tidak ditemukan"
          />
        </Col>
        <Col xs="12" md="12" lg="3" xl="3">
          <FormInput
            formik={formik}
            name="tanggalSK"
            type="date"
            placeholder="Tulis tanggal SK"
            title="Tanggal SK"
            required
          />
        </Col>
        <Col xs="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            name="namaLengkap"
            type="text"
            placeholder="Tulis nama lengkap"
            title="Nama Lengkap"
            required
          />
        </Col>
        <Col xs="12" md="12" lg="3" xl="3">
          <FormInput
            formik={formik}
            name="nik"
            type="number"
            placeholder="Tulis NIK"
            title="NIK"
            required
          />
        </Col>
        <Col xs="12" md="12" lg="3" xl="3">
          <FormInput
            formik={formik}
            name="nomorNPWP"
            type="number"
            placeholder="Tulis nomor NPWP"
            title="Nomor NPWP"
            required
          />
        </Col>
        <Col xs="12" md="12" lg="3" xl="3">
          <SearchableFormSelect
            formik={formik}
            name="jenisKelamin"
            placeholder="Pilih jenis kelamin"
            title="Jenis Kelamin"
            options={ExampleOption}
            required={true}
            debounceMs={200}
            maxHeight="300px"
            searchPlaceholder="Cari jenis kelamin..."
            noDataText="Data tidak ditemukan"
          />
        </Col>
        <Col xs="12" md="12" lg="3" xl="3">
          <SearchableFormSelect
            formik={formik}
            name="kewarganegaraan"
            placeholder="Pilih kewarganegaraan"
            title="Kewarganegaraan"
            options={ExampleOption}
            required={true}
            debounceMs={200}
            maxHeight="300px"
            searchPlaceholder="Cari kewarganegaraan..."
            noDataText="Data tidak ditemukan"
          />
        </Col>
        <Col xs="12" md="12" lg="3" xl="3">
          <SearchableFormSelect
            formik={formik}
            name="tempatLahir"
            placeholder="Pilih tempat lahir"
            title="Tempat Lahir"
            options={ExampleOption}
            required={true}
            debounceMs={200}
            maxHeight="300px"
            searchPlaceholder="Cari tempat lahir..."
            noDataText="Data tidak ditemukan"
          />
        </Col>
        <Col xs="12" md="12" lg="3" xl="3">
          <FormInput
            formik={formik}
            name="tanggalLahir"
            type="date"
            placeholder="Tulis tanggal lahir"
            title="Tanggal Lahir"
            required
          />
        </Col>
        <Col xs="12" md="12" lg="3" xl="3">
          <FormInput
            formik={formik}
            name="email"
            type="email"
            placeholder="Tulis alamat email aktif"
            title="Email"
            required
          />
        </Col>
        <Col xs="12" md="12" lg="3" xl="3">
          <FormInput
            formik={formik}
            name="nomorHP"
            type="number"
            placeholder="Tulis nomor HP"
            title="Nomor HP"
            required
          />
        </Col>
        <Regions
          formik={formik}
          disabled={false}
          col="3"
          provinsiKey="provinsi_pemohon"
          kabupatenKey="kabkota_pemohon"
          showKecamatan={false}
          showKelurahan={false}
          showNegara={false}
          required
        />
      </Row>
      <Col xs="12" md="12" lg="6" xl="6">
        <FormInput
          formik={formik}
          name="pekerjaan"
          type="text"
          placeholder="Tulis pekerjaan"
          title="Pekerjaan"
          required
        />
      </Col>
    </>
  );
}
