import axios from 'axios'
const baseUrl = '/get'

const getGloves = async () => {
    const response = await axios.get(`${baseUrl}/gloves`)
    return response.data
}

const getFacemasks = async () => {
    const response = await axios.get(`${baseUrl}/facemasks`)
    return response.data
}

const getBeanies = async () => {
    const response = await axios.get(`${baseUrl}/beanies`)
    return response.data
}

export default {getBeanies, getFacemasks, getGloves}