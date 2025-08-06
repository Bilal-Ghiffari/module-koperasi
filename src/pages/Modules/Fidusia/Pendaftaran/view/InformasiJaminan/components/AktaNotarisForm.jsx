import {
  FormHeader,
  FormInputNested,
} from '@/components/Common/FormFieldNested';
import { Col, Row } from 'reactstrap';

const AktaNotarisForm = ({ formik }) => {
  const identitasJaminan = formik.values.information_jaminan;
  return (
    <>
      <FormHeader title="Akta Notaris Jaminan Fidusia" />
      <div className="alert alert-warning small" role="alert">
        <strong>PERHATIAN</strong> <br />
        PP 21 TAHUN 2015 TENTANG TATA CARA PENDAFTARAN JAMINAN FIDUSIA DAN BIAYA
        PEMBUATAN AKTA JAMINAN FIDUSIA Pasal 4.
        <br />
        Permohonan pendaftaran Jaminan Fidusia sebagaimana dimaksud dalam Pasal
        3 diajukan dalam jangka waktu paling lama 30 (tiga puluh) hari terhitung
        sejak tanggal pembuatan akta Jaminan Fidusia.
      </div>

      <Row>
        <Col md="4">
          <FormInputNested
            formik={formik}
            name="information_jaminan.nomorAkta"
            title="Nomor Akta"
            placeholder="Tulis nomor akta"
            required
          />
        </Col>
        <Col md="4">
          <FormInputNested
            formik={formik}
            name="information_jaminan.tanggalAkta"
            title="Tanggal Akta"
            type="date"
            placeholder="Pilih tanggal akta"
            required
          />
        </Col>
        <Col md="4">
          <FormInputNested
            formik={formik}
            name="information_jaminan.namaNotaris"
            title="Nama Notaris / Kedudukan"
            placeholder="Tulis nama/kedudukan notaris"
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default AktaNotarisForm;
