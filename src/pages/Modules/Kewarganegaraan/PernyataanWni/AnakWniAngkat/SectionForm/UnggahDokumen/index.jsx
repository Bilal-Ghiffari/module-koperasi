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
            label="Kutipan akta kelahiran pemohon yang telah disahkan oleh Pejabat atau Perwakilan Republik Indonesia"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="IzinKeimigrasian"
            label="Kutipan akta perkawinan atau buku nikah pemohon yang telah disahkan oleh Pejabat atau Perwakilan Republik Indonesia"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="skTmpTinggal"
            label="Paspor Republik Indonesia, surat sejenis paspor, atau dokumen lain yang membuktikan bahwa pemohon pernah menjadi WNI"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="pasporAnak"
            label="Kartu Tanda Penduduk (KTP) atau surat penerbitan Nomor Identitas Tunggal (NIT)"
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="penetapanKeadilan"
            label="Surat pernyataan penolakan menjadi warga negara asing, dibuat di atas kertas bermaterai yang telah disetujui oleh perwakilan negara asing yang berwenang."
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="srtPerwaNgrAsal"
            label="Surat pernyataan penolakan menjadi warga negara asing, dibuat di atas kertas bermaterai yang telah disetujui oleh perwakilan negara asing yang berwenang."
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="kutipanAktaKelaOrtu"
            label="Surat pernyataan penolakan menjadi warga negara asing, dibuat di atas kertas bermaterai yang telah disetujui oleh perwakilan negara asing yang berwenang."
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="pasporKtpOrtu"
            label="Surat pernyataan penolakan menjadi warga negara asing, dibuat di atas kertas bermaterai yang telah disetujui oleh perwakilan negara asing yang berwenang."
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="kutipanAktaPerkawinan"
            label="Surat pernyataan penolakan menjadi warga negara asing, dibuat di atas kertas bermaterai yang telah disetujui oleh perwakilan negara asing yang berwenang."
            acceptedFileTypes={["application/pdf"]}
            maxFileSizeMB={5}
            required
          />
        </Col>
        <Col lg="12" xl="12">
          <FormUploadFile
            formik={formik}
            name="pasfoto"
            label="Pas foto terbaru ukuran 4x6 cm, berwarna, latar belakang merah, berpakaian rapi dan sopan."
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
