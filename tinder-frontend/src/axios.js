import axios from 'axios'

const instance = axios.create({
    //  baseURL: 'https://tinder-backend-clone-demo.herokuapp.com/'
    baseURL: 'https://tinder-backend-clone-demo.herokuapp.com/'
})

export default instance