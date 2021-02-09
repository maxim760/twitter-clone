import { axios } from "../../core/axios";

import { TweetsState, ILike } from "../../store/ducks/tweets/contracts/state";
import { TweetState } from "../../store/ducks/tweet/contracts/state";
import { ImagesType } from "../../store/ducks/tweets/actionCreators";

interface Response<T> {
  status: "error"| "success",
  data: T
}


export const TweetsApi = {
  async fetchTweets(page: number): Promise<TweetsState["items"]> {
    const { data } = await axios.get<Response<TweetsState["items"]>>("/tweets?page=" + page);
    return data.data;
  },
  async fetchTweetsByQuery(query: string): Promise<TweetsState["items"]> {
    const { data } = await axios.get<Response<TweetsState["items"]>>("/tweets/query?q=" + query);
    return data.data;
  },
  async fetchTweetsForUser(id: string): Promise<TweetsState["items"]> {
    const { data } = await axios.get<Response<TweetsState["items"]>>("/usertweet/tweets?id=" + id );
    return data.data;
  },
  async fetchTweetData(id: string): Promise<TweetState["data"]> {
    const { data } = await axios.get<Response<TweetState["data"]>>(`/tweets/${id}`);
    return data.data;
  },
  async fetchAddTweet(payload: ImagesType): Promise<TweetState["data"]> {
    const { data } = await axios.post<Response<TweetState["data"]>>(`/tweets`, payload);
    return data.data;
  },
  async fetchAddComment(payload:{tweetId: string, commentId: string} ): Promise<TweetState["data"]> {
    const { data } = await axios.post<Response<TweetState["data"]>>(`/addComment`, payload);
    return data.data;
  },
  async fetchRemoveTweet(id: string): Promise<string> {
    const { data } = await axios.delete<Response<TweetState["data"]>>(`/tweets/${id}`);
    return data.status;
  },

  async fetchToggleLikes(id: string): Promise<ILike> {
    const { data } = await axios.post<Response<ILike>>("/tweets/like", {id});
    return data.data;
  },
};
