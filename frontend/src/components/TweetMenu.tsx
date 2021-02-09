import React from "react";
import { useHomeStyles } from "../pages/Home/theme";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreIcon from "@material-ui/icons/MoreHorizOutlined";
import { useDispatch } from "react-redux";
import { fetchRemoveTweet } from "../store/ducks/tweets/actionCreators";
import { CircularProgress } from "@material-ui/core";
import { useTranslation } from "react-i18next";

interface TweetMenuProps {
  classes: ReturnType<typeof useHomeStyles>;
  isRemoving: boolean
  id: string
}

export const TweetMenu: React.FC<TweetMenuProps> = ({
  classes,isRemoving,id
}): React.ReactElement => {
  const {t} = useTranslation(['buttons'])
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    event.preventDefault();

    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // отмена всплытия
    event.preventDefault(); // отмена перехода по ссылке
    setAnchorEl(null);
  };
  const handleRemoveTweet = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation(); // отмена всплытия
    event.preventDefault(); // отмена перехода по ссылке
    if (window.confirm("Вы действительно хотите удалить твит?")) {
      dispatch(fetchRemoveTweet(id));
    } else {
      setAnchorEl(null);
    }
  };
  return (
    <div>
      <div style={{ height: 24, width: 24, position:"absolute", right:13, top:10 }}>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
          className={classes.tweetMore}
        >
          <MoreIcon />
        </IconButton>
      </div>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {isRemoving ? null : (
          <MenuItem onClick={handleClose}>{t("buttons:edit")}</MenuItem>
        )}
        <MenuItem
          onClick={handleRemoveTweet}
          style={isRemoving ? { pointerEvents: "none" } : {}}
        >
          {isRemoving ? (
            <CircularProgress size={15} style={{ margin: "auto" }} />
          ) : (
            t("buttons:delete")
          )}
        </MenuItem>
      </Menu>
    </div>
  );
};
