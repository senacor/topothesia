import { Table, Button } from "antd";
import { useState } from "react";

const FileTable = ({ data }) => {
  const [rowkeys, setRowkeys] = useState({
    selectedRowKeys: [],
    loading: false,
  });

  const start = () => {
    setRowkeys({ ...rowkeys, loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      setRowkeys({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setRowkeys({ ...rowkeys, selectedRowKeys });
  };

  const hasSelected = rowkeys.selectedRowKeys.length > 0;

  const rowSelection = {
    selectedRowkeys: rowkeys.selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Filename",
      dataIndex: "filename",
    },
    {
      title: "Author",
      dataIndex: "author",
    },
    {
      title: "Pages",
      dataIndex: "pages",
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={rowkeys.loading}
        >
          Download
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected
            ? `Selected ${rowkeys.selectedRowKeys.length} items`
            : ""}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};

export default FileTable;
