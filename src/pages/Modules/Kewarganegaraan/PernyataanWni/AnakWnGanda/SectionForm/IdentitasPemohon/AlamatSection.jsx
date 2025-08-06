import {
  FormHeader,
  FormSelect,
  FormInput,
} from "@/components/Common/FormField";
import { Box } from "@mui/material";
import { Col } from "reactstrap";
import { Row } from "reactstrap";
import {
  KABUPATEN_KOTA_OPTIONS,
  NEGARA_OPTIONS,
  PROVINSI_OPTIONS,
  TEMPAT_TINGGAL_OPTIONS,
} from "../../../Constant/master";
import { useEffect } from "react";

const DataAlamatSection = ({ formik }) => {
  const { values, setFieldValue } = formik;
  const isDalamNegeri = values.tempatTinggalAnak === "Dalam Negeri";

  useEffect(() => {
    if (values.tempatTinggalAnak === "Dalam Negeri") {
      setFieldValue("negaraAnak", "");
      setFieldValue("provinsi", "");
      setFieldValue("kabupatenKota", "");
    } else if (values.tempatTinggalAnak === "Luar Negeri") {
      setFieldValue("negaraAnak", "");
      setFieldValue("provinsi", "");
      setFieldValue("kabupatenKota", "");
    }
  }, [values.tempatTinggalAnak, setFieldValue]);
  return (
    <>
      <FormHeader title={"Data Alamat"} />
      <Box className="form-horizontal">
        <Row>
          <Col xs="12" md="12" lg="12" xl="6">
            <FormSelect
              formik={formik}
              name="tempatTinggalAnak"
              title="Tempat tinggal"
              placeholder={"tempat tinggal"}
              options={TEMPAT_TINGGAL_OPTIONS}
              required
            />
          </Col>
          <Col xs="12" sm="12" md="12" lg="6" xl="6">
            <FormSelect
              formik={formik}
              name="negaraAnak"
              title="Negara Tinggal"
              placeholder={"negara tinggal"}
              options={NEGARA_OPTIONS}
              required
              disabled={isDalamNegeri}
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" md="12" lg="6" xl="3">
            <FormSelect
              formik={formik}
              name="provinsiAnak"
              title="Provinsi"
              placeholder={"provinsi domisili"}
              options={PROVINSI_OPTIONS}
              disabled={!isDalamNegeri}
              required
            />
          </Col>
          <Col xs="12" sm="12" md="12" lg="6" xl="3">
            <FormSelect
              formik={formik}
              name="kabkotAnak"
              title="Kabupaten/Kota"
              placeholder={"kabupaten/kota domisili"}
              options={KABUPATEN_KOTA_OPTIONS}
              disabled={!isDalamNegeri}
              required
            />
          </Col>

          <Col xs="12" md="12" lg="12" xl="12">
            <FormInput
              formik={formik}
              name="alamatTmpTglAnak"
              placeholder="Tulis alamat lengkap domisili saat ini"
              title="Alamat tinggal"
              type="textarea"
              maxLength="255"
              required
            />
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default DataAlamatSection;
