import React, { useEffect, useState } from "react";

export default function Bin({list, restoreTask}){
    
    const [binArray, setBinArray] = useState([]);

    useEffect(()=>{
        setBinArray(list.flat(1))
    },[list])

    const handleRestore = (obj)=>{
        let taskObj = {}
        taskObj["Name"] = obj.Name
        taskObj["Description"] = obj.Description
        restoreTask(taskObj);
        let newBinArray = binArray.filter(each=> each.Name !== obj.Name )
        setBinArray(newBinArray)
    }
    console.log(binArray);

    return (
        <>
            <div>
            {binArray && binArray.map((obj, index) => (
            <div className = "card-wrapper m-2 "> 
                <div className = "task-holder">
                    <div className='main-item'>
                        <h3 className = "card-header">{obj.Name}</h3>
                        <h6 className = "mt-1">{obj.Description}</h6>
                    </div>

                    <div style={{"position": "absolute", "right" : "20px"}}>
                        <button className='btn btn-primary' onClick={()=>handleRestore(obj)}>Add</button>
                    </div>
                </div>
            </div>
            ))}
            </div>
        </>
    )
}