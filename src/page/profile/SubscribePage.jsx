import React from "react";
import SubscribeForm from "../../_components/userComponents/Subscribe";
import NavMenu from "../../_components/NavMenu";

const SubscribePage = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            {/* NavMenu moved closer to the center */}
            <div className="absolute top-40 left-1/4 p-4">
                <NavMenu />
            </div>

            {/* SubscribeForm centered */}
            <div className="flex flex-col justify-center items-center w-full max-w-md">
                <SubscribeForm />
            </div>
        </div>
    );
};

export default SubscribePage;
