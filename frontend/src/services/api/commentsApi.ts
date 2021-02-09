import { axios } from "../../core/axios";
import { ICommentItem } from "../../store/ducks/tweets/contracts/state";

interface Response<T> {
  status: "error" | "success";
  data: T;
}
type ICommentToAdd = Pick<ICommentItem, "images" | "text">;
export type ICommentToUpdate = Pick<ICommentItem, "images" | "text" | "_id">;

export const CommentsApi = {
  async fetchGetComment(id: string): Promise<ICommentItem> {
    const { data } = await axios.get<Response<ICommentItem>>(`/comment/${id}`);
    return data.data;
  },
  async fetchAddComment(comment: ICommentToAdd): Promise<ICommentItem> {
    const { data } = await axios.post<Response<ICommentItem>>(
      "/comment",
      comment
    );
    return data.data;
  },
  async fetchUpdateComment({
    _id: id,
    ...comment
  }: ICommentToUpdate): Promise<ICommentItem> {
    const { data } = await axios.patch<Response<ICommentItem>>(
      `/comment/${id}`,
      comment
    );
    return data.data;
  },
  async fetchRemoveComment(id: string): Promise<ICommentItem> {
    const { data } = await axios.delete<Response<ICommentItem>>(
      `/comment/${id}`
    );
    return data.data;
  },
  async fetchLike(id: string): Promise<ICommentItem> {
    const { data } = await axios.post<Response<ICommentItem>>(`/comment/like`, {
      id,
    });
    return data.data;
  },
};
