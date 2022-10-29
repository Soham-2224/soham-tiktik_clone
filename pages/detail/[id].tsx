import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import axios from "axios";
import { BASE_URL } from "./../../utils/index";
import { Video } from "./../../types.d";
import styles from "./details.module.css";

import useAuthStore from "../../store/authStore";
import LikeButton from "./../../components/LikeButton";
import Comments from "./../../components/Comments";

interface IProps {
 postDetails: Video;
}

const Detail = ({ postDetails }: IProps) => {
 const [post, setPost] = useState(postDetails);
 const [playing, setPlaying] = useState(false);
 const [isVideoMuted, setIsVideoMuted] = useState(false);

 const router = useRouter();

 const videoRef = useRef<HTMLVideoElement>(null);

 const { userProfile }: any = useAuthStore();
 const [comment, setComment] = useState("");
 const [isPostingComment, setIsPostingComment] = useState(false);

 const onVideoClick = () => {
  if (playing) {
   videoRef?.current?.pause();
   setPlaying(false);
  } else {
   videoRef?.current?.play();
   setPlaying(true);
  }
 };

 useEffect(() => {
  if (post && videoRef?.current) {
   videoRef.current.muted = isVideoMuted;
  }
 }, [post, isVideoMuted]);

 const handleLike = async (like: boolean) => {
  if (userProfile) {
   const { data } = await axios.put(`${BASE_URL}/api/like`, {
    userId: userProfile?._id,
    postId: post._id,
    like,
   });

   setPost({ ...post, likes: data.likes });
  }
 };

 const addComment = async (e: React.FormEvent) => {
  e.preventDefault();

  if (userProfile && comment) {
   setIsPostingComment(true);

   const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
    userId: userProfile._id,
    comment,
   });

   setPost({ ...post, comments: data.comments });
   setComment("");
   setIsPostingComment(false);
  }
 };

 if (!post) return null;

 return (
  <div className={styles.details__container}>
   <div className={styles.container__left}>
    <div className={styles.wrapper__cancel}>
     <p
      style={{ cursor: "pointer" }}
      onClick={() => router.back()}
     >
      <MdOutlineCancel style={{ color: "white", fontSize: "35px" }} />
     </p>
    </div>
    <div className={styles.wrapper__videoContainer}>
     <div>
      <video
       ref={videoRef}
       onClick={onVideoClick}
       style={{ height: "100%", cursor: "pointer" }}
       src={post.video.asset.url}
       loop
      ></video>
     </div>

     <div>
      {!playing && (
       <button onClick={onVideoClick}>
        <BsFillPlayFill />
       </button>
      )}
     </div>
    </div>

    <div className={styles.wrapper__muteBtn}>
     {isVideoMuted ? (
      <button onClick={() => setIsVideoMuted(false)}>
       <HiVolumeOff />
      </button>
     ) : (
      <button onClick={() => setIsVideoMuted(true)}>
       <HiVolumeUp />
      </button>
     )}
    </div>
   </div>

   <div className={styles.container__right}>
    <div className={styles.container__wrapper}>
     <div
      style={{
       display: "flex",
       gap: "12px",
       padding: "8px",
       cursor: "pointer",
       fontWeight: "bold",
       borderRadius: "10px",
      }}
     >
      <div className={styles.wrapper__ProfileImage}>
       <Link href="/">
        <>
         <Image
          width={62}
          height={62}
          style={{ borderRadius: "100%" }}
          src={post.postedBy.image}
          alt="profilePhoto"
          layout="responsive"
         />
        </>
       </Link>
      </div>
      <div>
       <Link href="/">
        <div className={styles.wrapper__postedByName}>
         <p>
          {post.postedBy.userName}
          {` 
                  `}
          <GoVerified style={{ color: "#5b74ec", fontSize: "medium" }} />
         </p>
         <p>{post.postedBy.userName}</p>
        </div>
       </Link>
      </div>
     </div>

     <p
      style={{
       paddingInline: "40px",
       fontSize: "var(--text-lg)",
       color: "gray",
      }}
     >
      {post.caption}
     </p>

     <div style={{ marginTop: "40px", paddingInline: "40px" }}>
      {userProfile && (
       <LikeButton
        likes={post.likes}
        handleLike={() => handleLike(true)}
        handleDislike={() => handleLike(false)}
       />
      )}
     </div>
     <Comments
      comment={comment}
      setComment={setComment}
      addComment={addComment}
      comments={post.comments}
      isPostingComment={isPostingComment}
     />
    </div>
   </div>
  </div>
 );
};

export default Detail;

export const getServerSideProps = async ({
 params: { id },
}: {
 params: { id: string };
}) => {
 const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);

 return {
  props: { postDetails: data },
 };
};
