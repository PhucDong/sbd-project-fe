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

function FunctionModuleSection(props) {
  const { errors, manageFunctionModuleList, onChange, selectedRowData } = props;
  const [functionModuleList, setFunctionModuleList] = useState(
    selectedRowData?.functionModuleList.length > 0
      ? selectedRowData.functionModuleList
      : []
  );
  const [openFunctionModuleDropdownMenu, setOpenFunctionModuleDropdownMenu] =
    useState(false);

  const handleChangeFunctionModuleList = (event) => {
    setFunctionModuleList(event.target.value);
  };

  const handleCloseFunctionModuleDropdownMenu = () => {
    setOpenFunctionModuleDropdownMenu(false);
  };
  const handleOpenFunctionModuleDropdownMenu = () => {
    setOpenFunctionModuleDropdownMenu(true);
  };

  useEffect(() => {
    onChange(functionModuleList);
  }, [functionModuleList, onChange]);

  return (
    <Box className="form-section">
      <InputLabel
        id="function-module-label"
        className="section-label"
        htmlFor="function-module"
      >
        Function Module
      </InputLabel>
      <TextField
        inputProps={{ id: "function-module" }}
        name="functionModuleList"
        className="section-input"
        required
        select
        hiddenLabel
        error={errors?.functionModuleList && true}
        helperText={errors?.functionModuleList && errors.functionModuleList}
        value={functionModuleList}
        onChange={handleChangeFunctionModuleList}
        SelectProps={{
          multiple: true,
          renderValue: (selected) => selected.join(", "),
          open: openFunctionModuleDropdownMenu,
          onClose: handleCloseFunctionModuleDropdownMenu,
          onOpen: handleOpenFunctionModuleDropdownMenu,
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
            transform: openFunctionModuleDropdownMenu && "rotate(90deg)",
          },
        }}
      >
        {manageFunctionModuleList.map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox
              id={option}
              name={option}
              checked={functionModuleList.indexOf(option) > -1}
            />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

export default FunctionModuleSection;
