import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { useHomeStyles } from "../../pages/Home/theme";
import { getFirstChar } from "../../utils/getFirstChar";

interface AvatarUIProps {
  avatar: string | undefined;
  username: string;
  className?: string
}

export const AvatarUI: React.FC<AvatarUIProps> = ({
  avatar,
  username,
  className = ""
}): React.ReactElement => {
  return (
    <Avatar
      alt={username + " avatar"}
      src={avatar}
      className={className}
    >
      {avatar ? "" : username ? getFirstChar(username): ""}
    </Avatar>
  );
};
