import { CustomButton } from "@/components/Common/CustomBUtton";
import { ArrowForward, Drafts, Send } from "@mui/icons-material";
import { Box, CircularProgress } from "@mui/material";

const NavigationButton = ({
  handleSubmit,
  handleNext,
  handleBack,
  handleDraft,
  activeStep,
  stepsResult,
  isSubmitting = false,
  postLoading = false,
  patchLoading = false,
}) => {
  const isLastStep = activeStep === 4;
  const isFirstStep = activeStep === 0;
  const step3 = activeStep === 3;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 0,
        pt: 2,
        px: 2,
      }}
    >
      {activeStep > 1 && (
        <CustomButton
          text="Kembali"
          bgColor="transparent"
          border="1px solid #E7E7E7"
          textColor="#041662"
          disabled={isFirstStep}
          onClick={handleBack}
        />
      )}

      {!isFirstStep && !step3 && (
        <CustomButton
          text="Draft"
          bgColor="#f97316"
          border="1px solid #E7E7E7"
          textColor="#fff"
          hoverColor="#ea580c"
          onClick={handleDraft}
          rightIcon={<Drafts fontSize="14px" />}
        />
      )}

      {!isLastStep && (
        <CustomButton
          onClick={handleNext}
          // loading={isLoading}
          text="Selanjutnya"
          bgColor="#041662"
          hoverColor="#1e40af"
          // rightIcon={
          //   isLoading ? (
          //     <CircularProgress size={14} color="inherit" />
          //   ) : (
          //     <ArrowForward fontSize="small" />
          //   )
          // }
        />
      )}

      {isLastStep && (
        <CustomButton
          onClick={handleSubmit}
          // loading={submitLoading}
          text="Submit Permohonan"
          bgColor="#041662"
          hoverColor="#1e40af"
          // rightIcon={
          //   submitLoading ? (
          //     <CircularProgress size={14} color="inherit" />
          //   ) : (
          //     <Send fontSize="small" />
          //   )
          // }
          // disabled={submitLoading}
        />
      )}
    </Box>
  );
};

export default NavigationButton;
