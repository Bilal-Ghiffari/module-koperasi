import { FormHeader } from "@/components/Common/FormField";
import {
  AutoUploadFormFile,
  FormInput,
} from "@/pages/Modules/PartaiPolitik/components/FormField";
import React from "react";
import { Col, Row } from "reactstrap";
import UploadImageHorizontal from "./components/UploadImageHorizontal";
import UploadImageVertical from "./components/UploadImageVertical";
import { Typography } from "@mui/material";
import Checked from "@/components/Common/Checked";
import LineDashed from "@/components/Common/Line/Dashed";

export default function InformasiPartaiPolitik({ formik }) {
  return (
    <>
      <FormHeader title={"Informasi Partai Politik"} />
      <Row>
        <Col xs="12" md="12" lg="12" xl="3">
          <UploadImageVertical formik={formik} />
        </Col>
        <Col xs="12" md="12" lg="12" xl="9">
          <FormInput
            formik={formik}
            name="nama_partai"
            type="text"
            placeholder="Tulis nama partai politik"
            title="Nama Partai Politik (Wajib tulis nama lengkap, termasuk kata PARTAI)"
            required
          />
          <FormInput
            formik={formik}
            name="singkatan_partai"
            type="text"
            placeholder="Tulis singkatan partai politik"
            title="Singkatan Partai Politik"
            required
          />
          <FormInput
            formik={formik}
            name="arti_nama_partai"
            type="textarea"
            placeholder="Tulis arti nama partai politik"
            title="Arti dari Nama, Lambang, atau Tanda Gambar"
            required
          />
        </Col>
        <section style={{ padding: "24px" }}>
          <Checked
            fontSize="13px"
            label="Dengan ini menyatakan apabila nama dan lambang Partai Politik yang
            dimohonkan bertentangan dengan peraturan perundang-undangan maka
            dengan ini pemohon bersedia jika pemohonan pengesahan pendirian
            badan hukum partai politik ini tidak dilanjutkan prosesnya."
            value="1"
            fieldName="aggrement_lambang_partai"
            formik={formik}
          />
        </section>
        <LineDashed />
        <Col xs="12" md="12" lg="12" xl="12">
          <FormInput
            formik={formik}
            name="asas"
            type="textarea"
            placeholder="Tulis Asas Partai Politik"
            title="Asas"
            required
          />
          <FormInput
            formik={formik}
            name="visi"
            type="textarea"
            placeholder="Tulis Visi"
            title="Visi"
            required
          />
          <FormInput
            formik={formik}
            name="misi"
            type="textarea"
            placeholder="Tulis Misi"
            title="Misi"
            required
          />
        </Col>
        <section style={{ padding: "24px" }}>
          <Checked
            fontSize="13px"
            label="Dengan ini menyatakan bahwa asa, visi, misi Partai Politik tidak bertentangan dengan Pancasila dan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945."
            value="1"
            fieldName="aggrement_visi_partai"
            formik={formik}
          />
        </section>
        <AutoUploadFormFile
          formik={formik}
          name="file_salinan_sah"
          label="Salinan sah akta notaris pendirian partai politik"
          acceptedFileTypes={["application/pdf"]}
          maxFileSizeMB={5}
          required
          // onAutoUpload={autoUploadFile}
          // uploadState={uploadStates.file_ktp}
        />
      </Row>
    </>
  );
}
