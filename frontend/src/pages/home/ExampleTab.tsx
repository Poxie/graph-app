import { Clickable } from "../../components/Clickable"

interface Props {
    active: boolean;
    type: string;
    onClick: (type: string) => void;
}
export const ExampleTab: React.FC<Props> = ({ active, type, onClick }) => {
    return(
        <Clickable className={`example-tab${active ? ' active' : ''}`} onClick={() => onClick(type.toLowerCase())}>
            {type} Chart
        </Clickable>
    )
}