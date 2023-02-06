import {
  Children,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { Modal } from "../../Modal/Modal";
import { UserContext } from "../../../Context/UserContext";

export const Posts = () => {
  const { user } = useContext(UserContext);

  const [posts, setPosts] = useState([]);
  const [postModal, setPostModal] = useState();

  const titleRef = useRef();
  const bodyRef = useRef();

  useEffect(() => {
    axios
      .get("http://localhost:8313/posts")
      .then((data) => {
        if (data) {
          setPosts(data.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handlePost = (evt) => {
    evt.preventDefault();

    axios
      .post("http://localhost:8313/posts", {
        title: titleRef.current.value,
        body: bodyRef.current.value,
        author: user.first_name + " " + user.last_name,
      })
      .then((res) => console.log(res));
  };

  return (
    <>
      <button
        onClick={() => setPostModal(true)}
        className="my-3 pos d-flex align-items-center"
      >
        Add your posts <span className="ms-1 fs-4">&#43;</span>
      </button>
      <h1 className="text-center my-3">Posts</h1>
      {posts.length ? (
        <ul className="list-group w-50 mx-auto">
          {posts.map((post) => (
            <li key={post.id} className="list-group-item">
              <strong>{post.id}.</strong> {post.title}
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
      {postModal ? (
        <Modal modal={postModal} setModal={setPostModal}>
          <form onSubmit={handlePost}>
            <input
              className="form-control mb-3"
              ref={titleRef}
              type="text"
              placeholder="Title"
            />
            <input
              className="form-control mb-3"
              ref={bodyRef}
              type="text"
              placeholder="Body"
            />
            <button className="btn btn-secondary">Post</button>
          </form>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};
