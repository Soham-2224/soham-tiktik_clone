import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import Discover from "./Discover";
import SuggestedAccounts from "./SuggestedAccounts";
import Footer from "./Footer";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const userProfile = false;

  return (
    <div>
      <div
        className={styles.sidebarToggle}
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className={styles.sidebar}>
          <div className={styles.linkContainer}>
            <Link href="/">
              <div className={styles.normalLink}>
                <p style={{ fontSize: "20px", margin: "0" }}>
                  <AiFillHome />
                </p>
                <span>For You</span>
              </div>
            </Link>
          </div>

          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
