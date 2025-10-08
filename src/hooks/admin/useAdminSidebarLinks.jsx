import {BrickWall, LayoutDashboard, Ruler, Settings2, Siren, Trello } from "lucide-react";
import MedicalInformationTwoToneIcon from '@mui/icons-material/MedicalInformationTwoTone';
import HealthAndSafetyTwoToneIcon from '@mui/icons-material/HealthAndSafetyTwoTone';
import DepartureBoardTwoToneIcon from '@mui/icons-material/DepartureBoardTwoTone';
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone';
import MedicalServicesTwoToneIcon from '@mui/icons-material/MedicalServicesTwoTone';
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
const useAdminSidebarLinks = (role) => {
    // Links for Service Manager
    const serviceManagerLinks = [
        { id: "1", icon: <LayoutDashboard />, label: "Dashboard", link: "/dashboard", dock: true },
        { id: "2", icon: <HealthAndSafetyTwoToneIcon />, label: "Command Center", link: "/dashboard/command-center", dock: true },
        {
            id: "3", icon: <MedicalInformationTwoToneIcon />, label: "Fleet Management", link: "/dashboard/fleet-management", dock: false, subList: [
                { id: "3-1", icon: <MedicalInformationTwoToneIcon />, path: "/dashboard/fleet-management/driver", title: "Driver Dashboard" },
                { id: "3-2", icon: <MedicalServicesTwoToneIcon />, path: "/dashboard/fleet-management/vehicle", title: "Vehicle Dashboard" },
            ]
        },
        { id: "4", icon: <DepartureBoardTwoToneIcon />, label: "Duty Allocation", link: "/dashboard/duty-allocation", dock: true },
        { id: "5", icon: <Siren />, label: "Incident Master", link: "/dashboard/incident-master", dock: true },
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
                { id: "2-18", icon: <LocationCityTwoToneIcon  />, path: "/admin/configuration/city-station", title: "City/Station" },
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
        { id: "3", icon: <VerifiedUserTwoToneIcon />, link: "/admin/station-admin", label: "Station Admin",dock:true },
       
    ];

    if (role === "Service Manager") {
        return serviceManagerLinks;
    }
    if (role === "Super Admin") {
        return superAdminLinks;
    }
    return [];

};

export default useAdminSidebarLinks;
