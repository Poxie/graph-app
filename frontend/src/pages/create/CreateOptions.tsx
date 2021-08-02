import { LineChart } from "../../components/LineChart"
import { Flex } from "../../components/Flex"
import { CreateOption } from "./CreateOption"
import './Create.scss';
import { BarChart } from "../../components/BarChart";
import { PieChart } from "../../components/PieChart";

export const CreateOptions = () => {
    return(
        <Flex className="create-options" flexWrap={'wrap'} justifyContent={'center'}>
            <CreateOption path={'line'}>
                <LineChart 
                    values={[1,5,8,10,15,20,30,32,25,30,20,25,40]}
                    animate={true}
                />
            </CreateOption>
            <CreateOption path={'bar'}>
                <BarChart 
                    values={[50,100,200]}
                    animate={true}
                />
            </CreateOption>
            <CreateOption path={'pie'}>
                <PieChart 
                    values={[10, 15, 30, 41, 21]}
                    animate={true}
                />
            </CreateOption>
        </Flex>
    )
}