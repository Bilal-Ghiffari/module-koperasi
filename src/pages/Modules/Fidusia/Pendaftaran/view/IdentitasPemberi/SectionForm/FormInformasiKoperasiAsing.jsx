import { Box } from '@mui/material';
import { Row, Col } from 'reactstrap';
import {
  FormHeader,
  FormInputNested,
  FormSelect,
} from '@/components/Common/FormFieldNested';

const FormInformasiKoperasiAsing = ({ formik }) => {
  return (
    <>
      <FormHeader title="Informasi Pemberi Fidusia - Korporasi Asing" />
      <Box className="form-horizontal">
        <Row>
          <Col xs="12" md="6" lg="4" xl="3">
            <FormInputNested
              formik={formik}
              name="identity_pemberi.namaPemberi"
              title="Nama Pemberi"
              placeholder="Tulis nama lengkap"
              required
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="3">
            <FormInputNested
              formik={formik}
              name="identity_pemberi.nomorPengesahan"
              title="Nomor Pengesahan"
              placeholder="Nomor Pengesahan"
              required
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="3">
            <FormInputNested
              formik={formik}
              name="identity_pemberi.noTelp"
              title="Nomor Telepon"
              placeholder="Nomor Telepon"
              required
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="3">
            <FormInputNested
              formik={formik}
              name="identity_pemberi.email"
              title="Email"
              placeholder="Email"
              required
              type="email"
            />
          </Col>
          <Col xs="12" md="6" lg="6" xl="6">
            <FormSelect
              formik={formik}
              name="identity_pemberi.negaraAsal"
              title="Negara Asal"
              placeholder="Negara Asal"
              options={[
                { label: 'Singapura', value: 'SG' },
                { label: 'Malaysia', value: 'MY' },
                // Tambahkan lainnya
              ]}
              required
            />
          </Col>
          <Col xs="12" md="6" lg="6" xl="6">
            <FormInputNested
              formik={formik}
              name="identity_pemberi.namaDebitur"
              title="Nama Debitur"
              placeholder="Nama Debitur"
            />
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default FormInformasiKoperasiAsing;
