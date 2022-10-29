import React, { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";
import styles from "./LikeButton.module.css";

import useAuthStore from "../store/authStore";

interface IProps {
 handleLike: () => void;
 handleDislike: () => void;
 likes: any[];
}

const LikeButton = ({ handleLike, handleDislike, likes }: IProps) => {
 const [alreadyLiked, setAlreadyLiked] = useState(true);
 const { userProfile }: any = useAuthStore();
 const filterLikes = likes?.filter((item) => item._ref === userProfile?._id);

 useEffect(() => {
  if (filterLikes?.length > 0) {
   setAlreadyLiked(true);
  } else {
   setAlreadyLiked(false);
  }
 }, [likes, filterLikes]);

 return (
  <div style={{ display: "flex", gap: "24px" }}>
   <div
    style={{
     marginTop: "16px",
     display: "flex",
     flexDirection: "column",
     justifyContent: "center",
     alignItems: "center",
     cursor: "pointer",
    }}
   >
    {alreadyLiked ? (
     <div
      className={styles.likeBtn}
      onClick={handleDislike}
     >
      <MdFavorite />
     </div>
    ) : (
     <div
      className={styles.likeBtn2}
      onClick={handleLike}
     >
      <MdFavorite />
     </div>
    )}
    <p style={{ fontSize: "1.1rem", fontWeight: "600" }}>
     {likes?.length || 0}
    </p>
   </div>
  </div>
 );
};

export default LikeButton;
