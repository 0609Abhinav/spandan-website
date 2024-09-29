import React from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaCrown } from 'react-icons/fa';
import './CommitteeStructure.css'; 
import photo1 from '../../assets/photo1.jpg';
import photo2 from '../../assets/photo2.jpg';
import photo3 from '../../assets/photo3.jpg';
import photo4 from '../../assets/photo4.jpg';
import photo5 from '../../assets/photo5.jpg';
import photo6 from '../../assets/photo6.jpg';

const membersData = {
    convenor: [
        { name: "Vandana Grover", photo: photo1, department: "Department of Chemistry" },
    ],
    organizationalMembers: [
        { name: "Ms. Deepmala", photo: photo2, department: "Department of Electronics and Communication" },
        { name: "Dr. Akanshi Gupta", photo: photo3, department: "Department of MBA" },
        { name: "Dr. Saloni Singh", photo: photo4, department: "Department of Chemistry" },
        { name: "Dr. Vinita Shukla", photo: photo5, department: "Department of Chemistry" },
        { name: "Dr. Rajni Dwivedi", photo: photo6, department: "Department of Physics" },
    ],
    seniorMembers: [
        { name: "Grace Lee", photo: "path/to/photo8.jpg", department: "Department of Geography" },
    ],
    juniorMembers: [
        { name: "Jack Wilson", photo: "path/to/photo11.jpg", department: "Department of Computer Science" },
    ]
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

        <h3 className="text-2xl font-bold mb-4 text-center">Committee Structure</h3>
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
                icon={<FaChalkboardTeacher className="icon text-4xl text-blue-600" />}
            />
            <CommitteeRoleSection 
                title="Senior Members"
                description="Experienced members who guide and assist in organizing events."
                members={membersData.seniorMembers}
                icon={<FaChalkboardTeacher className="icon text-4xl text-green-600" />}
            />
            <CommitteeRoleSection 
                title="Junior Members"
                description="New members who bring fresh ideas and assist in various tasks."
                members={membersData.juniorMembers}
                icon={<FaUserGraduate className="icon text-4xl text-purple-600" />}
            />
        </div>
    </section>
);

export default CommitteeStructure;
