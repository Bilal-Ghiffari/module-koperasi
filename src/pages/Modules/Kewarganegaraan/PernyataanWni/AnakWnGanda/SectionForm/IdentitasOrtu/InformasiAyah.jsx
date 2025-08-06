import {
  FormHeader,
  FormInput,
  FormSelect,
} from "@/components/Common/FormField";
import { Box } from "@mui/material";
import { BsPlus } from "react-icons/bs";
import { Col } from "reactstrap";
import { Row } from "reactstrap";

const InformasiAyahSection = ({ formik }) => {
  const perkawinanOptions = [
    { label: "Kawin", value: "Kawin" },
    { label: "Cerai Hidup", value: "Cerai Hidup" },
    { label: "Cerai Mati", value: "Cerai Mati" },
  ];

  const countryOptions = [
    { label: "USA", value: "USA" },
    { label: "Belgia", value: "Belgia" },
  ];

  const tempatLahirOptions = [
    { label: "Dalam Negeri", value: "Dalam Negeri" },
    { label: "Luar Negeri", value: "Luar Negeri" },
  ];
  return (
    <>
      <FormHeader title={"Informasi Data Ayah"} />
      <Box className="form-horizontal">
        <Row>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="namaLengkapAyah"
              placeholder="Tulis nama lengkap"
              title="Nama Lengkap"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormSelect
              formik={formik}
              name="statusKawinAyah"
              placeholder="status perkawinan"
              options={perkawinanOptions}
              title="Status Perkawinan "
              required
            />
          </Col>

          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="emailAyah"
              placeholder={"Tulis alamat email aktif"}
              title="Email"
              required
            />
          </Col>
          <Col xs="12" sm="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="noHpAyah"
              title="Nomor HP"
              placeholder={"Tulis nomor handphone aktif"}
              type="tel"
              leftIcon={<BsPlus size={12} />}
              required
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12" lg="12" xl="6">
            <FormSelect
              formik={formik}
              name="kewarganegaraanAyah"
              placeholder="kewarganegaraan"
              options={countryOptions}
              title="Kewarganegaraan"
              required
            />
          </Col>

          <Col xs="12" md="12" lg="12" xl="6">
            <FormInput
              formik={formik}
              name="alamatTglAyah"
              placeholder="Tulis alamat lengkap domisili saat ini"
              title="Alamat tinggal"
              type="textarea"
              required
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormSelect
              formik={formik}
              name="tmptLahirAyah"
              placeholder="Masukkan tempat lahir"
              options={tempatLahirOptions}
              title="Tempat Lahir"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="tglLahirAyah"
              type="date"
              placeholder="Tanggal Lahir"
              title="Tanggal Lahir"
              required
            />
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default InformasiAyahSection;
