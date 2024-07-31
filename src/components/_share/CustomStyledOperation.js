import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BallotIcon from "@mui/icons-material/Ballot";

const getOperationIcon = (children) => {
  const iconStyles = {
    fontSize: "1.6rem",
    mr: "4px",
  };

  if (children === "Order List") {
    return <BallotIcon sx={iconStyles} />;
  } else if (children === "Modify") {
    return <EditIcon sx={iconStyles} />;
  } else if (children === "Delete") {
    return <DeleteIcon sx={iconStyles} />;
  }
};

const getColor = (children) => {
  if (children === "Order List") {
    return "primary.main";
  } else if (children === "Modify") {
    return "secondary.main";
  } else if (children === "Delete") {
    return "error.main";
  }
};

function CustomStyledOperation(props) {
  const { onClick, children } = props;

  return (
    <>
      <IconButton
        sx={{
          fontSize: "1rem",
          color: getColor(children),
          p: 0,
        }}
        onClick={onClick}
      >
        {getOperationIcon(children)}
        {children}
      </IconButton>
    </>
  );
}

export default CustomStyledOperation;
