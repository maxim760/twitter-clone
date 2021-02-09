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

export const UserApi = {
  async fetchUserByUsername(name: string): Promise<UserData> {
    const { data } = await axios.get<Response<UserData>>("/user/" + name);
    return data.data;
  },
  async fetchUser(id: string): Promise<UserData> {
    const { data } = await axios.get<Response<UserData>>("/users/" + id);
    return data.data;
  },
  async fetchAddAvatar(avatar: string): Promise<void> {
    try {
      await axios.post("/user/avatar", {avatar});
    } catch (error) {
      console.log(error)
    }
  },
  async fetchAddBg(bg: string): Promise<void> {
    try {
      await axios.post("/user/bg", {bg});
    } catch (error) {
      console.log(error)
    }
  },
  async   fetchAddInfoAboutUser(payload: IEditInfo): Promise<void> {
    try {
      await axios.post("/user/edit", payload);
    } catch (error) {
      console.log(error)
    }
  },
  
};
