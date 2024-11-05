import React, { useState, useEffect } from 'react';
import { getCurrentUserFull, updateSubscription, updateSubscriptionWithCode } from '../../services/userService/userSerice';
import { downloadFile } from '../../services/downloadFileService/downloadFileService';

const SubscribeForm = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [membershipCode, setMembershipCode] = useState('');
    const [message, setMessage] = useState('');
    const [receiptFileId, setReceiptFileId] = useState(null);
    const [receiptFileUrl, setReceiptFileUrl] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getCurrentUserFull();
                const { receiptFileId } = data;
                setReceiptFileId(receiptFileId);

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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold mb-4 text-center">Update Subscription</h2>

                <p>GIVE ME YO MONEEEEEEEHHHHHHH</p>
                <p>1234 5678 91011 1213</p>

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
