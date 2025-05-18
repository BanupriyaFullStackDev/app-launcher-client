import { useState } from "react";
import { FaCog } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const [redirect, setRedirect] = useState("/settings");
  const navigate = useNavigate();
  return (
    <div
      className="navbar text-white"
      style={{ position: "fixed ", bottom: "0", padding: "20px", width: "100%", backgroundColor:'transparent' }}
    >
      <div
        onClick={() => {
          if (redirect === "/settings") setRedirect("");
          else setRedirect("/settings");
          navigate(redirect);
        }}
        role="button"
      >
        {redirect ? <FaCog /> : <FaHome />}
      </div>
    </div>
  );
}
