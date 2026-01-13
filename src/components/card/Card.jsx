import { Link, useNavigate } from "react-router-dom";
import "./card.scss";
import { useSavedPosts } from "../../context/SavedPostsContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function Card({ item }) {

  const { savedPosts, toggleSave } = useSavedPosts();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // ...existing code...

  const handleChat = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    try {
      // Send request to create a chat in the database
      await apiRequest.post("/chats", {
        userId: currentUser.id, // Logged-in user
        receiverId: item.userId, // Post owner
      });
      
      // Check if device is mobile/small screen
      const isMobile = window.innerWidth < 768;
      
      // Navigate to profile with state
      navigate(`/profile`, { 
        state: { 
          receiver: item.user.id,
          autoScroll: isMobile,
          showNotification: isMobile,
          receiverName: item.user.username 
        } 
      });
    } catch (err) {
      console.error("Error starting chat:", err);
    }
  };

  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">Kshs. {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            {/* <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div> */}
          </div>
          <div className="icons">
           
            <div className="icon" onClick={() => toggleSave(item.id)}
              style={{
                 backgroundColor: savedPosts.has(item.id) ? "#fece51" : "transparent",
                 padding: "5px", 
                 transition: "background-color 0.3s ease", 
               }}
             >
  <img src="/save.png" alt="Save" />
            </div>
            <div className="icon" onClick={handleChat}>
              <img src="/chat.png" alt="Chat" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
