import React from "react";
import Location from "../Location";

const LocationCard = () => {
    return (
        <div className='bg-gray-300 rounded-lg p-2 mt-4'>
            <div>
                <Location />
            </div>
            <div className='text-gray-800'>
                <h2 className='font-bold'>
                    Հասցէ
                </h2>
                <p className="mb-10">
                    Բահար պող., Բահարմասթեան փողոց, համար 60
                </p>
                <h2 className='font-bold'>
                    Հեռախօս
                </h2>
                <p>
                    +98 21 888 44 300
                </p>
                <p className="mb-10">
                    +98 21 888 20 899
                </p>

            </div>
        </div >
    );
};

export default LocationCard;