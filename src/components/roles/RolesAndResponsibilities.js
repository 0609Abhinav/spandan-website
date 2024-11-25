import React from 'react';
import './RolesAndResponsibilities.css'; // Import CSS for styling
import brushIcon from '../../assets/brush.png'; // Correct path to your image
import paletteIcon from '../../assets/color-palette.png'; // Correct path to your image
import canvasIcon from '../../assets/canvas.png'; // Correct path to your image

const RolesAndResponsibilities = () => {
  return (
    <section className="roles-responsibilities">
      <div className="overlay">
        <h3>Roles and Responsibilities</h3>
        <div className="content">
          <p><strong>The Fine Arts Committee</strong> is responsible for all intra and inter-collegiate fine arts events in the college.</p>
          <p>They plan and schedule fine arts events for the academic year, including tentative dates in the academic calendar.</p>
          <p>They prepare budgets for all fine arts events and obtain necessary approvals.</p>
          <p>Conduct meetings to discuss and delegate tasks effectively.</p>
          <p>Organize fine arts events by:- </p>
          <div className="sub-content">
              <p>Preparing the annual budget for various events.</p>
             <p>Obtaining formal permission from college authorities.</p>
              <p>Deciding the date, time, and agenda of the program.</p>
              <p>Informing staff and students about the events.</p>
            <p>Arranging the venue and logistics (audio/video system, dais, podium, etc.).</p>
            <p>Inviting chief guests and dignitaries.</p>
            <p>Arranging mementos for guests and gifts/certificates for participants.</p>
          </div>
          <p>Display information about festivals on the Notice Board/Website.</p>
          <p>Maintain records of all fine arts activities.</p>
          <p>Organize competitions to identify and encourage potential talents.</p>
          <p>Motivate students for inter-college cultural events to prove their mettle.</p>
        </div>
        <div className="image-container">
          <img src={brushIcon} alt="Brush Icon" className="icon" />
          <img src={paletteIcon} alt="Palette Icon" className="icon" />
          <img src={canvasIcon} alt="Canvas Icon" className="icon" />
        </div>
      </div>
    </section>
  );
};

export default RolesAndResponsibilities;
