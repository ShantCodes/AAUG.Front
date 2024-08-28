import React from 'react';

const Location = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2010.3403135784665!2d51.427404914353424!3d35.71617625039009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e0163e7b81519%3A0x1bc8cb2b0410e4fd!2sTehran%20Province%2C%20Tehran%2C%20District%207%2C%20Baharmastaan%2C%20Iran!5e0!3m2!1sen!2sus!4v1724863199507!5m2!1sen!2sus"
                width="400"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
            ></iframe>
        </div>
    );
};

export default Location;
