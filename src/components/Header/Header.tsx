import Navigation from '../Navigation/Navigation'
import s from './Header.module.scss'
import rosTrudLogo from '../../assets/images/Emblem_of_Rostrud.svg'

const Header = () => {
    return (
        <header className={s.header}>
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
                    alt="Логотип Роструда. Двуглавый орел с шестерней и молотами."
                />
            </div>
        </header>
    )
}

export default Header