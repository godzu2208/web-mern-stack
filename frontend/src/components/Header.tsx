import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <>
            <div className="bg-blue-600 py-3">
                <div className="container mx-auto flex justify-between">
                    <span className="text-3xl text-white font-bold tracking-tight">
                        <Link to="/">MernHolidays.com</Link>
                    </span>
                    <div className='flex space-x-2'>
                        <span className="flex space-x-2">
                            <Link to="/book-room" className="flex text-white items-center  px-3 font-bold hover:bg-white hover:text-blue-600 hover:rounded-lg ">
                                Book Room
                            </Link>
                        </span>
                        <span className="flex space-x-2">
                            <Link to="/sign-in" className="flex bg-white  rounded-lg text-blue-600 items-center px-3 font-bold border-solid border-2 hover:bg-gray-300 hover:text-blue-600">
                                Sign In
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header;