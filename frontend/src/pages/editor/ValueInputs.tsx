import { Flex } from "../../components/Flex"
import { Input } from "../../components/Input"

interface Props {
    value: number;
    label: string;
    handleChange: (type: 'value' | 'label', value: number | string, index: number) => void;
    index: number;
}
export const ValueInputs: React.FC<Props> = ({ value, label, handleChange, index }) => {
    return(
        <Flex className="value-inputs">
            <Input 
                defaultValue={isNaN(value) ? '' : value.toString()}
                onChange={(value) => handleChange('value', parseInt(value), index)}
                noSubmit={true}
                defaultFocus={true}
            />
            <Input 
                defaultValue={label}
                placeholder={'Enter value label...'}
                onChange={(value) => handleChange('label', value, index)}
            />
        </Flex>
    )
}