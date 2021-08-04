import { createRef, RefObject, useEffect, useRef, useState } from "react";
import { Button } from "../../components/Button"
import { Flex } from "../../components/Flex"
import { Input } from "../../components/Input"
import { ChartValue } from "../../types/ChartValue";
import { ValueInputs } from "./ValueInputs";

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
    values: ChartValue[];
    setValues: React.Dispatch<React.SetStateAction<ChartValue[]>>;
}
export const SidebarValues: React.FC<Props> = ({ values, setValues }) => {
    const valueLength = useRef(values.length);

    useEffect(() => {
        valueLength.current = values.length;
    }, [values.length]);

    const handleChange = (type: 'value' | 'label', value: number | string, index: number) => {
        setValues(previous => {
            const newValues = previous.map((prev, key) => {
                if(key === index) {
                    // @ts-ignore
                    prev[type] = value;
                }
                return prev;
            })
            return newValues;
        })
    }
    const addValue = () => {
        if(!values.map(value => value.value).includes(NaN)) {
            setValues(previous => [...previous, ...[{label: '', value: parseInt('')}]]);
        }
    }

    return(
        <div className="sidebar-values">
            <span className="header">
                Chart Values
            </span>
            {values.map((value, key) => {
                return(
                    <ValueInputs 
                        handleChange={handleChange}
                        value={value.value}
                        label={value.label}
                        index={key}
                        key={key}
                    />
                )
            })}
            <Flex justifyContent={'flex-end'}>
                <Button type={'transparent'} onClick={addValue} style={{fontWeight: 500}}>
                    Add value
                </Button>
            </Flex>
        </div>
    )
}