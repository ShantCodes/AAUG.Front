import React, { useState } from "react";
import UsersList from "../../_components/userComponents/UserList";
import NotApprovedEventsFeed from "../../_components/eventComponents/NotApprovedEventsFeed";
import NavMenu from "../../_components/NavMenu";
import NotApprovedUserList from "../../_components/userComponents/NotApprovedUserList";
import SubscribedUserList from "../../_components/userComponents/SubscribedUserList";
import SubbedNotApprovedUserList from "../../_components/userComponents/SubedNotApprovedUserList";

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState(1); // State to manage active tab

    return (
        <div className="flex justify-center h-screen bg-gray-100 mt-16">
            <div className="z-50">
                <NavMenu />
            </div>

            {/* Main content container */}
            <div className="flex flex-col w-3/4 h-full">
                {/* Tab buttons */}
                <div className="flex border-b border-gray-300">
                    <button
                        className={`flex-1 py-2 text-center ${activeTab === 1 ? 'bg-white border-b-2 border-blue-500 font-semibold' : 'bg-gray-200'}`}
                        onClick={() => setActiveTab(1)}
                    >
                        Users & Not Approved Events
                    </button>
                    <button
                        className={`flex-1 py-2 text-center ${activeTab === 2 ? 'bg-white border-b-2 border-blue-500 font-semibold' : 'bg-gray-200'}`}
                        onClick={() => setActiveTab(2)}
                    >
                        Subscribed Users & Not Approved Subscribers
                    </button>
                </div>

                {/* Tab content */}
                <div className="flex-grow flex h-full">
                    {activeTab === 1 ? (
                        // Content for first tab (UsersList, NotApprovedEventsFeed, NotApprovedUserList)
                        <div className="flex w-full">
                            
                            <div className="flex-1 flex justify-center items-center overflow-y-auto h-full">
                                <div className="ml-10 w-full h-full overflow-y-auto">
                                    <UsersList />
                                </div>
                            </div>
                            <div className="flex-1 h-full overflow-y-auto mt-5">
                                <NotApprovedEventsFeed />
                            </div>
                        </div>
                    ) : (
                        // Content for second tab (SubscribedUserList, SubbedNotApprovedUserList)
                        <div className="flex w-full">
                            <div className="flex-1 h-full overflow-y-auto mt-5">
                                <SubscribedUserList />
                            </div>
                            <div className="flex-1 h-full overflow-y-auto mt-5">
                                <SubbedNotApprovedUserList />
                            </div>
                            <div className="flex-1 h-full overflow-y-auto mt-5">
                                <NotApprovedUserList />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
