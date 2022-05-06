import React from "react";
import { useDispatch } from "react-redux";
import { addPost, createPost } from "../features/posts/postSlice";

function AddPost() {
  const dispatch = useDispatch();
  const authorRef = React.useRef();
  const titleRef = React.useRef();
  const bodyRef = React.useRef();
  const [image, setImage] = React.useState(null);
  const [addRequestStatus, setAddRequestStatus] = React.useState("idle");

  const addPostNow = async (e) => {
    e.preventDefault();
    //if we don't have an image, we can't post
    if (
      !image ||
      bodyRef.current.value.length === 0 ||
      titleRef.current.value.length === 0 ||
      authorRef.current.value.length === 0
    ) {
      return;
    }

    const author = authorRef.current.value;
    const title = titleRef.current.value;
    const body = bodyRef.current.value;
    const imageFile = image;

    const base64Image = await convertImage(imageFile);

    if (addRequestStatus === "idle") {
      try {
        setAddRequestStatus("loading");
        dispatch(createPost({ author, title, body, base64Image })).unwrap();
        setAddRequestStatus("success");

        // reset the form
        authorRef.current.value = "";
        titleRef.current.value = "";
        bodyRef.current.value = "";
        setImage(null);
        document.getElementById("form").reset();
      } catch (error) {
        console.log("Failed to save the post", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  // read the image file and convert it to base64
  const convertImage = async (imageFile) => {
    //convert image to base64
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div
      className="
	  max-w-sm rounded overflow-hidden shadow-lg bg-white w-full mx-auto mt-10 p-3 border
	"
    >
      <form onSubmit={(e) => addPostNow(e)} id="form">
        <div className="flex flex-col">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Your name
          </label>
          <input
            ref={authorRef}
            className="
					  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
					  focus:border-green-500
					 caret-green-500 
					  "
            type="text"
            placeholder="Jane Doe"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="text-gray-700 text-sm font-bold mb-2 tracking-wide"
          >
            Title
          </label>
          <input
            ref={titleRef}
            className="
					  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
					  focus:border-green-500
					 caret-green-500 
					  "
            type="text"
            id="title"
            name="title"
            placeholder="Title"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="body"
            className="text-gray-700 text-sm font-bold mb-2 tracking-wide"
          >
            Content
          </label>
          <textarea
            ref={bodyRef}
            className="
						  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
						  focus:border-green-500
						 caret-green-500
						  resize-none h-38"
            id="body"
            name="body"
            placeholder="Content"
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="image"
            className="text-gray-700 text-sm font-bold mb-2 tracking-wide"
          >
            Image
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
            focus:border-green-500
            caret-green-500
            file:px-2 file:mr-6 file:bg-green-500 file:border-none file:py-2 file:text-white file:focus:bg-green-500 file:focus:border-none file:focus:text-white file:rounded-md "
            type="file"
            id="image"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        {/* submit */}
        <div className="flex flex-col">
          <button
            className=" border-2 mt-3
            border-gray-300	focus:border-green-500	   text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline	
						  "
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPost;
