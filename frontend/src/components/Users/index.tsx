import React from "react";
import Avatar from "@material-ui/core/Avatar";
import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import { useHomeStyles } from "../../pages/Home/theme";
import ListItemText from "@material-ui/core/ListItemText";

import { LoadingStatus } from "../../store/types";
import { useTranslation } from "react-i18next";
import { useUsers } from "./useUsers";
import { Link } from "react-router-dom";
import { AvatarUI } from "../ui/AvatarUI";
import { reduceWords } from "../../utils/reduceWords";

interface UsersProps {
  classes: ReturnType<typeof useHomeStyles>;
}

export const Users: React.FC<UsersProps> = ({
  classes,
}): React.ReactElement => {
  const { t } = useTranslation(["sideMenu"]);
  const { users, loadingStatus } = useUsers()
  const handleClick = (e: any) => {
    e.preventDefault()
  }

  return (
    <Paper className={classes.rightSideBlock}>
      <Paper className={classes.rightSideBlockHeader} variant="outlined">
        <b>{t("sideMenu:read")}</b>
      </Paper>
      <List>
        {loadingStatus === LoadingStatus.LOADED && users?.length
          ? users.map((user) => (
              <Link key={user._id} to={`/user/${user._id}`}>
                <ListItem className={classes.rightSideBlockItem}>
                  <ListItemAvatar>
                    <AvatarUI avatar={user.avatar} username={user.username} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={reduceWords(user.fullname, 12)}
                    secondary={
                      <Typography component="span" variant="body2">
                        @{reduceWords(user.username, 12)}
                      </Typography>
                    }
                  />
                  <Button color="primary" onClick={handleClick}>
                    <PersonAddIcon />
                  </Button>
                </ListItem>
                <Divider component="li" />
              </Link>
            ))
          : null}
      </List>
    </Paper>
  );
};
