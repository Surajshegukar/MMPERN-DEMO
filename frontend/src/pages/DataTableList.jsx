import React, { useState, useMemo } from 'react';
import DataTable from 'react-data-table-component';
// import './DataTableStyles.css'; // Import the CSS file

const DataTableList = (data , columns) => {
    
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);


  // Custom styles for the data table
  const customStyles = {
    header: {
      style: {
        minHeight: '56px',
        paddingLeft: '16px',
        paddingRight: '8px',
      },
    },
    headRow: {
      style: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#ffffff',
        fontWeight: '600',
        fontSize: '14px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      },
    },
    headCells: {
      style: {
        color: '#ffffff',
        fontSize: '13px',
        fontWeight: '600',
        paddingLeft: '16px',
        paddingRight: '16px',
      },
    },
    rows: {
      style: {
        fontSize: '14px',
        fontWeight: '400',
        color: '#2c3e50',
        '&:hover': {
          backgroundColor: '#f8f9ff',
          transform: 'translateY(-1px)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }
      },
      stripedStyle: {
        backgroundColor: '#fafbfc'
      }
    },
    cells: {
      style: {
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingTop: '12px',
        paddingBottom: '12px'
      },
    },
    pagination: {
      style: {
        borderTop: '1px solid #e1e8ed',
        minHeight: '56px'
      },
      pageButtonsStyle: {
        borderRadius: '6px',
        height: '32px',
        padding: '0 12px',
        margin: '0 4px',
        cursor: 'pointer'
      }
    }
  };

  return (
    <div className="data-table-wrapper mt-3">
            
      <DataTable
        title="Employee Directory"
        columns={columns}
        data={data}
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        persistTableHead
        striped
        highlightOnHover
        responsive
        customStyles={customStyles}
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 20, 50]}
        noDataComponent="No Data found"
        defaultSortFieldId="name"
        searchable     
      />
    </div>
  );
};

export default DataTableList;