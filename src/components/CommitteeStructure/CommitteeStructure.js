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
        { name: "Vandana Grover", photo: photo1, department: "Chemistry" },
    ],
    organizationalMembers: [
        { name: "Alice Smith", photo: photo2, department: "Mathematics" },
        { name: "Bob Johnson", photo: photo3, department: "Physics" },
        { name: "Charlie Brown", photo: photo4, department: "Biology" },
        { name: "David Wilson", photo: photo5, department: "History" },
        { name: "Emily Davis", photo: photo6, department: "Literature" },
    ],
    seniorMembers: [
        { name: "Grace Lee", photo: "path/to/photo8.jpg", department: "Geography" },
    ],
    juniorMembers: [
        { name: "Jack Wilson", photo: "path/to/photo11.jpg", department: "Computer Science" },
    ]
};

const MemberCard = ({ member }) => (
    <div className="member-card">
        <img src={member.photo} alt={member.name} className="member-photo" />
        <h4 className="member-name">{member.name}</h4>
        <p className="member-department">Department: {member.department}</p>
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
                icon={<FaCrown className="icon  text-red-500" />}
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
