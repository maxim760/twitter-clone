import React from "react";
import { useHomeStyles } from "../pages/Home/theme";
import {
  selectUserData,
  selectUsername,
  selectUserId,
} from "../store/ducks/user/selectors";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { colors, Typography, Menu, MenuItem, Button } from "@material-ui/core";
import ArrowBottomIcon from "@material-ui/icons/ArrowDropDown";
import { Link, useHistory } from "react-router-dom";
import { signOut, setUserPage } from "../store/ducks/user/actionCreators";
import { getFirstChar } from "../utils/getFirstChar";
import { History } from "history";
import { UserLanguage } from "./UserLanguage";
import { useTranslation } from "react-i18next";
import { AvatarUI } from "./ui/AvatarUI";

interface UserSideProfileProps {
  classes: ReturnType<typeof useHomeStyles>;
}

export const UserSideProfile: React.FC<UserSideProfileProps> = ({
  classes,
}): React.ReactElement | null => {
  const {t} = useTranslation(['buttons'])
  const dispatch = useDispatch();
  const history: History = useHistory();
  const userData = useSelector(selectUserData);
  const userName = useSelector(selectUsername);
  const userId = useSelector(selectUserId);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenPopup = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    window.localStorage.removeItem("token");
    dispatch(signOut());
  };

  if (!userData) {
    return null;
  }

  const getProfile = () => {
    userId && dispatch(setUserPage({ id: userId }));
    history.push(`/user/${userId}`);
  };

  return (
    <>
      <div onClick={handleOpenPopup} className={classes.sideProfile}>
        <AvatarUI avatar={userData.avatar} username={userData.username} />
        <div className={classes.sideProfileInfo}>
          <b>{userData?.fullname}</b>
          <Typography style={{ color: colors.grey[500] }}>
            @{userData?.username}
          </Typography>
        </div>
        <ArrowBottomIcon />
      </div>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <UserLanguage handleClose={handleClose} />
        <MenuItem onClick={getProfile}>{t("buttons:profile")}</MenuItem>
        <MenuItem onClick={handleSignOut}>{t("buttons:out")}</MenuItem>
      </Menu>
    </>
  );
};
