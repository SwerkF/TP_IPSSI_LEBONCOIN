
const Navbar = () => {

    return (
        <nav className="w-full bg-white px-5 py-3">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Logo</h1>
                <ul className="flex space-x-5">
                    <li><a href="#" className="text-gray-600 hover:text-gray-800">Home</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-800">About</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-800">Services</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-800">Contact</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;