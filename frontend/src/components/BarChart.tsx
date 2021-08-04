import { Flex } from "./Flex"
import './BarChart.scss';
import { useEffect, useMemo, useRef, useState } from "react";
import { XAxis } from "./XAxis";
import { YAxis } from "./YAxis";
import { ChartValue } from "../types/ChartValue";

interface Props {
    values: ChartValue[];
    animate?: boolean;
    spacing?: number;
    delay?: number;
    radius?: number;
    hasYAxis?: boolean;
    hasXAxis?: boolean;
}
interface Bar {
    width: number;
    height: number;
    value: number;
    left?: number;
}
interface Hover {
    top: number;
    left: number;
    value: number;
    width: number;
}
export const BarChart: React.FC<Props> = ({ values, animate, spacing=15, delay=.25, radius=8, hasYAxis, hasXAxis }) => {
    // Container height
    const [height, setHeight] = useState(0);
    // Container width
    const [width, setWidth] = useState(0);
    const [elements, setElements] = useState<Bar[]>([]);
    const [hovering, setHovering] = useState<null | Hover>(null);
    const ref = useRef<HTMLDivElement>(null);

    const numberValues = values.map(bar => bar.value);
    const largestValue = Math.max(...numberValues);
    const YAxisWidth = hasYAxis ? 40 : 0;
    const XAxisHeight = hasXAxis ? 50 : 0;

    const updateElements = useMemo(() => () => {
        if(!ref.current) return;
        const elements = numberValues.map(value => {
            if(!ref.current) return {height: 0, width: 0, value: 0};
            return {
                height: (value / largestValue) * (ref.current.offsetHeight - 20) - (value === 1 ? (XAxisHeight / 2 - 10) : XAxisHeight),
                width: (ref.current.offsetWidth - spacing * (values.length + 1) - YAxisWidth) / values.length,
                value: value
            }
        })
        setHeight(ref.current.offsetHeight);
        setWidth(ref.current.offsetWidth);
        setElements(elements);
    }, [values]);

    useEffect(() => {
        updateElements();
        window.addEventListener('resize', updateElements);

        return () => window.removeEventListener('resize', updateElements)
    }, [values]);

    const onEnter = useMemo(() => (bar: Bar) => {
        if(!ref.current || !bar.left) return;
        const { offsetHeight: height } = ref.current;
        const hoverElement = {
            value: bar.value, 
            top: height - bar.height - 35,
            left: bar.left,
            width: bar.width
        };
        setHovering(hoverElement);
    }, [setHovering]);
    const onLeave = useMemo(() => () => {
        setHovering(null);
    }, [setHovering]);

    return(
        <Flex className={`chart${animate ? ' animate' : ''}`} ref={ref}>
            {hovering && (
                <span className="current-hovering" style={{top: `${hovering.top - XAxisHeight}px`, left: `${hovering.left + YAxisWidth / 2 - 5}px`, width: `${hovering.width + YAxisWidth}px`}}>
                    {hovering.value}
                </span>
            )}
            <svg height={'100%'} width={'100%'}>
                {hasYAxis && (
                    <YAxis 
                        values={numberValues}
                        height={height}
                        width={width}
                    />
                )}
                {hasXAxis && (
                    <XAxis 
                        values={values.map(value => value.label)}
                        width={width + YAxisWidth}
                        height={height}
                        axisHeight={XAxisHeight}
                        valueWidth={elements[0]?.width}
                        yAxisWidth={YAxisWidth}
                    />
                )}
                {elements.map((value, key) => {
                    const x = spacing * (key + 1) + value.width * key + YAxisWidth;
                    const y = height - value.height - XAxisHeight;
                    return(
                        <g key={key}>
                            <rect 
                                width={value.width} 
                                height={value.height} 
                                y={y} 
                                x={x}
                                rx={radius}
                                className={"no-animation"}
                            />
                            <rect 
                                width={value.width} 
                                height={value.height} 
                                y={y} 
                                x={x}
                                style={{animationDelay: `${key * delay}s`}}
                                rx={radius}
                                className="animation"
                                onMouseEnter={() => onEnter({...value, ...{left: spacing * (key + 1) + value.width * key}})}
                                onMouseLeave={onLeave}
                            />
                        </g>
                    )
                })}
            </svg>
        </Flex>
    )
}