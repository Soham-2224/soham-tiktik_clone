import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";

import useAuthStore from "../store/authStore";
import styles from "./SuggestedAccounts.module.css";
import { IUser } from "../types";

const SuggestedAccounts = () => {
 const { fetchAllUsers, allUsers } = useAuthStore();

 useEffect(() => {
  fetchAllUsers();
 }, [fetchAllUsers]);

 return (
  <div className={styles.container}>
   <p className={styles.title}> Suggested Accounts</p>

   <div>
    {allUsers.slice(0, 6).map((user: IUser) => (
     <Link
      href={`/profile/${user?._id}`}
      key={user._id}
     >
      <div className={styles.accountContainer}>
       <div style={{ width: "32px", height: "32px" }}>
        <Image
         src={user?.image}
         width={34}
         height={34}
         style={{ borderRadius: "50%" }}
         alt="user Profile"
         layout="responsive"
        />
       </div>
       <div className={styles.accountName}>
        <p>
         {user?.userName.replaceAll(" ", "")}{" "}
         <GoVerified style={{ color: "blue" }} />
        </p>
        <p
         style={{
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
    ))}
   </div>
  </div>
 );
};

export default SuggestedAccounts;
