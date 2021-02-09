import React from "react";
import TwitterIcon from "@material-ui/icons/Twitter";

export const TwitterBird: React.FC = ({}): React.ReactElement => {
  return (
    <div className={"centered"} data-testid="twitter-loading">
      <TwitterIcon fontSize={"large"} color="primary" />
    </div>
  );
};
