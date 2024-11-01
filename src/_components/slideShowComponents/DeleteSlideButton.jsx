import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteSlide } from '../../services/slideShow/SlideShowService';

const DeleteSlideButton = ({ slideId, onSlideDeleted }) => {
    const handleDelete = async () => {
        try {
            await deleteSlide(slideId);
            onSlideDeleted(slideId); // Notify parent component to remove the slide from state
        } catch (error) {
            console.error('Error deleting slide:', error);
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="mt-2 w-10 h-10 flex items-center justify-center bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
        >
            <TrashIcon className="h-6 w-6" />
        </button>
    );
};

export default DeleteSlideButton;
