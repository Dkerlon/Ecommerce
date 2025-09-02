export default async function getUserInfoById(id:string) {
    try{
        const response = await fetch(`https://ecommerce-e0a11-default-rtdb.firebaseio.com/users/${id}.json`)
        const data = await response.json()
        return data
    }
    catch(error){
        console.log(error)
    }
}
