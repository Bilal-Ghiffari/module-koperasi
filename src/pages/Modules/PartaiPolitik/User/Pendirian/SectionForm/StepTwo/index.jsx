import { CustomButton } from "@/components/Common/CustomBUtton";
import LineDashed from "@/components/Common/Line/Dashed";
import { ArrowForward } from "@mui/icons-material";
import { Box } from "@mui/material";
import { Form, Formik } from "formik";
import InformasiPartaiPolitik from "./InformasiPartaiPolitik";
import { InitialValues } from "./utils/InitialValues";
import { validationSchema } from "./utils/schema";
import DataNotaris from "./DataNotaris";
import InformasiPermohonan from "./InformasiPermohonan";
import AlamatPartaiPolitik from "./AlamatPartaiPolitik";

export default function DataPartaiPolitik({ goToNext, goToPrev, saveDraft }) {
  const handlePrev = () => {
    goToPrev();
  };
  const handleDraft = (formik) => {
    console.log("🚀 ~ handleDraft ~ formik:", formik);
    if (!formik?.isValid) {
      saveDraft();
    }
    // saveDraft();
  };
  const handleSubmit = (formik) => {
    console.log("🚀 ~ handleSubmit ~ values:", formik);
    if (!formik?.isValid) {
      goToNext();
    }
  };
  return (
    <Box className="bg-white page-content mb-4" sx={{ width: "100%" }}>
      <Formik
        initialValues={InitialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <Box
              className="mt-3 mb-3"
              sx={{
                border: "1px solid #E7E7E7",
                borderRadius: 5,
                padding: "24px",
              }}
            >
              <InformasiPartaiPolitik formik={formik} />
              <LineDashed />
              <DataNotaris formik={formik} />
              <LineDashed />
              <InformasiPermohonan formik={formik} />
              <LineDashed />
              <AlamatPartaiPolitik formik={formik} />
              <LineDashed />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  pt: 2,
                  px: 2,
                }}
              >
                <CustomButton
                  text={"Kembali"}
                  bgColor="transparent"
                  border="1px solid #E7E7E7"
                  textColor="#041662"
                  onClick={handlePrev}
                />
                <CustomButton
                  text={"Simpan Draft"}
                  bgColor="#f97316"
                  border="1px solid #E7E7E7"
                  textColor="#fff"
                  hoverColor="#ea580c"
                />
                <CustomButton
                  type="submit"
                  //   loading={loading}
                  //   onClick={() => {
                  //     if (activeStep === stepsResult.length - 1) {
                  //       handleSubmit('submit');
                  //     } else {
                  //       handleNext();
                  //     }
                  //   }}
                  text={"Selanjutnya"}
                  rightIcon={<ArrowForward fontSize="14" />}
                />
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
