import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";
import StepIcon from "./StepIcon";

const STEP_LABEL_STYLES = {
  fontFamily: "Poppins",
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "18px",
  color: "#888888",
};

const CustomStepper = ({ steps, activeStep, title }) => {
  return (
    <>
      <div className="d-flex justify-content-between">
        <h3
          className="mb-4"
          style={{ fontWeight: 500, fontSize: 24, color: "#262626" }}
        >
          {title}
        </h3>
      </div>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          "& .MuiStepConnector-root": {
            top: 10,
            left: "calc(-50% + 16px)",
            right: "calc(50% + 16px)",
          },
          "& .MuiStepConnector-line": {
            borderTopStyle: "dashed",
            borderTopWidth: 2,
            color: "#E7E7E7",
          },
        }}
      >
        {steps.map((step, index) => {
          const stepProps = {};
          // if ((index)) {
          //   stepProps.completed = false;
          // }

          return (
            <Step key={step.id} {...stepProps}>
              <StepLabel
                StepIconComponent={({ active, completed }) => (
                  <StepIcon
                    active={active}
                    completed={completed}
                    index={index}
                  />
                )}
              >
                <span style={STEP_LABEL_STYLES}>{step.label}</span>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </>
  );
};

export default CustomStepper;
