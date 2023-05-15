import React, { useContext, useState } from 'react';
import { AUTH } from '../../const';
import {NavLink, useNavigate} from 'react-router-dom'
import { registr } from '../Query/MainQuery';
import { Context } from '../..';

const Reg = () => {
    const [login, setLogin] = useState('')
    const [email, setEmail] = useState('')
    const [fio, setFio] = useState('')
    const [password, setPaswword] = useState('')
    const [confPassword, setConfPaswword] = useState('')


    const navigate = useNavigate()
    const {user} = useContext(Context)

    // const checkPassword = () => {
    //     if( password !== confPassword){
    //         alert('пароли не совпадают')
    //     }
    // }
    const regUser = async () => {
        // checkPassword()
        try {
            if(password !== '' && email !== '' && fio !== '' && login !== ''  ){
              if(password === confPassword){
                registr(login, email, fio, password).then((data) => {
                    if(data[0]=true){
                        user.setIsAuth(true) 
                        navigate('/')
                    }
                }) 
            }
            else{
                alert("пароли разные")
            }  
            }
            else{
                alert('пустое')
            }
            
       
        
        
        } catch (error) {
            alert('такое уже есть')
        }
    }

    return (
        <div className='reg'>
            <span className='zag'>Зарегестрироваться</span>
            <div>
                <span>Логин</span>
                <div><input type="text" onChange={e => setLogin(e.target.value)}/></div>
            </div>
            <div>
                <span>Почта</span>
                <div><input type="text" onChange={e => setEmail(e.target.value)} /></div>
            </div>
            <div>
                <span>ФИО</span>
                <div><input type="text" onChange={e => setFio(e.target.value)} /></div>
            </div>
            <div>
                <span>Пароль</span>
                <div><input type="text" onChange={e => setPaswword(e.target.value)}/></div>
            </div>
            <div>
                <span>Пароль подт</span>
                <div><input type="text" onChange={e => setConfPaswword(e.target.value)} /></div>
            </div>
            <div> <button type='button' onClick={regUser}> REG BTN</button></div>
            <div> 
                <span> Уже зареганы</span> 
                <NavLink to={AUTH}> Войти</NavLink>
            </div>
        </div>
    );
};

export default Reg;