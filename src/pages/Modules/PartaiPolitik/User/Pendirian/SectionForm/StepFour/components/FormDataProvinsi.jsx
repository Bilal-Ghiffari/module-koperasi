import { FormHeader } from "@/components/Common/FormField";
import { FormInput } from "@/pages/Modules/PartaiPolitik/components/FormField";
import { Row } from "reactstrap";

const FormDataProvinsi = ({ formik }) => {
  return (
    <>
      <FormHeader title="Data Provinsi" />
      <Row>
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
      </Row>
    </>
  );
};

export default FormDataProvinsi;
