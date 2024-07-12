import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const iconStyles = {
  fontSize: "1.6rem",
  mr: "4px",
};

function CustomStyledOperation(props) {
  const { onClick, children } = props;

  return (
    <>
      <IconButton
        sx={{
          fontSize: "1rem",
          color: children === "Modify" ? "secondary.main" : "error.main",
          p: 0,
        }}
        onClick={onClick}
      >
        {children === "Modify" ? (
          <EditIcon sx={iconStyles} />
        ) : (
          <DeleteIcon sx={iconStyles} />
        )}
        {children}
      </IconButton>
    </>
  );
}

export default CustomStyledOperation;
