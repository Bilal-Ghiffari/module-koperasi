import React from "react";

const STEP_ICON_STYLES = {
  width: 24,
  height: 24,
  borderRadius: "50%",
  border: "1px solid #E7E7E7",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease",
};

const StepIcon = React.memo(({ active, completed, index }) => (
  <div
    style={{
      ...STEP_ICON_STYLES,
      backgroundColor: active || completed ? "#041662" : "#fff",
      color: active || completed ? "#fff" : "#041662",
    }}
  >
    {index + 1}
  </div>
));

export default StepIcon;
