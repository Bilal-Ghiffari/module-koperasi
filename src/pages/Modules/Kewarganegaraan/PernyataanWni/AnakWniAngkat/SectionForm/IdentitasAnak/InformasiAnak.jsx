import {
  FormHeader,
  FormInput,
  FormSelect,
} from "@/components/Common/FormField";
import { Col } from "reactstrap";
import { Row } from "reactstrap";

const InformasiAnakSection = ({ formik }) => {
  const JENIS_KELAMIN = [
    { label: "Laki-laki", value: "Laki-laki" },
    { label: "Perempuan", value: "Perempuan" },
  ];
  const NEGARA = [
    { label: "Indonesia", value: "ID" },
    { label: "Malaysia", value: "MY" },
    { label: "Singapura", value: "SG" },
    { label: "Thailand", value: "TH" },
    { label: "Vietnam", value: "VN" },
  ];

  return (
    <>
      <FormHeader title={"Informasi Anak"} />
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            name="namaLengkapAnak"
            placeholder="Tulis nama lengkap"
            title="Nama Lengkap"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormSelect
            formik={formik}
            name="jenisKelAnak"
            placeholder="Jenis Kelamin"
            options={JENIS_KELAMIN}
            title="Jenis Kelamin"
            required
          />
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            name="tempatLahirAnak"
            placeholder="Tulis tempat lahir"
            title="Tempat Lahir"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            name="tanggalLahirAnak"
            placeholder="Masukkan tanggal lahir"
            title="Tanggal Lahir"
            required
            type="date"
          />
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            name="emailAnak"
            placeholder="Tulis email aktif"
            title="Email"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormSelect
            formik={formik}
            name="kewarganegaraanAsalAnak"
            placeholder="kewarganegaraan"
            options={NEGARA}
            title="Kewarganegaraan"
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default InformasiAnakSection;
