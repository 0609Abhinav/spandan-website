import React from 'react';
import './eventform.css'; // Linking to the updated CSS

const GoogleFormEmbed = () => {
    return (
        <div className="google-form-embed">
            <h3 className="text-2xl font-bold mb-4 text-center">Feedback Form</h3>
            <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSfF2-R6dIIcvGLuPMWGLr84O-nVlKVsFhv20FUtFHPlU4UQhQ/viewform?embedded=true"
                title="Google Form for Event Feedback"
                frameBorder="0"
            >
                Loading…
            </iframe>
        </div>
    );
};

export default GoogleFormEmbed;
