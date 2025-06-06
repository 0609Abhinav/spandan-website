import React from 'react';
import { FaChalkboardTeacher, FaCrown } from 'react-icons/fa';
import './CommitteeStructure.css'; 
import photo1 from '../../assets/photo1.jpg';
import photo2 from '../../assets/photo2.jpg';
import photo3 from '../../assets/photo3.jpg';
// import photo4 from '../../assets/photo4.jpg';
import photo5 from '../../assets/photo5.jpg';
import photo6 from '../../assets/photo6.jpg';

const membersData = {
    convenor: [
        { name: "Vandana Grover", photo: photo1, department: "Department of Chemistry" },
    ],
    organizationalMembers: [
        { name: "Ms. Deepmala", photo: photo2, department: "Department of Electronics and Communication" },
        { name: "Dr. Akanshi Gupta", photo: photo3, department: "Department of MBA" },
        // { name: "Dr. Saloni Singh", photo: photo4, department: "Department of Chemistry" },
        { name: "Dr. Vinita Shukla", photo: photo5, department: "Department of Chemistry" },
        { name: "Dr. Rajni Dwivedi", photo: photo6, department: "Department of Physics" },
    ],
};

const MemberCard = ({ member }) => (
    <div className="member-card">
        <img src={member.photo} alt={member.name} className="member-photo" />
        <h4 className="member-name">{member.name}</h4>
        <p className="member-department">Faculty Of : {member.department}</p>
    </div>
);

const CommitteeRoleSection = ({ title, description, members, icon }) => (
    <div className="role">
        {icon}
        <h2 className="role-title">{title}</h2>
        <p>{description}</p>
        <div className="member-cards">
            {members.map((member, index) => (
                <MemberCard key={index} member={member} />
            ))}
        </div>
    </div>
);

const CommitteeStructure = () => (
    <section className="committee-structure">
        {/* Favicon Container */}
        <div className="favicon-container">
            <span className="favicon">🎨</span> {/* Example favicon, replace with icons as needed */}
            <span className="favicon">🖌️</span>
            <span className="favicon">🖼️</span>
        </div>

        <h2 className="text-4xl font-bold mb-4 text-center">Committee Structure</h2>
        <div className="structure">
            <CommitteeRoleSection 
                title="Convenor"
                description="The head of the committee who oversees all activities and events."
                members={membersData.convenor}
                icon={<FaCrown className="icon text-red-500" />}
            />
            <CommitteeRoleSection 
                title="Organizational Members"
                description="Experienced members who guide and assist in organizing events."
                members={membersData.organizationalMembers}
                icon={<FaChalkboardTeacher className="icon text-2xl text-blue-600" />}
            />
        </div>
    </section>
);

export default CommitteeStructure;
