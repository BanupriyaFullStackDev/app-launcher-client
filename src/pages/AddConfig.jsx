import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddConfig = () => {
  const configFileInputRef = useRef();
  const [configFileName, setConfigFileName] = useState("");

  const handleConfigFile = async (e) => {
    setConfigFileName(e.target.files[0].name);

    const formData = new FormData();
    formData.append("icon", e.target.files[0]);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/upload-icon`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Icon uploaded and app added!");
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("Failed to upload icon");
    }
  };
  const removeConfigFile = async () => {
    if (!configFileName) return;

    try {
      const filename = configFileName.split("/").pop();

      await axios.delete(`${process.env.REACT_APP_API_URL}/delete-icon`, {
        data: { filename },
      });

      toast.success("Icon removed successfully!");
      setConfigFileName("");
    } catch (err) {
      console.error("Failed to delete icon:", err);
      toast.error("Error deleting icon");
    }
  };
  return (
    <div>
      {" "}
      <label>Config File</label>
      <div className="input-row">
        <input
          type="text"
          value={configFileName}
          readOnly
          placeholder="Choose Config file..."
        />

        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/webp"
          ref={configFileInputRef}
          style={{ display: "none" }}
          onChange={handleConfigFile}
        />
        <button onClick={() => configFileInputRef?.current?.click()}>
          Choose
        </button>
        <button onClick={removeConfigFile} disabled={!configFileName}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default AddConfig;
