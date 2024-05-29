import { Button } from "@mui/material";

function CustomStyledButton(props) {
  return (
    <Button
      onClick={props.onClick}
      sx={{
        border: props.children === "Cancel" ? "1px solid #A9A9A9" : "none",
        py: "12px",
        px: "24px",
        width: "120px",
        backgroundColor:
          props.children === "Cancel" ? "#F0F0F0" : "secondary.main",
        color: props.children === "Cancel" ? "info.main" : "#fff",
        fontWeight: 550,
        textTransform: "capitalize",
        borderRadius: "20px",
        lineHeight: "100%",
        fontSize: "1.2rem",
        "&:hover": {
          backgroundColor:
            props.children === "Cancel" ? "#F0F0F0" : "secondary.main",
        },
      }}
    >
      {props.children}
    </Button>
  );
}

export default CustomStyledButton;
