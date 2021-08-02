import { NavLink } from "react-router-dom"

interface Props {
    children: any;
    path: string;
}

export const CreateOption: React.FC<Props> = ({ children, path }) => {
    return(
        <NavLink className="create-option" to={`/create/${path}`}>
            {children}
        </NavLink>
    )
}