import React from "react";
import styles from "./Footer.module.css";
import { footerList1, footerList2, footerList3 } from "../utils/constants";

const List = ({ items, mt }: { items: string[]; mt: boolean }) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      marginTop: `${mt && "2 4px"}`,
    }}
  >
    {items.map((item) => (
      <p style={{ margin: "0" }} key={item}>
        {item}
      </p>
    ))}
  </div>
);

const Footer = () => {
  return (
    <div className={styles.container}>
      <List items={footerList1} mt={false} />
      <List items={footerList2} mt />
      <List items={footerList3} mt />
      <p>2022 My TikTik</p>
    </div>
  );
};

export default Footer;
