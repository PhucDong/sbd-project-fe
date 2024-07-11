import { Modal } from "@mui/material";
import { CustomStyledModalContent } from "../components/_share/CustomStyledModalContent";

function AddFormLayout(props) {
  const { openForm, handleCloseForm, children } = props;

  return (
    <Modal open={openForm} onClose={handleCloseForm}>
      <CustomStyledModalContent>{children}</CustomStyledModalContent>
    </Modal>
  );
}

export default AddFormLayout;
