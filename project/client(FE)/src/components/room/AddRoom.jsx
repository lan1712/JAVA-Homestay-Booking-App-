import React, {useState} from 'react';
import {addRoom} from "./ApiFunctions.jsx";
import RoomTypeSelector from '../common/RoomTypeSelector.jsx';

const AddRoom = () => {
    const [newRoom,setNewRoom] = useState({
        photo : null,
        roomTypes : "",
        roomPrice : ""
    })

    const[imagePreview,setImagePreview] = useState("")
    const [successMessage,setSuccessMessage] = useState("")
    const [errorMessage,setErrorMessage] = useState("")

    const handleRoominputChange = (e) => {
        const name = e.target.name
        let value = e.target.value;
        if (name === "roomPrice") {
            if (!isNaN(value)) {

                value.parseInt(value)
            } else {
                value = ""
            }
        }
        setNewRoom({...newRoom,[name]: value})
    }
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setNewRoom({...newRoom,photo: selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))

    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const  success =await addRoom(newRoom.photo, newRoom.roomTypes,newRoom.roomPrice)
            if(success !== undefined){
                setSuccessMessage("A new room has been added successfully.")
                setNewRoom({photo: null,roomTypes: "", roomPrice: ""})
                setImagePreview("")
                setErrorMessage("")

            }else{
                setErrorMessage("Error adding room")
            }
        }catch(error){
            setErrorMessage(error.message)

        }
    }




    return (
        <>
            <section className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h2 className="mt-5 mb-2"> Add a New Room</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="roomType" className="form-label">
                                    Room Type
                                </label>
                                <div>
                                    <RoomTypeSelector handleRoomInputChange={handleRoominputChange} 
                                    newRoom={newRoom} />
                                </div>


                                <input
                                    className="form-control"
                                    required
                                    id="roomType"
                                    type="text"
                                    name="roomTypes"
                                    value={newRoom.roomTypes}
                                    onChange={handleRoomInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="roomPrice" className="form-label">
                                    Room Price
                                </label>
                                <input
                                    className="form-control"
                                    required
                                    id="roomPrice"
                                    type="number"
                                    name="roomPrice"
                                    value={newRoom.roomPrice}
                                    onChange={handleRoominputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="roomPhoto" className="form-label">
                                    Room Photo
                                </label>
                                <input
                                    id="photo"
                                    name="photo"
                                    type="file"
                                    className="form-control"
                                    onChange={handleImageChange}
                                />
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Preview Room Photo"
                                        style={{ maxWidth: "400px", maxHeight: "400px" }}
                                        className="mb-3"
                                    />
                                )}
                            </div>

                            <div className="d-grid d-md-flex mt-2">
                                <button className="btn btn-outline-primary ml-5">
                                    Save Room
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};