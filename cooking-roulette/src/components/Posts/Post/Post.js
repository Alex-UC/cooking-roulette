import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbsUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ setCurrentId, post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const editHandler = () => {
    return setCurrentId(post._id);
  };

  const deleteHandler = () => {
    dispatch(deletePost(post._id));
  };

  const likeHandler = () => {
    dispatch(likePost(post._id));
  };

  const tags = (tags) => {
    return tags.map((tag) => `#${tag} `);
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={buttonStyle} size="small" onClick={editHandler}>
          <MoreHorizIcon style={{ fonstSize: "medium" }} />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {tags(post.tags)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={likeHandler}>
          <ThumbsUpAltIcon style={{ fonstSize: "small" }} />
          &nbsp; Like &nbsp;
          {post.likeCount}
        </Button>
        <Button size="small" color="primary" onClick={deleteHandler}>
          <DeleteIcon style={{ fonstSize: "small" }} />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

const buttonStyle = {
  color: "white",
};

export default Post;
