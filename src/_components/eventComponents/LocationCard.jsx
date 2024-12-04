import React from "react";
import Location from "../Location";
import { SocialIcon } from "react-social-icons";

const LocationCard = () => {
    return (
        <div className="bg-gray-200 border border-gray-200 rounded-lg shadow-md p-2 mx-auto mt-4 w-full max-w-sm lg:max-w-md">
            <div className="mb-0">
                <Location />
            </div>
            <div className="text-gray-800">
                <h2 className="font-bold text-lg">Հասցէ</h2>
                <p className="mb-1">Բահար պող., Բահարմասթեան փողոց, համար 60</p>
                <h2 className="font-bold text-lg">Հեռախօս</h2>
                <p className="mb-1">+98 21 888 44 300</p>
                <p>+98 21 888 20 899</p>
                <h2 className="font-bold text-lg">Email</h2>
                <p>Info@aaug.ir</p>
            </div>
            <div className="flex space-x-4 justify-end">
                <div className="mt-4 flex justify-center">
                    <SocialIcon
                        url="https://www.instagram.com/aaug1943/"
                        network="instagram"
                        bgColor="#FFFFFF" // Background color to white
                        fgColor="#fc4103" // Icon color to orange
                        style={{
                            height: 45, // Larger size
                            width: 45, // Larger size   
                        }}
                    />
                </div>
                <div className="mt-4 flex justify-center">
                    <SocialIcon
                        url="https://t.me/AAUG1943"
                        network="telegram"
                        bgColor="#FFFFFF" // Background color to white
                        fgColor="#0088CC" // Icon color to blue
                        style={{
                            height: 45, // Larger size
                            width: 45, // Larger size   
                        }}
                    />
                </div>
            </div>

        </div>
    );
};

export default LocationCard;
