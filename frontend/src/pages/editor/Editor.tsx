import { useState } from "react"
import { Flex } from "../../components/Flex";
import { Params } from "../../types/Params";
import { Sidebar } from "./Sidebar"
import { Visuals } from "./Visuals";
import './Editor.scss';
import { initialChartValues } from "../../types/ChartValue";
import { DownloadChart } from "./DownloadChart";

interface Props {
    type: Params['type'];
}

export const Editor: React.FC<Props> = ({ type }) => {
    const [values, setValues] = useState(initialChartValues());

    return(
        <Flex className="editor">
            <Sidebar 
                type={type}
                values={values}
                setValues={setValues}
            />
            <Visuals 
                type={type}
                values={values.filter(value => !isNaN(value.value))}
            />
            <DownloadChart />
        </Flex>
    )
}