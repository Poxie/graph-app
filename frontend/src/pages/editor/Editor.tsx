import { useState } from "react"
import { Flex } from "../../components/Flex";
import { Params } from "../../types/Params";
import { Sidebar } from "./Sidebar"
import { Visuals } from "./Visuals";
import './Editor.scss';

interface Props {
    type: Params['type'];
}

export const Editor: React.FC<Props> = ({ type }) => {
    const [values, setValues] = useState([1,5,12,10,15]);

    return(
        <Flex className="editor">
            <Sidebar 
                type={type}
                values={values}
                setValues={setValues}
            />
            <Visuals 
                type={type}
                values={values.filter(value => !isNaN(value))}
            />
        </Flex>
    )
}