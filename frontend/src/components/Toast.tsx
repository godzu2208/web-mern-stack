import { useEffect } from "react";

type ToastProps = {
    message: string,
    type: "SUCCESS" | "ERROR",
    onClose: () => void,
}
const Toast = ({ message, type, onClose }: ToastProps) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000)
        return () => {
            clearTimeout(timer);
        }
    }, [onClose])

    const styles = type === "SUCCESS" ?
        "fixed top-20 right-4 z-50 bg-green-600 text-white rounded-md"
        :
        "fixed top-20 right-4 z-50 bg-red-600 text-white rounded-md"


    return (
        <>
            <div className={styles}>
                <span className="flex justify-center p-3 items-center text-lg font-semibold"  >
                    {message}
                    {type === "SUCCESS" ?
                        <span className="pl-2">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                            </svg>
                        </span>
                        :
                        <span className="pl-2">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                            </svg>

                        </span>
                    }
                </span>
            </div>
        </>
    )
}

export default Toast;