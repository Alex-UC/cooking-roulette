import * as api from "../api";

// Action creators: Functions that let you create&return actions
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
      console.log(error);
  }
};
