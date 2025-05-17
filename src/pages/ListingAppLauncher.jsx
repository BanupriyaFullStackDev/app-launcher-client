import { useNavigate } from "react-router-dom";
import useCustom from "../hooks/useCustom";
import { FaCog } from "react-icons/fa";
import Header from "../components/Header";

const ListingAppLauncher = () => {
  const navigate = useNavigate();
  const apps = useCustom();

  const launchApp = async (app) => {
    console.log(app, "app");
    await fetch(`${process.env.REACT_APP_API_URL}/launch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path: app.path, param: app.param }),
    });
  };

  return (
    <div
      className="container-fluid min-vh-100 text-white"
      style={{ backgroundColor: "#0b2156" }}
    >
      <Header />

      <div className="container py-4">
        <div className="row g-3 justify-content-center">
          {apps?.map((app, index) => (
            <div
              key={index}
              className="col-6 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center"
            >
              <div
                className="card text-center shadow-sm"
                style={{
                  width: "110px",
                  height: "110px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  transition: "transform 0.2s ease",
                  backgroundColor: "#f8f9fa",
                  color: "#333",
                  userSelect: "none",
                }}
                onClick={() => launchApp(app)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src={`http://localhost:2354/icons/${app.icon}`}
                  alt={app.name}
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "contain",
                    marginBottom: "8px",
                  }}
                />
                <p
                  className="small mb-0"
                  style={{ fontWeight: "600", fontSize: "0.85rem" }}
                >
                  {app?.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="position-fixed bottom-0 start-0 m-3 bg-white text-dark p-2 rounded-circle shadow"
        onClick={() => navigate("/settings")}
        role="button"
        style={{ zIndex: 1000 }}
      >
        <FaCog />
      </div>
    </div>
  );
};

export default ListingAppLauncher;
