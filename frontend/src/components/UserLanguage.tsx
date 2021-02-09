import React from "react";
import { Menu, MenuItem, Button } from "@material-ui/core";
import { useTranslation } from 'react-i18next';

interface UserLanguageProps {
  handleClose?(): void;
}

export const UserLanguage: React.FC<UserLanguageProps> = ({
  handleClose = () => {},
}): React.ReactElement => {
  const { i18n, t } = useTranslation(["languages"])
  const activeLang = i18n.language
  const isRu = activeLang==="ru"
  const isEn = activeLang==="en"
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenPopup = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleSetLang = (lang: string) => {
    i18n.changeLanguage(lang)
    handleClose();
    handleCloseThis();
  };
  const handleCloseThis = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <MenuItem onClick={handleOpenPopup}>{t("languages:lang")}</MenuItem>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseThis}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem selected={isRu} disabled={isRu} onClick={handleSetLang.bind(null, "ru")}>{t("languages:ru")}</MenuItem>
        <MenuItem selected={isEn} disabled={isEn} onClick={handleSetLang.bind(null, "en")}>{t("languages:en")}</MenuItem>
      </Menu>
    </>
  );
};
