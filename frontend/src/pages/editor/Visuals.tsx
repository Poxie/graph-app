import { BarChart } from "../../components/BarChart";
import { LineChart } from '../../components/LineChart';
import { PieChart } from "../../components/PieChart";
import { Params } from "../../types/Params";

interface Props {
    values: number[];
    type: Params['type'];
}

export const Visuals: React.FC<Props> = ({ values, type }) => {

    let component = null;
    switch(type) {
        case 'bar':
            component = (
                <BarChart 
                    values={values}
                    animate={false}
                />
            )
            break;
        case 'line':
            component = (
                <LineChart 
                    values={values}
                    animate={false}
                />
            )
            break;
        case 'pie':
            component = (
                <PieChart 
                    values={values}
                    animate={false}
                />
            )
    }

    return(
        <div className="visuals">
            {component}
        </div>
    )
}