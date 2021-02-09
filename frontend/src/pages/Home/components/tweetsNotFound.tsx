import React from "react";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { selectUserSearch } from "../../../store/ducks/user/selectors";
import { useSelector } from "react-redux";
import { TwitterBird } from "../../../components";

export const TweetsNotFound: React.FC = (): React.ReactElement | null => {
  const search = useSelector(selectUserSearch);
  const { t } = useTranslation(["tweets"]);
  if(!search) {
    return <TwitterBird />
  }
  return (
    <div className={"not-found"}>
      <Typography className={"not-found__title"}>{t("tweets:noTweet.title", { search })}</Typography>
      <Typography className={"not-found__info"}>{t("tweets:noTweet.info")}</Typography>
    </div>
  );
};
