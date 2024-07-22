import {
  Box,
  Checkbox,
  InputLabel,
  ListItemText,
  MenuItem,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function DeptListSection(props) {
  const { errors, manageDeptList, onChange, selectedRowData } = props;
  const [deptList, setDeptList] = useState(
    selectedRowData?.deptList.length > 0 ? selectedRowData.deptList : []
  );
  const [openDeptNameDropdownMenu, setOpenDeptNameDropdownMenu] =
    useState(false);
  const [deptNameList, setDeptNameList] = useState(
    selectedRowData?.deptNameList.length > 0 ? selectedRowData.deptNameList : []
  );

  const handleChangeDeptList = (event) => {
    const { value } = event.target;
    setDeptList(value);
  };

  const handleCloseDeptNameDropdownMenu = () => {
    setOpenDeptNameDropdownMenu(false);
  };

  const handleOpenDeptNameDropdownMenu = () => {
    setOpenDeptNameDropdownMenu(true);
  };

  useEffect(() => {
    onChange(deptList);
    setDeptNameList(deptList.map((item) => item.deptName));
  }, [deptList, onChange]);

  return (
    <Box className="form-section">
      <InputLabel
        id="dept-list-label"
        className="section-label"
        htmlFor="dept-list"
      >
        Department List
      </InputLabel>
      <TextField
        inputProps={{ id: "dept-list" }}
        name="deptList"
        className="section-input"
        required
        select
        hiddenLabel
        error={errors?.deptList && true}
        helperText={errors?.deptList && errors.deptList}
        value={deptList}
        onChange={handleChangeDeptList}
        SelectProps={{
          multiple: true,
          renderValue: (selected) =>
            selected.map((item) => item.deptName).join(", "),
          open: openDeptNameDropdownMenu,
          onClose: handleCloseDeptNameDropdownMenu,
          onOpen: handleOpenDeptNameDropdownMenu,
          IconComponent: KeyboardArrowRightIcon,
          MenuProps: {
            PaperProps: {
              sx: {
                padding: "8px 0",
                boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
                borderRadius: "8px",
              },
            },
            sx: {
              "& .MuiMenu-list": {
                padding: 0,
                "& .MuiMenuItem-root": {
                  padding: "8px 20px",
                  gap: "4px",
                  "& .MuiCheckbox-root": {
                    padding: 0,
                  },
                  "& .MuiTypography-root": {
                    color: "info.main",
                    fontSize: "0.95rem",
                    fontWeight: 550,
                  },
                },
              },
            },
          },
        }}
        sx={{
          "& .MuiSvgIcon-root": {
            transform: openDeptNameDropdownMenu && "rotate(90deg)",
          },
        }}
      >
        {manageDeptList.map((option) => (
          <MenuItem key={option.deptCode} value={option}>
            <Checkbox
              id={option.deptName}
              name={option.deptName}
              checked={deptNameList.indexOf(option.deptName) > -1}
            />
            <ListItemText primary={option.deptName} />
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

export default DeptListSection;
