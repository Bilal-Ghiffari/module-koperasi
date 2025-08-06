import React from "react";
import CustomStepper from "../../components/CustomStepper";
import DataPengurusProvinsi from "./SectionForm/StepFour";
import DataPemohon from "./SectionForm/StepOne";
import DataPengurusPusat from "./SectionForm/StepThree";
import DataPartaiPolitik from "./SectionForm/StepTwo";
import { Box } from "@mui/material";

export default function Pendirian() {
  const [activeStep, setActiveStep] = React.useState(0);
  const AllSteps = React.useMemo(
    () => [
      {
        id: "1",
        label: "Data Pemohon",
        // component: DataPemohon,
        component: DataPengurusProvinsi,
      },
      {
        id: "2",
        label: "Data Partai Politik",
        component: DataPartaiPolitik,
      },
      {
        id: "3",
        label: "Data Pengurus Pusat",
        component: DataPengurusPusat,
      },
      {
        id: "4",
        label: "Data Pengurus Provinsi",
        component: DataPengurusProvinsi,
      },
    ],
    []
  );

  const goToNext = () => {
    if (activeStep < AllSteps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const saveDraft = (stepData) => {
    console.log(`Saving draft for step: ${stepData}`);
    // Add your save draft logic here
    alert("Draft berhasil disimpan!");
  };

  const CurrentStepComponent = AllSteps[activeStep].component;

  return (
    <Box className="bg-white page-content mb-4" sx={{ width: "100%" }}>
      <CustomStepper
        steps={AllSteps}
        activeStep={activeStep}
        title="Pendirian Partai Politik"
      />

      <CurrentStepComponent
        goToNext={goToNext}
        goToPrev={goToPrev}
        saveDraft={saveDraft}
        // submitForm={submitForm}
      />
    </Box>
  );
}
