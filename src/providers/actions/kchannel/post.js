import { APIs } from "$lib/statics/apis";
import {
  COMMENT_POST_MUTATION,
  CREATE_POST_MUTATION,
  DELETE_POST_COMMENT_MUTATION,
  DELETE_POST_MUTATION,
  GET_LINK_QUERY,
  GET_POSTS_BY_CHANNEL_QUERY,
  GET_POSTS_PAGINATION_BY_USER_QUERY,
  GET_POSTS_QUERY,
  GET_POST_DETAIL_QUERY,
  GET_RECENT_POSTS_BY_CHANNEL_QUERY,
  LIKE_POST_MUTATION,
  REPLY_COMMENT_POST_MUTATION
} from "$providers/queries/kchannel/post";
import { GET_POSTS_PAGINATION_QUERY } from "$providers/queries/kchannel/post";
import { commentsStore } from "$providers/stores/kchannel/post/comments";
import { postStore, postsStore } from "$providers/stores/kchannel/post/posts";
import { endpointFetch } from "../utils";


export const getRecentPostsByChannel = {
  load: async ({ channel, limit, pastDays }) => {
    const res = await endpointFetch({
      query: GET_RECENT_POSTS_BY_CHANNEL_QUERY,
      variables: { channel, limit, pastDays }
    }, APIs.KCHANNEL);
    if (res?.success == true) {
      res['data'] = res['data']['recentPostsByChannel'];
      return res;
    }
    throw res;
  }
}


export const getPostsByChannel = {
  load: async ({ channel, currentPage }) => {
    const res = await endpointFetch({
      query: GET_POSTS_BY_CHANNEL_QUERY,
      variables: { channel, currentPage }
    }, APIs.KCHANNEL);
    if (res?.success == true) {
      res['data'] = res['data']['getPostsbyChannel'];
      return res;
    }
    throw res;
  }
}

export const getPost = {
  load: async ({ id }) => {
    const res = await endpointFetch({
      query: GET_POSTS_QUERY,
      variables: { id }
    }, APIs.KCHANNEL);
    if (res?.success == true) {
      res['data'] = res['data']['post'];
      return res;
    }
    throw res;
  }
}

export const getPostDetail = {
  load: async ({ post }) => {
    const res = await endpointFetch({
      query: GET_POST_DETAIL_QUERY,
      variables: { post }
    }, APIs.KCHANNEL);
    if (res.success == true) {
      res['data'] = res['data']['postDetail']
      postStore.update({ post: res['data'] })
      return res;
    }
    throw res;
  }
}


export const getPostPagination = {
  load: async ({ channel, limit, pageNum }) => {
    const res = await endpointFetch({
      query: GET_POSTS_PAGINATION_QUERY,
      variables: { channel, limit, pageNum }
    }, APIs.KCHANNEL);
    if (res?.success == true) {
      res['data'] = res['data']['postPagination'];
      if (pageNum == 1) {
        postsStore.update({ postArr: res['data']['posts'] })
      } else if (pageNum > 1) {
        postsStore.append({ postArr: res['data']['posts'] })
      }
      return res;
    }

    throw res;
  }
}


export const getPostPaginationByUser = {
  load: async ({ userId, limit, pageNum }) => {
    const res = await endpointFetch({
      query: GET_POSTS_PAGINATION_BY_USER_QUERY,
      variables: { userId, limit, pageNum }
    }, APIs.KCHANNEL);
    if (res?.success == true) {
      res['data'] = res['data']['postsPaginationByUser'];
      if (pageNum == 1) {
        postsStore.update({ postArr: res['data']['posts'] })
      } else if (pageNum > 1) {
        postsStore.append({ postArr: res['data']['posts'] })
      }
      return res;
    }

    throw res;
  }
}


export const deletePost = {
  load: async ({ id }) => {
    const res = await endpointFetch({
      query: DELETE_POST_MUTATION,
      variables: { id }
    }, APIs.KCHANNEL);
    if (res.success == true) {
      res['data'] = res['data']['deletePost']
      postsStore.removePostById({ postId: id })
      return res;
    }
    throw res;
  }
}

export const deletePostComment = {
  load: async ({ id, post }) => {
    const res = await endpointFetch({
      query: DELETE_POST_COMMENT_MUTATION,
      variables: { id, post }
    }, APIs.KCHANNEL);
    if (res.success == true) {
      res['data'] = res['data']['deletePostComment']
      commentsStore.removeCommentById({ commentId: id })
      return res;
    }
    throw res;
  }
}

export const likePost = {
  load: async ({ post, isLike }) => {
    const res = await endpointFetch({
      query: LIKE_POST_MUTATION,
      variables: { post, isLike }
    }, APIs.KCHANNEL);
    if (res.success == true) {
      res['data'] = res['data']['likePost']
      postStore.update({ postData: res['data'] })
      postsStore.updatePostById({ postId: post, newPost: res['data'] })
      return res;
    }

    throw res;
  }
}


export const commentPost = {
  load: async ({ post, text, isAdmin }) => {
    const res = await endpointFetch({
      query: COMMENT_POST_MUTATION,
      variables: { post, text, isAdmin }
    }, APIs.KCHANNEL);
    if (res.success == true) {
      res['data'] = res['data']['commentPost']
      postStore.update({ postData: res['data']['post'] })
      commentsStore.append({ commentsArr: [res['data']['comment']] })
      return res;
    }
    return res;
  }
}

export const replyCommentPost = {
  load: async ({ post, text, parent }) => {
    const res = await endpointFetch({
      query: REPLY_COMMENT_POST_MUTATION,
      variables: { post, text, parent }
    }, APIs.KCHANNEL);
    if (res.success == true) {
      res['data'] = res['data']['commentPost']
      postStore.update({ postData: res['data']['post'] })
      commentsStore.append({ commentsArr: [res['data']['comment']] })
      return res;
    }
    return res;
  }
}

export const createPost = {
  load: async ({ channel, content, type }) => {
    const res = await endpointFetch({
      query: CREATE_POST_MUTATION,
      variables: { channel, content, type }
    }, APIs.KCHANNEL);
    if (res.success == true) {
      res['data'] = res['data']['createPost']
      postsStore.append({ postArr: [res['data']] })
      return res;
    }
    throw res;
  }
}

export const getLink = {
  load: async ({ text }) => {
    const res = await endpointFetch({
      query: GET_LINK_QUERY,
      variables: { text }
    }, APIs.KCHANNEL);
    if (res?.success == true) {
      res['data'] = res['data']['linkMetaData'];
      return res;
    }
    throw res;
  }
}
