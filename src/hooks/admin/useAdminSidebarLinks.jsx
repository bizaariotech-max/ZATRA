import { BrickWall, LayoutDashboard, Ruler, Settings2, Trello } from "lucide-react";
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone';
import FactoryTwoToneIcon from '@mui/icons-material/FactoryTwoTone';
import HolidayVillageTwoToneIcon from '@mui/icons-material/HolidayVillageTwoTone';
import BloodtypeTwoToneIcon from '@mui/icons-material/BloodtypeTwoTone';
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone';
import LocationCityTwoToneIcon from '@mui/icons-material/LocationCityTwoTone';
import CurrencyRupeeTwoToneIcon from '@mui/icons-material/CurrencyRupeeTwoTone';
import SupportAgentTwoToneIcon from '@mui/icons-material/SupportAgentTwoTone';
import CorporateFareTwoToneIcon from '@mui/icons-material/CorporateFareTwoTone';
import TravelExploreTwoToneIcon from '@mui/icons-material/TravelExploreTwoTone';
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone';
import ConnectWithoutContactTwoToneIcon from '@mui/icons-material/ConnectWithoutContactTwoTone';
import AppRegistrationTwoToneIcon from '@mui/icons-material/AppRegistrationTwoTone';
import LocalMallTwoToneIcon from '@mui/icons-material/LocalMallTwoTone';
import FireTruckIcon from '@mui/icons-material/FireTruck';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import AssistantDirectionTwoToneIcon from '@mui/icons-material/AssistantDirectionTwoTone';
const useAdminSidebarLinks = (role) => {
    // Links for Service Manager
    const serviceManagerLinks = [
        { id: "1", icon: <LayoutDashboard />, label: "Station-dashboard", link: "/station-dashboard", dock: true },
        {
            id: "2",
            icon: <Settings2 />,
            label: "City/Station Contacts",
            link: "/station-dashboard/city-station-contacts",
            dock: false,
            subList: [
                { id: "2-1", path: "/station-dashboard/city-station-contacts/local-representative", title: "Local Representative" },
                { id: "2-2", path: "/station-dashboard/city-station-contacts/administrative", title: "Administrative" },
                { id: "2-3", path: "/station-dashboard/city-station-contacts/station-indicator", title: "City/Station Indicator" },
                { id: "2-4", path: "/station-dashboard/city-station-contacts/station-specialities", title: "City/Station Specialities" },
                { id: "2-5", path: "/station-dashboard/city-station-contacts/industry-associate", title: "Industry Associations" },
                { id: "2-6", path: "/station-dashboard/city-station-contacts/tourist-helpline", title: "Tourist Helpline" },
                { id: "2-7", path: "/station-dashboard/city-station-contacts/govt-scheme", title: "Govt. Schemes / Policies" },
                { id: "2-8", path: "/station-dashboard/city-station-contacts/investment-opportunities", title: "Investment Opportunities" },
            ],
        },
        { id: "3", icon: <AssistantDirectionTwoToneIcon />, link: "/station-dashboard/destinations", label: "Destinations", dock: true },
    ];

    // Links for Super Admin
    const superAdminLinks = [
        { id: "1", icon: <LayoutDashboard />, label: "Dashboard", link: "/admin", dock: true },
        {
            id: "2",
            icon: <Settings2 />,
            label: "Configuration",
            link: "/admin/configuration",
            dock: false,
            subList: [
                { id: "2-1", icon: <Ruler />, path: "/admin/configuration/unit-type", title: "Unit Type" },
                { id: "2-2", icon: <BrickWall />, path: "/admin/configuration/legal-entity-type", title: "Legal Entity Type" },
                { id: "2-3", icon: <Trello />, path: "/admin/configuration/brand-type", title: "Brand Type" },
                { id: "2-4", icon: <FactoryTwoToneIcon />, path: "/admin/configuration/industry-sector", title: "Industry/Sector" },
                { id: "2-5", icon: <HolidayVillageTwoToneIcon />, path: "/admin/configuration/sub-sector", title: "Sub Sector" },
                { id: "2-6", icon: <VerifiedUserTwoToneIcon />, path: "/admin/configuration/product-category", title: "Product Category" },
                { id: "2-7", icon: <VerifiedUserTwoToneIcon />, path: "/admin/configuration/product-sub-category", title: "Product Sub Category" },
                { id: "2-8", icon: <FireTruckIcon />, path: "/admin/configuration/panchtatva-level-1", title: "Panchtatva Level 1" },
                { id: "2-9", icon: <FireTruckIcon />, path: "/admin/configuration/panchtatva-level-2", title: "Panchtatva Level 2" },
                { id: "2-10", icon: <FireTruckIcon />, path: "/admin/configuration/panchtatva-level-3", title: "Panchtatva Level 3" },
                { id: "2-11", icon: <CorporateFareTwoToneIcon />, path: "/admin/configuration/oraganizer-type", title: "Oraganizer Type" },
                { id: "2-12", icon: <TravelExploreTwoToneIcon />, path: "/admin/configuration/zatra-type", title: "Zatra Type" },
                { id: "2-13", icon: <VerifiedTwoToneIcon />, path: "/admin/configuration/verification-checklist-type", title: "Verification Checklist Type" },
                { id: "2-14", icon: <AdminPanelSettingsTwoToneIcon />, path: "/admin/configuration/verifier-name", title: "Verifier Name" },
                { id: "2-15", icon: <CoronavirusIcon />, path: "/admin/configuration/disease-type", title: "Disease Type" },
                { id: "2-16", icon: <BloodtypeTwoToneIcon />, path: "/admin/configuration/blood-group-type", title: "Blood Group Type" },
                { id: "2-17", icon: <VerifiedUserTwoToneIcon />, path: "/admin/configuration/user-kyc-type", title: "User KYC Type" },
                { id: "2-18", icon: <LocationCityTwoToneIcon />, path: "/admin/configuration/city-station", title: "City/Station" },
                { id: "2-19", icon: <ConnectWithoutContactTwoToneIcon />, path: "/admin/configuration/social-media-asset", title: "Social Media Asset" },
                { id: "2-20", icon: <VerifiedUserTwoToneIcon />, path: "/admin/configuration/establishment-type", title: "Establishment Type" },
                { id: "2-21", icon: <LocalMallTwoToneIcon />, path: "/admin/configuration/shop-type", title: "Shop Type" },
                { id: "2-22", icon: <VerifiedUserTwoToneIcon />, path: "/admin/configuration/service-package-type", title: "Service Package Type" },
                { id: "2-23", icon: <AppRegistrationTwoToneIcon />, path: "/admin/configuration/registration-fee-category", title: "Registration Fee Category" },
                { id: "2-24", icon: <SupportAgentTwoToneIcon />, path: "/admin/configuration/call-to-action-type", title: "Call To Action Type" },
                { id: "2-25", icon: <VerifiedUserTwoToneIcon />, path: "/admin/configuration/service-type", title: "Service Type" },
                { id: "2-26", icon: <CurrencyRupeeTwoToneIcon />, path: "/admin/configuration/currency", title: "Currency" },
            ],
        },
        { id: "3", icon: <VerifiedUserTwoToneIcon />, link: "/admin/station-admin", label: "Station Admin", dock: true },
        { id: "4", icon: <VerifiedUserTwoToneIcon />, link: "/admin/zatra-admin", label: "Zatra Admin", dock: true },

    ];

    //link for destination manager
    const destinationManagerLinks = [
        { id: "1", icon: <LayoutDashboard />, label: "Destination-dashboard", link: "/destination-dashboard", dock: true },
       {
            id: "2",
            icon: <Settings2 />,
            label: "Product Master",
            // link: "/destination-dashboard/product-master",
            dock: false,
            subList: [
                { id: "2-1", path: "/destination-dashboard/product-master/product-list", title: "Product List" },
            ],
        },
    ];

    if (role === "Station") {
        return serviceManagerLinks;
    }
    if (role === "Super Admin") {
        return superAdminLinks;
    }
    if (role === "Destination") {
        return destinationManagerLinks;
    }
    return [];

};

export default useAdminSidebarLinks;
