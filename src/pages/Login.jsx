import { Checkbox, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormInput from '../components/common/FormInput'
import FormButton from '../components/common/FormButton'
import { useFormik } from 'formik'
import * as Yup from "yup";
// import { __commonLogin } from '../utils/api/commonApi'
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Popup } from '../components/common/Popup'
import Logo from '../assets/images/logo-web.png'
import { __commonLogin } from '../utils/api/commonApi'
import { useAuth } from '../context/AuthContext'
const Login = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [value, setValue] = React.useState("Super Admin");
    const navigate = useNavigate();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const validationSchema = Yup.object().shape({
        MobileNumber: Yup.number().required("MobileNumber is required"),
        Password: Yup.string().required("Password is required"),
    });
    const formik = useFormik({
        initialValues: {
            MobileNumber: "",
            Password: "",
            checked: false
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                setIsLoading(true);
                const payload = {
                    MobileNumber: values.MobileNumber,
                    Password: values.Password,
                    LoginAssetRef: [
                        "admin_lookups",
                        "zatra_master",
                        "asset_master2",
                    ],
                }
                if (value === "Super Admin") {
                    login(123445, {
                        Role: "Super Admin",
                        Name: "Super Admin",
                        MobileNumber: "123445"
                    })
                    navigate("/admin")
                } else {
                    const res = await __commonLogin(payload);
                    if (res?.response?.response_code === "200") {
                        login(res.data?.AuthToken, { ...res.data?.AdminData, Role: res.data?.AdminData?.LoginAssetType?.lookup_value });
                        navigate("/station-dashboard");
                    } else {

                        Popup("error", res?.response.response_message || "Failed to login");

                    }
                }
                // navigate("/admin")
                setIsLoading(false);
            } catch (error) {
                console.error("Error in  Login :", error);
                Popup("error", error?.response?.response_message || "Failed to login");

            } finally {
                setIsLoading(false);
            }
        },
    })


    return (
        <div className='h-screen overflow-auto grid  grid-cols-1 md:grid-cols-2 gap-3 p-4'>
            <div className='flex items-center justify-center xs:px-2 sm:px-4 py-4'>
                <img src="/LoginSide2.jpeg" alt="Signupbg" className='w-full max-h-[600px] h-full object-cover rounded-lg' />
            </div>
            {/*==========  Login Form  start here ==========*/}
            <div className='flex w-full justify-center flex-col py-8 md:py-14 xs:px-4 sm:px-6 md:px-20'>
                <div className='flex items-center justify-center mb-8'>
                    <img src={Logo} alt="productLogo" className='w-32' />
                </div>
                <Typography variant='h5' sx={{ mb: 1, fontWeight: 'bold' }}>Welcome Back</Typography>
                <Typography variant='body1' sx={{ fontWeight: 'bold' }}>Need an account? <Link to="/signup" className='text-primary underline'>Sign Up </Link></Typography>
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 mt-8 rounded-md ">
                    <div className='my-4'>
                        <Tabs value={value} onChange={(e, newValue) => setValue(newValue)} aria-label="basic tabs example">
                            <Tab value="Super Admin" label="Admin" />
                            <Tab value="others" label="Others" />
                        </Tabs>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <FormInput
                            label="Login ID"
                            name="MobileNumber"
                            placeholder="Enter mobile number"
                            value={formik.values.MobileNumber}
                            onChange={formik.handleChange}
                            error={formik.touched.MobileNumber && Boolean(formik.errors.MobileNumber)}
                            helperText={formik.touched.MobileNumber && formik.errors.MobileNumber}
                        />
                        <FormInput
                            label="Password"
                            name="Password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={formik.values.Password}
                            onChange={formik.handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <Checkbox
                                id="remember"
                                sx={{
                                    color: "var(--web-primary)",
                                    "&.Mui-checked": {
                                        color: "var(--web-primary)",
                                    },
                                }}
                                checked={formik.values.checked}
                                onChange={(e) => formik.setFieldValue("checked", e.target.checked)}
                            />
                            <label htmlFor="remember" className="text-webprimary cursor-pointer">
                                Remember me
                            </label>
                        </div>
                        <Link to="/forgot-password" className='text-webprimary underline'>Forgot Password?</Link>
                    </div>

                    <div className="mt-2">
                        <FormButton
                            className="w-full"
                            disabled={
                                isLoading
                            }
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </FormButton>

                    </div>
                </form>
            </div>
            {/*==========  Login Form  End here ==========*/}

        </div>
    )
}

export default Login