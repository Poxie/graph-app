import { createRef, RefObject, useEffect, useRef, useState } from "react"

interface Props {
    values: string[];
    width: number;
    height: number;
    axisHeight: number;
    valueWidth: number;
    yAxisWidth: number;
}

export const XAxis: React.FC<Props> = ({ values, width, height, axisHeight, valueWidth, yAxisWidth }) => {
    const [elements, setElements] = useState<JSX.Element[]>([]);
    
    useEffect(() => {
        if(!valueWidth) return;
        const elements = values.map((value, key) => {
            const y = height - axisHeight / 2;
            const x = yAxisWidth + key * valueWidth + (width / values.length) / 2 + key * 14 + key;
            return(
                <g width={valueWidth}>
                    <text
                        fill={`var(--primary-text)`}
                        alignmentBaseline={'middle'}
                        textAnchor={'middle'}
                        y={y}
                        x={x}
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