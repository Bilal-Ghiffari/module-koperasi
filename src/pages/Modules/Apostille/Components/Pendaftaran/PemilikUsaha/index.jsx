import { Box, Typography } from "@mui/material";
import { Col, Row } from "reactstrap";
import { FormInput } from "@/components/Common/FormField";
import Header from "../../../../Fidusia/Header";
import { DynamicDropdown } from "@/components/DynamicDropdown";
import Checked from "@/components/Common/Checked";
import DiriSendiri from "./DiriSendiri";
import OrangLain from "./OrangLain";
import PopupTable from "../PopupTable";
import TableKegiatanUsaha from "../TableDataDocument";
import { useState } from "react";

const PemilikUsaha = ({ formik, disabled = false }) => {
  const [open, setOpen] = useState(false);
  const [dataDocuments, setDataDocuments] = useState([0]);

  return (
    <div className="mt-5 mb-3 px-2 ">
      <Box sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: 2 }}>
        {/* Informasi Pemohon Section */}
        <Row>
          <Col xs="12" md="12">
            <Header label={"Informasi Pemohon"} disabled={disabled} />
          </Col>
          <Col
            xs="12"
            style={{ padding: "0px 40px" }}
            className="d-flex align-items-center gap-5 mb-3"
          >
            <Checked
              label="Diri Sendiri"
              value="diri_sendiri"
              fieldName="tipe_pemohon"
              formik={formik}
            />
            <Checked
              label="Orang Lain"
              value="orang_lain"
              fieldName="tipe_pemohon"
              formik={formik}
            />
          </Col>
          <Col xs="12">
            {formik.values.tipe_pemohon == "diri_sendiri" && (
              <DiriSendiri formik={formik} disabled={disabled} />
            )}
            {formik.values.tipe_pemohon == "orang_lain" && (
              <OrangLain formik={formik} disabled={disabled} />
            )}
          </Col>
        </Row>

        {/*Data Dokumen Section */}
        <Row className="mt-4">
          <Col xs="12" md="12">
            <Box
              className="d-flex align-items-center justify-content-between"
              sx={{
                backgroundColor: "#EFF7FF",
                padding: 1,
                borderRadius: 2,
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  color: "#041662",
                  fontSize: "14px",
                  px: 0,
                  fontFamily: "Poppins",
                }}
                className="fw-semibold"
              >
                Data Dokumen
              </Typography>
              {!disabled && (
                <PopupTable
                  formik={formik}
                  open={open}
                  setOpen={setOpen}
                  setDataDocuments={setDataDocuments}
                  dataDocuments={dataDocuments}
                />
              )}
            </Box>
          </Col>
          <Col xs="12" md="12" lg="12" xl="12" className="px-3">
            <TableKegiatanUsaha
              data={formik.values.data_document.filter(
                (doc) => doc?.nama_document && doc.nama_document.trim() !== ""
              )}
              formik={formik}
              showSelect={false}
              setOpen={setOpen}
              setDataDocuments={setDataDocuments}
            />
          </Col>
        </Row>
      </Box>
    </div>
  );
};

export default PemilikUsaha;
