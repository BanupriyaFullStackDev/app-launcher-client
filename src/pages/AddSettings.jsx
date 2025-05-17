import axios from "axios";
import { useRef, useState } from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AddConfig from "./AddConfig";
import { toast } from "react-toastify";
import Header from "../components/Header";

const AddSettings = () => {
  const exeFileInputRef = useRef();
  const [exeFileName, setExeFileName] = useState("");
  const [appName, setAppName] = useState("");
  const [paramName, setParamName] = useState("");
  const BASE_PATH = "C:/Program Files/Google/Chrome/Application";
  const navigate = useNavigate();

  const handleExeFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".exe")) {
      const fullPath = `${BASE_PATH}/${file.name}`;
      setExeFileName(fullPath);

      const fileName = file.name.split(".")[0];
      if (!appName) setAppName(fileName);
      if (!paramName) setParamName(`${fileName}.com`);
    } else {
      alert("Please select a valid .exe file.");
    }
  };

  const handleSubmit = async () => {
    if (!exeFileName || !appName || !paramName) {
      alert("Please fill all fields before submitting.");
      return;
    }

    const fileName =
      appName.split(".")[0].charAt(0).toLocaleLowerCase() + appName.slice(1);
    const payload = {
      name: appName,
      path: exeFileName,
      icon: `${fileName}.png`,
      param: paramName,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/add-app`,
        payload
      );
      console.log("App added successfully", response.data);
      toast.success("App added successfully!");
      resetForm();
    } catch (error) {
      console.error("Error adding app:", error);
      toast.error("Failed to add app.");
    }
  };

  const resetForm = () => {
    setExeFileName("");
    setAppName("");
    setParamName("");
  };
  const removeExeFile = async () => {
    if (!exeFileName) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/delete-app`, {
        data: { path: exeFileName },
      });
      toast.success("App removed successfully");
      setExeFileName("");
      if (exeFileInputRef.current) {
        exeFileInputRef.current.value = null;
      }
    } catch (error) {
      console.log("Error removing app", error);
      toast.error("Error removing app");
    }
  };

  return (
    <div className="settings-form">
      <Header />
      <div className="form-group">
        <label>Applications</label>
        <div className="input-row">
          <input
            type="text"
            value={exeFileName}
            readOnly
            placeholder="Choose Exe file..."
            onClick={() =>
              exeFileInputRef.current && exeFileInputRef.current.click()
            }
          />

          <input
            type="file"
            accept=".exe"
            ref={exeFileInputRef}
            style={{ display: "none" }}
            onChange={handleExeFileChange}
          />
          <input
            type="text"
            name="name"
            onChange={(e) => setAppName(e.target.value)}
            placeholder="Enter App Name"
          />

          <input
            type="text"
            name="param"
            onChange={(e) => setParamName(e.target.value)}
            placeholder="Eg-google.com"
          />
          <button onClick={handleSubmit}>Add</button>
          <button onClick={removeExeFile} disabled={!exeFileName}>
            Remove
          </button>
        </div>
        <div style={{ marginTop: "20px" }}>
          <AddConfig />
        </div>
      </div>
      <div onClick={() => navigate("/")} className="settings-icon">
        <FaHome />
      </div>
    </div>
  );
};

export default AddSettings;
