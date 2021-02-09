import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import ArrowIcon from "@material-ui/icons/ArrowBackRounded";

import CircularProgress from "@material-ui/core/CircularProgress";
import { useHomeStyles } from "./theme";
import { SearchTextField } from "../../components";
import { Tweet, SideMenu, AddTweetForm, Tags } from "../../components";

import { useDispatch, useSelector } from "react-redux";
import { fetchTweets } from "../../store/ducks/tweets/actionCreators";

// selectors
import {
  selectTweetsItems,
  selectTweetsLoadingStatusIsLoading,
  selectTweetsPage,
  selectTweetsLength,
} from "../../store/ducks/tweets/selectors";

import { fetchTags } from "../../store/ducks/tags/actionCreators";
import { Route, useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import { FullTweet } from "./components/FullTweet";
import { History } from "history";
import { User } from "../User";
import { debounceEvent } from "../../utils/debounceEvent";
import { TweetsApi } from "../../services/api/tweetsApi";
import { TweetsState } from "../../store/ducks/tweets/contracts/state";
import { useTranslation } from "react-i18next";
import { useSearch } from "./hooks/useSearch";
import { useScrollAndLoading } from "./hooks/useScrollAndLoading";
import { BackButton } from "./components/BackButton";
import { useTweets } from "./hooks/useTweets";
import { Search } from "./components/Search";
import { TweetsNotFound } from "./components/tweetsNotFound";
import { CommentModal } from "../../components/Comments/CommentModal";

export const Home: React.FC = (): React.ReactElement => {
  const { t } = useTranslation(["userPage", "buttons", "tweets"]);
  const history: History = useHistory();
  const tweetsLength = useSelector(selectTweetsLength);
  const isTweetsLoading = useSelector(selectTweetsLoadingStatusIsLoading);
  const page = useSelector(selectTweetsPage);
  const classes = useHomeStyles();
  const dispatch = useDispatch();
  const fetchLimitTweets = React.useCallback(() => dispatch(fetchTweets()), []);

  const { tweets } = useTweets();

  useScrollAndLoading(); // подлкючаю события скролла и логику скролла
  //TODO: возмжоно page стоит вынести в локальный стэйт

  return (
    <Container
      data-testid="home-page"
      className={classes.wrapper}
      maxWidth="lg"
    >
      <Grid container spacing={3}>
        
        <Grid item md={3} sm={1}>
          <SideMenu classes={classes} />
        </Grid>

        <Grid item md={6} sm={8}>
          <Route path="/user/:id">
            <User />
          </Route>
          <Route path="/(home)">
            <Paper className={classes.tweetsWrapperHeader} variant="outlined">
              <Route path={"/home/:any"}>
                <BackButton />
              </Route>
              <Route exact path="/(home)(/search)?">
                <Typography variant="h6">
                  {t("userPage:tabs.tweets")}
                </Typography>
              </Route>
              <Route exact path="/home/tweet/:id">
                <Typography variant="h6">{t("buttons:tweet")}</Typography>
              </Route>
            </Paper>
            <Paper className={classes.tweetsWrapper} variant="outlined">
              <Route exact path="/(home)(/search)?">
                <Paper>
                  <div className={classes.addForm}>
                    <AddTweetForm rowsMax={15} />
                  </div>
                  <div className={classes.addFormBottomLine} />
                </Paper>
              </Route>
              <Route path="/home" exact>
                {isTweetsLoading && !tweets.length ? (
                  <div className={classes.centeredBig}>
                    <CircularProgress />
                  </div>
                ) : tweets.length ? (
                  <div className="wrapperPhoto">
                    {tweets.map((tweetProps) => {
                      return (
                        <Tweet
                          key={tweetProps._id}
                          classes={classes}
                          {...tweetProps}
                          images={tweetProps.images}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <TweetsNotFound />
                )}
              </Route>

              <Route path="/home/tweet/:id">
                <FullTweet classes={classes} />
              </Route>
            </Paper>
          </Route>
        </Grid>
        <Grid item sm={3} md={3}>
          <div className={classes.rightSide}>
            <Search />
            <Tags classes={classes} />
          </div>
        </Grid>
      </Grid>
      <CommentModal />
    </Container>
  );
};
