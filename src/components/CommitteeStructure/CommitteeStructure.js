import React, { useEffect, useState } from 'react';
import { FaChalkboardTeacher, FaCrown } from 'react-icons/fa';
import './CommitteeStructure.css';
import { supabase } from '../../lib/supabase';

const MemberCard = ({ member }) => (
  <div className="member-card">
    {member.image_url && <img src={member.image_url} alt={member.name} className="member-photo" />}
    <h4 className="member-name">{member.name}</h4>
    <p className="member-department">Faculty Of: {member.bio}</p>
  </div>
);

const CommitteeRoleSection = ({ title, description, members, icon }) => (
  <div className="role">
    {icon}
    <h2 className="role-title">{title}</h2>
    <p>{description}</p>
    <div className="member-cards">
      {members.map((m) => <MemberCard key={m.id} member={m} />)}
    </div>
  </div>
);

const CommitteeStructure = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    supabase.from('teachers').select('*').order('created_at', { ascending: true })
      .then(({ data }) => setTeachers(data || []));
  }, []);

  const convenors = teachers.filter(t => t.role?.toLowerCase() === 'convenor');
  const members = teachers.filter(t => t.role?.toLowerCase() !== 'convenor');

  return (
    <section className="committee-structure">
      <div className="favicon-container">
        <span className="favicon">🎨</span>
        <span className="favicon">🖌️</span>
        <span className="favicon">🖼️</span>
      </div>
      <h2 className="text-4xl font-bold mb-4 text-center">Committee Structure</h2>
      <div className="structure">
        {convenors.length > 0 && (
          <CommitteeRoleSection title="Convenor"
            description="The head of the committee who oversees all activities and events."
            members={convenors} icon={<FaCrown className="icon text-red-500" />} />
        )}
        {members.length > 0 && (
          <CommitteeRoleSection title="Organizational Members"
            description="Experienced members who guide and assist in organizing events."
            members={members} icon={<FaChalkboardTeacher className="icon text-2xl text-blue-600" />} />
        )}
      </div>
    </section>
  );
};

export default CommitteeStructure;
