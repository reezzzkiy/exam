import {makeAutoObservable} from 'mobx'

export default class postStore {
    constructor(){
        this._post = []
        makeAutoObservable(this)
    }

    setIsAuth(post){
        this._post = post
    }

    get Postik(){
        return this._post
    }

}