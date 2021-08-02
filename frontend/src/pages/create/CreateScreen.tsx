import { Flex } from "../../components/Flex"
import { CreateOptions } from "./CreateOptions"

export const CreateScreen = () => {
    return(
        <Flex className="create-screen" flexDirection={'column'} justifyContent={'center'}>
            <h1>
                Choose the chart of your liking
            </h1>
            <Flex className="create-container" alignItems={'center'}>
                <CreateOptions />
            </Flex>
        </Flex>
    )
}