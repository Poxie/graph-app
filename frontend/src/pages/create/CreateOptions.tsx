import { LineChart } from "../../components/LineChart"
import { Flex } from "../../components/Flex"
import { CreateOption } from "./CreateOption"
import './Create.scss';
import { BarChart } from "../../components/BarChart";
import { PieChart } from "../../components/PieChart";

const displayValues = [{value: 50, label: 'Potatoes'}, {value: 100, label: 'Onions'}, {value: 200, label: 'Grapefruit'}];
export const CreateOptions = () => {
    return(
        <Flex className="create-options" flexWrap={'wrap'} justifyContent={'center'}>
            <CreateOption path={'line'}>
                <LineChart 
                    values={displayValues}
                    animate={true}
                />
            </CreateOption>
            <CreateOption path={'bar'}>
                <BarChart 
                    values={displayValues}
                    animate={true}
                />
            </CreateOption>
            <CreateOption path={'pie'}>
                <PieChart 
                    values={displayValues}
                    animate={true}
                    hasLabels={false}
                />
            </CreateOption>
        </Flex>
    )
}