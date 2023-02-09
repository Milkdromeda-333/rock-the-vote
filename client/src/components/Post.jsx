import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { BiSend } from 'react-icons/bi'
import {AiOutlineComment} from 'react-icons/ai'
import { useState, useRef, useLayoutEffect } from "react";

    // TODO add a function that handles dates that shows how long ago the post was posted
export default function Post(data) {
    const { title, description, datePosted, userName } = data;
    const ref = useRef();

    const [btnEffect, setBtnEffect] = useState(false)

    // used for textarea auto-resizing
    const [commentValue, setCommentValue] = useState('');

     // This only tracks the auto-sized height so we can tell if the user has manually resized
    const autoHeight = useRef();

    useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }
    if (
      autoHeight.current !== undefined &&
      ref.current.style.height !== autoHeight.current
    ) {
      // don't auto size if the user has manually changed the height
      return;
    }
    ref.current.style.height = "30px";
    ref.current.style.overflow = "hidden";
    const next = `${ref.current.scrollHeight}px`;
    ref.current.style.height = next;
    autoHeight.current = next;
    ref.current.style.overflow = "auto";
  }, [commentValue, ref, autoHeight]);

    return (
        <div className="
        w-full
        p-4
        text-my-cream
        bg-my-light-blue
        rounded-md
        ">
            {/* card header */}
            <div className="flex flex-row justify-start gap-2">
                <img
                    src="https://api.multiavatar.com/Starcrasher.png" alt="avater"
                    className="w-10"
                />
                <div className="flex flex-col justify-start">
                    <span> @{userName}</span>
                    <span className="text-xs"> {datePosted}</span>
                </div>
            </div>

            {/* post contents */}
            <div className="">
                <h2 className="font-bold text-lg m-2">{title}</h2>
                <p>{ description }</p>
            </div>

            {/* options */}
            <div className="
            flex flex-row justify-evenly items-center gap-4
            border-t-2
            mt-2
            py-2">
                <div className="
                flex flex-row justify-center items-center gap-2
                hover:text-red-500
                cursor-pointer">
                    <span>Disagree</span>
                    <FiThumbsDown />
                </div>
                <div className="
                flex flex-row justify-center items-center gap-2
                hover:text-green-500
                cursor-pointer">
                    <FiThumbsUp />
                    <span>Agree</span>
                </div>
            </div>

            {/* comment input */}
            <div className="flex flex-row justify-evenly items-center gap-2">
                <textarea type="text"
                name="comment"
                id="comment"
                placeholder="Comment"
                ref={ref}
                className="
                w-full
                rounded-lg
                text-my-dark-blue
                p-2
                "
                value={commentValue}
                onChange={event => setCommentValue(event.target.value)} />
                
                <button className={`
                ${btnEffect && "animate-wiggle"}
                    p-1
                    text-xl
                    border-2
                    rounded-full
                    hover:text-my-cream-tone
                    hover:border-my-cream-tone`}
                    onClick={() => {
                         setBtnEffect(true);
                    }}
                    onAnimationEnd={() => setBtnEffect(false)}>
                    <BiSend/>
                </button>
            </div>

            {/* view more comments */}
            <div className="
            p-2
            cursor-pointer
            grid place-items-center grid-flow-row">
                <AiOutlineComment className="text-3xl" />
                <span>view comments</span>
            </div>
        </div>
    )
}