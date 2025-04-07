"use client"
import { useEffect, useState } from "react";
import { fetchData } from "@/components/utilitites/fetch";
import { ImagesSlider } from "@/components/offerPageImages";


  

export default function OfferDetails({params}) {
    console.log(params.id);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState({
        "id": "123",
        "title": "Exclusive Discount on Electronics",
        "description": "Get up to 50% off on selecFRted electronics for a limited time! Don't miss out on these fantastic deals!",
        "images": ["/offer1.jpeg", "/offer1.jpeg", "/offer1.jpeg", "/offer1.jpeg"],
        "details": "This offer is valid until the end of the month. Limited stock available! Purchase now to avail this exclusive discount before it's gone.",
        "tags": ["Discount", "Electronics", "Limited Offer"],
        "offerer": {
            "shopName": "Tech Haven Store",
            "address": "123 Tech Street, Silicon Valley, CA",
            "contact": "+1 234 567 890",
            "email": "contact@techhaven.com"
        }
    });

      // useEffect(() => {
    //     async function getOfferDetails() {
    //         const result = await fetchData(`https://api.example.com/offers/${id}`, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         });

    //         setLoading(result.loading);
    //         setError(result.error);
    //         setData(result.data);
    //     }

    //     getOfferDetails();
    // }, [id]);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <section className="flex flex-col items-center justify-center p-6 max-w-4xl mx-auto">
            <h1 className="text-5xl text-center font-extrabold text-gray-800 mb-4">{data?.title}</h1>
            <p className="text-xl text-gray-600 text-center max-w-2xl mb-6">{data?.description}</p>
            
            <ImagesSlider images={data?.images} />
            
            <div className="flex flex-col items-center justify-center w-full mt-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Offer Details</h2>
                <p className="text-lg text-gray-700 text-center max-w-xl">{data?.details}</p>
            </div>
            
            <div className="flex flex-col items-center justify-center mt-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Tags</h3>
                <section className="flex flex-wrap items-center justify-center space-x-2">
                    {data?.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-yellow-500 text-black rounded-full px-4 py-2 text-lg font-semibold m-1"
                        >
                            {tag}
                        </span>
                    ))}
                </section>
            </div>
            
            <div className="flex flex-col items-center justify-center mt-8 w-full bg-gray-100 p-6 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact the Offerer</h2>
                <p className="text-xl font-semibold text-gray-700">{data?.offerer?.shopName}</p>
                <p className="text-lg text-gray-600">{data?.offerer?.address}</p>
                <p className="text-lg text-gray-600">Phone: {data?.offerer?.contact}</p>
                <p className="text-lg text-gray-600">Email: <a href={`mailto:${data?.offerer?.email}`} className="text-blue-500 underline">{data?.offerer?.email}</a></p>
            </div>
        </section>
    );
}