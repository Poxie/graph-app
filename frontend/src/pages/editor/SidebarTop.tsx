import { useHistory } from "react-router-dom";
import { Dropdown } from "../../components/Dropdown"
import { Params } from "../../types/Params";

const tabs = ['Line', 'Bar', 'Pie'];

interface Props {
    type: Params['type'];
}
export const SidebarTop: React.FC<Props> = ({ type }) => {
    const history = useHistory();
    const handleChange = (type: string) => {
        history.push(`/create/${type}`);
    }
    
    return(
        <div className="sidebar-top">
            <span className="header">
                Chart Type
            </span>
            <Dropdown 
                tabs={tabs.map(tab => {return {label: `${tab} Chart`, id: tab.toLowerCase()}})}
                active={type}
                onChange={handleChange}
            />
        </div>
    )
}