import { useState } from "react";
import { BarChart } from "../../components/BarChart";
import { Flex } from "../../components/Flex";
import { LineChart } from "../../components/LineChart";
import { PieChart } from "../../components/PieChart";
import { initialChartValues } from "../../types/ChartValue";
import { ExampleSelector } from "./ExampleSelector";
import { HomeExample } from "./HomeExample";

export const PracticalExample = () => {
    const [type, setType] = useState('bar');

    const values = initialChartValues();
    let component = null;
    switch(type) {
        case 'bar':
            component = <BarChart animate={true} values={values} />;
            break;
        case 'line':
            component = <LineChart animate={true} values={values} />;
            break;
        case 'pie':
            component = <PieChart animate={true} values={values} hasLabels={false} />
    }

    return(
        <Flex className="practical-example" alignItems={'center'}>
            <HomeExample 
                title={'Multiple chart options'}
                description={`We provide multiple chart options, good for any situation, no matter what for. If you need a chart, your ideal chart will be found here. Check out the preview of our charts here before creating your own!`}
            >
                <ExampleSelector 
                    setType={setType}
                    type={type}
                />
                {component}
            </HomeExample>
        </Flex>
    )
}