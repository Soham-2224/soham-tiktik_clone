import { useState } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

import VideoCard from "../../components/VideoCard";
import NoResults from "./../../components/NoResults";
import { IUser, Video } from "../../types";
import { BASE_URL } from "./../../utils/index";
import useAuthStore from "./../../store/authStore";

const Search = ({ videos }: { videos: Video[] }) => {
 const [isAccounts, setIsAccounts] = useState(true);
 const router = useRouter();
 const { searchTerm }: any = router.query;
 const { allUsers } = useAuthStore();

 const account = isAccounts
  ? { borderBottom: "2px solid black" }
  : { color: "gray" };
 const videoStyle = !isAccounts
  ? { borderBottom: "2px solid black" }
  : { color: "gray" };

 const searchedAccounts = allUsers.filter((user: IUser) =>
  user.userName.toLowerCase().includes(searchTerm.toLowerCase())
 );

 return (
  <div style={{ width: "100%" }}>
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
     style={account}
     className="category"
     onClick={() => {
      setIsAccounts(true);
     }}
    >
     Accounts
    </p>
    <p
     style={videoStyle}
     className="category"
     onClick={() => {
      setIsAccounts(false);
     }}
    >
     Videos
    </p>
   </div>

   {isAccounts ? (
    <div style={{ marginTop: "14px" }}>
     {searchedAccounts.length > 0 ? (
      searchedAccounts.map((user: IUser, idx: number) => (
       <Link
        href={`/profile/${user._id}`}
        key={idx}
       >
        <div
         style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "8px",
          cursor: "pointer",
          fontWeight: "600",
          borderBottom: "2px solid #ddd",
         }}
        >
         <div>
          <Image
           src={user?.image}
           width={50}
           height={50}
           style={{ borderRadius: "50%" }}
           alt="user Profile"
          />
         </div>
         <div>
          <p style={{ marginBottom: "5px", marginTop: "0" }}>
           {user?.userName.replaceAll(" ", "")}{" "}
           <GoVerified style={{ color: "blue" }} />
          </p>
          <p
           style={{
            margin: "0",
            textTransform: "capitalize",
            color: "#ccc",
            fontSize: "xx-small",
           }}
          >
           {user.userName}
          </p>
         </div>
        </div>
       </Link>
      ))
     ) : (
      <NoResults text={`No results for ${searchTerm}`} />
     )}
    </div>
   ) : (
    <div className="searchVideosBx">
     {videos.length ? (
      videos.map((video: Video, idx) => (
       <VideoCard
        post={video}
        key={idx}
       />
      ))
     ) : (
      <NoResults text={`No video results for ${searchTerm}`} />
     )}
    </div>
   )}
  </div>
 );
};

export const getServerSideProps = async ({
 params: { searchTerm },
}: {
 params: { searchTerm: string };
}) => {
 const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

 return {
  props: { videos: res.data },
 };
};

export default Search;
