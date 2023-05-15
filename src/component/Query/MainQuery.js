import axios from 'axios'
import jwtDecode from 'jwt-decode'



const $host = axios.create({
    baseURL: 'http://localhost:5000'
})

export const registr = async(login, email, fio, password) => {
    const {data} = await $host.post('/reg', {login, email, fio, password})
    if(data.token != undefined){
        localStorage.setItem('token', data.token)
        const test = [true, jwtDecode(data.token)]
        return test
    }
    else{
        alert('ты лох')
        return[false]
    }
    
}

export const authoriz = async(login, password) => {
    const{data} = await $host.post('/auth', {login, password})
    if(data.token != undefined){
        localStorage.setItem('token', data.token)
        const test = [true, jwtDecode(data.token)]
        return test
    }
    else{
        alert('ты лох')
        return[false]
    }
}

