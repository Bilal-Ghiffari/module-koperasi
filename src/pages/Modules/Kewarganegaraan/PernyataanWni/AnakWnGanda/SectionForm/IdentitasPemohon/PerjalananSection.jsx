import { FormHeader, FormInput } from "@/components/Common/FormField";
import { Box } from "@mui/material";
import { Col } from "reactstrap";
import { Row } from "reactstrap";

const DokPerjalananSection = ({ formik }) => {
  return (
    <>
      <FormHeader title={"Dokumen Perjalanan"} />
      <Box className="form-horizontal">
        <Row>
          <Col xs="12" md="6" lg="3" xl="4">
            <FormInput
              formik={formik}
              title="Nomor Paspor RI"
              name={"nomorPasporRI"}
              placeholder={"Tulis nomor paspor"}
              required
            />
          </Col>
          <Col xs="12" md="6" lg="3" xl="4">
            <FormInput
              formik={formik}
              title="Wilayah Terbit Paspor RI"
              name={"wilTerbitPasporRI"}
              placeholder={"Tulis lokasi terbit paspor RI"}
              required
            />
          </Col>
          <Col xs="12" md="6" lg="6" xl="4">
            <FormInput
              formik={formik}
              title="Tanggal Kedaluwarsa Paspor"
              name={"tglKedaluwarsaPasporRI"}
              placeholder={"Masukkan tanggal kedaluwarsa paspor RI"}
              type="date"
              required
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="6" lg="3" xl="4">
            <FormInput
              formik={formik}
              title="Nomor Paspor Kebangsaan"
              name={"nomorPasporKeb"}
              placeholder={"Tulis nomor paspor"}
              required
            />
          </Col>
          <Col xs="12" md="6" lg="3" xl="4">
            <FormInput
              formik={formik}
              title="Wilayah Terbit Paspor Kebangsaan"
              name={"wilTerbitPasporKeb"}
              placeholder={"Tulis lokasi terbit paspor RI"}
              required
            />
          </Col>
          <Col xs="12" md="6" lg="6" xl="4">
            <FormInput
              formik={formik}
              title="Tanggal Kedaluwarsa Paspor Kebangsaan"
              name={"tglKedaluwarsaPasporKeb"}
              placeholder={"Masukkan tanggal kedaluwarsa paspor RI"}
              type="date"
              required
            />
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default DokPerjalananSection;
