import { Flex } from "../../components/Flex";
import { PracticalExample } from "./PracticalExample";
import { ConvertExample } from "./ConvertExample";

export const HomeExamples = () => {
    return(
        <Flex className="home-examples" flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
            <PracticalExample />
            <ConvertExample />
        </Flex>
    )
}