import React, { useState } from 'react';
import '../../App.css';

import VersionUrlSection from './VersionUrlSection';
import AhrsSection from './AhrsSection';
import WogSourceSection from './WogSourceSection';
import IgnoredBitsSection from './IgnoredBitsSection';
import Arinc429Section from './Arinc429Section'

// Wizard component
const Wizard: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);
  
    const pages = [
      { name: 'General', component: <VersionUrlSection /> },
      { name: 'AHRS', component: <AhrsSection /> },
      { name: 'WOG Source', component: <WogSourceSection /> },
      { name: 'ARINC429 Labels', component: <Arinc429Section /> },
      { name: 'Ignored Bits', component: <IgnoredBitsSection /> }
    ];
  
    const handleNext = () => {
      if (currentPage < pages.length - 1) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const handlePrevious = () => {
      if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    return (
      <div className="wizard">

        <div >
          <h3>{pages[currentPage].name}</h3>
          {pages[currentPage].component}
        </div>
  
        <div className="wizard-status-bar">
            <span></span>
            <div className="buttons">
                <button onClick={handlePrevious} disabled={currentPage === 0}>Prev. page</button>
                <button onClick={handleNext}  disabled={currentPage === pages.length - 1}>Next page</button>
            </div>
        </div>


  
      </div>
    );
  };
  


  export default Wizard;
