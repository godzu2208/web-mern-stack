import { useForm } from "react-hook-form"
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
export type RegisterFormData = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
}
const Register = () => {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>();

    const mutation = useMutation(apiClient.register, {
        onSuccess: () => {
            console.log("Registration successful!")
        },
        onError: (error: Error) => {
            console.log("error :", error.message)
        },
    })
    const onSubmit = handleSubmit((data) => {
        console.log(">>> check data :", data)
        mutation.mutate(data);
    })
    return (
        <>
            <form className="flex flex-col gap-5 mx-auto text-center w-3/5" onSubmit={onSubmit}>
                <div className="text-3xl font-bold text-blue-600">
                    <h1 className="mb-10">Create a new account</h1>
                    <div className="flex flex-col md:flex-row gap-5 ">
                        <label className="text-gray-700 text-left text-sm font-bold  flex-1">
                            First Name
                            <input className="border rounded w-full py-1 px-2 font-normal mt-4"
                                {...register("firstName", { required: "This field is required !" })}
                            />
                            {errors.firstName && (
                                <span className="text-red-500">
                                    {errors.firstName.message}
                                </span>
                            )}
                        </label>
                        <label className="text-gray-700 text-left text-sm font-bold  flex-1">
                            Last Name
                            <input className="border rounded w-full py-1 px-2 font-normal mt-4"
                                {...register("lastName", { required: "This field is required !" })}
                            />
                            {errors.lastName && (
                                <span className="text-red-500">
                                    {errors.lastName.message}
                                </span>
                            )}
                        </label>
                    </div>
                </div>
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
                <label className="text-gray-700 text-left text-sm font-bold  flex-1">
                    Confirm Password
                    <input
                        type="password"
                        className="border rounded w-full py-1 px-2 font-normal mt-4"
                        {...register("confirmPassword", {

                            validate: (val) => {
                                if (!val) {
                                    return "This field is required !!!"
                                } else if (watch("password") !== val) {
                                    return "Your password do not match"
                                }

                            }
                        })}
                    />
                    {errors.confirmPassword && (
                        <span className="text-red-500">
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </label>
                <span className="text-left">
                    <button
                        type="submit"
                        className="mt-5 rounded-lg bg-blue-600  text-white p-2 font-bold hover:bg-blue-500 text-xl" >
                        Create Account
                    </button>
                </span>
            </form>
        </>
    )

}

export default Register;