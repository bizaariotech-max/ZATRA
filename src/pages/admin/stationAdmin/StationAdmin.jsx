import React, { useEffect, useState } from 'react'
import SectionHeader from '../../../components/common/SectionHeader'
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { DataGrid } from '@mui/x-data-grid';
import { __getCommenApiDataList } from '../../../utils/api/commonApi';
import LoginListModal from '../../../components/admin/common/LoginListModal';

const StationAdmin = () => {
    const [brandTypeList, setBrandTypeList] = useState([]);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [isLoading, setIsLoading] = useState(false);
    const [isShowLoginPopup, setIsShowLoginPopup] = useState(false);
    const [LoginAssetId, setLoginAssetId] = useState(null);
    const columns = [
        {
            field: "_id", headerName: "Sr. No", minWidth: 90, headerClassName: "health-table-header-style", headerAlign: "center",
            align: "center",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                const rowIndex = params.api.getSortedRowIds().indexOf(params.id);
                return paginationModel.page * paginationModel.pageSize + (rowIndex % paginationModel.pageSize) + 1;
            },
        },
        {
            field: "adminLogin",
            headerName: "Admin Login",
            headerClassName: "health-table-header-style",
            minWidth: 200,
            align: "center",
            renderCell: (params) => <span className='cursor-pointer' onClick={() => handleNewLogin(params.row)}><AddCircleTwoToneIcon color='warning' /></span>,
        },
        {
            field: "parent_lookup_name",
            headerName: "State",
            headerClassName: "health-table-header-style",
            minWidth: 200,
            renderCell: (params) => <span>{params.row?.parent_lookup_name || "N/A"}</span>,
        },
        {
            field: "lookup_value",
            headerName: "City / Station",
            headerClassName: "health-table-header-style",
            minWidth: 200,
            flex: 1,
            renderCell: (params) => <span>{params.row?.lookup_value || "N/A"}</span>,
        },
    ];

    const handleNewLogin = (data) => {
      setLoginAssetId(data?._id)
      setIsShowLoginPopup(true)
     };

    const handleClose=() =>{
        setLoginAssetId(null)
        setIsShowLoginPopup(false)
    }
    ///========== fetch data from api ============\\
    const fetchData = async (lookupTypes, stateKey, parent_lookup_id) => {
        try {
            setIsLoading(true);
            const data = await __getCommenApiDataList({
                lookup_type: lookupTypes,
                parent_lookup_id: parent_lookup_id || null,
            })
            setBrandTypeList(data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error(`Error fetching ${stateKey}:`, error);
        }
    }

    useEffect(() => {
        fetchData(['station'],);
    }, []);
    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="City / Station Admin Login"
                description="Create logins for the the city / station Administrators's login for adding /managing Destinations /Assets."
            />
            <div className="bg-white pb-2 rounded-xl my-16 ">
                <DataGrid
                    rows={brandTypeList}
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
            <LoginListModal title="City / Station Admin Login" LoginAssetId={LoginAssetId} open={isShowLoginPopup} handleClose={handleClose} />
        </div>
    )
}

export default StationAdmin