import React from 'react';
import { motion } from 'framer-motion';
import './eventform.css';

const GoogleFormEmbed = () => {
    return (
        <motion.div 
            className="google-form-embed"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
        >
            <h3 className="text-2xl font-bold mb-4 text-center">Feedback Form</h3>
            <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSfF2-R6dIIcvGLuPMWGLr84O-nVlKVsFhv20FUtFHPlU4UQhQ/viewform?embedded=true"
                title="Google Form for Event Feedback"
                frameBorder="0"
            >
                Loading…
            </iframe>
        </motion.div>
    );
};

export default GoogleFormEmbed;
