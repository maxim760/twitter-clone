import React from "react";

import DateRegisterIcon from "@material-ui/icons/DateRange";
import BirthdayIcon from "@material-ui/icons/Cake";
import LocationIcon from "@material-ui/icons/Room";
import WebsiteIcon from "@material-ui/icons/Link";

import format from "date-fns/format";

import { reduceWords } from "../../../utils/reduceWords";
import { removeHttpFromUrl } from "../../../utils/removeHttpFromUrl";
import { UserData } from "../../../store/ducks/user/contracts/state";
import { useTranslation, Trans } from "react-i18next";
import { getDateFnsLocale } from "../../../core/dateFns";
import { AvatarUI } from "../../../components/ui/AvatarUI";

interface UserInfoProps {
  user: UserData | null;
}

export const UserInfo: React.FC<UserInfoProps> = ({
  user,
}): React.ReactElement | null => {
  const { t } = useTranslation(["userPage", "format"]);
  const locale = getDateFnsLocale();
  if (user === null) {
    return null;
  }
  const followingsCount = user?.followings ?? 0;
  const followersCount = user?.followers ?? 0;

  return (
    <>
      <AvatarUI avatar={user?.avatar} username={user?.username || ""} className={"user__avatar"} />
      <h2 className="user__info-fullname">{user ? user.fullname : ""}</h2>
      <span className="user__info-username">@{user ? user.username : ""}</span>
      {user?.about ? (
        <p className="user__info-description">{user.about}</p>
      ) : null}
      <ul className="user__info-details">
        {user?.location ? (
          <li>
            <LocationIcon className="user__info-icon" />
            {user.location}
          </li>
        ) : null}
        {user?.website ? (
          <li>
            <a href={"сайт"} target="_blank" className="link">
              <WebsiteIcon className="user__info-icon" />
              {reduceWords(removeHttpFromUrl(user.website), 26)}
            </a>
          </li>
        ) : null}
        {user?.born ? (
          <li>
            <BirthdayIcon className="user__info-icon" />
            {t("userPage:born")}&nbsp;
            {t("userPage:date", {
              date: format(Date.parse(user.born || ""), "LLLL uuuu", {
                locale,
              }),
            })}
          </li>
        ) : null}
        {user ? (
          <li>
            <DateRegisterIcon className="user__info-icon" />
            {t("userPage:join")}&nbsp;
            {t("userPage:date", {
              date: format(Date.parse(user.createdAt || ""), "d MMMM uuuu", {
                locale,
              }),
            })}
          </li>
        ) : null}
      </ul>
      <div className="user__info-followWrap">
        <span
          data-follow={t("format:numberLocaleString", {
            number: followingsCount,
          })}
          className="user__info-follow"
        >
          <b>{t("format:number", { number: followingsCount })}</b>&nbsp;
          {t("userPage:following")}
        </span>
        <span
          data-follow={t("format:numberLocaleString", {
            number: followersCount,
          })}
          className="user__info-follow"
        >
          <b>{t("format:number", { number: followersCount })}</b>&nbsp;
          {t("userPage:followers", {
            count: followersCount,
          })}
        </span>
      </div>
    </>
  );
};
