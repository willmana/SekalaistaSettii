import axios from 'axios'
const baseUrl = '/availability'

const getData = async (manufacturer) => {
    const response = await axios.get(`${baseUrl}/${manufacturer}`)
    return response.data
}


export default {getData}