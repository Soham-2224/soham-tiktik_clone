import React, { useState, useEffect, useRef } from "react";
import { Video } from "./../types.d";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";

import styles from "./VideoCard.module.css";

interface IProps {
 post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }: { post: Video }) => {
 const [isHover, setIsHover] = useState(false);
 const [playing, setPlaying] = useState(false);
 const [isVideoMuted, setIsVideoMuted] = useState(false);

 const videoRef = useRef<HTMLVideoElement>(null);

 const onVideoPress = () => {
  if (playing) {
   videoRef?.current?.pause();
   setPlaying(false);
  } else {
   videoRef?.current?.play();
   setPlaying(true);
  }
 };

 useEffect(() => {
  if (videoRef?.current) {
   videoRef.current.muted = isVideoMuted;
  }
 }, [isVideoMuted]);

 return (
  <div
   style={{
    display: "flex",
    flexDirection: "column",
    borderBottom: "2px solid lightgray",
    paddingBottom: "24px",
   }}
  >
   <div>
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
     <div className={styles.wrapper}>
      <Link href={`/profile/${post.postedBy._id}`}>
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
      <Link href={`/profile/${post.postedBy._id}`}>
       <div className={styles.postedByName}>
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
   </div>
   <div className={styles.video}>
    <div
     onMouseEnter={() => setIsHover(true)}
     onMouseLeave={() => setIsHover(false)}
     style={{
      borderRadius: "10px",
      overflow: "hidden",
     }}
    >
     <Link href={`/detail/${post._id}`}>
      <video
       ref={videoRef}
       loop
       src={post.video.asset.url}
      ></video>
     </Link>

     {isHover && (
      <div className={styles.videoControls}>
       {playing ? (
        <button onClick={onVideoPress}>
         <BsFillPauseFill />
        </button>
       ) : (
        <button onClick={onVideoPress}>
         <BsFillPlayFill />
        </button>
       )}
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
     )}
    </div>
   </div>
  </div>
 );
};

export default VideoCard;
