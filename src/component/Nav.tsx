import React, { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import logo from '../asset/image/logo.png';

const Nav: React.FC = () => {

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            // Handle file upload here
            console.log('Selected file:', e.target.files[0]);
        }
    };

    return (
        <nav className="flex items-center justify-between p-4 bg-white max-w-5xl mx-auto">
            <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />

            <div className="flex space-x-6">
                <Link to="/" className="text-[#696876] text-sm font-medium no-underline hover:text-[#3139B7FF]">
                    Home
                </Link>
                <Link to="/api" className="text-[#696876] text-sm font-medium no-underline hover:text-[#3139B7FF]">
                    APIs
                </Link>
            </div>

            <label
                htmlFor="file-input"
                className="text-white text-sm no-underline flex items-center bg-[#3139B7FF] px-4 py-2.5 rounded-3xl cursor-pointer hidden sm:flex"
            >
                <AiOutlineCloudUpload color="white" size={20} /> <span className="ml-2 font-medium">Upload</span>
            </label>

            <input
                id="file-input"
                type="file"
                className="hidden"
                onChange={handleFileChange}
            />
        </nav>
    );
};

export default Nav;
