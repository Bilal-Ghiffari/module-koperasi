import 'bootstrap/dist/css/bootstrap.min.css';
import { FaArrowRight } from 'react-icons/fa';
import { Col, Row } from 'reactstrap';

const OnBoardingPendaftaran = ({ formik, setActiveStep, label }) => {
  function handleCheckAndRedirect() {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  return (
    <div className="bg-white">
      <div className="d-flex flex-column w-100 py-4">
        <Row
          className="w-100"
          style={{ maxWidth: '800px', padding: '0px 50px' }}
        >
          <Col xs="12" className="mb-2">
            <h4 className="fw-bold" style={{ color: '#041662' }}>
              {label}
            </h4>
            <hr className="mt-0 mb-3" />
          </Col>

          <Col xs="12" className="mb-4">
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
              Anda akan memulai proses permohonan pendaftaran fidusia.Pastikan
              Anda telah menyiapkan dokumen dan informasi yang dibutuhkan
              sebelum melanjutkan.
            </p>
          </Col>

          <Col xs="12" className="mb-4">
            <button
              onClick={handleCheckAndRedirect}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#041662',
                color: '#fff',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '6px',
                fontSize: '14px',
              }}
            >
              <span>Mulai Pendaftaran</span> <FaArrowRight size={10} />
            </button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OnBoardingPendaftaran;
