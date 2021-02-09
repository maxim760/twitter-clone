import { useState } from "react";

interface IMenu {
  open: boolean;
  anchorEl: null | HTMLElement;
  handleOpenMenu(e: React.MouseEvent<HTMLElement>): void;
  handleCloseMenu(): void;
}

export const useMenu = (): IMenu => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return { open, anchorEl, handleOpenMenu, handleCloseMenu };
};
