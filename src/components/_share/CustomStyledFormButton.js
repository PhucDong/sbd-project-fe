import { Button } from "@mui/material";

function CustomStyledFormButton(props) {
  return (
    <Button
      onClick={props.onClick}
      sx={{
        border: props.children === "Cancel" ? "1px solid #A9A9A9" : "none",
        py: "8px",
        px: "20px",
        width: "116px",
        backgroundColor: () => {
          if (props.children === "Cancel") {
            return "#F0F0F0";
          } else if (props.children === "Save") {
            return "secondary.main";
          } else if (props.children === "Delete") {
            return "error.main";
          }
        },
        color: props.children === "Cancel" ? "info.main" : "#fff",
        fontWeight: 550,
        textTransform: "capitalize",
        borderRadius: "20px",
        lineHeight: "100%",
        fontSize: "1.2rem",
        "&:hover": {
          backgroundColor: () => {
            if (props.children === "Cancel") {
              return "#F0F0F0";
            } else if (props.children === "Save") {
              return "secondary.main";
            } else if (props.children === "Delete") {
              return "error.main";
            }
          },
        },
      }}
    >
      {props.children}
    </Button>
  );
}

export default CustomStyledFormButton;
