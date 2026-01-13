import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  if (currentUser) fetch();

  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/favicon.jpg" alt="" />
          <span>Bubly</span>
        </a>
        <a href="/">Home</a>
        <a href="/aboutUs">About</a>
        <a href="/contactUs">Contact</a>
        {/* <a href="/">Agents</a> */}
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <Link to="/profile" className="avatarLink">
              <img src={currentUser.avatar || "/noavatar.jpg"} alt="Profile Avatar" />
              {number > 0 && <div className="notification">{number}</div>}
            </Link>
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              {number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </>
        )}
        <div className={`menuIcon ${open ? "active" : ""}`} onClick={() => setOpen((prev) => !prev)}>
          <img
            src={open ? "/close.svg" : "/menu.png"}
            alt={open ? "Close menu" : "Open menu"}
          />
        </div>
        <div className={open ? "menu active" : "menu"} onClick={() => setOpen(false)}>
          <a href="/">Home</a>
          <a href="/aboutUs">About</a>
          <a href="/contactUs">Contact</a>
          {/* <a href="/">Agents</a> */}
          <a href="/login">Sign in</a>
          <a href="/register">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;