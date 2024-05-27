import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
export type SignInFormData = {
    email: string,
    password: string,
}

const SignIn = () => {
    const { showToast } = useAppContext()
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm<SignInFormData>();

    const queryClient = useQueryClient();
    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {

            console.log("User has been signed in");
            showToast({
                message: "Log in successfully",
                type: "SUCCESS"
            });
            await queryClient.invalidateQueries("validateToken")
            navigate("/");
            // 1. show the toast
            // 2. navigate to the homepage
        }, onError: async (error: Error) => {
            // show the toast
            showToast({
                message: error.message, type: "ERROR"

            });
            console.log(error.message)
        }
    })
    const onSubmit = handleSubmit((data) => {
        console.log("check data signed in :", data);
        mutation.mutate(data);
    })
    return (
        <>
            <form className="flex flex-col gap-5 w-1/3 mx-auto" onSubmit={onSubmit}>
                <h1 className="text-3xl text-center text-blue-600 font-bold">Sign In</h1>
                {/* Email */}
                <label className="text-gray-700 text-sm font-bold text-left  flex-1">
                    Email
                    <input
                        type="email"
                        className="border rounded w-full py-1 px-2 font-normal mt-4"
                        {...register("email", { required: "This field is required !" })}
                    />
                    {errors.email && (
                        <span className="text-red-500">
                            {errors.email.message}
                        </span>
                    )}
                </label>
                {/* Password */}
                <label className="text-gray-700 text-sm font-bold text-left flex-1">
                    Password
                    <input
                        type="password"
                        className="border text-left rounded w-full py-1 px-2 font-normal mt-4"
                        {...register("password", {
                            required: "This field is required !",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            }
                        })}
                    />
                    {errors.password && (
                        <span className="text-red-500">
                            {errors.password.message}
                        </span>
                    )}
                </label>
                <div className="flex items-center justify-between">
                    <span className="text-sm">
                        Not Registered? <Link className="underline" to="/register" >Create account here</Link>
                    </span>
                    <button type="submit" className="w-20 h-10 bg-blue-600 text-white  rounded-lg hover:bg-blue-400 ">
                        Login
                    </button>
                </div>
            </form>
        </>
    )
}

export default SignIn;