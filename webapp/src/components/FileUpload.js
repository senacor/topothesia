import { useState } from "react";
import { Button, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

function FileUpload() {
  const [dragger, setDragger] = useState({
    visible: false,
  });

  const showDragger = () => {
    setDragger({
      visible: !dragger.visible,
    });
  };

  const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <div>
      <Button
        type="primary"
        onClick={() => showDragger()}
        style={{ marginBottom: 16 }}
      >
        Upload
      </Button>
      {dragger.visible && (
        <Dragger {...props} style={{ marginBottom: 16 }}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </Dragger>
      )}
    </div>
  );
}

export default FileUpload;
