import React, { useContext, useEffect, useState } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import FeaturedHome from "../../components/featuredHome/FeaturedHome";
import Card from "../../components/card/Card";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";

function HomePage() {
  const { currentUser } = useContext(AuthContext);
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Scroll effect for overlay
  useEffect(() => {
    const handleScroll = () => {
      const homePage = document.querySelector(".homePage");
      if (window.scrollY > 100) {
        homePage?.classList.add("scrolled");
      } else {
        homePage?.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch latest posts
  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/posts/latest");
        const data = await res.json();
        setLatestPosts(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchLatestPosts();
  }, []);

  return (
    <div className="homePage">
      {/* Gradient Overlay Effect */}
      <div className="overlay"></div>

      {/* Hero Section */}
      <div className="contentContainer">
        {/* Text Container on the Left */}
        <div className="textContainer">
          <div className="wrapper">
            <h1 className="title">Beautiful Stays. Feel at Home Anywhere.</h1>
<p>
  Experience handpicked Airbnb stays designed for comfort, style, and convenience.
  From cozy city apartments to relaxing getaway homes, enjoy easy booking, great
  locations, and unforgettable stays every time.
</p>

            <SearchBar />
            <div className="boxes">
              <div className="box">
                <h1>16+</h1>
                <h2>Rooms</h2>
              </div>
              <div className="box">
                <h1>200</h1>
                <h2>Attendants</h2>
              </div>
              <div className="box">
                <h1>2000+</h1>
                <h2>Registered Users</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="imgContainer hideOnSmall">
          <img src="/bg.png" alt="Real Estate Background" />
        </div>
      </div>

      {/* Latest Properties Section */}
      <div className="latestPropertiesSection">
        {loading ? (
          <div className="loadingMessage">Loading latest properties...</div>
        ) : latestPosts.length > 0 ? (
          <div className="latestPostsWrapper">
            <h2 className="sectionTitle">Latest Properties</h2>
            <div className="latestPostsGrid">
              {latestPosts.map((post) => (
                <Card key={post.id} item={post} />
              ))}
            </div>
          </div>
        ) : (
          <div className="noPostsMessage">No properties available yet</div>
        )}
      </div>

      {/* Featured Properties Section */}
      <div className="featuredContainer">
        <FeaturedHome />
      </div>
    </div>
  );
}

export default HomePage;
