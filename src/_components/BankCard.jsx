import React, { useState } from 'react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';

const BankCard = () => {
    const [isCopied, setIsCopied] = useState(false);
    const cardNumber = "6221 0612 3633 9208";

    // Function to handle copy-to-clipboard
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(cardNumber);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy!", error);
            setIsCopied(false);
        }
    };

    return (
        <div className="mt-10 sm:mt-20 w-full sm:w-[22rem] md:w-[28rem] lg:w-[30rem] h-auto sm:h-[15rem] rounded-lg shadow-lg p-5 text-white bg-gradient-to-r from-purple-500 to-blue-400 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
                <p className="text-sm font-bold">شماره کارت</p>
            </div>
            <div className="mb-6">
                <div className="flex justify-center items-center">
                    <p className="text-3xl font-mono tracking-widest font-bold text-center mt-5">
                        {cardNumber}
                    </p>
                    <button onClick={handleCopy} aria-label="Copy card number" className="ml-2">
                        <ClipboardDocumentIcon
                            className={`w-7 h-7 cursor-pointer ${isCopied ? "text-green-300" : "text-white"}`}
                        />
                    </button>
                </div>
                {isCopied && <p className="text-xs text-green-300 mt-1 text-center">Copied!</p>}
            </div>
            <div className="mt-auto text-right" dir="rtl">
                <p className="font-bold text-lg">ملانی میرزاخانیان, واراند قازاریان, آنگینه رستملو</p>
                <p className="text-sm font-bold mt-2">بانک پارسیان</p>
            </div>
        </div>
    );
}

export default BankCard;
