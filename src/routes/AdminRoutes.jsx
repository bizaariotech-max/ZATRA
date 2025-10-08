import { Route, Routes } from "react-router-dom";
import AdminConfigOutlet from "../pages/admin/configrations/AdminConfigOutlet";
import UnitType from "../pages/admin/configrations/UnitType";
import ErrorPage from "../pages/ErrorPage";
import AdminLayout from "../layouts/AdminLayout";
import Home from "../pages/admin/Home";
import LegalEntityType from "../pages/admin/configrations/LegalEntityType";
import BrandType from "../pages/admin/configrations/BrandType";
import IndustrySector from "../pages/admin/configrations/IndustrySector";
import SubSector from "../pages/admin/configrations/SubSector";
import ProductCategory from "../pages/admin/configrations/ProductCategory";
import ProductSubcategory from "../pages/admin/configrations/ProductSubcategory";
import PanchtatvaLevel1 from "../pages/admin/configrations/PanchtatvaLevel1";
import PanchtatvaLevel2 from "../pages/admin/configrations/PanchtatvaLevel2";
import PanchtatvaLevel3 from "../pages/admin/configrations/PanchtatvaLevel3";
import OrganizerType from "../pages/admin/configrations/OrganizerType";
import ZatraType from "../pages/admin/configrations/ZatraType";
import VerificationChecklistType from "../pages/admin/configrations/VerificationChecklistType";
import VerifierName from "../pages/admin/configrations/VerifierName";
import DiseaseType from "../pages/admin/configrations/DiseaseType";
import BloodGroupType from "../pages/admin/configrations/BloodGroupType";
import UserKycType from "../pages/admin/configrations/UserKycType";
import CityStation from "../pages/admin/configrations/CityStation";
import SocialMediaAssets from "../pages/admin/configrations/SocialMediaAssets";
import EstablishmentType from "../pages/admin/configrations/EstablishmentType";
import ShopType from "../pages/admin/configrations/ShopType";
import ServicePackageType from "../pages/admin/configrations/ServicePackageType";
import ServiceType from "../pages/admin/configrations/ServiceType";
import RegistrationFeeCategory from "../pages/admin/configrations/RegistrationFeeCategory";
import CallActionType from "../pages/admin/configrations/CallActionType";
import Currency from "../pages/admin/configrations/Currency";
import StationAdmin from "../pages/admin/stationAdmin/StationAdmin";

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<AdminLayout />}>
      <Route index element={<Home />} />
      <Route path="configuration/" element={<AdminConfigOutlet />}>
        <Route path="unit-type" element={<UnitType />} />
        <Route path="legal-entity-type" element={<LegalEntityType />} />
        <Route path="brand-type" element={<BrandType />} />
        <Route path="industry-sector" element={<IndustrySector />} />
        <Route path="sub-sector" element={<SubSector />} />
        <Route path="product-category" element={<ProductCategory/>} />
        <Route path="product-sub-category" element={<ProductSubcategory />} />
        <Route path="panchtatva-level-1" element={<PanchtatvaLevel1 />} />
        <Route path="panchtatva-level-2" element={<PanchtatvaLevel2 />} />
        <Route path="panchtatva-level-3" element={<PanchtatvaLevel3 />} />
        <Route path="oraganizer-type" element={<OrganizerType />} />
        <Route path="zatra-type" element={<ZatraType />} />
        <Route path="verification-checklist-type" element={<VerificationChecklistType />} />
        <Route path="verifier-name" element={<VerifierName/>} />
        <Route path="disease-type" element={<DiseaseType />} />
        <Route path="blood-group-type" element={<BloodGroupType />} />
        <Route path="user-kyc-type" element={<UserKycType />} />
        <Route path="city-station" element={<CityStation/>} />
        <Route path="social-media-asset" element={<SocialMediaAssets/>} />
        <Route path="establishment-type" element={<EstablishmentType/>} />
        <Route path="shop-type" element={<ShopType/>} />
        <Route path="service-package-type" element={<ServicePackageType/>} />
        <Route path="registration-fee-category" element={<RegistrationFeeCategory/>} />
        <Route path="call-to-action-type" element={<CallActionType/>} />
        <Route path="service-type" element={<ServiceType/>} />
        <Route path="currency" element = {<Currency/>} />


        {/* Catch-all inside configuration */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
      <Route path="station-admin" element={<StationAdmin />} />

      {/*========== Asset Master ==============*/}

      {/* Catch-all inside admin */}
      <Route path="*" element={<ErrorPage />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
