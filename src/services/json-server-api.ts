import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post, PostCreate } from "../types/post.type";

export const jsonServerApi = createApi({
  reducerPath: "jsonServerApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => `posts`,
    }),

    createPost: builder.mutation({
      query: (post: PostCreate) => ({
        url: `posts`,
        method: "POST",
        body: {
          title: post.title,
          author: post.author,
        },
      }),
    }),

    updatePost: builder.mutation({
      query: (post: Post) => ({
        url: `posts/${post.id}`,
        method: "PUT",
        body: {
          title: post.title,
          author: post.author,
        },
      }),
    }),

    deletePost: builder.mutation({
      query: (id: number) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useLazyGetPostsQuery,
} = jsonServerApi;
