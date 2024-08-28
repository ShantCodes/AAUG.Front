import React from "react";
import UsersList from "../../_components/userComponents/UserList";
import NotApprovedEvents from "../../_components/eventComponents/NotApprovedEvents";

const AdminPage = () => {
    return (
        <div className="flex justify-end h-screen">
            {/* Container for both components */}
            <div className="flex h-full w-3/4">
                {/* UsersList centered and scrollable */}
                <div className="flex-1 flex justify-center items-center overflow-y-auto">
                    <UsersList />
                </div>

                {/* NotApprovedEvents to the right of UsersList and scrollable */}
                <div className="flex-1 ml-8 flex justify-center items-center overflow-y-auto mr-10">
                    <NotApprovedEvents />
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
