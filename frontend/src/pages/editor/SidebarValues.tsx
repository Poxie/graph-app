import { createRef, RefObject, useEffect, useRef, useState } from "react";
import { Button } from "../../components/Button"
import { Flex } from "../../components/Flex"
import { Input } from "../../components/Input"

const findDuplicates = (arr: number[]) => {
    let duplicates: number[] = [];
    let hasNaN = false;
    arr.forEach(previous => {
        if(hasNaN) {
            duplicates.push(previous);
        }
        if(isNaN(previous)) {
            hasNaN = true;
        }
    })
    return duplicates;
}
interface Props {
    values: number[];
    setValues: React.Dispatch<React.SetStateAction<number[]>>;
}
export const SidebarValues: React.FC<Props> = ({ values, setValues }) => {
    const focusing = useRef<false | number>(0);
    const valueLength = useRef(values.length);

    useEffect(() => {
        valueLength.current = values.length;
    }, [values.length]);

    const handleChange = (value: number, index: number) => {
        setValues(previous => {
            const newValues = previous.map((prev, key) => {
                if(key === index) {
                    prev = value;
                }
                return prev;
            })
            // const hasDuplicate = findDuplicates(newValues).length;
            // if(hasDuplicate) {
            //     console.log(hasDuplicate);
            //     newValues.reverse();
            //     for(let i = 0; i < newValues.length; i++) {
            //         if(isNaN(newValues[i])) {
            //             newValues.splice(i, 1);
            //             break;
            //         }
            //     }
            //     newValues.reverse();
            // }
            return newValues;
        })
    }
    const addValue = () => {
        if(!values.includes(NaN)) {
            setValues(previous => [...previous, ...[parseInt('')]]);
        }
    }
    const onFocus = (index: number) => {
        console.log(index);
        focusing.current = index;
    }
    const onBlur = () => {
        focusing.current = false;
    }
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(valueLength.current);
        if(e.key === 'Tab' && focusing.current === valueLength.current - 1) {
            e.preventDefault();
            addValue();
        }
    }

    return(
        <div className="sidebar-values">
            <span className="header">
                Chart Values
            </span>
            {values.map((value, key) => {
                return(
                    <Input 
                        defaultValue={isNaN(value) ? '' : value.toString()}
                        placeholder={'Enter value...'}
                        onChange={(value) => handleChange(parseInt(value), key)}
                        noSubmit={true}
                        defaultFocus={true}
                        onFocus={() => onFocus(key)}
                        onBlur={onBlur}
                        onKeyPress={handleKeyPress}
                        key={key}
                    />
                )
            })}
            <Flex justifyContent={'flex-end'}>
                <Button type={'transparent'} onClick={addValue}>
                    Add value
                </Button>
            </Flex>
        </div>
    )
}