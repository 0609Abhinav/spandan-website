import React from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaCrown } from 'react-icons/fa';
import './CommitteeStructure.css'; 

const membersData = {
    convenor: [
        { name: "John Doe", photo: "path/to/photo1.jpg", department: "Computer Science" },
    ],
    organizationalMembers: [
        { name: "Alice Smith", photo: "path/to/photo2.jpg", department: "Mathematics" },
        { name: "Bob Johnson", photo: "path/to/photo3.jpg", department: "Physics" },
        { name: "Charlie Brown", photo: "path/to/photo4.jpg", department: "Chemistry" },
        { name: "David Wilson", photo: "path/to/photo5.jpg", department: "Biology" },
        { name: "Eve Davis", photo: "path/to/photo6.jpg", department: "English" },
        { name: "Frank Miller", photo: "path/to/photo7.jpg", department: "History" },
    ],
    seniorMembers: [
        { name: "Grace Lee", photo: "path/to/photo8.jpg", department: "Geography" },
        { name: "Hank Wright", photo: "path/to/photo9.jpg", department: "Economics" },
        { name: "Ivy Thompson", photo: "path/to/photo10.jpg", department: "Sociology" },
    ],
    juniorMembers: [
        { name: "Jack Wilson", photo: "path/to/photo11.jpg", department: "Computer Science" },
        { name: "Lily Martinez", photo: "path/to/photo12.jpg", department: "Mathematics" },
    ]
};

const MemberCard = ({ member }) => (
    <div className="member-card">
        <img src={member.photo} alt={member.name} className="member-photo" />
        <h4 className="member-name">{member.name}</h4>
        <p className="member-department">{member.department}</p>
    </div>
);

const CommitteeStructure = () => {
    return (
        <section className="committee-structure bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-2xl font-bold mb-4 text-center">Committee Structure</h3> {/* Centered Heading */}
            <div className="structure">
                {/* Convenor */}
                <div className="role">
                    <FaCrown className="icon" />
                    <h4 className="role-title">Convenor</h4>
                    <p>The head of the committee who oversees all activities and events.</p>
                    {membersData.convenor.map((member, index) => (
                        <div className="popup-card" key={index}>
                            <MemberCard member={member} />
                        </div>
                    ))}
                </div>

                {/* Organizational Members */}
                <div className="role">
                    <FaChalkboardTeacher className="icon" />
                    <h4 className="role-title">Organizational Members</h4>
                    <p>Experienced members who guide and assist in organizing events.</p>
                    {membersData.organizationalMembers.map((member, index) => (
                        <div className="popup-card" key={index}>
                            <MemberCard member={member} />
                        </div>
                    ))}
                </div>

                {/* Senior Members */}
                <div className="role">
                    <FaChalkboardTeacher className="icon" />
                    <h4 className="role-title">Senior Members</h4>
                    <p>Experienced members who guide and assist in organizing events.</p>
                    {membersData.seniorMembers.map((member, index) => (
                        <div className="popup-card" key={index}>
                            <MemberCard member={member} />
                        </div>
                    ))}
                </div>

                {/* Junior Members */}
                <div className="role">
                    <FaUserGraduate className="icon" />
                    <h4 className="role-title">Junior Members</h4>
                    <p>New members who bring fresh ideas and assist in various tasks.</p>
                    {membersData.juniorMembers.map((member, index) => (
                        <div className="popup-card" key={index}>
                            <MemberCard member={member} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CommitteeStructure;
