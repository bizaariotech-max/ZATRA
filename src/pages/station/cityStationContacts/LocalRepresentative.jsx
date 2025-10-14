import React, { useEffect, useState } from 'react'
import SectionHeader from '../../../components/common/SectionHeader'
import StationContactForm from '../../../components/stations/StationContactForm'
import { __postApiData } from '../../../utils/api';
import { toast } from 'react-toastify';
import StationContactList from '../../../components/stations/StationContactList';
import { useAuth } from '../../../context/AuthContext';

const LocalRepresentative = () => {
    const { userDetails } = useAuth();
    const [contactList, setContactList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await __postApiData('/api/v1/admin/CityContactList', {
                page: paginationModel.page,
                limit: paginationModel.pageSize,
                search: "",
                CityId: userDetails?.StationId,
                ContactTypeId: "687756d4aa2e78aefc414a51",
            });
            if (res.response && res.response.response_code === "200") {
                setContactList(res?.data?.list || []);
            } else {
                setContactList([]);
                toast.error(res.response ? res.response?.response_message : "Failed to fetch data");
            }

        } catch (err) {
            toast.error("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="Local Representative"
                description="Add or update the required details for the local representative to keep records accurate and complete."
            />
            <StationContactForm type="localRepresentative" fetchData={fetchData} />
            <StationContactList contactList={contactList} isLoading={loading} paginationModel={paginationModel} setPaginationModel={setPaginationModel} />
        </div>
    )
}

export default LocalRepresentative