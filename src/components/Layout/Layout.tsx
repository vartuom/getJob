import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import s from './Layout.module.scss'

const Layout = () => {
    return (
        <div className={s.layout}>
            <Header />
            <div className={s.contentWrapper}>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout