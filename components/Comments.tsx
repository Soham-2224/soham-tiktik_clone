import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";

import useAuthStore from "../store/authStore";
import NoResults from "./NoResults";

import styles from "./Comment.module.css";
import { IUser } from "../types";

interface IProps {
 comment: string;
 comments: IComment[];
 setComment: Dispatch<SetStateAction<string>>;
 addComment: (e: React.FormEvent) => void;
 isPostingComment: Boolean;
}

interface IComment {
 comment: string;
 length?: number;
 _key: string;
 postedBy: { _ref: string; _id: string };
}

const Comments = ({
 comment,
 setComment,
 addComment,
 comments,
 isPostingComment,
}: IProps) => {
 const { userProfile, allUsers } = useAuthStore();
 return (
  <div className={styles.container}>
   <div className={styles.container__overflowScroll}>
    {comments?.length ? (
     comments.map((item, idx) => (
      <>
       {allUsers.map(
        (user: IUser) =>
         user._id === (item.postedBy._id || item.postedBy._ref) && (
          <div
           style={{ padding: "8px", alignItems: "center" }}
           key={idx}
          >
           <Link href={`/profile/${user._id}`}>
            <div style={{ display: "flex", alignItems: "start", gap: "12px" }}>
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
           <div>
            <p>{item.comment}</p>
           </div>
          </div>
         )
       )}
      </>
     ))
    ) : (
     <NoResults text="No comments yet" />
    )}
   </div>

   {userProfile && (
    <div className={styles.formContainer}>
     <form onSubmit={addComment}>
      <input
       value={comment}
       onChange={(e) => setComment(e.target.value)}
       placeholder="Add comment.."
      />
      <button onClick={addComment}>
       {isPostingComment ? "Commenting..." : "Comment"}
      </button>
     </form>
    </div>
   )}
  </div>
 );
};

export default Comments;
