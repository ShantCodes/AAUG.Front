import React, { useState } from "react";
import UsersList from "../../_components/userComponents/UserList";
import NotApprovedEventsFeed from "../../_components/eventComponents/NotApprovedEventsFeed";
import NavMenu from "../../_components/NavMenu";
import NotApprovedUserList from "../../_components/userComponents/NotApprovedUserList";
import SubscribedUserList from "../../_components/userComponents/SubscribedUserList";
import SubbedNotApprovedUserList from "../../_components/userComponents/SubedNotApprovedUserList";
import MobileNavMenu from "../../_components/MobileNavMenu";

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState(1); // State to manage active tab

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-gray-100 mt-16">
            {/* Mobile Navigation Menu */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
                <MobileNavMenu />
            </div>
            <div className="hidden lg:block z-40">
                <NavMenu />
            </div>

            {/* Main content container */}
            <div className="flex-1">
                {/* Mobile View Tabs */}
                <div className="lg:hidden">
                    <div className="fixed mt-16 flex overflow-x-auto border-b border-gray-300 bg-white top-0 z-10">
                        {[
                            { id: 1, label: "Users" },
                            { id: 2, label: "Not Approved Events" },
                            { id: 5, label: "Not Approved Subscribers" },
                            { id: 4, label: "Subscribed Users" },
                            { id: 3, label: "New Users" },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                className={`flex-1 py-2 text-center ${
                                    activeTab === tab.id
                                        ? "bg-white border-b-2 border-blue-500 font-semibold"
                                        : "bg-gray-200"
                                }`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    {/* Mobile Tab Content */}
                    <div className="p-4">
                        {activeTab === 1 && <UsersList />}
                        {activeTab === 2 && <NotApprovedEventsFeed />}
                        {activeTab === 3 && <NotApprovedUserList />}
                        {activeTab === 4 && <SubscribedUserList />}
                        {activeTab === 5 && <SubbedNotApprovedUserList />}
                    </div>
                </div>

                {/* Desktop View */}
                <div className="hidden lg:flex flex-col w-full h-full">
                    {/* Tab buttons */}
                    <div className="flex border-b border-gray-300 bg-white sticky top-0 z-10">
                        <button
                            className={`flex-1 py-2 text-center ${
                                activeTab === 1
                                    ? "bg-white border-b-2 border-blue-500 font-semibold"
                                    : "bg-gray-200"
                            }`}
                            onClick={() => setActiveTab(1)}
                        >
                            Users & Not Approved Events
                        </button>
                        <button
                            className={`flex-1 py-2 text-center ${
                                activeTab === 2
                                    ? "bg-white border-b-2 border-blue-500 font-semibold"
                                    : "bg-gray-200"
                            }`}
                            onClick={() => setActiveTab(2)}
                        >
                            Subscribed Users & Not Approved Subscribers
                        </button>
                    </div>

                    {/* Tab content */}
                    <div className="flex-grow flex h-full overflow-hidden">
                        {activeTab === 1 ? (
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
        </div>
    );
};

export default AdminPage;
