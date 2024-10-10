import React from "react";
import Location from "../Location";

const LocationCard = () => {
    return (
        <div className="bg-gray-200 border border-gray-200 rounded-lg shadow-md p-1 max-w-sm mx-auto mt-4">
            <div className="mb-4">
                <Location />
            </div>
            <div className="text-gray-800">
                <h2 className="font-bold text-lg">
                    Հասցէ
                </h2>
                <p className="mb-4">
                    Բահար պող., Բահարմասթեան փողոց, համար 60
                </p>
                <h2 className="font-bold text-lg">
                    Հեռախօս
                </h2>
                <p className="mb-1">
                    +98 21 888 44 300
                </p>
                <p>
                    +98 21 888 20 899
                </p>
            </div>
        </div>
    );
};

export default LocationCard;
