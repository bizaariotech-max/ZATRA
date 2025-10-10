import { Checkbox, Typography } from '@mui/material'
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
const Login = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const validationSchema = Yup.object().shape({
        PhoneNumber: Yup.number().required("PhoneNumber is required"),
        password: Yup.string().required("Password is required"),
    });
    const formik = useFormik({
        initialValues: {
            PhoneNumber: "",
            password: "",
            checked: false
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                setIsLoading(true);
                const payload = {
                    LoginFrom: "Admin",
                    PhoneNumber: values.PhoneNumber,
                    Password: values.password,
                }
                console.log(payload);
                navigate("/admin")
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
                    <div className="grid grid-cols-1 gap-4">
                        <FormInput
                            label="Login ID"
                            name="PhoneNumber"
                            placeholder="Enter mobile number"
                            value={formik.values.PhoneNumber}
                            onChange={formik.handleChange}
                            error={formik.touched.PhoneNumber && Boolean(formik.errors.PhoneNumber)}
                            helperText={formik.touched.PhoneNumber && formik.errors.PhoneNumber}
                        />
                        <FormInput
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={formik.values.password}
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