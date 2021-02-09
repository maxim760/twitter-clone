import { Tweet, ICommentItem } from "../../tweets/contracts/state";
import { LoadingStatus } from "../../../types";
import { UserData } from "../../user/contracts/state";
export type IActiveReply = {
  createdAt: string
  user: UserData, 
  whoAnswer: UserData,
  text: string,
  tweetId: string
  images?: string[]
}

export interface TweetState {
  data: Tweet | null;
  loadingState: LoadingStatus;
  commentModal: boolean;
  activeReply: IActiveReply | null
}
