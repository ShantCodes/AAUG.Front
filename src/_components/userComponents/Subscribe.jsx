import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { getCurrentUserFull, updateSubscription, updateSubscriptionWithCode } from '../../services/userService/userSerice';
import { downloadFile } from '../../services/downloadFileService/downloadFileService';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';

const SubscribeForm = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [membershipCode, setMembershipCode] = useState('');
    const [message, setMessage] = useState('');
    const [receiptFileId, setReceiptFileId] = useState(null);
    const [receiptFileUrl, setReceiptFileUrl] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [subscribeDate, setSubscribeDate] = useState(null);
    const [subscriptionStatus, setSubscriptionStatus] = useState('');
    const [userAge, setUserAge] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getCurrentUserFull();
                const { receiptFileId, subscribeDate, bornDate } = data;

                setReceiptFileId(receiptFileId);
                setSubscribeDate(subscribeDate);

                // Calculate age from bornDate
                const age = dayjs().diff(dayjs(bornDate), 'year');
                setUserAge(age);

                if (receiptFileId) {
                    const fileUrl = downloadFile(receiptFileId);
                    setReceiptFileUrl(fileUrl);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        if (subscribeDate) {
            const currentDate = dayjs();
            const subscriptionStart = dayjs(subscribeDate);
            const diffInMonths = currentDate.diff(subscriptionStart, 'month');
            const diffInDays = currentDate.diff(subscriptionStart, 'day') % 30;

            if (diffInMonths < 12) {
                setSubscriptionStatus(
                    <div className="flex flex-col items-center justify-center">
                        <CheckBadgeIcon className="h-20 w-20 text-green-500" />
                        <span className="text-green-500 text-4xl font-bold">Subscribed</span>
                        <span className="text-green-500 text-xl font-medium">
                            {diffInMonths} months and {diffInDays} days
                        </span>
                    </div>
                );
            } else {
                setSubscriptionStatus(
                    <span className="text-red-500 font-bold">
                        X - Not Subscribed
                    </span>
                );
            }
        }
    }, [subscribeDate]);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setMembershipCode('');
    };

    const handleCodeChange = (e) => {
        setMembershipCode(e.target.value);
        setSelectedFile(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (membershipCode) {
                await updateSubscriptionWithCode(membershipCode);
                setMessage('Subscription updated successfully with code!');
            } else if (selectedFile) {
                await updateSubscription(selectedFile);
                setMessage('File uploaded successfully!');
            } else {
                setMessage('Please enter a membership code or select a file to upload.');
            }
        } catch (error) {
            setMessage('Failed to update subscription.');
        }
    };

    const handleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-center">Անդամակցել</h2>

                {subscriptionStatus && (
                    <div className="mb-4 text-center">
                        {subscriptionStatus}
                    </div>
                )}

                <p>For subscription, enter your membership code or upload a file.</p>

                {selectedFile === null && (
                    <div className="mb-4">
                        <label htmlFor="membershipCode" className="block text-sm font-medium text-gray-700 mb-2">
                            Membership Code:
                        </label>
                        <input
                            type="text"
                            id="membershipCode"
                            value={membershipCode}
                            onChange={handleCodeChange}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 p-2"
                            placeholder="Enter your membership code"
                        />
                    </div>
                )}

                {userAge !== null && (
                    <div className="mb-2 text-center font-bold">
                        {userAge < 30 ? "50,000 تومان" : "100,000 تومان"}
                    </div>
                )}

                {membershipCode === '' && (
                    <div className="mb-4">
                        <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700 mb-2">
                            Choose file:
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 p-2"
                        />
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Submit
                </button>
            </form>

            {message && (
                <p className="mt-4 text-center text-lg font-semibold">
                    {message}
                </p>
            )}

            {receiptFileUrl && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4 text-center">Receipt File</h3>
                    {isExpanded ? (
                        <img
                            src={receiptFileUrl}
                            alt="Receipt"
                            className="border border-gray-300 shadow-lg w-full max-w-4xl"
                        />
                    ) : (
                        <img
                            src={receiptFileUrl}
                            alt="Receipt"
                            className="border border-gray-300 shadow-lg w-48 cursor-pointer"
                            onClick={handleExpand}
                        />
                    )}
                    <button
                        className="mt-2 text-blue-500 underline"
                        onClick={handleExpand}
                    >
                        {isExpanded ? 'Collapse' : 'Expand'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default SubscribeForm;
