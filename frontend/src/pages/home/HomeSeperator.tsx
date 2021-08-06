import { LineChart } from "../../components/LineChart"

const values = [{label: '0', value: 0}, {label: '1', value: 4}, {label: '1', value: 3}, {label: '1', value: 7}, {label: '1', value: 9}, {label: '2', value: 8}, {label: '3', value: 11}];
export const HomeSeperator = () => {
    return(
        <LineChart 
            values={values}
            animate={true}
        />
    )
}