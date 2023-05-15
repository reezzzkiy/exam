import {makeAutoObservable} from 'mobx'

export default class userStore {
    constructor(){
        this._isAuth = false
        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool
    }

    get Auth(){
        return this._isAuth
    }

}