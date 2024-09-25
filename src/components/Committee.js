import React from 'react';

const Committee = () => {
    const committeeMembers = [
        { name: 'Alice', role: 'President' },
        { name: 'Bob', role: 'Secretary' },
        { name: 'Charlie', role: 'Treasurer' },
    ];

    return (
        <section id="committee">
            <h2>Committee Members</h2>
            <ul>
                {committeeMembers.map((member, index) => (
                    <li key={index}>{member.name} - {member.role}</li>
                ))}
            </ul>
        </section>
    );
};

export default Committee;
