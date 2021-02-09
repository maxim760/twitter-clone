import React from "react";
import { SearchTextField } from "../../../components";
import { InputAdornment, TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import SearchIcon from "@material-ui/icons/Search";
import { useSearch } from "../hooks/useSearch";

interface SearchProps {}

export const Search: React.FC<SearchProps> = ({}): React.ReactElement => {
  const { t } = useTranslation(["userPage", "buttons", "tweets"]);
  const {valueQuery, handleChangeQuery} = useSearch(400)
  return (
    <SearchTextField
      value={valueQuery}
      type={"search"}
      fullWidth
      name="search"
      placeholder={t("buttons:search")}
      variant="outlined"
      onChange={handleChangeQuery}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};
