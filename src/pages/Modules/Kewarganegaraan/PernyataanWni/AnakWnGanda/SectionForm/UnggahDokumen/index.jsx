import { FormHeader, FormUploadFile } from "@/components/Common/FormField";
import { Box } from "@mui/material";
import { Row } from "reactstrap";
import { Col } from "reactstrap";

const UnggahDokumen = ({ formik }) => {
  return (
    <Box
      className="mt-3 mb-3"
      sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: "24px" }}
    >
      <FormHeader title={"Upload Dokumen"} />
      <Row>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="kutipanAktaKelahiran"
            label="Kutipan akta kelahiran anak yang telah disahkan oleh Pejabat atau Perwakilan Republik Indonesia"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="kutipanAktaPerkawinan"
            label="Kutipan akta perkawinan atau buku nikah orang tua yang telah disahkan oleh Pejabat atau Perwakilan RI"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="pasporRepublik"
            label="Paspor Republik Indonesia dan/atau paspor asing atau dokumen sejenis yang telah disahkan oleh Pejabat atau Perwakilan RI"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="ktp"
            label="Kartu tanda penduduk atau surat penerbitan nomor identitas tunggal yang telah disahkan oleh Pejabat atau Perwakilan RI"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="srtPernyataanPelepasan"
            label="Surat pernyataan pelepasan kewarganegaraan asing dari anak, ditulis di atas kertas bermaterai dan disetujui oleh pejabat negara asing atau kantor perwakilan negara asing"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="keputusanMenteri"
            label="Keputusan Menteri tentang Kewarganegaraan Republik Indonesia, atau fotokopi surat keterangan dari Direktur Jenderal, atau fotokopi sertifikat pendaftaran dan/atau affidavit"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="pasFoto"
            label="Pasfoto berwarna terbaru dari anak yang mengajukan pernyataan."
            acceptedFileTypes={["image/jpeg", "image/png", "image/jpg"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
      </Row>
    </Box>
  );
};

export default UnggahDokumen;
