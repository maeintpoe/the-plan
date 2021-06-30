import React, { useState, useEffect } from 'react';
import './Budget.css';
import { Table, TableHead, TableBody, 
        TableRow, TableCell} from '@material-ui/core';
import firebase from 'firebase';
import { db } from '../../firebase/firebase';
// Icons
import AddIcon from '@material-ui/icons/Add';

function Budget() {
    const [budgetList, setBudgetList] = useState();
    const [budgetListDescInput, setBudgetListDescInput] = useState("");
    const [budgetListCostInput, setBudgetListCostInput] = useState(0.0);


    const addToBudgetList = () => {
        console.log("add item to budget list");
        setBudgetListDescInput("");
        setBudgetListCostInput(0.0);
    }
    return (
        <div className="budget">
            <h2 className="budget__title">Budget</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Desc</TableCell>
                        <TableCell align="right">Cost ($)</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {budgetList ? (
                        <div>
                        {/* {budgetList.map((budgetItem) => ( */}
                        <TableCell>Flight Tickets</TableCell>
                        <TableCell align="right">1000</TableCell>
                    {/* ))} */}
                        </div>
                    ) : (<p>No budget planned</p>)

                    }
                    

                    

                </TableBody>
            </Table>
            <div className="budget__input">
                <form>
                    <input value={budgetListDescInput}
                    onChange={(e) => setBudgetListDescInput(e.target.value)}
                    placeholder={`Enter description`}
                    />
                    <input value={budgetListCostInput.toFixed(2)} 
                    onChange={(e) => setBudgetListCostInput(e.target.value)}
                    placeholder={`Enter cost`}/>
                    <button
                        className="budget__inputButton"
                        type="submit"
                        onClick={addToBudgetList}
                    >
                        <AddIcon className="budget___addBudgetListIcon" fontSize="small" />
                    </button>
                </form>
            </div>
            
        </div>
    )
}

export default Budget;
