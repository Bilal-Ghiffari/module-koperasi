import {
  FormHeader,
  FormInput,
  FormSelect,
} from "@/components/Common/FormField";
import { Box } from "@mui/material";
import { Col } from "reactstrap";
import { Row } from "reactstrap";
import {
  JENIS_KELAMIN_OPTIONS,
  PEKERJAAN_OPTIONS,
  TEMPAT_TINGGAL_OPTIONS,
} from "../../../Constant/master";
import { BsPlus } from "react-icons/bs";

const InformasiAnakSection = ({ formik }) => {
  const perkawinanOptions = [
    { value: "Kawin", label: "Kawin" },
    { value: "Belum Kawin", label: "Belum Kawin" },
  ];

  const countryOptions = [
    { label: "USA", value: "USA" },
    { label: "Belgia", value: "Belgia" },
  ];
  return (
    <>
      <FormHeader title={"Informasi Anak"} />
      <Box className="form-horizontal">
        <Row>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="namaLengkapAnak"
              placeholder="Tulis nama lengkap"
              title="Nama Lengkap"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="niknit"
              placeholder={"Tulis NIK/NIT"}
              title="NIK/NIT"
              type="number"
              required
            />
          </Col>
          <Col xs="12" sm="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="nomorHpAnak"
              title="Nomor HP"
              placeholder={"Tulis nomor handphone aktif"}
              type="tel"
              leftIcon={<BsPlus size={12} />}
              required
            />
          </Col>
          <Col xs="12" sm="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="nomorTelpAnak"
              title="Nomor Telepon Rumah"
              type="tel"
              placeholder={"Tulis nomor telepon"}
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormSelect
              formik={formik}
              name="jenisKelAnak"
              placeholder="Jenis Kelamin"
              options={JENIS_KELAMIN_OPTIONS}
              title="Jenis Kelamin"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormSelect
              formik={formik}
              name="statusKawinAnak"
              placeholder="status perkawinan"
              options={perkawinanOptions}
              title="Status Perkawinan "
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="emailAnak"
              placeholder={"Tulis alamat email aktif"}
              title="Email"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormSelect
              formik={formik}
              name="pekerjaanAnak"
              placeholder="pekerjaan saat ini"
              options={PEKERJAAN_OPTIONS}
              title="Pekerjaan"
              required
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormSelect
              formik={formik}
              name="tempatLahirAnak"
              placeholder="Tempat lahir"
              options={TEMPAT_TINGGAL_OPTIONS}
              title="Tempat Lahir"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="tanggalLahirAnak"
              type="date"
              placeholder="Tanggal Lahir"
              title="Tanggal Lahir"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormInput
              formik={formik}
              name="kewarganegaraan"
              title="Kewarganegaraan Indonesia"
              required
              value={formik.values.kewarganegaraanAnak || "Indonesia"}
              readonly
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="3">
            <FormSelect
              formik={formik}
              name="kewarganegaraanAsingAnak"
              placeholder="kewarganegaraan asing"
              options={countryOptions}
              title="Kewarganegaraan Asing"
              required
            />
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default InformasiAnakSection;
