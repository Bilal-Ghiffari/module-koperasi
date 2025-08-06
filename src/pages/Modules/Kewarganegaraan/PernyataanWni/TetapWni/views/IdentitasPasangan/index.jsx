import {
  FormHeader,
  FormInput,
  FormSelect,
} from "@/components/Common/FormField";
import { Box } from "@mui/material";
import { Col } from "reactstrap";
import { Row } from "reactstrap";
import { Form } from "reactstrap";
import {
  AGAMA_OPTIONS,
  KEWARGANEGARAAN_OPTIONS,
} from "../../../Constant/master";
import { BsPlus } from "react-icons/bs";
import { useState } from "react";
import { apiGetStatusKawin } from "../../../services/api";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FormAutocomplete } from "@/pages/Modules/Kewarganegaraan/components/AutoComplete";

const IdentitasPasanganSection = ({ formik }) => {
  const [loadingStatusKawin, setLoadingStatusKawin] = useState(false);

  const { negara, agama } = useSelector((state) => state.master);

  const fetchStatusKawin = async () => {
    setLoadingStatusKawin(true);
    try {
      const response = await apiGetStatusKawin();
      console.log("FROM PASANGAN", response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingStatusKawin(false);
    }
  };

  useEffect(() => {
    fetchStatusKawin();
    formik.setFieldValue("status_kawin_pasangan", "Kawin");
  }, []);

  return (
    <Box
      className="mt-3 mb-3"
      sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: "24px" }}
    >
      <FormHeader title={"Informasi Data Pasangan"} />
      <Box className="form-horizontal">
        <Row>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="nama_lengkap_pasangan"
              placeholder="Tulis nama lengkap"
              title="Nama Lengkap"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="id_kewarganegaraan_pasangan"
              placeholder="kewarganegaraan"
              title="Kewarganegaraan"
              options={negara.data}
              isDisabled={negara.data.length === 0}
              required
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="email_pasangan"
              placeholder="Tulis alamat email aktif"
              title="Email"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="no_hp_pasangan"
              placeholder="Tulis nomor handphone aktif"
              title="Nomor HP (diikuti kode negara)"
              leftIcon={<BsPlus />}
              type="number"
              required
            />
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="id_negara_lahir_pasangan"
              placeholder="tempat lahir"
              title="Negara Tempat Lahir"
              options={negara.data}
              isDisabled={negara.data.length === 0}
              required
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="tgl_lahir_pasangan"
              placeholder="Pilih tanggal lahir"
              title="Tanggal Lahir"
              type="date"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="6">
            <FormInput
              formik={formik}
              name="alamat_tinggal_pasangan"
              placeholder="Tulis alamat lengkap domisili saat ini"
              title="Alamat tinggal"
              type="textarea"
              required
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="status_kawin_pasangan"
              placeholder="Kawin"
              title="Status Perkawinan"
              options={[{ value: "Kawin", label: "Kawin" }]}
              readonly
              required
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="agama_pasangan"
              placeholder="agama"
              title="Agama"
              options={agama.data}
              required
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="no_paspor_asing_pasangan"
              placeholder="Tulis nomor paspor"
              title="Nomor Paspor Asing"
              required
            />
          </Col>
          <Col xs="12" md="12" lg="6" xl="3">
            <FormInput
              formik={formik}
              name="tgl_exp_paspor_asing_pasangan"
              placeholder="Masukkan tanggal kedaluarsa"
              title="Tanggal Kedaluarse Paspor"
              type="date"
              required
            />
          </Col>
        </Row>
      </Box>
    </Box>
  );
};

export default IdentitasPasanganSection;
