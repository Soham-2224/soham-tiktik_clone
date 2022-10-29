import React, { useState, useEffect, FormEvent } from "react";
import styles from "./Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import Logo from "../utils/tiktik-logo.png";
import { createOrGetUser } from "../utils";

import useAuthStore from "../store/authStore";

const Navbar = () => {
 const {
  userProfile,
  addUser,
  removeUser,
 }: { userProfile: any; addUser: any; removeUser: any } = useAuthStore();
 const [searchValue, setSearchValue] = useState("");

 const { _id }: any = userProfile;

 const router = useRouter();

 const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();

  if (searchValue) {
   router.push(`/search/${searchValue}`);
  }
 };

 return (
  <div className={styles.container}>
   <Link href="/">
    <div className={styles.imgBx}>
     <Image
      style={{ cursor: "pointer" }}
      src={Logo}
      alt="tiktik"
      layout="responsive"
     />
    </div>
   </Link>
   <div className={styles.formContainer}>
    <form onSubmit={handleSearch}>
     <input
      type="text"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      placeholder="Search accounts and videos"
     />
     <button type="submit">
      <BiSearch />
     </button>
    </form>
   </div>

   <div>
    {userProfile ? (
     <div className={styles.header__right}>
      <Link href="/upload">
       <button>
        <IoMdAdd style={{ fontSize: "var(--text-xl)" }} />
        <span>Upload</span>
       </button>
      </Link>
      {userProfile?.image && (
       <Link href={`/profile/${_id}`}>
        <>
         <Image
          width={40}
          height={40}
          style={{ borderRadius: "100%", cursor: "pointer" }}
          src={userProfile?.image}
          alt="profilePhoto"
         />
        </>
       </Link>
      )}
      <button
       style={{ border: "none", paddingInline: "8px" }}
       type="button"
       onClick={() => {
        googleLogout();
        removeUser();
       }}
      >
       <AiOutlineLogout
        color="red"
        fontSize={27}
       />
      </button>
     </div>
    ) : (
     <GoogleLogin
      onSuccess={(response) => createOrGetUser(response, addUser)}
      onError={() => console.log("err")}
     />
    )}
   </div>
  </div>
 );
};

export default Navbar;
