import React, { useState } from 'react';
import '../../App.css';

import VersionUrlSection from './VersionUrlSection';
import AhrsSection from './AhrsSection';
import WogSourceSection from './WogSourceSection';
import IgnoredBitsSection from './IgnoredBitsSection';
import Arinc429Section from './Arinc429Section'
import DataGridDemo3 from './DataGridDemo3'

// Wizard component
const Wizard: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);
  
    const pages = [
      { name: 'General', component: <VersionUrlSection /> },
      { name: 'AHRS', component: <AhrsSection /> },
      { name: 'WOG Source', component: <WogSourceSection /> },
      { name: 'ARINC429 Labels', component: <Arinc429Section /> },
      { name: 'Ignored Bits', component: <IgnoredBitsSection /> },
      { name: 'TEST', component: <DataGridDemo3 /> }
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

        <div className="wizard-page-container">
          <h3>{pages[currentPage].name}</h3>
          {pages[currentPage].component}
        </div>
  
        <div className="wizard-navbar">
            <div className="buttons">
                <button style={{marginLeft: 0}} onClick={handlePrevious} disabled={currentPage === 0} >Prev. page</button>
                <button onClick={handleNext}  disabled={currentPage === pages.length - 1}>Next page</button>
            </div>
        </div>


  
      </div>
    );
  };
  


  export default Wizard;
