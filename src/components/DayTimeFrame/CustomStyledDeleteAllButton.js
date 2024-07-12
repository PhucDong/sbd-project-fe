import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const iconStyles = {
  fontSize: "1.4rem",
  mr: "8px",
};

function CustomStyledDeleteAllButton(props) {
  const { onClick } = props;

  return (
    <>
      <IconButton
        sx={{
          fontSize: "1.1rem",
          color: "#fff",
          backgroundColor: "error.main",
          padding: "8px 20px",
          borderRadius: "20px",
          fontWeight: 600,
          lineHeight: "100%",
          "&:hover": {
            backgroundColor: "error.main",
          },
        }}
        onClick={onClick}
      >
        <DeleteIcon sx={iconStyles} />
        Delete All
      </IconButton>
    </>
  );
}

export default CustomStyledDeleteAllButton;
