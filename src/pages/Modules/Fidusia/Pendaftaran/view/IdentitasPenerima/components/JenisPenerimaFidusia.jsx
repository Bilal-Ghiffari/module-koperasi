import { Box } from '@mui/material';
import { Row, Col } from 'reactstrap';
import { FormHeader, FormSelect } from '@/components/Common/FormFieldNested';
import { useEffect } from 'react';

const JenisPenerimaFidusia = ({ formik }) => {
  const jenisPendaftaran = formik.values.identity_penerima.jenisPendaftaran;
  const jenisKorporasi = formik.values.identity_penerima.jenisKorporasi;

  return (
    <>
      <FormHeader title="Jenis Penerima Fidusia" />
      <Box className="form-horizontal">
        <Row>
          {/* Jenis Pendaftaran selalu ditampilkan */}
          <Col xs="12" md="6" lg="6" xl="6">
            <FormSelect
              formik={formik}
              name="identity_penerima.jenisPendaftaran"
              title="Jenis Pendaftaran"
              placeholder="jenis pendaftaran"
              options={[
                { label: 'Korporasi', value: 'korporasi' },
                { label: 'Perseorangan', value: 'perseorangan' },
              ]}
              required
            />
          </Col>

          {/* Jika KORPORASI */}
          {jenisPendaftaran === 'korporasi' && (
            <>
              <Col xs="12" md="6" lg="6" xl="6">
                <FormSelect
                  formik={formik}
                  name="identity_penerima.jenisKorporasi"
                  title="Jenis Korporasi"
                  placeholder="jenis korporasi"
                  options={[
                    { label: 'Korporasi Indonesia', value: 'indonesia' },
                    { label: 'Korporasi Asing', value: 'asing' },
                    { label: 'Koperasi Lainnya', value: 'lainnya' },
                  ]}
                  required
                />
              </Col>

              <Col xs="12" md="6" lg="6" xl="6">
                <FormSelect
                  formik={formik}
                  name="identity_penerima.jenisSubKorporasi"
                  title="Jenis Sub Korporasi"
                  placeholder="sub korporasi"
                  options={[
                    { label: 'Bank', value: 'bank' },
                    { label: 'Lembaga Keuangan Bukan Bank', value: 'non-bank' },
                    { label: 'Lainnya', value: 'lainnya' },
                  ]}
                />
              </Col>

              {jenisKorporasi !== 'asing' && (
                <Col xs="12" md="6" lg="6" xl="6">
                  <FormSelect
                    formik={formik}
                    name="identity_penerima.jenisBadanHukum"
                    title="Jenis Badan Hukum"
                    placeholder="jenis badan hukum"
                    options={[
                      { label: 'Perseroan Terbatas (PT)', value: 'pt' },
                      { label: 'Commanditaire Vennootschap (CV)', value: 'cv' },
                    ]}
                    required
                  />
                </Col>
              )}
            </>
          )}

          {/* Jika PERSEORANGAN */}
          {jenisPendaftaran === 'perseorangan' && (
            <>
              <Col xs="12" md="6" lg="6" xl="6">
                <FormSelect
                  formik={formik}
                  name="identity_penerima.kewarganegaraan"
                  title="Kewarganegaraan"
                  placeholder="kewarganegaraan"
                  options={[
                    { label: 'WNI', value: 'wni' },
                    { label: 'WNA', value: 'wna' },
                  ]}
                  required
                />
              </Col>

              <Col xs="12" md="6" lg="6" xl="6">
                <FormSelect
                  formik={formik}
                  name="identity_penerima.jenisPenggunaan"
                  title="Jenis Penggunaan"
                  placeholder="jenis penggunaan"
                  options={[
                    { label: 'Produktif', value: 'produktif' },
                    { label: 'Konsumtif', value: 'konsumtif' },
                  ]}
                  required
                />
              </Col>

              <Col xs="12" md="6" lg="6" xl="6">
                <FormSelect
                  formik={formik}
                  name="identity_penerima.jenisSubPenggunaan"
                  title="Jenis Sub Penggunaan"
                  placeholder="(Opsional)"
                  options={[
                    { label: 'Usaha Mikro', value: 'usaha-mikro' },
                    { label: 'Usaha Kecil', value: 'usaha-kecil' },
                    { label: 'Usaha Menengah', value: 'usaha-menengah' },
                    { label: 'Usaha Lainnya', value: 'usaha-lainnya' },
                  ]}
                />
              </Col>
            </>
          )}
        </Row>
      </Box>
    </>
  );
};

export default JenisPenerimaFidusia;
