import { axios } from "../../core/axios";

import { TweetsState } from "../../store/ducks/tweets/contracts/state";
import { TweetState } from "../../store/ducks/tweet/contracts/state";
import { ImagesType } from "../../store/ducks/tweets/actionCreators";
import { UserData } from "../../store/ducks/user/contracts/state";
import { useDispatch } from "react-redux";
import { addAvatar } from "../../store/ducks/user/actionCreators";
import { IEditInfo } from "../../store/ducks/edit/contracts/state";

interface Response<T> {
  status: "error"| "success",
  data: T
}

export const UsersApi = {

  async fetchLastUsers(count: number): Promise<void> {
    try {
      const { data } = await axios.get(`/users/last?count=${count}`);
      return data.data
    } catch (error) {
      console.log(error)
    }
  },
  
};
