import TabUnselectedIcon from '@mui/icons-material/TabUnselected'
import s from './Empty.module.scss'

interface IEmptyProps {
    children?: React.ReactNode;
}
const Empty = ({ children }: IEmptyProps) => {
    return (
        <div className={s.wrapper}>
            <TabUnselectedIcon
                sx={{
                    fontSize: 150,
                    alignSelf: "center",
                    justifySelf: "center",
                }}
            />
            <p className={s.lead}>
                {children}
            </p>
        </div>
    )
}

export default Empty