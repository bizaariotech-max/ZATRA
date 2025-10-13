import { DataGrid } from '@mui/x-data-grid';
import React, { memo, useState } from 'react'
import { CircularProgress } from "@mui/material";
const renderSerialNumber = (params, paginationModel) => {
  const rowIndex = params.api.getSortedRowIds().indexOf(params.id);
  return paginationModel.page * paginationModel.pageSize + (rowIndex % paginationModel.pageSize) + 1;
};
const StationContactList =  memo(({ contactList = [], isLoading = false , paginationModel, setPaginationModel }) => {

  const columns = [
    {
      field: "_id",
      headerName: "Sr. No",
      minWidth: 80,
      headerAlign: "center",
      headerClassName: "health-table-header-style",
      align: "center",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => renderSerialNumber(params, paginationModel),
    },
    {
      field: "ContactTypeId",
      headerName: "Contact Type",
      headerClassName: "health-table-header-style",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <span>{params.row?.ContactTypeId?.lookup_value || "N/A"}</span>
      ),
    },
    {
      field: "ContactName",
      headerName: "Contact Name",
      headerClassName: "health-table-header-style",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => <span>{params.row?.ContactName || "N/A"}</span>,
    },
    {
      field: "Designation",
      headerName: "Designation",
      headerClassName: "health-table-header-style",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => <span>{params.row?.Designation || "N/A"}</span>,
    },
    {
      field: "Phone",
      headerName: "Phone",
      headerClassName: "health-table-header-style",
      minWidth: 130,
      flex: 1,
      renderCell: (params) => <span>{params.row?.Phone || "N/A"}</span>,
    },
    {
      field: "Email",
      headerName: "Email",
      headerClassName: "health-table-header-style",
      minWidth: 180,
      flex: 1,
      renderCell: (params) => <span>{params.row?.Email || "N/A"}</span>,
    },
    {
      field: "Website",
      headerName: "Website",
      headerClassName: "health-table-header-style",
      minWidth: 150,
      flex: 1,
      renderCell: (params) =>
        params.row?.Website ? (
          <a
            href={params.row.Website}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            {params.row.Website}
          </a>
        ) : (
          "N/A"
        ),
    },
    {
      field: "AddressLine1",
      headerName: "Address Line 1",
      headerClassName: "health-table-header-style",
      minWidth: 180,
      flex: 1,
      renderCell: (params) => <span>{params.row?.AddressLine1 || "N/A"}</span>,
    },
    {
      field: "AddressLine2",
      headerName: "Address Line 2",
      headerClassName: "health-table-header-style",
      minWidth: 180,
      flex: 1,
      renderCell: (params) => <span>{params.row?.AddressLine2 || "N/A"}</span>,
    },
    {
      field: "PostalCode",
      headerName: "Postal Code",
      headerClassName: "health-table-header-style",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => <span>{params.row?.PostalCode || "N/A"}</span>,
    },
    {
      field: "Image",
      headerName: "Image",
      headerClassName: "health-table-header-style",
      minWidth: 120,
      flex: 1,
      renderCell: (params) =>
        params.row?.Image ? (
          <img
            src={params.row.Image}
            alt="Contact"
            className="w-12 h-12 rounded object-cover"
          />
        ) : (
          "N/A"
        ),
    },
  ];

  return (
    <div className="bg-white rounded-xl p-4 mt-6 shadow-sm">
      {isLoading ? (
        <div className="flex justify-center py-10">
          <CircularProgress />
        </div>
      ) : (
        <DataGrid
          rows={contactList}
          columns={columns}
          getRowId={(row) => row._id || row.Phone || Math.random()}
          autoHeight
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
        />
      )}
    </div>
  );
});


export default StationContactList