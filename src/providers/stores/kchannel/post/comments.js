
import { writable } from 'svelte/store';

// const comment = writable({});
// const postStore = {
//   subscribe: post.subscribe,
//   reset: () => post.set({}),
//   update: ({ postData = [] }) => post.update(() => {
//     return postData;
//   }),
// };

const comments = writable([]);
const commentsStore = {
  subscribe: comments.subscribe,
  reset: () => comments.set([]),
  update: ({ commentsArr = [] }) => comments.update(() => {
    return commentsArr;
  }),
  append: ({ commentsArr = [] }) => comments.update((preComments) => {
    preComments = [...preComments, ...commentsArr];
    return preComments;
  }),
  unshift: ({ commentsArr = [] }) => comments.update((preComments) => {
    preComments = [...commentsArr, ...preComments];
    return preComments;
  }),
  removeCommentById: ({ commentId }) => comments.update((preComments) => {
    const foundIndex = preComments.findIndex((p) => p.id === commentId);
    if (foundIndex >= 0) {
      preComments.splice(foundIndex, 1); // Use splice to remove 1 element at foundIndex
    }
    return preComments;
  })

  // updatePostById: ({ postId, newComment }) => comments.update((preComments) => {
  //   const foundIndex = preComments.findIndex((p) => p.id == postId);
  //   if (foundIndex >= 0) {
  //     preComments[foundIndex] = newComment;
  //   }
  //   return preComments;
  // })
};

export { comments, commentsStore };
