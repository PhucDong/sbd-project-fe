import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

function CustomStyledGeneralButton({ children, onClick }) {
  return (
    <Button
      onClick={onClick}
      startIcon={children === "Add" ? <AddIcon /> : <SearchIcon />}
      sx={{
        backgroundColor: children === "Add" ? "success.main" : "secondary.main",
        padding: "8px 20px",
        textTransform: "capitalize",
        fontSize: "1.15rem",
        fontWeight: 600,
        lineHeight: "100%",
        color: "#fff",
        borderRadius: children === "Add" ? "20px" : "8px",
        fontFamily: "Open Sans, sans-serif",
        "& .MuiSvgIcon-root": {
          fontSize: "1.5rem",
        },
        "&:hover": {
          backgroundColor:
            children === "Add" ? "success.main" : "secondary.main",
        },
      }}
    >
      {children}
    </Button>
  );
}

export default CustomStyledGeneralButton;
