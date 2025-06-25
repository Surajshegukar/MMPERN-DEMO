import React from "react";
import { useNavigate } from "react-router-dom";
import CustomDataTable from "../components/CustomDataTable";

function MongoUserList() {
  const navigate = useNavigate();

  // Handler for editing a user
  const handleEdit = (id) => {
    navigate(`/users/edit/${id}`); // Assumes a route exists for this
  };

  // Handler for deleting a user
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:3000/mongodb/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("User deleted successfully!");
        // Optional: Trigger reload via table logic or use a state toggle
      } else {
        const error = await response.text();
        alert(`Failed to delete user: ${error}`);
      }
    } catch (err) {
      alert(`Network error: ${err.message}`);
    }
  };

  const handleView = (id) => {
    navigate(`/users/view/${id}`);
  };

  const columns = [
    { name: "S.No", selector: (row) => row[0] },
    { name: "First Name", selector: (row) => row[1] },
    { name: "Last Name", selector: (row) => row[2] },
    { name: "Email", selector: (row) => row[3] },
    { name: "DOB", selector: (row) => row[4] },
    { name: "Mobile", selector: (row) => row[5] },
    { name: "Password", selector: (row) => row[6] },
    { name: "Address", selector: (row) => row[7] },
    {
      name: "Profile Photo",
      cell: (row) =>
        row[8] ? (
          <img
            src={`http://localhost:3000/uploads/${row[8]}`}
            alt="Profile"
            width={40}
            height={40}
            style={{ objectFit: "cover", borderRadius: "50%" }}
          />
        ) : (
          "No Image"
        ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="tabe-btns">
          <button
            onClick={() => handleView(row[9])}
            className="btn btn-sm btn-info"
          >
            View
          </button>
          <button
            onClick={() => handleEdit(row[9])}
            className="btn btn-sm btn-warning"
            style={{ marginLeft: "8px" }}
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row[9])}
            className="btn btn-sm btn-danger"
            style={{ marginLeft: "8px" }}
          >
            Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
    },
  ];

  return (
    <div>
      <CustomDataTable
        url={"http://localhost:3000/mongodb/ajax/users"}
        columns={columns}
      />
    </div>
  );
}

export default MongoUserList;