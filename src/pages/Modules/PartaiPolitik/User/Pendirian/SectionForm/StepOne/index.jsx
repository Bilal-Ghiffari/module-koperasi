import React from "react";
import LineDashed from "@/components/Common/Line/Dashed";
import { Box, Button } from "@mui/material";
import { Formik } from "formik";
import InformasiPemohon from "./InformasiPemohon";
import { InitialValues } from "./utils/InitialValues";
import { validationSchema } from "./utils/schema";
import { Form } from "formik";
import { CustomButton } from "@/components/Common/CustomBUtton";
import { ArrowForward } from "@mui/icons-material";
import AlamatPemohon from "./AlamatPemohon";

export default function DataPemohon({ goToNext, goToPrev, saveDraft }) {
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
              <InformasiPemohon formik={formik} />
              <LineDashed />
              <AlamatPemohon formik={formik} />
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
                />
                <CustomButton
                  text={"Simpan Draft"}
                  onClick={() => handleDraft(formik)}
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
