import {
  FormHeader,
  FormSelect,
  FormInput,
} from "@/components/Common/FormField";
import { BsPlus } from "react-icons/bs";
import { Col } from "reactstrap";
import { Row } from "reactstrap";
import { PEKERJAAN_OPTIONS } from "../../../Constant/master";

const InformasiIbu = ({ formik }) => {
  const STATUS_KAWIN = [
    { label: "Kawin", value: "Kawin" },
    { label: "Cerai Hidup", value: "Cerai Hidup" },
    { label: "Cerai Mati", value: "Cerai Mati" },
  ];

  const NEGARA = [
    { label: "USA", value: "USA" },
    { label: "Belgia", value: "Belgia" },
  ];

  const TEMPAT_LAHIR = [
    { label: "Dalam Negeri", value: "Dalam Negeri" },
    { label: "Luar Negeri", value: "Luar Negeri" },
  ];
  return (
    <>
      <FormHeader title={"Informasi Data Ibu"} />
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="namaLengkapIbu"
            placeholder="Tulis nama lengkap"
            title="Nama Lengkap"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="nikIbu"
            placeholder="Tulis nomor NIK sesuai identitas"
            title="NIK"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="emailIbu"
            placeholder="Tulis alamat email aktif"
            title="Email"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="noHpIbu"
            placeholder="Tulis nomor handphone aktif"
            title="No HP"
            leftIcon={<BsPlus />}
            type="tel"
            required
          />
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormSelect
            formik={formik}
            name={"kewarganegaraanIbu"}
            placeholder={"kewarganegaraan"}
            title="Kewarganegaraan"
            options={NEGARA}
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormSelect
            formik={formik}
            name={"statusKawinIbu"}
            placeholder={"status perkawinan"}
            title="Status Perkawinan"
            options={STATUS_KAWIN}
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="alamatTglIbu"
            placeholder="Tulis alamat lengkap domisili saat ini"
            title="Alamat Tinggal"
            type="textarea"
            required
          />
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormSelect
            formik={formik}
            name={"tmptLahirIbu"}
            placeholder={"tempat lahir"}
            title="Tempat Lahir"
            options={TEMPAT_LAHIR}
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="3">
          <FormInput
            formik={formik}
            name="tglLahirIbu"
            placeholder="Pilih tanggal lahir"
            title="Tanggal Lahir"
            type="date"
            required
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormSelect
            formik={formik}
            name="pekerjaanIbu"
            placeholder="Pilih pekerjaan atau profesi saat ini"
            title="Pekerjaan/Profesi"
            options={PEKERJAAN_OPTIONS}
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default InformasiIbu;
