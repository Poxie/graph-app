import { ChartValue } from "../../types/ChartValue"
import { Params } from "../../types/Params"
import { SidebarTop } from "./SidebarTop"
import { SidebarValues } from "./SidebarValues"

interface Props {
    type: Params['type'];
    values: ChartValue[];
    setValues: React.Dispatch<React.SetStateAction<ChartValue[]>>;
}
export const Sidebar: React.FC<Props> = ({ type, values, setValues }) => {
    return(
        <div className="sidebar">
            <SidebarTop 
                type={type}
            />
            <SidebarValues 
                values={values}
                setValues={setValues}
            />
        </div>
    )
}