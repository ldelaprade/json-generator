import React, { useState } from 'react';
import '../App.css';

import VersionUrlSection from './VersionUrlSection';
import AhrsSection from './AhrsSection';
import WogSourceSection from './WogSourceSection';
import IgnoredBitsSection from './IgnoredBitsSection';


// Wizard component
const Wizard: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);
  
    const pages = [
      { name: 'General', component: <VersionUrlSection /> },
      { name: 'AHRS', component: <AhrsSection /> },
      { name: 'WOG Source', component: <WogSourceSection /> },
      { name: 'ARINC429 Labels', component: <ARINC429LabelsPage /> },
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
  
  
  const WOGSourcePage: React.FC = () => {
    // Similar structure to GeneralPage, but for WOG Source fields
    return <div>WOG Source Page</div>;
  };
  
  const ARINC429LabelsPage: React.FC = () => {
    // Similar structure to GeneralPage, but for ARINC429 Labels
    return <div>ARINC429 Labels Page</div>;
  };
  
  const IgnoredBitsPage: React.FC = () => {
    // Similar structure to GeneralPage, but for Ignored Bits
    return <div>Ignored Bits Page</div>;
  };


  export default Wizard;
