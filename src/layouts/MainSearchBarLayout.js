import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import CustomStyledGeneralButton from "../components/_share/CustomStyledGeneralButton";

function MainSearchBarLayout() {
  const [searchHistoryList, setSearchHistoryList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleChangeSearchValue = (event, newInputValue) => {
    setSearchValue(newInputValue);
  };

  const handleEnterSearchValue = (event) => {
    const { value } = event.target;

    if (event.key === "Enter" && value) {
      setSearchHistoryList((prevList) => {
        const prevHistoryList = [...prevList];
        if (!prevHistoryList.includes(value)) {
          prevHistoryList.unshift(value);
        }
        return prevHistoryList;
      });
    }
  };

  const handleSearchDevice = () => {
    setSearchHistoryList((prevList) => {
      const prevHistoryList = [...prevList];
      if (!prevHistoryList.includes(searchValue)) {
        prevHistoryList.unshift(searchValue);
      }
      return prevHistoryList;
    });
  };

  const handleChangeSelectedOption = (event, newOption) => {
    setSelectedOption(newOption);
  };

  // useEffect(() => {
  //   console.log("Search value: ", searchValue);
  //   console.log("Selected option: ", selectedOption);
  //   console.log("Seach history list: ", searchHistoryList);
  // }, [searchValue, selectedOption, searchHistoryList]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: "4px",
        alignItems: "stretch",
        height: "46px",
        mb: "30px",
      }}
    >
      <Autocomplete
        value={selectedOption}
        onChange={handleChangeSelectedOption}
        inputValue={searchValue}
        onInputChange={handleChangeSearchValue}
        onKeyDown={handleEnterSearchValue}
        freeSolo
        options={searchHistoryList.map((option) => option)}
        renderInput={(params) => (
          <TextField {...params} placeholder="Search for a device" />
        )}
        sx={{
          width: "40%",
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            padding: "8px 20px",
            height: "46px",
            "& .MuiAutocomplete-input": {
              padding: 0,
            },
            "& .MuiOutlinedInput-input": {
              lineHeight: "100%",
            },
          },
        }}
      />
      <CustomStyledGeneralButton onClick={handleSearchDevice}>
        Search
      </CustomStyledGeneralButton>
    </Box>
  );
}

export default MainSearchBarLayout;
