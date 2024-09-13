import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubscribeForm = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');
    const [receiptFileId, setReceiptFileId] = useState(null);
    const [receiptFileUrl, setReceiptFileUrl] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    // Fetch current user profile
    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("jwtToken");

            try {
                const response = await axios.get('http://localhost:37523/api/AaugUser/GetCurrentAaugUserFull', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const { receiptFileId } = response.data;
                setReceiptFileId(receiptFileId);
                if (receiptFileId) {
                    const fileUrl = `http://localhost:37523/api/Media/DownloadFile/${receiptFileId}`;
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            setMessage('Please select a file before uploading.');
            return;
        }

        const token = localStorage.getItem("jwtToken");

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            await axios.post('http://localhost:37523/api/AaugUser/UpdateSubscribtion', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage('File uploaded successfully!');
        } catch (error) {
            setMessage('Failed to upload the file.');
        }
    };

    const handleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-lg w-96"
            >
                <h2 className="text-2xl font-semibold mb-4 text-center">Upload File</h2>
                <p>
                    GIVE ME YO MONEEEEEEEHHHHHHH
                </p>
                <p>
                    1234 5678 91011 1213
                </p>

                <div className="mb-4">
                    <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700 mb-2">
                        Choose file:
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Upload
                </button>
            </form>

            {message && (
                <p className="mt-4 text-center text-lg font-semibold">
                    {message}
                </p>
            )}

            {/* Display receipt file */}
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
