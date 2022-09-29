import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const post = useSelector((state) => {
    return currentId
      ? state.posts.find((post) => post._id === currentId)
      : null;
  });
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const handler = (e) => {
    const { value, name } = e.target;

    return setPostData({
      ...postData,
      [name]: value,
    });
  };

  const tagHandler = (e) => {
    const { value, name } = e.target;

    return setPostData({
      ...postData,
      [name]: value.split(','),
    });
  };

  const fileHandler = (e) => {
    const { base64 } = e;

    return setPostData({
      ...postData,
      selectedFile: base64,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    return setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const buttonHandler = () => {
    return !currentId ? 'Submit' : 'Update';
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h5">Create Post</Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth={true}
          value={postData.creator}
          onChange={handler}
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth={true}
          value={postData.title}
          onChange={handler}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth={true}
          value={postData.message}
          onChange={handler}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth={true}
          value={postData.tags}
          onChange={tagHandler}
        />
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={fileHandler} />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth={true}
        >
          {buttonHandler()}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth={true}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
