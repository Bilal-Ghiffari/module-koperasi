import { FormHeader } from "@/components/Common/FormField";
import LineDashed from "@/components/Common/Line/Dashed";
import {
  AutoUploadFormFile,
  FormInput,
} from "@/pages/Modules/PartaiPolitik/components/FormField";
import Regions from "@/pages/Modules/PartaiPolitik/components/RegionsCustom";
import React from "react";
import { Col } from "reactstrap";
import { Row } from "reactstrap";

export default function AlamatPengurus({ formik }) {
  return (
    <>
      <FormHeader title={"Informasi Pengurus Pusat"} />
      <Row>
        <Col xs="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            name="alamatLengkap"
            type="text"
            placeholder="Tulis alamat lengkap"
            title="Alamat Lengkap"
            required
          />
        </Col>
        <Regions
          formik={formik}
          col="3"
          provinsiKey="provinsiAlamat"
          kabupatenKey="kabupatenKotaAlamat"
          kecamatanKey="kecamatan"
          kelurahanKey="kelurahan"
          showNegara={false}
          disabled={false}
          required
        />
        <Col xs="12" md="12" lg="2" xl="2">
          <FormInput
            formik={formik}
            name="rt"
            type="number"
            placeholder="Tulis RT"
            title="RT"
            required
          />
        </Col>
        <Col xs="12" md="12" lg="2" xl="2">
          <FormInput
            formik={formik}
            name="rw"
            type="number"
            placeholder="Tulis RW"
            title="RW"
            required
          />
        </Col>
        <Col xs="12" md="12" lg="2" xl="2">
          <FormInput
            formik={formik}
            name="kodePos"
            type="number"
            placeholder="Tulis Kode Pos"
            title="Kode Pos"
            required
          />
        </Col>
        <LineDashed />
        <Col xs="12" md="12" lg="12" xl="12">
          <AutoUploadFormFile
            formik={formik}
            name="suratPernyataan"
            label="Surat Pernyataan sebagai Pengurus Politik disertai dengan fotokopi kartu tanda penduduk (KTP)"
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
