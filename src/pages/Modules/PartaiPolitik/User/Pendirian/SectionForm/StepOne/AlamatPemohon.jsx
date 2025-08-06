import Regions from "@/pages/Modules/PartaiPolitik/components/RegionsCustom";
import { FormInput } from "@/pages/Modules/PartaiPolitik/components/FormField";
import React from "react";
import { Col } from "reactstrap";
import { Row } from "reactstrap";
import { FormHeader } from "@/components/Common/FormField";

export default function AlamatPemohon({ formik }) {
  return (
    <>
      <FormHeader title={"Alamat Pemohon"} />

      <Row>
        <Col xs="12" md="6" lg="12" xl="12">
          <FormInput
            formik={formik}
            name="alamat_lengkap"
            type="text"
            placeholder="Tulis alamat lengkap"
            title="Alamat Lengkap"
            required
          />
        </Col>
        <Regions
          formik={formik}
          disabled={false}
          provinsiKey="provinsi_pemohon"
          kabupatenKey="kabkota_pemohon"
          kecamatanKey="kecamatan_pemohon"
          kelurahanKey="kelurahan_pemohon"
          showNegara={false}
          required
        />

        <Col xs="12" md="4" lg="4" xl="4">
          <FormInput
            formik={formik}
            name="rt"
            type="number"
            placeholder="Masukkan RT"
            title="RT"
            required
          />
        </Col>
        <Col xs="12" md="4" lg="4" xl="4">
          <FormInput
            formik={formik}
            name="rw"
            type="number"
            placeholder="Masukkan RW"
            title="RW"
            required
          />
        </Col>
        <Col xs="12" md="4" lg="4" xl="4">
          <FormInput
            formik={formik}
            name="kode_pos_pemohon"
            type="number"
            placeholder="Masukkan Kode Pos"
            title="Kode Pos"
            required
          />
        </Col>
      </Row>
    </>
  );
}
