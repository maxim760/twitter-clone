import React from "react";

import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import { useHomeStyles } from "../pages/Home/theme";
import CircularProgress from "@material-ui/core/CircularProgress";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTagsItems,
  selectTagsLoadingStatusIsLoading,
} from "../store/ducks/tags/selectors";
import { Link } from "react-router-dom";
import { Users } from "./Users";
import { useTranslation } from "react-i18next";
import { fetchTags } from "../store/ducks/tags/actionCreators";

interface TagsProps {
  classes: ReturnType<typeof useHomeStyles>;
}

export const Tags: React.FC<TagsProps> = ({ classes }): React.ReactElement => {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);
  const { t } = useTranslation(["sideMenu"]);
  const tags = useSelector(selectTagsItems);
  const isTagsLoading = useSelector(selectTagsLoadingStatusIsLoading);

  return (
    <div>
      <Paper className={classes.rightSideBlock}>
        <Paper className={classes.rightSideBlockHeader} variant="outlined">
          <b>{t("sideMenu:themes")}</b>
      </Paper>
        <List className={classes.rightSideBlockBody}>
          {isTagsLoading ? (
            <div className={classes.centeredSmall}>
              <CircularProgress />
            </div>
          ) : (
            tags.map(({ name, count, _id }) => (
              <React.Fragment key={_id}>
                <ListItem className={classes.rightSideBlockItem}>
                  <Link to={`/home/search?q=${name}`}>
                    <ListItemText
                      primary={name}
                      secondary={
                        <Typography component="span" variant="body2">
                          {t("sideMenu:tweets", {
                            tweetCount: count.toLocaleString(),
                          })}
                        </Typography>
                      }
                    />
                  </Link>
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))
          )}
        </List>
      </Paper>
      <Users classes={classes} />
    </div>
  );
};
