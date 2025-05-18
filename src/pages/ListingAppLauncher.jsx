import useCustom from "../hooks/useCustom";

const ListingAppLauncher = () => {
 
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
    <div className="container p-5 d-flex justify-content-center">
        <div className="row g-5">
          {apps?.map((app, index) => (
            <div
              key={index}
              className="col-6 col-sm-6 col-md-4 col-lg-3"
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
                  color: "#333",
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
  );
};

export default ListingAppLauncher;
