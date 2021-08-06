import { reverse } from "dns"
import { Flex } from "../../components/Flex"

interface Props {
    title: string;
    description: string;
    reversed?: boolean;
    children: any;
}
export const HomeExample: React.FC<Props> = ({ title, description, reversed, children }) => {
    const text = (
        <div className="example-text">
            <h1>
                {title}
            </h1>
            <span>
                {description}
            </span>
        </div>
    )

    return(
        <Flex className={`home-example${reversed ? ' reversed' : ''}`} alignItems={'center'}>
            {reversed && text}
            <div className="example-container">
                {children}
            </div>
            {!reversed && text}
        </Flex>
    )
}