import { API_URL } from "../config";

export const searchByKeyword = async (searchWord) => {
    console.log(searchWord)

    const result = await fetch(API_URL + "/searchByKeyword", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({searchWord: searchWord})
        
    })
    const data = await result.json();
   

    if(data.error){
        throw new Error(data.error.message);
    }
    return data;
}