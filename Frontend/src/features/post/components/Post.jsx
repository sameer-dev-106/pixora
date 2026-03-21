import React, {useState} from "react";
import "./style/postFeed.scss";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import { usePost } from "../hooks/usePost";

const Post = ({ user, post }) => {

  const [showHeart, setShowHeart] = useState(false);

  const { handleLike } = usePost();

  const handleDoubleClick = () => {
    handleLike(post._id, post.isLiked);
    setShowHeart(true);

    setTimeout(() => {
      setShowHeart(false);
    }, 1600);
  };
  
  return (
    <div className="post">
      <div className="user">
        <div className="info">
          <div className="img-wrapper">
            <img src={user.profileImage} />
          </div>
          <p>
            {user.username}
          </p>
        </div>

        <button className="user-follow-btn">Follow</button>
      </div>

      <div className="image" onDoubleClick={handleDoubleClick}>
        <img src={post.imgUrl} alt="" />

        {showHeart && <div className="big-heart">❤️</div>}
      </div>

      <div className="icons">
        <div className="left">
          <button onClick={() => handleLike(post._id, post.isLiked)}>
            <Heart className={post.isLiked ? "liked" : ""} />
            <p className="count">{post.likesCount || 0}</p>
          </button>
          <button>
            <MessageCircle />
            <p className="count">{post.mgsCount || 0}</p>
          </button>
          <button>
            <Send />
            <p className="count">{post.sendCount || 0}</p>
          </button>
        </div>
        <div className="right">
          <button>
            <Bookmark className={post.isBooked ? "fill" : ""} />
          </button>
        </div>
      </div>

      <div className="bottom">
        <p className="caption">
          <b>{user.username}</b> {post.caption}
        </p>
      </div>
      <small>{post.createdAt}</small>
    </div>
  );
};

export default Post;
