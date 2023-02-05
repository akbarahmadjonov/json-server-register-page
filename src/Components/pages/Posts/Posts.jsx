import { useEffect, useState } from "react";
import axios from "axios";

export const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((data) => {
        if (data) {
          setPosts(data.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
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
    </>
  );
};
