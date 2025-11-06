import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid';
import FormButton from '../../common/FormButton';
import { __postApiData } from '../../../utils/api';
import AddLogin from './AddLogin';

const LoginListModal = ({ title, open, handleClose, LoginAssetId, openModalLogin }) => {
    const [state, setState] = useState({
        isLoading: false,
        adminList: [],
    });

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });

    const [editId, setEditId] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const [formData, setFormData] = useState({
        Name: '',
        PhoneNumber: '',
        Email: '',
        Address: '',
        Password: '',
        LoginAssetId: LoginAssetId,
    });

    const { isLoading, adminList } = state;

    // =================== Open / Close AddLogin Modal ===================\\
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => {
        setEditId(null);
        setFormData({
            Name: '',
            PhoneNumber: '',
            Email: '',
            Address: '',
            Password: '',
            LoginAssetId,
        });
        setOpenModal(false);
    };

    //====================== Update main modal state  ===================\\
    const updateState = (data) =>
        setState((prevState) => ({ ...prevState, ...data }));

    //========================= Universal Form Data Update ====================\\\
    const updateFormData = (eOrData) => {
        if (eOrData?.target) {
            const { name, value } = eOrData.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
        } else {
            setFormData((prev) => ({
                Name: eOrData.Name,
                Email: eOrData.Email,
                PhoneNumber: eOrData.PhoneNumber,
                Address: eOrData.Address,
            }));
        }
    };

    // ============ Edit handler======================\\
    const handleEdit = (row) => {
        setEditId(row._id);
        updateFormData(row);
        handleOpenModal();
    };

    //============== Fetch Admin List =======================\\
    const getAdminList = async () => {
        updateState({ isLoading: true });
        try {
            const res = await __postApiData(`/api/v1/admin/ZatraLoginList`, {
                LoginAssetId,
            });
            if (res?.response?.response_code === '200') {
                updateState({ adminList: res?.data?.list || [], isLoading: false });
            } else {
                updateState({ adminList: [], isLoading: false });
            }
        } catch (error) {
            updateState({ isLoading: false });
        }
    };

    useEffect(() => {
        if (LoginAssetId) getAdminList();
    }, [LoginAssetId]);
    // ====================== DataGrid columns ========================\\
    const columns = [
        {
            field: '_id',
            headerName: 'Sr. No',
            minWidth: 90,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            headerClassName: "health-table-header-style",
            renderCell: (params) => {
                const rowIndex = params.api.getSortedRowIds().indexOf(params.id);
                return (
                    paginationModel.page * paginationModel.pageSize +
                    (rowIndex % paginationModel.pageSize) +
                    1
                );
            },
        },
        {
            field: 'Name',
            headerName: 'Name',
            minWidth: 200,
            headerClassName: "health-table-header-style",
            renderCell: (params) => <span>{params.row?.Name || 'N/A'}</span>,
        },
        {
            field: 'PhoneNumber',
            headerName: 'Phone Number',
            minWidth: 200,
            headerClassName: "health-table-header-style",
            renderCell: (params) => <span>{params.row?.PhoneNumber || 'N/A'}</span>,
        },
        {
            field: 'Email',
            headerName: 'Email',
            minWidth: 200,
            headerClassName: "health-table-header-style",
            renderCell: (params) => <span>{params.row?.Email || 'N/A'}</span>,
        },
        {
            field: 'action',
            headerName: 'Action',
            headerClassName: "health-table-header-style",
            minWidth: 150,
            renderCell: (params) => (
                <button
                    className="text-blue-600 underline hover:text-blue-800"
                    onClick={() => handleEdit(params.row)}
                >
                    Edit
                </button>
            ),
        },
    ];

    return (
        <>
            {/* Main List Modal */}
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle className="flex justify-between items-center">
                    <span className="text-md font-semibold md:text-2xl">{title}</span>
                    <IconButton onClick={handleClose} size="small" color="error">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <Divider />
                <DialogContent className="flex flex-col">
                    <div className="flex justify-end">
                        <FormButton
                            type="button"
                            onClick={handleOpenModal}
                            variant="contained"
                        >
                            Add Admin Login
                        </FormButton>
                    </div>

                    <div className="w-full overflow-x-auto my-6">
                        <DataGrid
                            rows={adminList}
                            columns={columns}
                            loading={isLoading}
                            autoHeight
                            pagination
                            getRowId={(row) => row._id}
                            paginationModel={paginationModel}
                            onPaginationModelChange={setPaginationModel}
                            pageSizeOptions={[5, 10]}
                        />
                    </div>
                </DialogContent>
            </Dialog>

            {/* Add/Edit Login Modal */}
            <AddLogin
                openModal={openModal}
                handleCloseModal={handleCloseModal}
                LoginAssetType={openModalLogin?.type === "admin" ? "68b93a4d257a82004b4388cb" : openModalLogin?.type === "asset_master2" ? "68b93a66257a82004b4388cd" : openModalLogin?.type ==="Supplier"? "68b93a73257a82004b4388ce" : "68b93a5d257a82004b4388cc"}
                LoginAssetRef={openModalLogin?.type === "admin" ? "zatra_master" :  ["asset_master2","Supplier"].includes(openModalLogin?.type) ? "asset_master2" : "admin_lookups"}
                LoginAssetId={LoginAssetId}
                editId={editId}
                formData={formData}
                updateData={updateFormData}
                refreshList={getAdminList}
            />
        </>
    );
};

export default LoginListModal;