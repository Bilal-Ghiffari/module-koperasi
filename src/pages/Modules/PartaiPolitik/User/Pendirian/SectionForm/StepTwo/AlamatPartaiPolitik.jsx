import { FormHeader } from "@/components/Common/FormField";
import { FormInput } from "@/pages/Modules/PartaiPolitik/components/FormField";
import Regions from "@/pages/Modules/PartaiPolitik/components/RegionsCustom";
import React from "react";
import { Col } from "reactstrap";
import { Row } from "reactstrap";
import UploadImageHorizontal from "./components/UploadImageHorizontal";

export default function AlamatPartaiPolitik({ formik }) {
  return (
    <>
      <FormHeader title={"Alamat Partai Politik"} />
      <Row>
        <Col xs="12" md="12" lg="12" xl="12">
          <FormInput
            formik={formik}
            name="alamat_kantor_pusst"
            type="text"
            placeholder="Tulis alamat kantor pusat"
            title="Alamat Kantor Pusat"
            required
          />
        </Col>
        <Regions
          formik={formik}
          col="3"
          disabled={false}
          provinsiKey="provinsi_kantor_pusst"
          kabupatenKey="kabkota_kantor_pusst"
          kecamatanKey="kecamatan_kantor_pusst"
          kelurahanKey="kelurahan_kantor_pusst"
          showNegara={false}
          required
        />
        <Col xs="12" md="12" lg="3" xl="3">
          <FormInput
            formik={formik}
            name="latitude"
            type="text"
            placeholder="Tulis latitude"
            title="Latitude"
            required
          />
        </Col>
        <Col xs="12" md="12" lg="3" xl="3">
          <FormInput
            formik={formik}
            name="longitude"
            type="text"
            placeholder="Tulis longitude"
            title="Longitude"
            required
          />
        </Col>
        <Col xs="12" md="12" lg="2" xl="2">
          <FormInput
            formik={formik}
            name="rt_kantor_pusst"
            type="number"
            placeholder="Tulis RT"
            title="RT"
            required
          />
        </Col>
        <Col xs="12" md="12" lg="2" xl="2">
          <FormInput
            formik={formik}
            name="rw_kantor_pusst"
            type="number"
            placeholder="Tulis RW"
            title="RW"
            required
          />
        </Col>
        <Col xs="12" md="12" lg="2" xl="2">
          <FormInput
            formik={formik}
            name="kode_pos_kantor_pusst"
            type="number"
            placeholder="Tulis Kode Pos"
            title="Kode Pos"
            required
          />
        </Col>
        <Col xs="12" md="12" lg="6" xl="6">
          <UploadImageHorizontal
            formik={formik}
            name="file_kantor_depan"
            title="Foto Kantor Tampak Depan"
          />
        </Col>
        <Col xs="12" md="12" lg="6" xl="6">
          <UploadImageHorizontal
            formik={formik}
            name="file_kantor_belakang"
            title="Foto Kantor Tampak Belakang"
          />
        </Col>
      </Row>
    </>
  );
}
