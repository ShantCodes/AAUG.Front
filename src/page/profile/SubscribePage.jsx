import React from "react";
import SubscribeForm from "../../_components/userComponents/Subscribe";
import NavMenu from "../../_components/NavMenu";

const SubscribePage = () => {
    return (
        <div className="flex justify-center items-center">
            <div >
                <NavMenu />
            </div>
            <div>
                <SubscribeForm />

            </div>
        </div>
    );
};

export default SubscribePage;