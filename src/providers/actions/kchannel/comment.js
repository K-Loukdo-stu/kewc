import { APIs } from "$lib/statics/apis";
import { CREATE_COMMENT_MUTATION, DELETE_COMMENT_MUTATION, GET_COMMENTS_BY_POST_QUERY } from "$providers/queries/kchannel/comment";
import { commentsStore } from "$providers/stores/kchannel/post/comments";
import { endpointFetch } from "../utils";


export const getCommentsbyPost = {
  load: async ({ post, currentPage }) => {
    const res = await endpointFetch({
      query: GET_COMMENTS_BY_POST_QUERY,
      variables: { post, currentPage }
    }, APIs.KCHANNEL);
    if (res?.success == true) {
      res['data'] = res['data']['getCommentsbyPost'];
      if (currentPage == 1) {
        commentsStore.update({ commentsArr: res['data'].slice().reverse() })
      } else if (currentPage > 1) {
        commentsStore.unshift({ commentsArr: res['data'].slice().reverse() })
      }
      return res;
    }

    throw res;
  }
}


export const createComment = {
  load: async ({ post, text, user }) => {
    const res = await endpointFetch({
      query: CREATE_COMMENT_MUTATION,
      variables: { post, text, user }
    }, APIs.KCHANNEL);
    return res;
  }
}

export const deleteComment = {
  load: async ({ id }) => {
    const res = await endpointFetch({
      query: DELETE_COMMENT_MUTATION,
      variables: { id }
    }, APIs.KCHANNEL);
    if (res.success == true) {
      res['data'] = res['data']['deleteComment']
      commentsStore.removeCommentById({ commentId: id })
      return res;
    }
    throw res;
  }
}