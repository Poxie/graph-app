import { useHistory } from "react-router-dom"
import { Button } from "../../components/Button"
import { Flex } from "../../components/Flex"

export const HomeHeader = () => {
    const history = useHistory();

    const onClick = () => {
        history.push('/create');
    }

    return(
        <Flex className="home-header" alignItems={'center'} flexDirection={'column'}>
            <h1>
                Statistics Don't Have To Be Difficult
            </h1>
            <span>
                Create unique graphs with your own data with no effort
            </span>
            <Button onClick={onClick}>
                Start Charting Now
            </Button>
        </Flex>
    )
}