import { Box } from '@mui/material';
import { Row, Col } from 'reactstrap';
import {
  FormHeader,
  FormInputNested,
} from '@/components/Common/FormFieldNested';

const FormKoperasi = ({ formik }) => {
  return (
    <>
      <FormHeader title="Informasi Penerima Fidusia - Koperasi" />
      <Box className="form-horizontal">
        <Row>
          <Col xs="12" md="6" lg="4" xl="3">
            <FormInputNested
              formik={formik}
              name="identity_penerima.namaPenerima"
              title="Nama Penerima"
              placeholder="Tulis nama lengkap"
              required
            />
          </Col>

          <Col xs="12" md="6" lg="4" xl="3">
            <FormInputNested
              formik={formik}
              name="identity_penerima.npwp"
              title="NPWP"
              placeholder="Tulis nomor NPWP"
              required
            />
          </Col>

          <Col xs="12" md="6" lg="4" xl="3">
            <FormInputNested
              formik={formik}
              name="identity_penerima.email"
              title="Email"
              type="email"
              placeholder="Tulis alamat email aktif"
              required
            />
          </Col>

          <Col xs="12" md="6" lg="4" xl="3">
            <FormInputNested
              formik={formik}
              name="identity_penerima.noTelp"
              title="Nomor Telepon"
              placeholder="Tulis nomor handphone aktif"
              required
            />
          </Col>

          <Col xs="12" md="6" lg="4" xl="3">
            <FormInputNested
              formik={formik}
              name="identity_penerima.noSK"
              title="No. SK"
              placeholder="Tulis nomor SK"
            />
          </Col>

          <Col xs="12" md="6" lg="4" xl="3">
            <FormInputNested
              formik={formik}
              name="identity_penerima.kantorCabang"
              title="Nama Kantor Cabang"
              placeholder="Tulis nama kantor cabang"
            />
          </Col>

          <Col xs="12" md="6" lg="4" xl="3">
            <FormInputNested
              formik={formik}
              name="identity_penerima.namaDebitur"
              title="Nama Debitur"
              placeholder="Tulis nama debitur"
            />
          </Col>
        </Row>
        <p className="text-warning mt-2" style={{ fontSize: '0.85rem' }}>
          * Isi jika Nama Debitur bukan Penerima Fidusia
        </p>
      </Box>
    </>
  );
};

export default FormKoperasi;
