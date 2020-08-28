import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import axios from "axios";
function Home(props) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(setLoading(true));
    axios.get("https://server-blog-app.herokuapp.com/blogs").then(res => setBlogs(res.data));
    setLoading(false);
  }, [loading]);
  console.log(props);
  if (loading === true) {
    return <h2>Loading...</h2>;
  } else {
    return (
      <div className="text-center m-auto">
        <h2>User Feed</h2>
        <div className="row">
          {blogs.map((ele,i) => {
            return (
              <Card
                className="m-4"
                key={i+1}
                style={{ width: 400 }}
                title={ele.name}
              >
                <h2>{ele.title}</h2>
                <Link
                  className="btn btn-dark"
                  to={{
                    pathname: `/users/${ele.blog_id}`,
                    state: {
                      data: ele
                    }
                  }}
                >
                  View More
                </Link>
                <hr />
                <small>Created At : {ele.created_at}</small>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
