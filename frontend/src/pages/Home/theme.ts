import { makeStyles, Theme } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

export const useHomeStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: "100vh",
  },
  sideMenuList: {
    maxWidth: 230,
    listStyle: "none",
    padding: 0,
    marging: 0,
    top: 0,
    position: "sticky",
  },
  sideMenuListItem: {
    cursor: "pointer",
    "&:hover": {
      "& div": {
        backgroundColor: "rgba(29,161,242,0.1)",
      },
      "& h6": {
        color: theme.palette.primary.main,
      },
      "& svg": {
        fill: theme.palette.primary.main,
      },
    },
    "& div": {
      display: "inline-flex",
      alignItems: "center",
      position: "relative",
      left: -10,

      padding: "0 25px",
      borderRadius: 30,
      height: 50,
      marginBottom: 15,
      transition: "background-color 0.15s ease-in",
    },
  },
  sideMenuListLabel: {
    fontWeight: 700,
    fontSize: 20,
    marginLeft: 15,
    transition: "color 0.15s ease-in",
  },
  sideMenuListItemIcon: {
    fontSize: 32,
    marginLeft: -5,
    transition: "color 0.15s ease-in",
  },
  sideMenuTweetButton: {
    padding: theme.spacing(3.2),
    marginTop: theme.spacing(2),
  },
  logo: {
    margin: "10px 0",
  },
  logoIcon: {
    fontSize: 36,
  },
  tweetsWrapper: {
    borderRadius: 0,
    height: "100%",
    borderTop: 0,
    borderBottom: 0,
  },
  tweetsUserWrapper: {
    borderRadius: "0 !important",
    borderTop: "0 !important",
    borderBottom: "0 !important",
  },
  tweetWrapper: {
    color: "inherit",
    textDecoration: "none",
  },
  tweetsWrapperHeader: {
    position: "sticky",
    top: 0,
    zIndex: 15,
    borderTop: 0,
    borderRadius: 0,
    padding: "10px 15px",
    "& h6": {
      fontWeight: 800,
    },
    display: "flex",
    alignItems: "center",
  },
  tweetsWrapperUser: {
    top: 0,
    zIndex: 15,
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
    borderRadius: 0,
    padding: "10px 15px",
    "& h6": {
      fontWeight: 800,
    },
    display: "flex",
    alignItems: "center",
  },
  tweetsHeaderIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  tweetsHeaderUser: {
    display: "flex",
    alignItems: "center",
  },
  tweetsWrapperBody: {
    position:"relative",
    display: "flex",
    borderTop: 0,
    borderRadius: 0,
    borderLeft: 0,
    borderRight: 0,
    padding: "10px 15px",
    "& h6": {
      fontWeight: 800,
    },
  },
  tweet: {
    alignItems: "flex-start",
    display: "flex",
    paddingTop: 15,
    paddingLeft: 20,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgb(245,248,250)",
    },
  },
  tweetMore: {
    zIndex: 10,
    padding: 5,
    position: "relative",
    top: -5,
    transition: "color 0.3s ease-in",
    "& svg": {
      transition:"background-color 0.3s ease-in"
    },
    "&:hover": {
      backgroundColor: "rgba(29,161,242,0.12)",
      "& svg": {
        fill:"rgb(29,161,242)"
      }
    }
  },
  tweetText: {
    maxWidth: "100%",
    display: "flex",
    flexDirection:"column",
    flexGrow: 1,
    overflow:"hidden"
  },
  tweetsPost: {
    marginLeft: 10,
  },
  tweetsInfo: {
    display: "flex",
    flexDirection: "column",
  },
  tweetAvatar: {
    width: theme.spacing(6.5),
    height: theme.spacing(6.5),
    marginRight: 15,
  },
  tweetUserAvatar: {
    width: 45,
    height: 45,
    marginRight: 15,
  },
  tweetHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tweetUserName: {
    color: grey[500],
  },
  tweetButtons: {
    position: "relative",
    left: -13,
    maxWidth: 450,
    marginLeft: 10,
  
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& .icon": {
      fontSize:"20px !important"
    },
    "& > div": {
      display: 'flex !important',
      lineHeight:1,
      alignItems: 'center !important',
    }
  },
  fullTweet: {
    padding: "22px 22px 0",
    border: 0,
  },
  fullTweetMain: {
    borderRadius: 0,

    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
  },
  tweetUserDate: {
    paddingBottom: 15,
  },
  fullTweetButtons: {
      marginTop: 5,
    marginBottom: 5,
    left: 0,
    marginLeft:0,
    maxWidth: "none",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    "& .icon": {
      fontSize:"24px !important"
    },
    "& .tweetButtonCount": {
      fontSize:"15px !important"
    }
  },
  tweetFieldText: {
    wordBreak: "break-word",
    whiteSpace:"pre-wrap"
  },
  fullTweetText: {
    fontSize: 24,
    marginTop: 8,
    lineHeight: 1.3125,
    wordBreak: "break-word",
    whiteSpace:"pre-wrap"
  },
  centeredBig: {
    textAlign: "center",
    paddingTop: 50,
  },
  centeredSmall: {
    textAlign: "center",
    paddingTop: 10,
  },
  rightSide: {
    paddingTop: 20,
    position: "sticky",
    top: 0,
  },
  rightSideBlock: {
    borderRadius: 15,
    backgroundColor: "#f5f8fa",
    overflow: "hidden",
    marginTop: 20,
    "& MuiList-root": {
      paddingTop: 0,
    },
  },
  rightSideBlockHeader: {
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
    backgroundColor: "transparent",
    padding: "13px 18px",
    "& b": {
      fontSize: 20,
      fontWeight: 800,
    },
  },
  rightSideBlockBody: {
    paddingTop: 0,
    paddingBottom: 8,
  },
  rightSideBlockItem: {
    cursor: "pointer",
    "& .MuiTypography-body1": {
      fontWeight: 700,
    },
    "& .MuiListItemAvatar-root": {
      minWidth: 50,
    },
    "& .MuiListItemText-root": {
      margin: 0,
    },
    "&:hover": {
      backgroundColor: "#edf3f6",
    },
    "& a": {
      color: "inherit",
      textDecoration: "none",
    },
  },
  addForm: {
    padding: 20,
  },
  addFormBody: {
    display: "flex",
    width: "100%",
  },
  addFormButton: {
    width: "102px",
    marginLeft: 10,
  },
  addFormBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addFormBottomAction: {
    paddingLeft: 70,
  },
  addFormTextArea: {
    width: "100%",
    border: 0,
    fontSize: 20,
    outline: "none",
    fontFamily: "inherit",
    resize: "none",
    height:"auto !important"
  },
  addFormBottomLine: {
    height: 12,
    backgroundColor: "#e6ecf0",
  },
  addFormCircleProgress: {
    position: "relative",
    width: 20,
    height: 20,
    margin: "0 10px",
    "& .MuiCircularProgress-root": {
      position: "absolute",
    },
  },
  areaWarning: {
    backgroundColor: "rgba(255,0,0,0.2)",
    borderRadius: 5,
  },
  circleWarning: {
    color: "red",
  },
  countWarning: {
    fontSize: 16,
    color: "red",
  },
  countDisabled: {
    fontSize: 18,
    fontWeight: 700,
    color: "red",
  },
  addFormBottomRight: {
    display: "flex",
    alignItems: "center",
  },
  errorInput: {
    backgroundColor: "rgb(253, 162, 182)",
  },
  sideProfile: {
    cursor:"pointer",
    position: "fixed",
    display: 'flex',
    alignItems: 'center',
    zIndex: 500,
    borderRadius: 30,
    padding: "4px 7px",
    bottom: "3%",
    // left: "6%",
    transition: "all 0.15s ease-in",
    "&:hover": {
      backgroundColor: "rgba(29,161,242,0.2)"
    },
    "& img": {
      height: "30px",
      width: "30px",
      borderRadius: "50%",
    }
  },
  profileMenuWrap: {
    position:"relative"
  },
  profileMenu: {
    position: "absolute",
    left:"0 !important",
    top:"0 !important"
  },
  sideProfileInfo: {
    marginRight: 15,
    marginLeft:5
  },
}));
