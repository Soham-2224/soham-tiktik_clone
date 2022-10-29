import type { NextPage } from "next";
import axios from "axios";
import { Video } from "./../types.d";
import VideoCard from "./../components/VideoCard";
import NoResults from "./../components/NoResults";
import { BASE_URL } from "./../utils/index";

interface IProps {
 videos: Video[];
}

const Home = ({ videos }: IProps) => {
 return (
  <div>
   {videos.length ? (
    videos.map((video: Video) => (
     <VideoCard
      post={video}
      key={video._id}
     />
    ))
   ) : (
    <NoResults text={"No Videos"} />
   )}
  </div>
 );
};

export const getServerSideProps = async ({
 query: { topic },
}: {
 query: { topic: string };
}) => {
 let response = null;
 if (topic) {
  response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
 } else {
  response = await axios.get(`${BASE_URL}/api/post`);
 }

 return {
  props: {
   videos: response.data,
  },
 };
};

export default Home;