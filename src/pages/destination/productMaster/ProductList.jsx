import React, { useEffect, useState } from "react";
import { setIn, useFormik } from "formik";
import * as Yup from "yup";
import SectionHeader from "../../../components/common/SectionHeader";
import FormInput from "../../../components/common/FormInput";
import { IconButton, Button, Chip, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import FormButton from "../../../components/common/FormButton";
import { __getCommenApiDataList } from "../../../utils/api/commonApi";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import { __postApiData } from "../../../utils/api";
import { DataGrid } from "@mui/x-data-grid";
import DatagridRowAction from "../../../components/common/DatagridRowAction";
import { Popup } from "../../../components/common/Popup";
import ShortcutIcon from '@mui/icons-material/Shortcut';
import { useNavigate } from "react-router-dom";
import MyEditor from "../../../components/textEditor/MyEditor";

// ✅ Validation Schema
const ProductSchema = Yup.object({
  ProductName: Yup.string().required("Product Name is required"),
  ShortDescription: Yup.string().required("Short Description is required"),
  LongDescription: Yup.string().required("Long Description is required"),
  PanchtatvaCategoryLevel1_Id: Yup.string().required("Required"),
  PanchtatvaCategoryLevel2_Id: Yup.string().required("Required"),
  PanchtatvaCategoryLevel3_Id: Yup.string().required("Required"),
  Stations: Yup.array().of(
    Yup.object({
      StationsId: Yup.string().required("Required"),
      StationsSpecialityId: Yup.string().required("Required"),
    })
  ),
  AssetId: Yup.string().required("Asset ID is required"),
  BrandId: Yup.string().required("Brand ID is required"),
  MrpWithCurrency: Yup.array().of(
    Yup.object({
      Currency: Yup.string().required("Required"),
      MRP: Yup.string().required("Required"),
    })
  ),
  DiscountWithCurrency: Yup.array().of(
    Yup.object({
      Currency: Yup.string().required("Required"),
      Discount: Yup.string().required("Required"),
    })
  ),
  IsActive: Yup.boolean(),
});

const ProductList = () => {
  const { userDetails } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [list, setList] = useState({ data: [], loading: false });
  const [brandList, setBrandList] = useState({ data: [], loading: false });
  const [editId, setEditId] = useState(null);
  const [infotxt, setInfoTxt] = useState('');
  const navigate = useNavigate();

  const [dataList, setDataList] = useState({
    panchtatvaList: [],
    panchtatvaSubList: [],
    panchtatvaSubSubList: [],
    StationsSpecialityList: [],
    CurrencyList: [],
    StationList: [],
  });
  const { panchtatvaList, panchtatvaSubList, panchtatvaSubSubList, StationsSpecialityList, CurrencyList, StationList } = dataList;
  /// ========== function to get the list of product ============\\
  const getProductList = async () => {
    try {
      setList((prev) => ({ ...prev, loading: true }));
      const response = await __postApiData("/api/v1/admin/listProducts");
      setList({
        loading: false,
        data: response.data?.list || [],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setList({
        loading: false,
        data: [],
      });
    }
  }

  const getBrandList = async () => {
    try {
      setBrandList((p) => ({ ...p, loading: true }));
      const res = await __postApiData("/api/v1/admin/listBrands", { AssetId: userDetails?.LoginAssetId });
      setBrandList({
        loading: false,
        data: res?.data?.list || [],
      });
    } catch (err) {
      toast.error("Failed to fetch brands");
      setBrandList({ loading: false, data: [] });
    }
  };
  //============ Formik initailization and submit function ============//
  const formik = useFormik({
    initialValues: {
      ProductName: "",
      ShortDescription: "",
      LongDescription: "",
      PanchtatvaCategoryLevel1_Id: "",
      PanchtatvaCategoryLevel2_Id: "",
      PanchtatvaCategoryLevel3_Id: "",
      Stations: [{ StationsId: "", StationsSpecialityId: "" }],
      BrandId: "",
      MrpWithCurrency: [{ Currency: "", MRP: "" }],
      DiscountWithCurrency: [{ Currency: "", Discount: "" }],
      IsActive: true,
    },
    enableReinitialize: true,
    // validationSchema: ProductSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true);
        const payload = { ...values, _id: editId || null, AssetId: userDetails?.LoginAssetId };
        const res = await __postApiData("/api/v1/admin/SaveProduct", payload);
        if (res.response && res.response.response_code === "200") {
          toast.success(editId ? "Data updated successfully" : "Data added successfully");
          resetForm();
          setEditId(null);
          getProductList();
          setInfoTxt("");
        } else {
          console.log(res);
          toast.error(res.response?.response_message || res.response?.response_message?.error || "Failed to add Data");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to submit:", error);
        setIsLoading(false);
      }
    },
  });

  // ========== Column for data table ============  \\
  const columns = [
    {
      field: "_id", headerName: "Sr. No", width: 90, headerClassName: "health-table-header-style", headerAlign: "center",
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
      field: "ProductName",
      headerName: "Product Name",
      headerClassName: "health-table-header-style",
      minWidth: 180,
      flex: 1,
      align: "center",
      renderCell: (params) => <span className='px-1 py-4'>{params.row?.ProductName || "N/A"}</span>,
    },
    {
      field: "ProductSKU",
      headerName: "Product SKU",
      headerClassName: "health-table-header-style",
      width: 200,
      renderCell: (params) => <span>{params.row?.ProductSKU || "N/A"}</span>,
    },
    {
      field: "BrandId",
      headerName: "Brand",
      headerClassName: "health-table-header-style",
      width: 200,
      renderCell: (params) => <span>{params.row?.BrandId?.BrandName || "N/A"}</span>,
    },
    {
      field: "ShortDescription",
      headerName: "Short Description",
      headerClassName: "health-table-header-style",
      minWidth: 180,
      flex: 1,
      align: "center",
      renderCell: (params) => <span className='px-1 py-4'>{params.row?.ShortDescription || "N/A"}</span>,
    },

    {
      field: "LongDescription",
      headerName: "Long Description",
      headerClassName: "health-table-header-style",
      minWidth: 180,
      flex: 1,
      align: "center",
      renderCell: (params) => <span className='px-1 py-4'>{params.row?.LongDescription || "N/A"}</span>,
    },
    {
      field: "StationSpeciality",
      headerName: "Station /Station Speciality",
      headerClassName: "health-table-header-style",
      minWidth: 180,
      flex: 1,
      align: "center",
      renderCell: (params) => {
        const stations = params.row?.Stations || [];
        return (
          <div className="flex gap-2 flex-wrap">
            {stations.length > 0 ? (
              stations.map((station, index) => (
                <Tooltip
                  key={index}
                  title={`${station.StationsId.lookup_value}: ${station.StationsSpecialityId.lookup_value}`}
                  arrow
                >
                  <Chip
                    label={`${station.StationsId.lookup_value}: ${station.StationsSpecialityId.lookup_value}`}
                    color="primary"
                    variant="outlined"
                  />
                </Tooltip>
              ))
            ) : (
              <span>N/A</span>
            )}
          </div>
        );
      },
    },
    {
      field: "MrpWithCurrency",
      headerName: "MRP with Currency",
      headerClassName: "health-table-header-style",
      minWidth: 180,
      flex: 1,
      align: "center",
      renderCell: (params) => {
        const mrpWithCurrency = params.row?.MrpWithCurrency || [];

        return (
          <div className="flex gap-2 flex-wrap">
            {mrpWithCurrency.length > 0 ? (
              mrpWithCurrency.map((item, index) => (
                <Tooltip
                  key={index}
                  title={`Currency: ${item.Currency.lookup_value}, MRP: ${item.MRP}`}
                  arrow
                >
                  <Chip
                    label={`${item.Currency.lookup_value}: ${item.MRP}`}
                    color="primary"
                    variant="outlined"
                  />
                </Tooltip>
              ))
            ) : (
              <span>N/A</span>
            )}
          </div>
        );
      },
    },

    {
      field: "DiscountWithCurrency",
      headerName: "Discount with Currency",
      headerClassName: "health-table-header-style",
      minWidth: 180,
      flex: 1,
      align: "center",
      renderCell: (params) => {
        const discountWithCurrency = params.row?.DiscountWithCurrency || [];

        return (
          <div className="flex gap-2 flex-wrap">
            {discountWithCurrency.length > 0 ? (
              discountWithCurrency.map((item, index) => (
                <Tooltip
                  key={index}
                  title={`Currency: ${item.Currency.lookup_value}, Discount: ${item.Discount}`}
                  arrow
                >
                  <Chip
                    label={`${item.Currency.lookup_value}: ${item.Discount}`}
                    color="secondary"
                    variant="outlined"
                  />
                </Tooltip>
              ))
            ) : (
              <span>N/A</span>
            )}
          </div>
        );
      },
    },

    {
      field: "PanchtatvaCategoryLevel1_Id",
      headerName: "Panchtatva Category Level 1",
      headerClassName: "health-table-header-style",
      minWidth: 180,
      flex: 1,
      align: "center",
      renderCell: (params) => <span className='px-1 py-4'>{params.row?.PanchtatvaCategoryLevel1_Id?.lookup_value || "N/A"}</span>,
    },
    {
      field: "PanchtatvaCategoryLevel2_Id",
      headerName: "Panchtatva Category Level 2",
      headerClassName: "health-table-header-style",
      minWidth: 180,
      flex: 1,
      renderCell: (params) => <span className='px-1 py-4'>{params.row?.PanchtatvaCategoryLevel2_Id?.lookup_value || "N/A"}</span>,
    },
    {
      field: "PanchtatvaCategoryLevel3_Id",
      headerName: "Panchtatva Category Level 3",
      headerClassName: "health-table-header-style",
      minWidth: 180,
      flex: 1,
      renderCell: (params) => <span className='px-1 py-4'>{params.row?.PanchtatvaCategoryLevel3_Id?.lookup_value || "N/A"}</span>,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 150,
      headerClassName: "health-table-header-style",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      align: "center",
      renderCell: (params) => <>
        <div className="flex gap-2">
          <DatagridRowAction row={params.row} onEdit={() => handleEdit(params.row)} onDelete={() => handleDelete(params.row)} />
          <IconButton
            onClick={() => {
              navigate(`/destination-dashboard/product-master/product-varient/${params.row._id}`);
            }}
          >
            <ShortcutIcon color="warning" />
          </IconButton>
        </div>
      </>
    }
  ]

  const { values, handleChange, handleBlur, errors, touched, setFieldValue } = formik;

  //========== function to update state dataList ============\\
  const updateState = (data) => setDataList((prevState) => ({ ...prevState, ...data }));

  ///========== fetch data from api ============\\
  const fetchData = async (lookupTypes, stateKey, parent_lookup_id) => {
    try {
      const data = await __getCommenApiDataList({
        lookup_type: lookupTypes,
        parent_lookup_id: parent_lookup_id || null,
      })

      if (data && Array.isArray(data) && data.length > 0) {
        updateState({ [stateKey]: data, });
      }
      else if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
        updateState({ [stateKey]: data.data, });
      } else if (data && data.list && Array.isArray(data.list) && data.list.length > 0) {
        updateState({ [stateKey]: data.list, });
      }
      else {
        // console.warn(`No data found for ${stateKey}:`, data);
        updateState({ [stateKey]: [], });
      }
    } catch (error) {
      console.error(`Error fetching ${stateKey}:`, error);
    }
  }
  //========== fetch data from api ============\\
  useEffect(() => {
    fetchData(["panchtatva_category"], "panchtatvaList");
    fetchData(["station_specialty_type"], "StationsSpecialityList");
    fetchData(["currency"], "CurrencyList");
    fetchData(["station"], "StationList");
    getProductList();
    getBrandList();
  }, []);
  useEffect(() => {
    if (formik.values.PanchtatvaCategoryLevel1_Id) {
      fetchData(["panchtatva_sub_category"], "panchtatvaSubList", formik.values.PanchtatvaCategoryLevel1_Id);
    }
  }, [formik.values.PanchtatvaCategoryLevel1_Id]);
  useEffect(() => {
    if (formik.values.PanchtatvaCategoryLevel2_Id) {
      fetchData(["panchtatva_sub_sub_category"], "panchtatvaSubSubList", formik.values.PanchtatvaCategoryLevel2_Id);
    }
  }, [formik.values.PanchtatvaCategoryLevel2_Id]);

  const handleEdit = (row) => {
    setEditId(row._id);
    formik.setValues({
      ProductName: row.ProductName,
      ShortDescription: row.ShortDescription,
      LongDescription: row.LongDescription,
      PanchtatvaCategoryLevel1_Id: row.PanchtatvaCategoryLevel1_Id?._id,
      PanchtatvaCategoryLevel2_Id: row.PanchtatvaCategoryLevel2_Id?._id,
      PanchtatvaCategoryLevel3_Id: row.PanchtatvaCategoryLevel3_Id?._id,
      Stations: row?.Stations?.map((item) => ({ StationsId: item?.StationsId?._id, StationsSpecialityId: item?.StationsSpecialityId?._id })),
      BrandId: row.BrandId,
      MrpWithCurrency: row.MrpWithCurrency?.map((item) => ({ Currency: item?.Currency?._id, MRP: item?.MRP })),
      DiscountWithCurrency: row?.DiscountWithCurrency?.map((item) => ({ Currency: item?.Currency?._id, Discount: item?.Discount })),
      IsActive: row.IsActive
    });
  }

  ///========== handle delete  ============\\
  const handleDelete = async (row) => {
    try {
      const result = await Popup("warning", "Are you sure?", "You won't be able to revert this!");
      if (result.isConfirmed) {

        const res = await __postApiData(`/api/v1/admin/deleteProduct`, { ProductId: row?._id });
        if (res?.response?.response_code === "200") {
          toast.success("Product deleted successfully");
          getProductList();
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

   useEffect(() => {
          formik.setFieldValue('LongDescription', infotxt);
      }, [infotxt]);

  return (
    <div className="p-4 bg-white">
      <SectionHeader
        title="Product List"
        description="Add or update the required details for the products to keep records accurate and complete."
      />

      <form onSubmit={formik.handleSubmit} className="shadow-card p-4 rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product Name */}
          <FormInput
            label="Product Name"
            placeholder="Enter Product Name"
            name="ProductName"
            value={values.ProductName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.ProductName && errors.ProductName}
            helperText={touched.ProductName && errors.ProductName}
          />
          <FormInput
            label="Brand ID"
            name="BrandId"
            type="select"
            value={values.BrandId}
            options={brandList?.data?.map((item) => ({ _id: item?._id, lookup_value: item?.BrandName }))}
            onChange={handleChange}
            error={touched.BrandId && errors.BrandId}
            helperText={touched.BrandId && errors.BrandId}
          />

          {/* Descriptions */}
          <FormInput
            label="Short Description"
            multiline
            rows={3}
            placeholder={"Enter Short description"}
            name="ShortDescription"
            value={values.ShortDescription}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.ShortDescription && errors.ShortDescription}
            helperText={touched.ShortDescription && errors.ShortDescription}
          />
          <div className='flex gap-2 flex-col row-span-2'>
            <label className="text-base font-semibold">Long Description</label>
            <MyEditor
              content={infotxt}
              setContent={setInfoTxt} // Only update the infotxt state here
              desHeight={"120px"}
            />
            {formik.errors.LongDescription && formik.touched.LongDescription ? (
              <span className="text-danger">{formik.errors.LongDescription}</span>
            ) : null}
          </div>

          {/* Category Levels */}
          <FormInput
            label="Panchtatva Category Level 1"
            name="PanchtatvaCategoryLevel1_Id"
            type="select"
            value={values.PanchtatvaCategoryLevel1_Id}
            options={panchtatvaList}
            onChange={handleChange}
            error={
              touched.PanchtatvaCategoryLevel1_Id && errors.PanchtatvaCategoryLevel1_Id
            }
            helperText={
              touched.PanchtatvaCategoryLevel1_Id && errors.PanchtatvaCategoryLevel1_Id
            }
          />
          <FormInput
            label="Panchtatva Category Level 2"
            name="PanchtatvaCategoryLevel2_Id"
            type="select"
            value={values.PanchtatvaCategoryLevel2_Id}
            options={panchtatvaSubList}
            onChange={handleChange}
            error={
              touched.PanchtatvaCategoryLevel2_Id && errors.PanchtatvaCategoryLevel2_Id
            }
            helperText={
              touched.PanchtatvaCategoryLevel2_Id && errors.PanchtatvaCategoryLevel2_Id
            }
          />
          <FormInput
            label="Panchtatva Category Level 3"
            name="PanchtatvaCategoryLevel3_Id"
            type="select"
            value={values.PanchtatvaCategoryLevel3_Id}
            options={panchtatvaSubSubList}
            onChange={handleChange}
            error={
              touched.PanchtatvaCategoryLevel3_Id && errors.PanchtatvaCategoryLevel3_Id
            }
            helperText={
              touched.PanchtatvaCategoryLevel3_Id && errors.PanchtatvaCategoryLevel3_Id
            }
          />
        </div>

        {/* Stations */}
        <div>
          <label className="font-semibold block my-2">Stations</label>
          {values.Stations.map((station, index) => (
            <div key={index} className="flex relative gap-2 flex-col md:flex-row mb-2 border p-2 rounded-md">
              <FormInput
                label="Station"
                name={`Stations[${index}].StationsId`}
                type="select"
                value={station.StationsId}
                options={StationList}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.Stations?.[index]?.StationsId &&
                  errors.Stations?.[index]?.StationsId
                }
                helperText={
                  touched.Stations?.[index]?.StationsId &&
                  errors.Stations?.[index]?.StationsId
                }
              />
              <FormInput
                label="Station Speciality"
                name={`Stations[${index}].StationsSpecialityId`}
                type="select"
                value={station.StationsSpecialityId}
                options={StationsSpecialityList}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.Stations?.[index]?.StationsSpecialityId &&
                  errors.Stations?.[index]?.StationsSpecialityId
                }
                helperText={
                  touched.Stations?.[index]?.StationsSpecialityId &&
                  errors.Stations?.[index]?.StationsSpecialityId
                }
              />
              {values.Stations.length > 1 && (
                <IconButton
                  className="absolute top-0 right-0"
                  onClick={() => {
                    const updated = [...values.Stations];
                    updated.splice(index, 1);
                    setFieldValue("Stations", updated);
                  }}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              )}
            </div>
          ))}
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            onClick={() =>
              setFieldValue("Stations", [
                ...values.Stations,
                { StationsId: "", StationsSpecialityId: "" },
              ])
            }
          >
            Add Station
          </Button>
        </div>

        {/* MRP Section */}
        <div>
          <label className="font-semibold block my-2">MRP with Currency</label>
          {values.MrpWithCurrency.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-2 items-center mb-2 border p-2 rounded-md">
              <FormInput
                label="Currency"
                name={`MrpWithCurrency[${index}].Currency`}
                type="select"
                value={item.Currency}
                options={CurrencyList}
                onChange={handleChange}
                error={
                  touched.MrpWithCurrency?.[index]?.Currency &&
                  errors.MrpWithCurrency?.[index]?.Currency
                }
                helperText={
                  touched.MrpWithCurrency?.[index]?.Currency &&
                  errors.MrpWithCurrency?.[index]?.Currency
                }
              />
              <FormInput
                label="MRP"
                name={`MrpWithCurrency[${index}].MRP`}
                value={item.MRP}
                placeholder="Enter MRP"
                onChange={handleChange}
                error={
                  touched.MrpWithCurrency?.[index]?.MRP &&
                  errors.MrpWithCurrency?.[index]?.MRP
                }
                helperText={
                  touched.MrpWithCurrency?.[index]?.MRP &&
                  errors.MrpWithCurrency?.[index]?.MRP
                }
              />
              {values.MrpWithCurrency.length > 1 && (
                <IconButton
                  onClick={() => {
                    const updated = [...values.MrpWithCurrency];
                    updated.splice(index, 1);
                    setFieldValue("MrpWithCurrency", updated);
                  }}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              )}
            </div>
          ))}
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            onClick={() =>
              setFieldValue("MrpWithCurrency", [
                ...values.MrpWithCurrency,
                { Currency: "", MRP: "" },
              ])
            }
          >
            Add MRP
          </Button>
        </div>

        {/* Discount Section */}
        <div>
          <label className="font-semibold block my-2">Discount with Currency</label>
          {values.DiscountWithCurrency.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-2 items-center mb-2 border p-2 rounded-md">
              <FormInput
                label="Currency"
                name={`DiscountWithCurrency[${index}].Currency`}
                type="select"
                value={item.Currency}
                options={CurrencyList}
                onChange={handleChange}
                error={
                  touched.DiscountWithCurrency?.[index]?.Currency &&
                  errors.DiscountWithCurrency?.[index]?.Currency
                }
                helperText={
                  touched.DiscountWithCurrency?.[index]?.Currency &&
                  errors.DiscountWithCurrency?.[index]?.Currency
                }
              />
              <FormInput
                label="Discount"
                name={`DiscountWithCurrency[${index}].Discount`}
                value={item.Discount}
                placeholder="Enter Discount"
                onChange={handleChange}
                error={
                  touched.DiscountWithCurrency?.[index]?.Discount &&
                  errors.DiscountWithCurrency?.[index]?.Discount
                }
                helperText={
                  touched.DiscountWithCurrency?.[index]?.Discount &&
                  errors.DiscountWithCurrency?.[index]?.Discount
                }
              />
              {values.DiscountWithCurrency.length > 1 && (
                <IconButton
                  onClick={() => {
                    const updated = [...values.DiscountWithCurrency];
                    updated.splice(index, 1);
                    setFieldValue("DiscountWithCurrency", updated);
                  }}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              )}
            </div>
          ))}
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            onClick={() =>
              setFieldValue("DiscountWithCurrency", [
                ...values.DiscountWithCurrency,
                { Currency: "", Discount: "" },
              ])
            }
          >
            Add Discount
          </Button>
        </div>

        {/* IsActive */}
        <div className="flex items-center gap-2 mt-3">
          <input
            id="productAct"
            type="checkbox"
            checked={values.IsActive}
            onChange={(e) => setFieldValue("IsActive", e.target.checked)}
          />
          <label htmlFor="productAct" className="font-semibold">
            Is Active
          </label>
        </div>

        {/* Submit */}
        <div className="mt-4">
          <FormButton disabled={isLoading}>
            {isLoading ? (editId ? "Updating..." : "Saving...") : editId ? "Update" : "Save"}
          </FormButton>
        </div>
      </form>

      <div className="bg-white pb-2 rounded-xl my-16 ">
        <DataGrid
          rows={list?.data}
          columns={columns}
          loading={list?.loading}
          autoHeight
          pagination
          getRowHeight={() => "auto"}
          getRowId={(row) => row._id}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10]}
          sx={{
            "& .MuiDataGrid-cell": {
              lineHeight: "2rem",
              paddingBottom: "10px",
              paddingTop: "8px",
            },
          }}
        />
      </div>
    </div>
  );
};

export default ProductList;
