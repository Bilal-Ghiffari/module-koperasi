import {
  FormHeader,
  FormInput,
  FormSelect,
} from "@/components/Common/FormField";
import { Col } from "reactstrap";
import { Row } from "reactstrap";

const InformasiPasport = ({ formik }) => {
  const NEGARA = [
    { label: "USA", value: "USA" },
    { label: "Belgia", value: "Belgia" },
  ];
  return (
    <>
      <FormHeader title={"Informasi Paspor Asing"} />
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            name="nomorPasporAsing"
            placeholder="Tulis nomor paspor"
            title="Nomor Paspor Asing"
            required
          />
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormSelect
            formik={formik}
            name="wlyTerbPasporAsing"
            placeholder="lokasi terbit paspor asing"
            title="Tanggal Kedaluwarsa Paspor Asing"
            options={NEGARA}
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="tglKedalPasporAsing"
            placeholder="Masukkan tanggal kedaluwarsa paspor"
            title="Tanggal Kedaluwarsa Paspor Asing"
            type="date"
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default InformasiPasport;
