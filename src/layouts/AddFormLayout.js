import { Modal } from "@mui/material";
import { CustomStyledModalContent } from "../components/CustomStyledModalContent";

function AddFormLayout(props) {
  const { openAddForm, handleCloseAddForm, children } = props;

  return (
    <Modal open={openAddForm} onClose={handleCloseAddForm}>
      <CustomStyledModalContent>{children}</CustomStyledModalContent>
    </Modal>
  );
}

export default AddFormLayout;
