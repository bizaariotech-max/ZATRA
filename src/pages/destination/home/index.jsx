import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext';
import { __postApiData } from '../../../utils/api';
import qrCode from "../../../assets/images/home/qr-code-svgrepo-com.png";
import qualityMedal from "../../../assets/images/home/quality-medal-svgrepo-com.png";
import layout from "../../../assets/images/home/layout-svgrepo-com.png";
import address from "../../../assets/images/home/address.png";
import profile from "../../../assets/images/home/profile-svgrepo-com.png";
import cashMoney from "../../../assets/images/home/cash-money-svgrepo-com.png";
import link from "../../../assets/images/home/link-svgrepo-com.png";
import medical from "../../../assets/images/home/medical.png";
import domain from "../../../assets/images/home/domain-registration-website-svgrepo-com.png";
import globe from "../../../assets/images/home/cdn-globe-locations-svgrepo-com.png";
import calendar from "../../../assets/images/home/calendar-svgrepo-com.png";
import ticket from "../../../assets/images/home/ticket-svgrepo-com.png";
import announcement from "../../../assets/images/home/announcement-svgrepo-com.png";
import contact from "../../../assets/images/home/social-contact-svgrepo-com.png";
import FormContainer from '../../../components/destination/FormContainer';
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone';
const index = () => {
    const { userDetails } = useAuth();
    const [state, setState] = useState({
        list: [],
        isLoading: false,
    });
    const [open, setOpen] = useState(false);
    const [selectedForm, setSelectedForm] = useState(null);
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { list, isLoading } = state;
    const item = list[0] || {};
    const handleGetData = async () => {
        try {

            updateState({ isLoading: true });
            const res = await __postApiData("/api/v1/app/DestinationList", {
                AssetId: userDetails?.LoginAssetId,
                page: 1,
                limit: 50,
            });
            if (res?.response?.response_code == "200") {
                updateState({ list: res.data?.list });
            }
        } catch (error) {
            updateState({ isLoading: false });
            console.error("Error fetching data:", error);
        } finally {
            updateState({ isLoading: false });
        }
    };
    useEffect(() => {
        handleGetData();
    }, []);

    const cardItems = [
        {
            img: qrCode,
            name: "Generate QR Code",
            form: "vd",
            isVerified: !!item.QRCode,
        },
        {
            img: qualityMedal,
            name: "Incorporation Details",
            form: "id",
            isVerified:
                item.LegalEntityTypeId ||
                    item.RegistrationBodyId ||
                    item.RegistrationNumber ||
                    item.GST ||
                    item.PAN
                    ? true
                    : false,
        },
        {
            img: layout,
            name: "Layout Plan",
            form: "lp",
            isVerified:
                item.Layout?.filter(
                    (ch) =>
                        ch?.LaneFloorNumber ||
                        ch?.LaneFloorName ||
                        ch?.HallNumber ||
                        ch?.HallName ||
                        ch?.NoOfBoots
                )?.length > 0,
        },
        {
            img: address,
            name: "Address",
            form: "ad",
            isVerified:
                item.AddressLine1 ||
                    item.AddressLine2 ||
                    item.PostalCode ||
                    item.LaneFloorName ||
                    item.LaneFloorNumber ||
                    item.HallNumber ||
                    item.HallName ||
                    item.AllocationBoothNumber
                    ? true
                    : false,
        },
        {
            img: profile,
            name: "Profile Description",
            form: "pd",
            isVerified:
                item.Logo ||
                    item.ProductImages?.length > 0 ||
                    item.ProductVideos?.length > 0 ||
                    item.ShortDescription ||
                    item.LongDescription
                    ? true
                    : false,
        },
        {
            img: cashMoney,
            name: "Business Details",
            form: "bd",
            isVerified:
                item.IndustrySectorId ||
                    item.SubIndustrySectorId ||
                    item.AssetType ||
                    item.MinInvestments ||
                    item.AssuredRois
                    ? true
                    : false,
        },
        {
            img: link,
            name: "Business Mapping",
            form: "bm",
            isVerified:
                item.BrandsMapping?.length > 0 ||
                    item.ODOPMapping?.length > 0 ||
                    item.ExportsMapping?.length > 0 ||
                    item.LocalCropsMapping?.length > 0 ||
                    item.LocalProductsMapping?.length > 0 ||
                    item.LocalSweetsMapping?.length > 0 ||
                    item.LocalSnacksMapping?.length > 0 ||
                    item.LocalCuisineMapping?.length > 0 ||
                    item.LocalSpicesMapping?.length > 0 ||
                    item.LocalFoodsMapping?.length > 0
                    ? true
                    : false,
        },
        {
            img: medical,
            name: "Medical Specialities",
            form: "ms",
            isVerified: item.MedicalSpecialities?.length > 0 ? true : false,
        },
        {
            img: domain,
            name: "Social Media Assets",
            form: "sma",
            isVerified:
                item.LiveFeedUrl ||
                    item.WebSiteUrl ||
                    item.WikipediaUrl ||
                    item.FacebookPageUrl ||
                    item.InstagramPageUrl ||
                    item.LinkedinPageUrl ||
                    item.YouTubeChannelUrl ||
                    item.WhatsAppCommunityUrl ||
                    item.TelegramUrl
                    ? true
                    : false,
        },
        {
            img: globe,
            name: "Amenities",
            form: "am",
            isVerified:
                item.Amenities?.filter((am) => am?._id)?.length > 0 ? true : false,
        },
        {
            img: calendar,
            name: "Schedule",
            form: "sd",
            isVerified:
                item.BtvFrom ||
                    item.BtvTo ||
                    item.WeeklyOff?.length > 0 ||
                    item.OpeningTime ||
                    item.ClosingTime ||
                    item.MbtFrom ||
                    item.MbtTo ||
                    item.SpecialDarshansName ||
                    item.SpecialDarshansTime ||
                    item.Insturctions ||
                    item.NoOfVisitors ||
                    item.Advisory
                    ? true
                    : false,
        },
        {
            img: ticket,
            name: "Registration Fee",
            form: "rf",
            isVerified:
                item.RegistrationFeeCategoryAmount?.filter(
                    (ch) => ch?.FeeCategory || ch?.Amount
                )?.length > 0 ||
                    item.FeeCollectionLink ||
                    item.PaymentOrCode ||
                    item.AccountName ||
                    item.BankName ||
                    item.IFSCcode ||
                    item.AccountNumber
                    ? true
                    : false,
        },
        {
            img: announcement,
            name: "Call to Action",
            form: "ca",
            isVerified:
                item.CallToAction?.filter(
                    (ch) =>
                        ch?.CallToActionType ||
                        ch?.URL ||
                        ch?.Name ||
                        ch?.ContactNumber ||
                        ch?.EmailAddress
                )?.length > 0
                    ? true
                    : false,
        },
        {
            img: contact,
            name: "Contact Information",
            form: "ci",
            isVerified:
                item.ContactName || item.ContactPhoneNumber || item.ContactEmailAddress
                    ? true
                    : false,
        },
    ];
    return (
        <div className="m-4 p-4 shadow-card rounded-lg">
            <h1 className="text-xl font-semibold mb-4">{item?.AssetName || "Dashboard"}</h1>

            {/* ✅ Grid of cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {cardItems.map((ci, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            setSelectedForm(ci)
                            setOpen(true);
                        }} // ✅ set clicked card
                        className={`relative border p-4 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all hover:shadow-md ${selectedForm?.form === ci.form ? "bg-blue-50 border-blue-500" : ""
                            }`}
                    >
                        <img src={ci.img} alt={ci.name} className="w-12 h-12" />
                        <h3 className="text-sm mt-2">{ci.name}</h3>
                        <span className={`${ci.isVerified ? "text-green-500" : "text-red-500"} absolute top-2 right-2`}>
                            {ci.isVerified && <VerifiedTwoToneIcon color='successs' />}
                        </span>
                    </div>
                ))}
            </div>

            {/* ✅ Conditionally show form below */}
            {selectedForm && (
                <FormContainer
                    open={open}
                    formKey={selectedForm.form}
                    title={selectedForm.name}
                    item={item}
                    onClose={() => {
                        setSelectedForm(null)
                        setOpen(false);
                    }}
                    reload={handleGetData}
                />
            )}
        </div>

    )
}

export default index
