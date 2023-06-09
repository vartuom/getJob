import s from './Navigation.module.scss'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
    return (
        <nav className={s.header}>
            <ul>
                <li>
                    <NavLink
                        to=""
                        end
                        className={({ isActive }) =>
                            isActive ? `${s.link} ${s.link_active}` : s.link
                        }
                    >
                        Поиск
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="bookmarks"
                        end
                        className={({ isActive }) =>
                            isActive ? `${s.link} ${s.link_active}` : s.link
                        }
                    >
                        Закладки
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation