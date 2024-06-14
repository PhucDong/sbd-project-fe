import { Chip } from "@mui/material";
import React from "react";

function CustomDayTimeFrameChip(props) {
  const { label } = props;

  return (
    <Chip
      label={label}
      variant="outlined"
      sx={{
        border: "1px solid #A9A9A9",
        backgroundColor: "#fff",
        px: "16px",
        py: "8px",
        "& .MuiChip-label": {
          p: 0,
          fontFamily: "Open Sans, sans-serif",
          fontSize: "0.95rem",
          color: "#757575",
        },
      }}
    />
  );
}

export default CustomDayTimeFrameChip;
