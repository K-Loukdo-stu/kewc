
import { writable } from 'svelte/store';

const post = writable({});
const postStore = {
  subscribe: post.subscribe,
  reset: () => post.set({}),
  update: ({ postData = [] }) => post.update(() => {
    return postData;
  }),
};

const posts = writable([]);
const postsStore = {
  subscribe: posts.subscribe,
  reset: () => posts.set([]),
  update: ({ postArr = [] }) => posts.update(() => {
    return postArr;
  }),
  append: ({ postArr = [] }) => posts.update((prePosts) => {
    prePosts = [...prePosts, ...postArr];
    return prePosts;
  }),
  updatePostById: ({ postId, newPost }) => posts.update((prePosts) => {
    const foundIndex = prePosts.findIndex((p) => p.id == postId);
    if (foundIndex >= 0) {
      prePosts[foundIndex] = newPost;
    }
    return prePosts;
  }),
  removePostById: ({ postId }) => posts.update((prePosts) => {
    const foundIndex = prePosts.findIndex((p) => p.id === postId);
    if (foundIndex >= 0) {
      prePosts.splice(foundIndex, 1); // Use splice to remove 1 element at foundIndex
    }
    return prePosts;
  })
};

export { posts, postsStore, post, postStore };
