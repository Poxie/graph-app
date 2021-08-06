import { Clickable } from "../../components/Clickable"
import { ExampleTab } from "./ExampleTab"

interface Props {
    type: string;
    setType: (value: string) => void;
}
export const ExampleSelector: React.FC<Props> = ({ type, setType }) => {
    return(
        <div className="example-selector">
            {['Bar', 'Line', 'Pie'].map(t => {
                return(
                    <ExampleTab 
                        active={t.toLowerCase() === type}
                        onClick={setType}
                        type={t}
                        key={t}
                    />
                )
            })}
        </div>
    )
}