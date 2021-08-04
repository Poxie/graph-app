import { BarChart } from "../../components/BarChart";
import { LineChart } from '../../components/LineChart';
import { PieChart } from "../../components/PieChart";
import { ChartValue } from "../../types/ChartValue";
import { Params } from "../../types/Params";

interface Props {
    values: ChartValue[];
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
                    hasYAxis={true}
                    hasXAxis={true}
                />
            )
            break;
        case 'line':
            component = (
                <LineChart 
                    values={values}
                    animate={false}
                    hasXAxis={true}
                    hasYAxis={true}
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