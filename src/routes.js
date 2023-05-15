import { AUTH, MAIN, REG } from "./const";
import Auth from "./page/Auth";
import Main from "./page/Main";
import Reg from "./page/Reg";


export const publicRoutes = [
    {
        path: MAIN,
        Component: Main
    },
    {
        path: AUTH,
        Component: Auth
    },
    {
        path:REG,
        Component:Reg
    }
]