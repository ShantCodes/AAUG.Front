import React from "react";
import UsersList from "../../_components/userComponents/UserList";
import NotApprovedEventsFeed from "../../_components/eventComponents/NotApprovedEventsFeed";

const AdminPage = () => {
    return (
        <div className="flex justify-end h-screen bg-gray-100"> 
            {/* Container for both components */}
            <div className="flex h-full w-3/4">
                {/* UsersList centered and scrollable */}
                <div className="flex-1 flex justify-center items-center overflow-y-auto h-full">
                    <div className=" ml-10 w-full h-full overflow-y-auto ">
                        <UsersList />
                    </div>
                </div>

                {/* NotApprovedEventsFeed to the right of UsersList and scrollable */}
                <div className="flex-1 h-full overflow-y-auto mt-5">
                    <NotApprovedEventsFeed />
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
