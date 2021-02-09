import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowIcon from "@material-ui/icons/ArrowBackRounded";
import { useHomeStyles } from "../theme";
import { useHistoryBack } from "../hooks/useHistoryBack";

interface BackButtonProps {}

export const BackButton: React.FC<BackButtonProps> = ({ }): React.ReactElement => {
  const classes = useHomeStyles();
  const {handleBack} = useHistoryBack()


  return (
    <IconButton
      onClick={handleBack}
      color={"primary"}
      className={classes.tweetsHeaderIcon}
    >
      <ArrowIcon />
    </IconButton>
  );
};
