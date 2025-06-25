import React from 'react'

import CustomDataTable from '../components/CustomDataTable';

function SqlUserList() {
     const columns = [
    { name: "S.No", selector: (row) => row[0] },
    { name: "Name", selector: (row) => row[1] },
    { name: "email", selector: (row) => row[2] },
    { name: "password", selector: (row) => row[3] },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <div className="tabe-btns">
          <button
            onClick={() => handleEdit(row[4])}
            className="btn btn-sm btn-warning"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row[4])}
            className="btn btn-sm btn-danger"
            style={{ marginLeft: "8px" }}
          >
            Delete
          </button>
          </div>
        </>
      ),
      ignoreRowClick: true,

      button: true,
    },
  ];
  return (
    <div>
        <CustomDataTable url={"http://localhost:3000/mysql/ajax/users"} columns={columns} />
    </div>
  )
}

export default SqlUserList