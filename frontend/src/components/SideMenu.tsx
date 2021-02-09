import React from "react";
import { useHomeStyles } from "../pages/Home/theme";
import IconButton from "@material-ui/core/IconButton";

import TwitterIcon from "@material-ui/icons/Twitter";
import SearchIcon from "@material-ui/icons/SearchRounded";
import NotificationIcon from "@material-ui/icons/NotificationsOutlined";
import EmailIcon from "@material-ui/icons/EmailOutlined";
import MarkIcon from "@material-ui/icons/BookmarkBorderOutlined";
import ListIcon from "@material-ui/icons/ListAltRounded";
import UserIcon from "@material-ui/icons/PersonOutlineOutlined";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import CreateIcon from "@material-ui/icons/Create";
import { ModalBlock } from ".";
import { AddTweetForm } from "./AddTweetForm";
import { Link, useHistory } from "react-router-dom";
import { UserSideProfile } from "./UserSideProfile";
import { History } from "history";
import { selectUsername, selectUserId } from "../store/ducks/user/selectors";
import { useSelector, useDispatch } from "react-redux";
import { setUserPage } from "../store/ducks/user/actionCreators";
import { useTranslation } from "react-i18next";

interface SideMenuProps {
  classes: ReturnType<typeof useHomeStyles>;
}

export const SideMenu: React.FC<SideMenuProps> = ({
  classes,
}): React.ReactElement => {
  const {t} = useTranslation(["buttons","sideMenu"])
  const history: History = useHistory()
  const dispatch = useDispatch()
  const [visibleAddTweet, setVisibleAddTweet] = React.useState(false);
  const userName = useSelector(selectUsername)
  const userId = useSelector(selectUserId)
  const handleCloseAddTweet = (): void => {
    setVisibleAddTweet(false);
  };
  const handleOpenAddTweet = (): void => {
    setVisibleAddTweet(true);
  };
  const handleGetProfile = () => {
    userId && dispatch(setUserPage({id:userId}))
    history.push(`/user/${userId}`)
  }

  return (
    <ul className={classes.sideMenuList}>
      <li className={classes.logo}>
        <Link to="/home">
          <IconButton
            className={classes.logoIcon}
            aria-label=""
            color="primary"
          >
            <TwitterIcon />
          </IconButton>
        </Link>
      </li>

      <li className={classes.sideMenuListItem}>
        <div>
          <SearchIcon />
          <Hidden smDown>
            <Typography className={classes.sideMenuListLabel} variant="h6">
              {t("sideMenu:search")}
            </Typography>
          </Hidden>
        </div>
      </li>
      <li className={classes.sideMenuListItem}>
        <div>
          <NotificationIcon />
          <Hidden smDown>
            <Typography className={classes.sideMenuListLabel} variant="h6">
            {t("sideMenu:notify")}
            </Typography>
          </Hidden>
        </div>
      </li>
      <li className={classes.sideMenuListItem}>
        <div>
          <EmailIcon />
          <Hidden smDown>
            <Typography className={classes.sideMenuListLabel} variant="h6">
            {t("sideMenu:msg")}
            </Typography>
          </Hidden>
        </div>
      </li>
      <li className={classes.sideMenuListItem}>
        <div>
          <MarkIcon />
          <Hidden smDown>
            <Typography className={classes.sideMenuListLabel} variant="h6">
            {t("sideMenu:mark")}
            </Typography>
          </Hidden>
        </div>
      </li>
      <li className={classes.sideMenuListItem}>
        <div>
          <ListIcon />
          <Hidden smDown>
            <Typography className={classes.sideMenuListLabel} variant="h6">
            {t("sideMenu:list")}
            </Typography>
          </Hidden>
        </div>
      </li>
      <li className={classes.sideMenuListItem} onClick={handleGetProfile}>
        <div>
          <UserIcon />
          <Hidden smDown>
            <Typography className={classes.sideMenuListLabel} variant="h6">
            {t("sideMenu:profile")}
            </Typography>
          </Hidden>
        </div>
      </li>
      <li className={classes.sideMenuListItem}>
        <Button
          className={classes.sideMenuTweetButton}
          color="primary"
          variant="contained"
          fullWidth
          onClick={handleOpenAddTweet}
        >
          <Hidden smDown>{t("buttons:tweet")}</Hidden>
          <Hidden mdUp>
            <CreateIcon />
          </Hidden>
        </Button>

        <ModalBlock
          visible={visibleAddTweet}
          title=""
          onClose={handleCloseAddTweet}
          isModalPhoto={true}
        >
          <div style={{ width: 550 }}>
            <AddTweetForm rowsMax={15} rows={4} />
          </div>
        </ModalBlock>
      </li>
      <UserSideProfile classes={classes} />
    </ul>
  );
};
