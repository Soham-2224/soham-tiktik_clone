import { useState, useEffect } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";

import VideoCard from "../../components/VideoCard";
import NoResults from "./../../components/NoResults";
import { IUser, Video } from "../../types";

import { BASE_URL } from "./../../utils/index";

interface IProps {
 data: {
  user: IUser;
  userVideos: Video[];
  userLikedVideos: Video[];
 };
}

const Profile = ({ data }: IProps) => {
 const [showUserVideos, setShowUserVideos] = useState(true);
 const [videoList, setVideoList] = useState<Video[]>([]);
 const { user, userVideos, userLikedVideos } = data;

 const videos = showUserVideos
  ? { borderBottom: "2px solid black" }
  : { color: "gray" };
 const liked = !showUserVideos
  ? { borderBottom: "2px solid black" }
  : { color: "gray" };

 useEffect(() => {
  if (showUserVideos) {
   setVideoList(userVideos);
  } else {
   setVideoList(userLikedVideos);
  }
 }, [showUserVideos, userLikedVideos, userVideos]);

 return (
  <div style={{ width: "100%" }}>
   <div className="profileGrid">
    <div className="profileGrid__imageBx">
     <Image
      src={user?.image}
      width={100}
      height={100}
      style={{ borderRadius: "50%" }}
      alt="user Profile"
      layout="responsive"
     />
    </div>
    <div className="accountName">
     <p>
      {user?.userName.replaceAll(" ", "")}{" "}
      <GoVerified style={{ color: "blue" }} />
     </p>
     <p
      style={{
       textTransform: "capitalize",
       color: "#ccc",
       fontSize: "20px",
       fontWeight: "normal",
      }}
     >
      {user.userName}
     </p>
    </div>
   </div>

   <div>
    <div
     style={{
      display: "flex",
      gap: "40px",
      marginBottom: "40px",
      marginTop: "40px",
      borderBottom: "2px solid lightgray",
      background: "white",
      width: "100%",
     }}
    >
     <p
      style={videos}
      className="category"
      onClick={() => {
       setShowUserVideos(true);
      }}
     >
      Videos
     </p>
     <p
      style={liked}
      className="category"
      onClick={() => {
       setShowUserVideos(false);
      }}
     >
      Liked
     </p>
    </div>

    <div>
     {videoList.length > 0 ? (
      videoList.map((post: Video, idx: number) => (
       <VideoCard
        post={post}
        key={idx}
       />
      ))
     ) : (
      <NoResults text={`No ${showUserVideos ? "" : "Liked"} Videos Yet`} />
     )}
    </div>
   </div>
  </div>
 );
};

export const getServerSideProps = async ({
 params: { id },
}: {
 params: { id: string };
}) => {
 const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

 return {
  props: { data: res.data },
 };
};

export default Profile;
