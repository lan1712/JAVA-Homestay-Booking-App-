import axios  from "axios";

export const api = axios.create({
    baseURL: "https://localhost:1206/"
})

export async function addRoom(photo,roomType,roomPrice){
    const formData = new FormData()
    formData.append("photo",photo)
    formData.append("roomType",roomType)
    formData.append("roomPrice",roomPrice)

    const respone= await  api.post("/rooms/add/new-room", formData)
    if(respone.status === 201){
        return true
    }else{
        return false
    }
}



export async function getRoomTypes(){
    try{
        const respone= await api.get("/rooms/rooms-types")
        return respone.data
    }catch(error){
        throw new Error("Error fetching rooms types")
    }
}
