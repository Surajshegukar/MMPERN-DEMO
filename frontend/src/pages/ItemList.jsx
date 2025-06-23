import React, { useState, useEffect } from "react";
import DataTableList from "./DataTableList";

function ItemList() {
  const [items, setItems] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/mongo/items")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          console.log(data);
        }
      })
      .catch((err) => console.error("Failed to fetch items:", err));
  }, []);

  return (
    <div className="main_page">
      <div className="page_title">
        <h3>Form Template 2</h3>
      </div>
      <div className="page_body">
        <div className="page_sec">
          {/* <DataTableList data={items} columns={columns} /> */}
        </div>
      </div>
    </div>
  );
}

export default ItemList;
