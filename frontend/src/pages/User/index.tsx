import React from "react";

import Paper from "@material-ui/core/Paper";
import ArrowIcon from "@material-ui/icons/ArrowBackRounded";
import { useHistory, useParams } from "react-router-dom";
import { History } from "history";
import Tabs from "@material-ui/core/Tabs";

import IconButton from "@material-ui/core/IconButton";
import { Typography, Tab, Button } from "@material-ui/core";

import classNames from "classnames";

import { useHomeStyles } from "../Home/theme";
import "./user.css";
import { Tweet, TwitterBird } from "../../components";

import { useSelector } from "react-redux";
import { TweetsApi } from "../../services/api/tweetsApi";
import { Tweet as TypeTweet } from "../../store/ducks/tweets/contracts/state";
import Box from "@material-ui/core/Box";
import {
  selectUserData,
} from "../../store/ducks/user/selectors";
import { UserData } from "../../store/ducks/user/contracts/state";
import { UserApi } from "../../services/api/userApi";
import { UserModal } from "./components/UserModal";


import { UserInfo } from "./components/userInfo";
import { useTranslation } from "react-i18next";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}
export const User: React.FC = (): React.ReactElement => {
  const { t } = useTranslation(["userPage", "tweets"]);
  const [isVisibleModal, setIsVisibleModal] = React.useState(false);
  const handleCloseModal = (): void => setIsVisibleModal(false);
  const handleOpenModal = (): void => setIsVisibleModal(true);

  const [tweets, setTweets] = React.useState<null | TypeTweet[]>(null);
  const [user, setUser] = React.useState<null | UserData>(null);
  const [status, setStatus] = React.useState<"LOADING" | "OK" | "ERROR">(
    "LOADING"
  );
  const userData = useSelector(selectUserData);
  const params: { id: string } = useParams();
  const tweetsLength = React.useMemo(() => {
    return tweets ? tweets.length : 0;
  }, [tweets]);

  React.useEffect(() => {
    (async function () {
      try {
        const [tweets, user] = await Promise.all([
          TweetsApi.fetchTweetsForUser(params.id),
          UserApi.fetchUser(params.id),
        ]);
        if (tweets && user) {
          setStatus("OK");
        } else {
          setStatus("ERROR");
        }
        setUser(user);
        setTweets(tweets);
      } catch (error) {
        setStatus("ERROR");
      }
    })();
  }, [params.id]);
  const history: History = useHistory();
  const classes = useHomeStyles();
  const isUserPage = React.useMemo(() => {
    return userData?._id === params.id;
  }, [params.id, userData?._id]);
  const handleClickToBack = () => {
    //@ts-ignore
    history.goBack();
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  //TODO МБ ДЛЯ SEARCH ОТДЕЛЬНЫЙ PAGE хз пака
  //TODO добавить коменты и лайки
  //TODO лайки в первую очередь т к не трудно
  if (status === "LOADING") {
    return <TwitterBird />;
  }
  if (status === "ERROR") {
    return <h3>{t("tweets:error")}</h3>;
  }
  //TODO ДОБВИТЬ РЕДАКТИРОВАНИЕ ТВИТА
  return (
    <>
      <Paper
        className={classNames(classes.tweetsUserWrapper, "user")}
        variant="outlined"
      >
        <Paper className={classes.tweetsWrapperUser} variant="outlined">
          <IconButton
            onClick={handleClickToBack}
            color={"primary"}
            className={classes.tweetsHeaderIcon}
          >
            <ArrowIcon />
          </IconButton>

          <div>
            <Typography variant="h6">{user ? user.fullname : ""}</Typography>
            <Typography variant="caption" display="block" gutterBottom>
              {t("tweets:tweets", { count: tweetsLength })}
            </Typography>
          </div>
        </Paper>
        <div className={"user__header user__header--photo"}>
          {(isUserPage && userData?.background) || user?.background ? (
            <img
              src={
                isUserPage
                  ? userData?.background || undefined
                  : user?.background || undefined
              }
              alt="header photo"
              className="user__selectedPhoto"
            />
          ) : null}
          {isUserPage ? (
            <Button
              color="primary"
              variant="outlined"
              className="user__button"
              onClick={handleOpenModal}
            >
              {t("userPage:edit")}
            </Button>
          ) : null}
        </div>
        <div className="user__info">
          {isUserPage ? <UserInfo user={userData} /> : <UserInfo user={user} />}
        </div>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab selected label={t("userPage:tabs.tweets")} />
          <Tab label={t("userPage:tabs.tweetsAnswers")} />
          <Tab label={t("userPage:tabs.media")} />
          <Tab label={t("userPage:tabs.like")} />
        </Tabs>
        <div className="user__tweets">
          <TabPanel value={value} index={0} >
            {tweets
              ? tweets.map((tweetProps) => {
                  return (
                    <Tweet
                      key={tweetProps._id}
                      classes={classes}
                      {...tweetProps}
                      images={tweetProps.images}
                    />
                  );
                })
              : null}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {tweets
              ? tweets.map((tweetProps) => {
                  return (
                    <Tweet
                      key={tweetProps._id}
                      classes={classes}
                      {...tweetProps}
                      images={tweetProps.images}
                    />
                  );
                })
              : null}
          </TabPanel>
        </div>
      </Paper>
      {isVisibleModal ? (
        <UserModal isVisible={isVisibleModal} handleClose={handleCloseModal} />
      ) : null}
    </>
  );
};
