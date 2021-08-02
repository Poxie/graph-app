import { useParams } from "react-router-dom"
import { Flex } from "../../components/Flex"
import { Params } from "../../types/Params";
import { Editor } from "../editor/Editor";
import { CreateScreen } from "./CreateScreen";

export const Create = () => {
    const { type } = useParams<Params>();

    let component = null;
    switch(type) {
        case undefined:
            component = <CreateScreen />;
            break;
        default:
            if(!['line', 'bar', 'pie'].includes(type)) return component = <CreateScreen />;
            component = (
                <Editor 
                    type={type}
                />
            )
    }

    return(
        <div className="create">
            {component}
        </div>
    )
}