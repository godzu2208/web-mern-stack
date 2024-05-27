import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";
const SignOutButton = () => {

    const { showToast } = useAppContext();
    const queryClient = useQueryClient();

    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken")
            // showToast
            showToast({
                message: "Log out successfully",
                type: "SUCCESS",
            })
        }, onError: (error: Error) => {
            // showToast Error
            showToast({ message: error.message, type: "ERROR", })
        }
    });

    const handleClickButton = () => {
        mutation.mutate()
    }

    return (
        <>
            <button onClick={handleClickButton} type="button" className="flex bg-white  rounded-lg text-blue-600 items-center ml-4 px-3 font-bold  hover:bg-gray-300 hover:text-blue-600">
                Sign Out
            </button>
        </>
    )
}

export default SignOutButton;