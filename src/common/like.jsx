import React from "react";

const Like = ({liked, onLike}) => {
  let classes = "fa fa-heart"
  if(!liked) classes += '-o'
  return (
    <>
      <i
        onClick={onLike}
        className={classes}
        style={{ cursor: "pointer" }}
      />
    </>
  );
}

export default Like;
