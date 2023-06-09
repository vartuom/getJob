import Navigation from '../Navigation/Navigation'
import s from './Header.module.scss'
import rosTrudLogo from '../../assets/images/Emblem_of_Rostrud.svg'

const Header = () => {
    return (
        <div className={s.header}>
            <div className={s.leadWrapper}>
                <div className={s.lead}>
                    <h1 className={s.leadTitle}>
                        Поиск работы
                    </h1>
                    <p className={s.leadParagraph}>
                        С использованием API «Работа России»
                    </p>
                    <Navigation />
                </div>
                <img
                    className={s.logo}
                    src={rosTrudLogo}
                    alt="Логотип лабораторий Минюста. Двуглавый орел под увеличительным стеклом."
                />
            </div>
        </div>
    )
}

export default Header