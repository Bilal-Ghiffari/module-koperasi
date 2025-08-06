import { Input, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaArrowRight, FaEdit } from "react-icons/fa";
import { DynamicDropdown } from "@/components/DynamicDropdown";
import { Label } from "reactstrap";
import { dataDocuments, dataNegara } from "../mock";

const OnBoardingPendaftaran = ({ formik, setActiveStep, label }) => {
  function handleCheckAndRedirect() {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  return (
    <div className="bg-white">
      <div className="d-flex flex-column w-100 py-4">
        <Row
          className="w-100"
          style={{ maxWidth: "800px", padding: "0px 50px" }}
        >
          <Col xs="12" className="mb-2">
            <h4 className="fw-bold" style={{ color: "#041662" }}>
              {label}
            </h4>
            <hr className="mt-0 mb-3" />
          </Col>

          <Col xs="12" className="mb-4">
            <p style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
              Anda akan memulai proses pendaftaran permohonan legalisasi
              dokumen. Silakan pilih dokumen yang ingin dilegalisasi serta
              negara tujuan untuk proses selanjutnya.
            </p>
          </Col>

          <Col xs="12" className="mb-2">
            <DynamicDropdown
              formik={formik}
              fieldName={"document"}
              data={dataDocuments}
              label="Dokumen yang ingin dilegalisasi"
              required
              useLabel
            />
          </Col>

          <Col xs="12" className="mb-2">
            <DynamicDropdown
              id="apostille"
              formik={formik}
              fieldName={"negara_tujuan"}
              data={dataNegara}
              label="Negara tujuan legalisasi"
              required
            />
          </Col>

          <Col xs="12">
            {formik.values.type && (
              <button
                className="mb-4"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "#0d6efd",
                  color: "#fff",
                  border: "1px solid #0d6efd",
                  padding: "8px 16px",
                  borderRadius: "2px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                <FaEdit size={14} />
                <span className="text-capitalize">{formik.values.type}</span>
              </button>
            )}
            {/* <Label className="mb-2">
              Pilih jenis permohonan yang tersedia berdasarkan dokumen dan
              negara tujuan yang dipilih <span className="text-danger">*</span>
            </Label>
            <div className="d-flex gap-3">
              {["Apostille", "Legalisasi"].map((item) => {
                const isActive = formik.values.jenis === item;
                return (
                  <button
                    key={item}
                    onClick={() => formik.setFieldValue("jenis", item)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      backgroundColor: isActive ? "#0d6efd" : "#fff",
                      color: isActive ? "#fff" : "#0d6efd",
                      border: "1px solid #0d6efd",
                      padding: "8px 16px",
                      borderRadius: "2px",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    <FaEdit size={14} />
                    <span>{item}</span>
                  </button>
                );
              })}
            </div> */}
          </Col>

          <Col xs="12" className="mb-4">
            <button
              onClick={handleCheckAndRedirect}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#041662",
                color: "#fff",
                border: "none",
                padding: "10px 16px",
                borderRadius: "6px",
                fontSize: "14px",
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
