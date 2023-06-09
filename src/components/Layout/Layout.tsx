import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import s from './Layout.module.scss'

const Layout = () => {
    return (
        <div className={s.layout}>
            <Header />
            <main className={s.contentWrapper}>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout