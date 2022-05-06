import React, { useEffect, useState } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { motion } from "framer-motion";
import ReactionButtons from "./ReactionButtons";

function Post({ id, title, body, reactions, date, image, author, idd }) {
  const [updatedAtFormatted, setUpdatedAt] = useState("");
  // format distance from now '3 days ago' every second
  useEffect(() => {
    setInterval(() => {
      setUpdatedAt(formatDistanceToNow(parseISO(date)));
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="rounded-md max-w-sm w-full bg-white h-full ">
      <div className="flex items-center justify-between p-3">
        <div className="flex flex-col">
          <h2 className="font-semibold capitalize tracking-wide">{author}</h2>
          <p>{title}</p>
        </div>
        <span className="text-gray-400 text-xs">
          {updatedAtFormatted ? `${updatedAtFormatted} ago` : ""}{" "}
        </span>
      </div>
      <div>
        <img
          className="h-40  w-full object-cover"
          src={image || "https://source.unsplash.com/collection/190727/400x400"}
          alt={title}
        />{" "}
      </div>
      <div className="p-3">
        <p className="text-gray-700 text-base">{body}</p>
      </div>
      <div className="flex justify-between p-3">
        <div className="w-full">
          <ReactionButtons
            id={id}
            idd={idd}
            reactions={reactions}
            className="flex items-center"
          />
        </div>
      </div>
    </div>
  );
}

export default Post;
