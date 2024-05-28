export const routes = {
  // posts related
  home: '/',

  createPost: '/post',
  myPost: '/my/post',
  viewPost: (id: string) => `post/${id}`,
  myProfile: '/my/profile',
};
