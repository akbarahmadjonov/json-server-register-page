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
  const [showModal, setShowModal] = useState(false);

  const titleRef = useRef();
  const bodyRef = useRef();
  const visibilityRef = useRef();

  const editTitleRef = useRef();
  const editBodyRef = useRef();
  const editVisibilityRef = useRef();

  const handlePost = (evt) => {
    evt.preventDefault();

    axios
      .post("http://localhost:8313/posts", {
        title: titleRef.current.value,
        body: bodyRef.current.value,
        author: user.first_name + " " + user.last_name,
        visibility: visibilityRef.current.value,
      })
      .then((data) => {
        if (data.status === 201) {
          // setPosts();
          setPostModal(false);
        }
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8313/posts")
      .then((data) => {
        if (data) {
          setPosts(data.data);
        }
      })
      .catch((err) => console.log(err));
  }, [posts]);

  const deleteHandle = (id) => {
    axios
      .delete(`http://localhost:8313/posts/${id}`)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  // const handleEdit = (id) => {

  // };

  const handleInput = (id, evt) => {
    evt.preventDefault();
    const article = {
      title: editTitleRef.current.value,
      body: editBodyRef.current.value,
      visibility: editVisibilityRef.current.value,
      author: user.first_name + " " + user.last_name,
    };
    axios
      .put(`http://localhost:8313/posts/${id}`, article)
      .then((data) => console.log(data));
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
        <ul className="row list-group">
          {posts.map((post) => (
            <div className="container w-50 my-5">
              <div className="item infoRow my-3">
                <div className="infoRow-Item infoRow-likedName font-bold">
                  {user.first_name + " " + user.last_name}
                </div>
                <div className="infoRow-Item, font-gray">likes this</div>
                <div className="infoRow-Item infoRow-dotsMenu">...</div>
              </div>
              <div className="item">
                <div className="profileInfo">
                  <div className="profileInfo-image"></div>
                  <div className="profileInfo-text">
                    <div>
                      <span>{user.first_name}</span>
                      <span className="profileInfo-nth font-gray">2nd</span>
                    </div>
                    <div>
                      <span className="font-gray">{post.title}</span>
                    </div>
                    <div>
                      <span className="font-gray">1w Edited</span>
                    </div>
                  </div>
                </div>
                <div className="profileInfo-textSection">
                  <p>
                    {post.body}
                    <span className="profileInfo-more font-gray">
                      ...see more
                    </span>
                  </p>
                </div>
                <div className="translationSection">
                  <span className="translationSection-translation font-bold">
                    See translation
                  </span>
                  <span className="mb-2">Visibility: {post.visibility}</span>
                  <span>
                    <span className="translationSection-likeIcon" />
                    <span className="translationSection-heartIcon" />
                    <span className="translationSection-clapIcon" />
                    <span className="translationSection-likeCount">115</span>
                    <span>0 comments</span>
                  </span>
                </div>
              </div>
              <div className="item">
                <div className="userActionSection">
                  <span className="userActionSection-icons userActionSection-like font-bold font-gray">
                    Like
                  </span>
                  <span className="userActionSection-icons userActionSection-comment font-bold font-gray">
                    Comment
                  </span>
                  <span className="userActionSection-icons userActionSection-share font-bold font-gray">
                    Share
                  </span>
                </div>
                <button onClick={() => setShowModal(true)} className="edit">
                  Edit post
                </button>
                <button
                  onClick={() => deleteHandle(post.id)}
                  className="delete"
                  title="This will delete your post"
                >
                  Delete post
                </button>
                {/* Modal edit */}
                {showModal ? (
                  <div className="card position-relative">
                    <div className="modal-w">
                      <form
                        onSubmit={(evt) => {
                          setShowModal(false);
                          handleInput(post.id, evt);
                        }}
                      >
                        <div className="info__padding">
                          <h3>Let's make some changes?</h3>
                        </div>
                        <input
                          ref={editTitleRef}
                          className="form-control mb-3"
                          type="text"
                          placeholder="Change post title"
                          autoFocus={true}
                          defaultValue={post.title}
                        />
                        <input
                          ref={editBodyRef}
                          className="form-control mb-3"
                          type="text"
                          placeholder="Change post text"
                          defaultValue={post.body}
                        />
                        <select
                          className="form-select mb-3"
                          ref={editVisibilityRef}
                        >
                          <option selected disabled>
                            Visibility
                          </option>
                          <option>Everyone</option>
                          <option>Only my friends</option>
                        </select>
                        <div className="button__group">
                          <button>Cancel</button>
                          <button type="submit">Save changes</button>
                        </div>
                      </form>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
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
              required
            />
            <input
              className="form-control mb-3"
              ref={bodyRef}
              type="text"
              placeholder="Body"
              required
            />
            <select className="form-select mb-3" ref={visibilityRef}>
              <option selected disabled>
                Visibility
              </option>
              <option>Everyone</option>
              <option>Only my friends</option>
            </select>
            <button className="btn btn-secondary">Post</button>
          </form>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};
