import axios from 'axios'

const instance = axios.create({
    //  baseURL: 'https://tinder-backend-clone-demo.herokuapp.com/'
    baseURL: 'http://localhost:8001'
})

export default instance