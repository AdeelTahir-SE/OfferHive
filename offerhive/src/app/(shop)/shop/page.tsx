"use client"
import { useState } from "react";

export default function Shop() {
    const [shopDetails, setShopDetails] = useState({
        title: "",
        description: "",
        location: "",
        phone: "",
        tags: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShopDetails({ ...shopDetails, [name]: value });
    };

    const handleImageChange = (e) => {
        setShopDetails({ ...shopDetails, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Shop Details Submitted:", shopDetails);
    };

    return (
        <section className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-4">Manage Your Shop</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <div className="mb-4">
                    <label className="block font-medium">Title</label>
                    <input type="text" name="title" value={shopDetails.title} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>

                <div className="mb-4">
                    <label className="block font-medium">Description</label>
                    <textarea name="description" value={shopDetails.description} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>

                <div className="mb-4">
                    <label className="block font-medium">Location</label>
                    <input type="text" name="location" value={shopDetails.location} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>

                <div className="mb-4">
                    <label className="block font-medium">Phone Number</label>
                    <input type="text" name="phone" value={shopDetails.phone} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>

                <div className="mb-4">
                    <label className="block font-medium">Tags (comma separated)</label>
                    <input type="text" name="tags" value={shopDetails.tags} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>

                <div className="mb-4">
                    <label className="block font-medium">Upload Image</label>
                    <input type="file" onChange={handleImageChange} className="w-full p-2 border rounded" accept="image/*" required />
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Save Changes
                </button>
            </form>
        </section>
    );
}