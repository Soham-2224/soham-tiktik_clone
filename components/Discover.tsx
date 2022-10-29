import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { topics } from "../utils/constants";
import styles from "./Discover.module.css";

const Discover = () => {
  const router = useRouter();
  const { topic } = router.query;

  return (
    <div className={styles.container}>
      <p>Popular Topics</p>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {topics.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div
              className={`${styles.topicsContainer} ${
                topic === item.name
                  ? styles.activeTopicStyle
                  : styles.topicStyle
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
