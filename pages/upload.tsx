import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { SanityAssetDocument } from "@sanity/client";

import useAuthStore from "../store/authStore";
import { client } from "../utils/client";

import { topics } from "../utils/constants";
import { BASE_URL } from "./../utils/index";

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setWrongFileType] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);

  const { userProfile }: { userProfile: any } = useAuthStore();

  const router = useRouter();

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const filesTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (filesTypes.includes(selectedFile.type)) {
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setWrongFileType(true);
    }
  };

  const handlePost = async () => {
    if (caption && videoAsset?._id && category) {
      setSavingPost(true);

      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
      };

      await axios.post(`${BASE_URL}/api/post`, document);

      router.push("/");
    }
  };

  return (
    <div className="uploadWrapper">
      <div className="flexWrapper">
        <div>
          <div>
            <p style={{ fontSize: "22px", fontWeight: "bold" }}>Upload Video</p>
            <p
              style={{
                fontSize: "var(--text-md)",
                color: "gray",
                marginTop: "4px",
              }}
            >
              Post a Video to your account
            </p>
          </div>
          <div className="uploadBox">
            {isLoading ? (
              <p>Uploading</p>
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset.url}
                      loop
                      controls
                      style={{
                        borderRadius: "12px",
                        width: "250px",
                        height: "450px",
                        marginTop: "64px",
                        background: "black",
                      }}
                    ></video>
                  </div>
                ) : (
                  <label style={{ cursor: "pointer" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "var(--text-xl)",
                            fontWeight: "bold",
                          }}
                        >
                          <FaCloudUploadAlt
                            style={{ color: "lightgray", fontSize: "32px" }}
                          />
                        </p>
                        <p
                          style={{
                            fontSize: "var(--text-xl)",
                            fontWeight: "600",
                          }}
                        >
                          Upload video
                        </p>
                      </div>
                      <p
                        style={{
                          color: "lightgray",
                          marginTop: "40px",
                          textAlign: "center",
                          fontSize: "var(--text-sm)",
                          lineHeight: "40px",
                        }}
                      >
                        Mp4 or WebM or ogg <br />
                        720x1280 or higher <br />
                        Up to 10 minutes <br />
                        Less than 2GB
                      </p>
                      <p
                        style={{
                          background: "#f51997",
                          textAlign: "center",
                          marginTop: "40px",
                          borderRadius: "4px",
                          color: "white",
                          fontSize: "var(--text-md)",
                          width: "208px",
                          fontWeight: "500",
                          padding: "8px",
                          outline: "none",
                        }}
                      >
                        Select File
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-video"
                      style={{ width: "0", height: "0" }}
                      onChange={uploadVideo}
                    />
                  </label>
                )}
              </div>
            )}
            {wrongFileType && (
              <p
                style={{
                  textAlign: "center",
                  fontSize: "var(--text-xl)",
                  color: "red",
                  fontWeight: "600",
                  marginTop: "16px",
                  width: "250px",
                }}
              >
                Please select a video file
              </p>
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            paddingBottom: "40px",
          }}
        >
          <label style={{ fontSize: "var(--text-md)", fontWeight: "500" }}>
            Caption
          </label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            style={{
              borderRadius: "2px",
              outline: "none",
              fontSize: "var(--text-md)",
              border: "2px solid lightgray",
              padding: "8px",
            }}
          />
          <label style={{ fontSize: "var(--text-md)", fontWeight: "500" }}>
            {" "}
            Choose a Category
          </label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="categorySelect"
          >
            {topics.map((topic) => (
              <option value={topic.name} key={topic.name}>
                {topic.name}
              </option>
            ))}
          </select>
          <div className="DiscardorUploadBtn">
            <button type="button">Discard</button>
            <button
              style={{ border: "none", background: "#f51997", color: "white" }}
              onClick={handlePost}
              type="button"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
