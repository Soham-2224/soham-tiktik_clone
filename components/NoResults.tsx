import React from "react";
import { MdOutlineVideocamOff } from "react-icons/md";
import { BiCommentX } from "react-icons/bi";

interface IProps {
 text: string;
}

const NoResults = ({ text }: IProps) => {
 return (
  <div
   style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
   }}
  >
   <p style={{ fontSize: "6rem", margin: "0" }}>
    {text === "No comments yet" ? <BiCommentX /> : <MdOutlineVideocamOff />}
   </p>
   <p style={{ fontSize: "1.5rem", margin: "0", textAlign: "center" }}>
    {text}
   </p>
  </div>
 );
};

export default NoResults;
