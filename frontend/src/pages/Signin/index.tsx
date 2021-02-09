import React from "react";
import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";
import TwitterIcon from "@material-ui/icons/Twitter";
import SearchIcon from "@material-ui/icons/Search";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { LoginModal } from "./components/LoginModal";
import { RegisterModal } from "./components/RegisterModal";
import { UserLanguage } from "../../components/UserLanguage";
import { useTranslation } from "react-i18next";


export const useStylesSignIn = makeStyles((theme: Theme) => ({
  wrapper: {
    display: "flex",
    height: "100vh",
  },
  blueSide: {
    position: "relative",
    display: "flex",
    flex: "1",
    backgroundColor: "#7ACCFE",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  blueSideListInfo: {
    position: "relative", // чтобы слой был выше слоя икноки твиттера

    listStyle: "none",
    padding: 0,
    marging: 0,
    width: 380,

    "& h6": {
      color: "white",
      fontWeight: 700,
      fontSize: 20,
      display: "flex",
      alignItems: "center",
      marginBottom: 40,
    },
  },
  blueSideBigIcon: {
    position: "absolute",
    left: "72%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    width: "160%",
    height: "auto",
    zIndex: 0,
  },
  blueSideListInfoIcon: {
    fontSize: 27,
    marginRight: 12,
  },
  loginSide: {
    flex: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  loginSideTwitterIcon: {
    fontSize: 45,
  },
  loginSideWrapper: {
    width: 380,
  },
  loginSideTitle: {
    fontWeight: 700,
    fontSize: 32,
    marginBottom: 45,
    marginTop: 20,
  },
  loginSideSubTitle: {
    marginBottom: theme.spacing(2)
  },

  loginSideField: {
    marginBottom: 18,
  },
  loginRegisterField: {
    marginBottom: theme.spacing(5),
  },
  loginFormControl: {
    marginBottom: theme.spacing(2)
  }
}));

export const SignIn: React.FC = (): React.ReactElement => {
  const classes = useStylesSignIn();
  const {t} = useTranslation(["signin","buttons"])
  const [visibleModal, setVisibleModal] = React.useState<"signIn" | "signUp">();
  const handleClickOpenSignIn = (): void => {
    setVisibleModal("signIn")
  }
  const handleClickOpenSignUp = (): void => {
    setVisibleModal("signUp")
  }
  const handleCloseModal = (): void => {
    setVisibleModal(undefined)
  }
  return (
    <div data-testid="signin-page" className={classes.wrapper}>
      <div className={"language"}>
        <UserLanguage />
      </div>
      <section className={classes.blueSide}>
        <TwitterIcon className={classes.blueSideBigIcon} color="primary" />
        <ul className={classes.blueSideListInfo}>
          <li>
            <Typography variant="h6">
              <SearchIcon className={classes.blueSideListInfoIcon} />
              {t("signin:leftMenu.line1")}
            </Typography>
          </li>
          <li>
            <Typography variant="h6">
              <PeopleOutlineIcon className={classes.blueSideListInfoIcon} />
              {t("signin:leftMenu.line2")}
            </Typography>
          </li>
          <li>
            <Typography variant="h6">
              <ModeCommentOutlinedIcon
                className={classes.blueSideListInfoIcon}
              />
              {t("signin:leftMenu.line3")}
            </Typography>
          </li>
        </ul>
      </section>
      <section className={classes.loginSide}>
        <div className={classes.loginSideWrapper}>
          <TwitterIcon
            className={classes.loginSideTwitterIcon}
            color="primary"
          />
          <Typography variant="h4" className={classes.loginSideTitle}>
          {t("signin:rightMenu.title")}
          </Typography>
          <Typography className={classes.loginSideSubTitle}>
            <b>{t("signin:rightMenu.subtitle")}</b>
          </Typography>
          <Button
            style={{ marginBottom: 10 }}
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClickOpenSignUp}
          >
            {t("buttons:register")}
          </Button>
          <Button
            onClick={handleClickOpenSignIn}
            variant="outlined"
            color="secondary"
            fullWidth
          >
            {t("buttons:login")}
          </Button>

          <LoginModal open={visibleModal === "signIn"} onClose={handleCloseModal} />
          <RegisterModal open={visibleModal === "signUp"} onClose={handleCloseModal} />
      </div>
      </section>
    </div>
  );
};
