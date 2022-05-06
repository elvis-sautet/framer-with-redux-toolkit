import React from "react";
import { useDispatch } from "react-redux";
import { addReaction } from "../features/posts/postSlice";
import { motion } from "framer-motion";

const emoji = {
  like: "👍",
  dislike: "👎",
  love: "❤️",
  haha: "😂",
  wow: "😮",
};

function ReactionButtons({ id, reactions }) {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(emoji).map(([reaction, emoji]) => {
    return (
      <motion.button
        whileTap={{
          //   add a yoyo effect to the button
          scale: 0.6,
          //   after the button is released, set the background color to red
          transition: {
            type: "tween",
            duration: 0.2,
            ease: "easeInOut",
            backgroundColor: "red",
            repeat: 4,
          },
        }}
        onClick={() => {
          dispatch(addReaction({ id, reaction }));
        }}
        key={reaction}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-3 rounded-full w-full whitespace-nowrap"
      >
        {emoji} {reactions[reaction] > 0 ? reactions[reaction] : ""}
      </motion.button>
    );
  });
  return (
    <div className="flex justify-between w-full gap-3">{reactionButtons}</div>
  );
}

export default ReactionButtons;
