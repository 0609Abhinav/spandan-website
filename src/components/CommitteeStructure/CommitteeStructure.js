import React from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaCrown } from 'react-icons/fa'; // Import icons

import './CommitteeStructure.css'; // Import CSS for additional styling

const CommitteeStructure = () => {
    return (
        <section className="committee-structure bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-2xl font-bold mb-4 text-center">Committee Structure</h3>
            <div className="structure">
                <div className="role">
                    <FaCrown className="icon" />
                    <h4 className="role-title">Convenor</h4>
                    <p>The head of the committee who oversees all activities and events.</p>
                </div>
                <div className="role">
                    <FaChalkboardTeacher className="icon" />
                    <h4 className="role-title">Organizational Members</h4>
                    <p>Experienced members who guide and assist in organizing events.</p>
                </div>
                <div className="role">
                    <FaChalkboardTeacher className="icon" />
                    <h4 className="role-title">Senior Members</h4>
                    <p>Experienced members who guide and assist in organizing events.</p>
                </div>
                <div className="role">
                    <FaUserGraduate className="icon" />
                    <h4 className="role-title">Junior Members</h4>
                    <p>New members who bring fresh ideas and assist in various tasks.</p>
                </div>
            </div>
            <div className="applications mt-6">
                <h4 className="font-bold">Application Process:</h4>
                <ul className="list-disc pl-6">
                    <li>Applications are called at the beginning of each academic year.</li>
                    <li>Selection is based on application points and personal interviews.</li>
                </ul>
            </div>
        </section>
    );
};

export default CommitteeStructure;
