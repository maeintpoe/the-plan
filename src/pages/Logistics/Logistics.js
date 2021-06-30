import React, { useState } from 'react';
import './Logistics.css';
import { useSelector } from 'react-redux';
import { selectPlanId} from '../../features/appSlice';
import StackGrid from 'react-stack-grid';
import Checklist  from './Checklist';
import Budget from './Budget';

// Various card styles regarding summary, budget, checklist(use checkboxes with list from material ui)
function Logistics() {
    const planId = useSelector(selectPlanId);
    const [summary, setSummary] = useState(null);
    const [budget, setBudget] = useState(null);
    const [total, setTotal] = useState(0);

    const gridProps = {
        className: "logistics__grid",
        columnWidth:"50%",
        gutter: 5,
        // style: {
        //   borderBottom: "2px solid black",
        // },
      };


    return (
        <div className="logistics">
            <StackGrid {...gridProps} >
                <div className="logistics__summary">
                    <h3>This is the summary</h3>
                    
                </div>
                
                <div className="logistics__checklist">
                    <Checklist planId={planId} />
                </div>

                <div className="logistics__budget">
                    <Budget planId={planId}/>
                </div>
            </StackGrid>
        </div>
    )
}

export default Logistics;
