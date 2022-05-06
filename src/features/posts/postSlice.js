import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

//createAsyncThunk is a function that takes in a name and a function that returns a promise. in general async thunks are used to fetch data from an API with promises.
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POST_URL);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

// initial state
const initialState = {
  posts: [],
  status: "idle", // 'idle', 'loading', 'success', 'error'
  error: null,
};

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (initialPost) => {
    try {
      const response = await axios.post(POST_URL, initialPost);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action) => {
        state.posts.push(action.payload);
      },
      prepare: ({ author, title, body, base64Image }) => {
        return {
          payload: {
            id: nanoid(),
            author: author,
            title: title,
            body: body,
            image: base64Image,
            reactions: {
              like: 0,
              dislike: 0,
              love: 0,
              haha: 0,
              wow: 0,
            },
            comments: [],
            date: sub(new Date().toISOString()),
          },
        };
      },
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    updatePost: (state, action) => {
      const { id, title, body } = action.payload;
      const post = state.posts.find((post) => post.id === id);
      post.title = title;
      post.body = body;
    },
    addComment: (state, action) => {
      const { id, comment } = action.payload;
      const post = state.posts.find((post) => post.id === id);
      post.comments.push(comment);
    },
    addReaction: (state, action) => {
      const { id, reaction } = action.payload;
      const post = state.posts.find((post) => post.id === id);
      if (post) {
        post.reactions[reaction]++;
      }
    },
    removeReaction: (state, action) => {
      const { id, reaction } = action.payload;
      const post = state.posts.find((post) => post.id === id);
      post.reactions[reaction]--;
    },
  },
  // extra reducers. This are not part of the reducer object. but are used in the thunks.
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "success";
        // create the reaction object for each post
        let minutes = 1;
        const loadedPosts = action.payload.map((post) => {
          post.idd = nanoid();
          post.date = sub(new Date(), { minutes: minutes++ }).toISOString();
          post.reactions = {
            like: 0,
            dislike: 0,
            love: 0,
            haha: 0,
            wow: 0,
          };
          post.comments = [];
          return post;
        });
        //add any fetched posts to the state
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      // add the createPost case to the builder
      .addCase(createPost.fulfilled, (state, action) => {
        action.payload.idd = nanoid();
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          like: 0,
          dislike: 0,
          love: 0,
          haha: 0,
          wow: 0,
        };
        action.payload.comments = [];
        state.posts.push(action.payload);
      });
  },
});

// selecting the state from the store
export const selectPosts = (state) => state.posts.posts;
export const selectStatus = (state) => state.posts.status;
export const selectError = (state) => state.posts.error;

// export actions
export const {
  addPost,
  deletePost,
  updatePost,
  addComment,
  addReaction,
  removeReaction,
} = postSlice.actions;

// export reducer
export default postSlice.reducer;
