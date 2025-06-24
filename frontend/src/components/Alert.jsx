import React from 'react'

function Alert({message}) {
  return (
    <div
              className={`alert ${
                message.includes("Error") || message.includes("Network")
                  ? "alert-danger"
                  : "alert-success"
              }`}
              style={{
                margin: "10px 0",
                padding: "10px",
                borderRadius: "4px",
                backgroundColor:
                  message.includes("Error") || message.includes("Network")
                    ? "#f8d7da"
                    : "#d4edda",
                color:
                  message.includes("Error") || message.includes("Network")
                    ? "#721c24"
                    : "#155724",
                border: `1px solid ${
                  message.includes("Error") || message.includes("Network")
                    ? "#f5c6cb"
                    : "#c3e6cb"
                }`,
              }}
            >
              {message}
            </div>
  )
}

export default Alert