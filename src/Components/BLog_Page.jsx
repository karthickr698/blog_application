import React, { useEffect, useState } from "react";
import axios from "axios";
import { Comment, Tooltip, Avatar, Collapse } from "antd";
import { Link } from "react-router-dom";

function Blog_Page(props) {
  const { Panel } = Collapse;

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [comment, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setUser(props.location.state.data);
      let b_id = parseInt(props.match.params.id);

      axios
        .post("https://server-blog-app.herokuapp.com/comments", {
          b_id
        })
        .then(res => setComments(res.data));
      setLoading(false);
      console.log(user)
    }

    loadData();
  });

  const clickHandler = () => {
    console.log("called")
    let b_id = props.match.params.id;
    let data = {
      comment: newComment,
      user_id: localStorage.getItem("user_id"),
      blog_id: parseInt(b_id),
      catagory_id: user.catagory_id
    };
    console.log(data)
    setLoading(true);
    axios
      .post("https://server-blog-app.herokuapp.com/new_comment", data)
      .then(res => setComments(res.data));

    setLoading(false);
  };


  if (loading) {
    return <h2>Loading...</h2>;
  } else {
    return (
      <div className="text-center  p-4">
        <div className="card m-auto col-md-6 rounded p-4">
          <h2 className="text-light bg-dark p-4 rounded">{user.title}</h2>
          <p className="text-light bg-dark p-4 rounded ">{user.content}</p>
          <Collapse defaultActiveKey={user.id}>
            <Panel header="comment box" key={user.id}>
              <div className="row text-center">
                <input
                  className=" m-auto col-md-6 form-control"
                  placeholder="add a new comment"
                  onChange={e => setNewComment(e.target.value)}
                />
                <button
                  className="btn btn-outline-dark m-auto"
                  onClick={clickHandler}
                >
                  Add
                </button>
              </div>
              {comment.map((ele,i) => {
                console.log(ele);
                return (
                  <Comment
                    key={i+1}
                    author={<spam>{ele.name}</spam>}
                    avatar={
                      <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt="Han Solo"
                      />
                    }
                    content={<p>{ele.comment}</p>}
                    datetime={
                      <Tooltip title={ele.created_at}>
                        <p>Posted at {ele.created_at}</p>
                      </Tooltip>
                    }
                  />
                );
              })}
            </Panel>
          </Collapse>
        </div>
        <Link to="/" className="badge badge-dark mt-4 p-1">
          Back to Blogs
        </Link>
      </div>
    );
  }
}

export default Blog_Page;
