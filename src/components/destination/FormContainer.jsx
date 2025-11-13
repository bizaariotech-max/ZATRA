import {
    Dialog, DialogTitle,
    DialogContent,
    IconButton,
    Divider,
    Box,
    Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import FormButton from "../common/FormButton";
import { __getApiData, __postApiData } from "../../utils/api";
import ArrowDownwardTwoToneIcon from '@mui/icons-material/ArrowDownwardTwoTone';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
import FormInput from "../common/FormInput";
import AddressForm from "./AddressForm";
import { toast } from "react-toastify";
import { __getCommenApiDataList } from "../../utils/api/commonApi";
import ProfileDescriptionForm from "./ProfileDescriptionForm";
import BussinessDetails from "./BussinessDetails";
import BussinessMapping from "./BussinessMapping";
import MedicalSpecialties from "./MedicalSpecialties";
import SocialLinksForm from "./SocialLinksForm";
import AmenitiesForm from "./AmenitiesForm";
import ContactForm from "./ContactForm";
import CallToActionForm from "./CallToActionForm";
import RegistrationFeeForm from "./RegistrationFeeForm";
import ScheduleForm from "./ScheduleForm";

const FormContainer = ({ open, formKey, title, onClose, item, reload }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [dataList, setDataList] = useState({
        legalEntityList: [],
        registrationBodyList: [],
    });
    const { ligalEntityList, registrationBodyList } = dataList
    const [formData, setFormData] = useState({
        LegalStatusId: item?.LegalStatusId?._id || null, //Incorporation Details
        RegistrationBodyId: item?.RegistrationBodyId?._id || null,
        RegistrationNumber: item?.RegistrationNumber || "",
        GST: item?.GST || "",
        PAN: item?.PAN || "",
        Layout: item?.Layout?.length > 0 ? item?.Layout : [{       //layout deatails
            LaneFloorNumber: 0,
            LaneFloorName: "",
            HallNumber: 0,
            HallName: "",
            NoOfBoots: ""
        }],
        AddressLine1: item?.AddressLine1 || "", //Address
        AddressLine2: item?.AddressLine2 || "",
        PostalCode: item?.PostalCode || "",
        AddressGeoLocation: item?.AddressGeoLocation || {
            type: "Point",
            coordinates: [0, 0],
        },
        LaneFloorName: item?.LaneFloorName?._id || "",
        LaneFloorNumber: item?.LaneFloorNumber?._id || "",
        HallNumber: item?.HallNumber?._id || "",
        HallName: item?.HallName?._id || "",
        AllocationBoothNumber: item?.AllocationBoothNumber?._id || "",
        ProfilePicture: item?.ProfilePicture || "", //Profile Description
        PictureGallery: item?.PictureGallery || [""],
        VideoGallery: item?.ProductVideos?.concat(ProductVideosUrl)?.filter(
            (item) => item
        ) || [""],
        ProductVideoUrl: item?.ProductVideoUrl || [""],
        ShortDescription: item?.ShortDescription || "",
        LongDescription: item?.LongDescription || "",
        TimeNeededToVisit: item?.TimeNeededToVisit || "",
        QRCode: item?.QRCode || "", // Qr Code Generation
        IndustrySectorId: item?.IndustrySectorId?._id || null, //Business Details
        SubIndustrySectorId: item?.SubIndustrySectorId?._id || null,
        AssetType: item?.AssetType?._id || null,
        MinInvestments: item?.MinInvestments || "",
        AssuredRois: item?.AssuredRois || null,
        BrandsMapping: item?.BrandsMapping?.map((item) => item?._id) || [], //Business Mapping
        ODOPMapping: item?.ODOPMapping?.map((item) => item?._id) || [],
        ExportsMapping: item?.ExportsMapping?.map((item) => item?._id) || [],
        LocalCropsMapping: item?.LocalCropsMapping?.map((item) => item?._id) || [],
        LocalProductsMapping: item?.LocalProductsMapping?.map((item) => item?._id) || [],
        LocalSweetsMapping: item?.LocalSweetsMapping?.map((item) => item?._id) || [],
        LocalSnacksMapping: item?.LocalSnacksMapping?.map((item) => item?._id) || [],
        LocalCuisineMapping: item?.LocalCuisineMapping?.map((item) => item?._id) || [],
        LocalSpicesMapping: item?.LocalSpicesMapping?.map((item) => item?._id) || [],
        LocalFoodsMapping: item?.LocalFoodsMapping?.map((item) => item?._id) || [],
        VocalForLocal: item?.VocalForLocal || false,
        MedicalSpecialities: item?.MedicalSpecialities?.map( //Medical Specialities
            (item) => item?._id
        ) || [],
        LiveFeedUrl: item?.LiveFeedUrl || "", //Social Media Assets
        WebSiteUrl: item?.WebSiteUrl || "",
        WikipediaUrl: item?.WikipediaUrl || "",
        FacebookPageUrl: item?.FacebookPageUrl || "",
        InstagramPageUrl: item?.InstagramPageUrl || "",
        LinkedinPageUrl: item?.LinkedinPageUrl || "",
        YouTubeChannelUrl: item?.YouTubeChannelUrl || "",
        WhatsAppCommunityUrl: item?.WhatsAppCommunityUrl || "",
        TelegramUrl: item?.TelegramUrl || "",
        Amenities: item?.Amenities?.length > 0 ? item?.Amenities?.map((item) => ({ AmenityId: item?.AmenityId?._id, GeoLocation: item?.GeoLocation })) : [{ //Amenities
            AmenityId: null,
            GeoLocation: {
                type: "Point",
                coordinates: [0, 0],
            }
        }],
        // Registration Fee
        RegistrationFeeCategoryAmount:
            item?.RegistrationFeeCategoryAmount?.length > 0 ? item?.RegistrationFeeCategoryAmount?.map((item) => ({
                FeeCategory: item?.FeeCategory?._id,
                Amount: item?.Amount,
            })) : [{
                FeeCategory: null,
                Amount: "",
            }],
        AmenitiesProvided: item?.AmenitiesProvided || [],
        SpecialDarshansFeeCategoryAmount:item?.SpecialDarshansFeeCategoryAmount?.length > 0 ? item?.SpecialDarshansFeeCategoryAmount?.map((item) => ({
                FeeCategory: item?.FeeCategory?._id,
                Amount: item?.Amount,
            })) : [{
                FeeCategory: null,
                Amount: "",
            }],
         CameraAndShootingFeeCategoryAmount:item?.CameraAndShootingFeeCategoryAmount?.length > 0 ? item?.CameraAndShootingFeeCategoryAmount?.map((item) => ({
                FeeCategory: item?.FeeCategory?._id,
                Amount: item?.Amount,
            })) : [{
                FeeCategory: null,
                Amount: "",
            }],
        FeeCollectionLink: item?.FeeCollectionLink || "",
        PaymentOrCode: item?.PaymentOrCode || "",
        AccountName: item?.AccountName || "",
        BankName: item?.BankName?._id || null,
        IFSCcode: item?.IFSCcode || "",
        AccountNumber: item?.AccountNumber || "",
        // Schedule
        BtvFrom: item?.BtvFrom || "",
        BtvTo: item?.BtvTo || "",
        WeeklyOff: item?.WeeklyOff?.map((item) => item) || [],
        OpeningTime: item?.OpeningTime || "",
        ClosingTime: item?.ClosingTime || "",
        MbtFrom: item?.MbtFrom || "",
        MbtTo: item?.MbtTo || "",
        SpecialDarshansName: item?.SpecialDarshansName || "",
        SpecialDarshansTime: item?.SpecialDarshansTime || "",
        Insturctions: item?.Insturctions || "",
        NoOfVisitors: item?.NoOfVisitors || "",
        Advisory: item?.Advisory || null,
        AssetName: item?.AssetName || "",
        IsDestination: item?.IsDestination,
        NearbyAssetIds: item?.NearbyAssetIds?.map((ids) => ids?.id) || [],
        PanchtatvaCategoryLevel1_Id: item?.PanchtatvaCategoryLevel1_Id?._id || null,
        PanchtatvaCategoryLevel2_Id: item?.PanchtatvaCategoryLevel2_Id?._id || null,
        PanchtatvaCategoryLevel3_Id: item?.PanchtatvaCategoryLevel3_Id?._id || null,
        EstablishmentId: item?.EstablishmentId?._id || null,
        ShopType: item?.ShopType?.map((item) => item?._id) || [],
        Packages: item?.Packages || [],
        RegistrationFeeCategoryAmounts: item?.RegistrationFeeCategoryAmounts || [],
        AdminLogin: item?.AdminLogin || [],
        StationId: item?.StationId?._id || null,
        ProductCount: item?.ProductCount || 0,
        CallToAction: item?.CallToAction?.length > 0 ? item?.CallToAction?.map((item) => ({
            ...item,
            CallToActionType: item?.CallToActionType?._id,
        })) : [
            {
                CallToActionType: null,
                URL: "",
                Name: "",
                ContactNumber: "",
                EmailAddress: "",
            },
        ],
        ContactName: item?.ContactName || "", //Contact Information
        ContactPhoneNumber: item?.ContactPhoneNumber || "",
        ContactEmailAddress: item?.ContactEmailAddress || "",
        
    });


    ///=========== Fuction to generate QR Code ===========\\
    const __handleGenerateQRCode = async () => {
        try {
            const qrData = await __getApiData(`/api/v1/common/GenrateQrCode/${item?._id}`);
            if (qrData?.response?.response_code == "200") {
                updateState({
                    QRCode: qrData?.data?.full_URL
                });
            }
        } catch (error) {
            console.error("Error generating QR Code:", error);
        }
    }
    //========== function to update state dataList ============\\
    const updateStateData = (data) => setDataList((prevState) => ({ ...prevState, ...data }));

    ///========== fetch data from api ============\\
    const fetchData = async (lookupTypes, stateKey, parent_lookup_id) => {
        try {
            const data = await __getCommenApiDataList({
                lookup_type: lookupTypes,
                parent_lookup_id: parent_lookup_id || null,
            })

            if (data && Array.isArray(data) && data.length > 0) {
                updateStateData({ [stateKey]: data, });
            }
            else if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
                updateStateData({ [stateKey]: data.data, });
            } else if (data && data.list && Array.isArray(data.list) && data.list.length > 0) {
                updateStateData({ [stateKey]: data.list, });
            }
            else {
                // console.warn(`No data found for ${stateKey}:`, data);
                updateStateData({ [stateKey]: [], });
            }
        } catch (error) {
            console.error(`Error fetching ${stateKey}:`, error);
        }
    }
    useEffect(() => {
        if(formKey ==="id"){
        fetchData(["registration_body_type"], "registrationBodyList");
        fetchData(["legal_entity_type"], "ligalEntityList");
    }
    }, [])

    //=========== Fuction to update state value onchange  ===========\\
    const updateState = (data) => setFormData((prevState) => ({ ...prevState, ...data }));

    const handleChangeValue = (e) => {
        const { name, value } = e.target;
        updateState({ [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData, AssetId: item?._id || null };
            setIsLoading(true);
            const res = await __postApiData("/api/v1/admin/AddEditNewAsset", payload);
            if (res.response && res.response.response_code === "200") {
                toast.success("Data updated successfully")
                onClose();
                reload();
            } else {
                console.log(res);
                toast.error(res.response?.response_message || res.response?.response_message?.error || "Failed to add Data");
            }
            setIsLoading(false);
        } catch (error) {
            console.error("Failed to submit:", error);
            setIsLoading(false);
        }
    }

    const renderForm = () => {
        switch (formKey) {
            case "vd":
                return <>
                    <div className="flex flex-col w-full gap-2">
                        <label htmlFor={formKey?.name} className="text-base font-semibold">
                            {formKey?.name}
                        </label>
                        {!formData?.QRCode ? (<>
                            <span>
                                No QR Code Available
                            </span>
                            <FormButton type="button" onClick={__handleGenerateQRCode} >Generate</FormButton>
                        </>) : (<>
                            <div className="p-4 border rounded-md flex flex-col items-center">
                                <div className="w-full flex items-center justify-center">
                                    <img src={formData?.QRCode} alt="QR Code" className="w-full md:w-96 h-48 object-contain" />
                                </div>
                                <div className="flex flex-col md:flex-row gap-4 mt-4">
                                    <a href={formData?.QRCode} download className="text-blue-500 border border-green-400 px-4 py-2 rounded-md"><ArrowDownwardTwoToneIcon /> Download QR Code</a>
                                    <div className="mt-2 md:mt-0 border border-orange-400 px-4 py-2 rounded-md">
                                        <ShareTwoToneIcon /> Share QR Code
                                    </div>
                                </div>
                            </div>
                        </>)}
                    </div>
                </>;
            case "id":
                return <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                            label="Legal Status"
                            name="LegalStatusId"
                            type="select"
                            value={formData?.LegalStatusId}
                            onChange={handleChangeValue}
                            options={ligalEntityList}
                        />
                        <FormInput
                            label="Registration Body"
                            type="select"
                            name="RegistrationBodyId"
                            value={formData?.RegistrationBodyId}
                            onChange={handleChangeValue}
                            options={registrationBodyList}
                        />
                        <FormInput
                            label="Registration Number"
                            name="RegistrationNumber"
                            value={formData?.RegistrationNumber}
                            onChange={handleChangeValue}
                            placeholder={"Enter Registration Number"}
                        />
                        <FormInput
                            label="PAN Number"
                            name="PAN"
                            value={formData?.PAN}
                            onChange={handleChangeValue}
                            placeholder={"Enter Pan Number"}
                        />
                        <FormInput
                            label="GST Number"
                            name="GST"
                            value={formData?.GST}
                            onChange={handleChangeValue}
                            placeholder={"Enter GST"}
                        />

                    </div>
                    </>;
            case "lp":
                return <>
                    <div className="flex flex-col">
                        {formData.Layout?.map((layoutItem, index) => (
                            <div
                                key={index}
                                className="p-4 border rounded-md bg-white shadow-sm flex flex-col gap-3"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormInput
                                        label="Lane/Floor Number"
                                        name="LaneFloorNumber"
                                        value={layoutItem.LaneFloorNumber}
                                        onChange={(e) => {
                                            const updatedLayouts = [...formData.Layout];
                                            updatedLayouts[index].LaneFloorNumber = e.target.value;
                                            updateState({ Layout: updatedLayouts });
                                        }}
                                        placeholder="Enter Lane / Floor Number"
                                    />
                                    <FormInput
                                        label="Lane/Floor Name"
                                        name="LaneFloorName"
                                        value={layoutItem.LaneFloorName}
                                        onChange={(e) => {
                                            const updatedLayouts = [...formData.Layout];
                                            updatedLayouts[index].LaneFloorName = e.target.value;
                                            updateState({ Layout: updatedLayouts });
                                        }}
                                        placeholder="Enter Lane/Floor  Name"
                                    />
                                    <FormInput
                                        label="Hall Number"
                                        name="HallNumber"
                                        value={layoutItem.HallNumber}
                                        onChange={(e) => {
                                            const updatedLayouts = [...formData.Layout];
                                            updatedLayouts[index].HallNumber = e.target.value;
                                            updateState({ Layout: updatedLayouts });
                                        }}
                                        placeholder="Enter Hall Number"
                                    />
                                    <FormInput
                                        label="Hall Name"
                                        name="HallName"
                                        value={layoutItem.HallName}
                                        onChange={(e) => {
                                            const updatedLayouts = [...formData.Layout];
                                            updatedLayouts[index].HallName = e.target.value;
                                            updateState({ Layout: updatedLayouts });
                                        }}
                                        placeholder="Enter Hall Name"
                                    />
                                    <FormInput
                                        label="Number Of Booth"
                                        name="NoOfBoots"
                                        inputMode={"numeric"}
                                        value={layoutItem.NoOfBoots}
                                        onChange={(e) => {
                                            const updatedLayouts = [...formData.Layout];
                                            updatedLayouts[index].NoOfBoots = e.target.value;
                                            updateState({ Layout: updatedLayouts });
                                        }}
                                        placeholder="Enter Number of Booths in each Hall"
                                    />
                                </div>

                                {/* Remove Button */}
                                {formData.Layout.length > 1 && (
                                    <div className="flex justify-end">
                                        <Button
                                            type="button"
                                            color="error"
                                            variant="outlined"
                                            onClick={() => {
                                                const updatedLayouts = formData?.Layout?.filter(
                                                    (_, i) => i !== index
                                                );
                                                updateState({ Layout: updatedLayouts });
                                            }}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Add More Button */}
                        <div className="flex justify-start mt-3">
                            <Button
                                type="button"
                                color="success"
                                variant="outlined"
                                onClick={() => {
                                    const newLayout = {
                                        LaneFloorNumber: 0,
                                        LaneFloorName: "",
                                        HallNumber: 0,
                                        HallName: "",
                                        NoOfBoots: 0,
                                    };
                                    updateState({ Layout: [...formData.Layout, newLayout] });
                                }}
                            >
                                + Add More
                            </Button>
                        </div>
                    </div>
                </>;
            case "ad":
                return <>
                    <AddressForm
                        initialAddress={{
                            AddressLine1: formData.AddressLine1,
                            AddressLine2: formData.AddressLine2,
                            PostalCode: formData.PostalCode,
                            AddressGeoLocation: formData.AddressGeoLocation,
                            LaneFloorName: formData.LaneFloorName,
                            LaneFloorNumber: formData.LaneFloorNumber,
                            HallNumber: formData.HallNumber,
                            HallName: formData.HallName,
                            AllocationBoothNumber: formData.AllocationBoothNumber,
                        }}
                        onChange={(updatedAddress) => updateState(updatedAddress)}
                    />
                </>;
            case "pd":
                return <>
                    <ProfileDescriptionForm
                        initialProfile={{
                            ProfilePicture: formData.ProfilePicture,
                            PictureGallery: formData.PictureGallery,
                            VideoGallery: formData.VideoGallery,
                            ProductVideoUrl: formData.ProductVideoUrl,
                            ShortDescription: formData.ShortDescription,
                            LongDescription: formData.LongDescription,
                            TimeNeededToVisit: formData.TimeNeededToVisit,
                        }}
                        onChange={(updatedProfile) => updateState(updatedProfile)}
                    />
                </>;
            case "bd":
                return <>
                    <BussinessDetails
                        initialBusinessDetails={{
                            IndustrySectorId: formData.IndustrySectorId,
                            SubIndustrySectorId: formData.SubIndustrySectorId,
                            AssetType: formData.AssetType,
                            MinInvestments: formData.MinInvestments,
                            AssuredRois: formData.AssuredRois,
                        }} onChange={(updatedBusinessDetails) => updateState(updatedBusinessDetails)} />
                </>;
            case "bm":
                return <>
                    <BussinessMapping StationId={formData.StationId} initialData={{
                        BrandsMapping: formData.BrandsMapping,
                        ODOPMapping: formData.ODOPMapping,
                        ExportsMapping: formData.ExportsMapping,
                        LocalCropsMapping: formData.LocalCropsMapping,
                        LocalProductsMapping: formData.LocalProductsMapping,
                        LocalSweetsMapping: formData.LocalSweetsMapping,
                        LocalSnacksMapping: formData.LocalSnacksMapping,
                        LocalCuisineMapping: formData.LocalCuisineMapping,
                        LocalSpicesMapping: formData.LocalSpicesMapping,
                        LocalFoodsMapping: formData.LocalFoodsMapping,
                        VocalForLocal: formData.VocalForLocal,
                    }}
                        onChange={(updatedBussinessMapping) => updateState(updatedBussinessMapping)}
                    />
                </>;
            case "ms":
                return <>
                    <MedicalSpecialties
                        initialMedicalSpecialties={formData.MedicalSpecialities} onChange={(updatedMedicalSpecialties) => updateState(updatedMedicalSpecialties)} />
                </>;
            case "sma":
                return <>
                    <SocialLinksForm initialLinks={{
                        LiveFeedUrl: formData.LiveFeedUrl,
                        WebSiteUrl: formData.WebSiteUrl,
                        WikipediaUrl: formData.WikipediaUrl,
                        FacebookPageUrl: formData.FacebookPageUrl,
                        InstagramPageUrl: formData.InstagramPageUrl,
                        TwitterPageUrl: formData.TwitterPageUrl,
                        YouTubeChannelUrl: formData.YouTubeChannelUrl,
                        WhatsAppCommunityUrl: formData.WhatsAppCommunityUrl,
                        LinkedinPageUrl: formData.LinkedinPageUrl,
                        TelegramUrl: formData.TelegramUrl,
                    }}

                        onChange={(updatedSocialLinks) => updateState(updatedSocialLinks)} />
                </>;
            case "am":
                return <>
                    <AmenitiesForm initialAmenities={formData.Amenities} onChange={(updatedAmenities) => updateState(updatedAmenities)} />
                </>;
            case "sd":
                return <>
                    <ScheduleForm initialSchedule={{
                        BtvFrom: formData.BtvFrom,
                        BtvTo: formData.BtvTo,
                        WeeklyOff: formData.WeeklyOff,
                        OpeningTime: formData.OpeningTime,
                        ClosingTime: formData.ClosingTime,
                        MbtFrom: formData.MbtFrom,
                        MbtTo: formData.MbtTo,
                        SpecialDarshansName: formData.SpecialDarshansName,
                        SpecialDarshansTime: formData.SpecialDarshansTime,
                        Insturctions: formData.Insturctions,
                        NoOfVisitors: formData.NoOfVisitors,
                        Advisory: formData.Advisory,
                    }}
                        onChange={(updatedSchedule) => updateState(updatedSchedule)}
                    />
                </>;
            case "rf":
                return <>
                    <RegistrationFeeForm initialFee={{
                        RegistrationFeeCategoryAmount: formData.RegistrationFeeCategoryAmount,
                        FeeCollectionLink: formData.FeeCollectionLink,
                        AccountName: formData.AccountName,
                        BankName: formData.BankName,
                        IFSCcode: formData.IFSCcode,
                        AccountNumber: formData.AccountNumber,
                        AmenitiesProvided: formData.AmenitiesProvided,
                        SpecialDarshansFeeCategoryAmount: formData.SpecialDarshansFeeCategoryAmount,
                        CameraAndShootingFeeCategoryAmount: formData.CameraAndShootingFeeCategoryAmount,
                    }}
                        onChange={(updatedRegistrationFee) => updateState(updatedRegistrationFee)}
                    />
                </>;
            case "ca":
                return <>
                    <CallToActionForm
                        initialCallToAction={formData?.CallToAction}
                        onChange={(updatedCallToAction) => updateState({ CallToAction: updatedCallToAction })}
                    />
                </>;
            case "ci":
                return <>
                    <ContactForm initialContact={{
                        ContactName: formData.ContactName,
                        ContactEmailAddress: formData.ContactEmailAddress,
                        ContactPhoneNumber: formData.ContactPhoneNumber,
                    }} onChange={(updatedContact) => updateState(updatedContact)} />
                </>;
            default:
                return <div>No form found.</div>;
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
            PaperProps={{
                sx: { borderRadius: 3, backgroundColor: "#f9fafb", boxShadow: 5 },
            }}
        >
            {/* Header */}
            <DialogTitle
                sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
                <span style={{ fontWeight: 600, fontSize: "1.25rem" }}>
                    Edit {title}
                </span>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <Divider />

            {/* Content */}
            <DialogContent>
                <form onSubmit={handleSubmit} >
                    <Box sx={{ mt: 2 }}>{renderForm()}</Box>
                    <div className="mt-4 flex items-center ">
                        <FormButton type="submit">Save & Update</FormButton>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default FormContainer;
