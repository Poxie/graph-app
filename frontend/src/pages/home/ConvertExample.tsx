import { BarChart } from "../../components/BarChart"
import { Flex } from "../../components/Flex"
import { initialChartValues } from "../../types/ChartValue"
import { HomeExample } from "./HomeExample"

export const ConvertExample = () => {
    return(
        <Flex className="convert-example">
            <HomeExample 
                title={'From illustration to image'}
                description={`All of our charts can be converted and directly downloaded by you as an image! Create a chart with your values, and simply download it to use it anywhere!`}
                reversed={true}
            >
                <img src={'https://i.poxgur.com/1nYvAG.png'} alt="" />
            </HomeExample>
        </Flex>
    )
}