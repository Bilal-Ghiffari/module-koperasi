import { Box } from '@mui/material';
import { Row, Col } from 'reactstrap';
import {
  FormHeader,
  FormInputNested,
  FormSelect,
} from '@/components/Common/FormFieldNested';

const FormPerseorangan = ({ formik }) => {
  const kewarganegaraan =
    formik.values.identity_penerima.kewarganegaraan?.toLowerCase();

  return (
    <>
      <FormHeader title="Informasi Penerima Fidusia - Perseorangan" />
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
            <FormSelect
              formik={formik}
              name="identity_penerima.jenisKelamin"
              title="Jenis Kelamin"
              placeholder="jenis kelamin"
              options={[
                { label: 'Laki-laki', value: 'laki' },
                { label: 'Perempuan', value: 'perempuan' },
              ]}
              required
            />
          </Col>

          <Col xs="12" md="6" lg="4" xl="3">
            <FormInputNested
              formik={formik}
              name="identity_penerima.email"
              title="Email"
              type="email"
              placeholder="Tulis email aktif"
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

          {kewarganegaraan === 'wna' && (
            <>
              <Col xs="12" md="6" lg="4" xl="3">
                <FormSelect
                  formik={formik}
                  name="identity_penerima.negaraAsal"
                  title="Negara Asal"
                  placeholder="negara asal"
                  options={[
                    { label: 'Amerika Serikat', value: 'usa' },
                    { label: 'Jepang', value: 'jepang' },
                    { label: 'Singapura', value: 'singapura' },
                    // Tambahkan lebih banyak negara sesuai kebutuhan
                  ]}
                  required
                />
              </Col>

              <Col xs="12" md="6" lg="4" xl="3">
                <FormInputNested
                  formik={formik}
                  name="identity_penerima.noPaspor"
                  title="Nomor Paspor"
                  placeholder="Tulis nomor paspor"
                  required
                />
              </Col>
            </>
          )}

          {kewarganegaraan === 'wni' && (
            <>
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
                  name="identity_penerima.nik"
                  title="NIK"
                  placeholder="Tulis nomor NIK"
                  required
                />
              </Col>
            </>
          )}

          <Col xs="12" md="6" lg="4" xl="3">
            <FormInputNested
              formik={formik}
              name="identity_penerima.namaDebitur"
              title="Nama Debitur"
              placeholder="Tulis nama debitur"
              required
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

export default FormPerseorangan;
