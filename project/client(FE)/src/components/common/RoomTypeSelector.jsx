import React,{ useEffect, useState } from "react";
import {getRoomTypes} from "../utils/ApiFunctions.jsx";

const RoomTypeSelector = ({handleNewRoomInputChange,newRoom}) => {
    const [RoomTypes, setRoomTypes] = useState([""])
    const [showRoomTypeInput, setShowRoomTypesInput] = useState(false)
    const [newRoomType, setRoomType] = useState("")

    useEffect(() => {
        getRoomTypes().then((data) =>{
            setRoomTypes(data)
        })
    }, []);

    const handleNewRoomTypeInputChange =(e) => {
        setNewRoomType(e.target.value);
    }


    const handleAddNewRoomType = () => {
        if(newRoomType !== ""){
            setRoomType([...roomTypes,newRoomType])
            setNewRoomType("")
            setShowNewRoomTypesInput(false)
        }
    }
    return(
        <>
        {roomTypes.length > 0 &&(
            <div>
            <select
            id='roomTypes'
            name='roomTypes'
            value={newRoom.roomType}
            onChange={ (e) => {
                if(e.target.value === "Add New"){
                    setShowRoomTypesInput(true)
                }else {
                    handleRoomInputChange(e)
                }
            }}>
                <option value=""> select a room</option>
                <option value="Add New">Add New </option>
                {roomTypes.map((type, index) => (
                    <option key={index} value={type}>
                        {type}
                    </option>
                ))}
            </select>
            {showNewRoomTypeInput && (
                <div className='input-group'>
                    <input
                    className='form-control'
                    type='text'
                    placeholder='Enter a new room type'
                    onChange={handleNewRoomTypeInputChange}
                    />
                    <button className='btn btn-hotel' type='button' onClick={handleAddNewRoomType}>
                        Add
                    </button>
                </div>
            )}
            </div>
        )}
        </>

    )
}

export default RoomTypeSelector