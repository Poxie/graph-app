import { createRef, RefObject, useEffect, useRef, useState } from "react"

interface Props {
    values: string[];
    width: number;
    height: number;
    axisHeight: number;
    valueWidth: number;
    yAxisWidth: number;
    isAlignedLeft?: boolean;
}

export const XAxis: React.FC<Props> = ({ values, width, height, axisHeight, valueWidth, yAxisWidth, isAlignedLeft }) => {
    const [elements, setElements] = useState<JSX.Element[]>([]);
    
    useEffect(() => {
        if(!valueWidth) return;
        const elements = values.map((value, key) => {
            const y = height - axisHeight / 2;
            let x;
            if(!isAlignedLeft) {
                x = yAxisWidth + key * valueWidth + (width / values.length) / 2 + key * 14 + key;
            } else {
                x = (width / (values.length - 1) - (14 - values.length)) * key + yAxisWidth;
            }
            if(x + 60 > width) x = width - 60;
            return(
                <g>
                    <text
                        fill={`var(--primary-text)`}
                        y={y}
                        x={x}
                        textAnchor={'middle'}
                        color={'var(--text-muted)'}
                    >
                        {value}
                    </text>
                </g>
            )
        })
        setElements(elements);
    }, [values]);

    return(
        <g className="axis x-axis">
            {elements}
        </g>
    )
}