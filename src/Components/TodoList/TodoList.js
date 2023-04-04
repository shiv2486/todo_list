import React, {useEffect, useState, useRef} from 'react';
import AddTask from '../Modal/AddTask'
import Bin from '../Bin/Bin';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [binItems, setBinItems] = useState([]);
    
    useEffect(() => {
        let arr = localStorage.getItem("taskList")
       
        if(arr){
            let obj = JSON.parse(arr)
            setTaskList(obj)
        }
    }, [])

    const dragItem = useRef(null)
    const dragOverItem = useRef(null)
    const handleSort = () => {

            // duplicate
            let newTaskList = [...taskList];
    
        	//remove and save the dragged item content
        	const draggedItemContent = newTaskList.splice(dragItem.current, 1)[0]
    
        	//switch the position
        	newTaskList.splice(dragOverItem.current, 0, draggedItemContent)
    
        	//reset the position ref
        	dragItem.current = null
        	dragOverItem.current = null
            // setting 
            setTaskList(newTaskList);
        }

    const deleteTask = (index) => {
        let tempList = taskList
        let deleted = tempList.splice(index, 1)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        localStorage.setItem("deletedList", JSON.stringify(deleted))
        console.log("temp", tempList)
        setTaskList(tempList)
        setBinItems(prevBin => [...prevBin, deleted])
    }


    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = (taskObj) => {
        let tempList = taskList
        tempList.push(taskObj)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        setModal(false)
    }

    const restoreTask = (taskObj) => {
        setTaskList(prevList=> [...prevList, taskObj]);
        saveTask(taskObj);
    }
    // console.log("bin items",binItems);
    console.log("taskItems", taskList);

    return (
        <>
            <div className='container'>
                <div className='screenTask'>
                    <div className = "text-center">
                        <h3>Add Todos</h3>
                        <button className = "btn btn-primary mt-2" onClick = {() => setModal(true)} >Create Task</button>
                    </div>
                    <div className = "task-container">
                    {taskList && taskList.map((obj, index) => (
                        <div className = "card-wrapper m-2 " 
                            draggable
                            onDragStart={(e) => (dragItem.current = index)}
                            onDragEnter={(e) => (dragOverItem.current = index)}
                            onDragEnd={handleSort}
                            onDragOver={(e) => e.preventDefault()}
                            >
                            <div className = "task-holder">
                                <div className='main-item'>
                                    <h5 className = "card-header">{obj.Name}</h5>
                                    <p className = "mt-1">{obj.Description}</p>
                                </div>

                                <div style={{"position": "absolute", "right" : "20px"}}>
                                    <button className='btn btn-primary' onClick = {()=>deleteTask(index)}>Delete</button>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    <AddTask  toggle = {toggle} modal = {modal} save = {saveTask}/>
                </div>
                <div className='screenBin'>
                    <h3>Recycle Bin</h3>
                    <p>You can Add/restore your items now..</p>
                    <Bin list={binItems} restoreTask={restoreTask} />
                </div>
            </div>
        </>
    );
};

export default TodoList;