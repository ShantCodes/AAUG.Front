import React from "react";
import SubscribeForm from "../../_components/userComponents/Subscribe";
import NavMenu from "../../_components/NavMenu";
import BankCard from "../../_components/BankCard";

const SubscribePage = () => {


    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
            {/* NavMenu positioned on the left with fixed positioning */}
            <div className="fixed top-20 left-4 md:left-16 lg:left-1/4 p-4">
                <NavMenu />
            </div>

            {/* Main content area centered, with padding to avoid overlap */}
            <div className="flex flex-col justify-center items-center w-full max-w-md space-y-5 lg:ml-48">
                <BankCard />
                <SubscribeForm />
            </div>
        </div>


    );
};

export default SubscribePage;
