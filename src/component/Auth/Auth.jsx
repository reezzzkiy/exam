import React, {useContext, useState } from 'react';
import { REG } from '../../const';
import {NavLink, useNavigate} from 'react-router-dom'
import { authoriz } from '../Query/MainQuery';
import { Context } from '../..';

const Auth = () => {
    const [login, setLogin] = useState('')
    const [password, setPaswword] = useState('')

    const navigate = useNavigate()
    const {user} = useContext(Context)

    const authUser = async () => {
        try {
            if(password !== ''  && login !== ''  ){
                authoriz(login, password).then((data) => {
                    if(data[0]=true){
                        user.setIsAuth(true) 
                        navigate('/')
                    }
                })
            }
            else{
                alert("пустое поле")
            }
        } catch (error) {
            alert("ошибка")
        }
    }

    return (
        <div className='reg'>
            <span className='zag'>Авторизация</span>
            <div>
                <span>Логин</span>
                <div><input type="text" onChange={e => setLogin(e.target.value)}/></div>
            </div>
            <div>
                <span>Пароль</span>
                <div><input type="text" onChange={e => setPaswword(e.target.value)}/></div>
            </div>
            <div> <button type='button' onClick={authUser}> AUTH BTN</button></div>
            <div> 
                <span> Уже зареганы</span> 
                <NavLink to={REG}> Регистрация</NavLink>
            </div>
        </div>
    );
};

export default Auth;