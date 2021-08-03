import { Flex } from "./Flex"
import './BarChart.scss';
import { useEffect, useMemo, useRef, useState } from "react";
import { XAxis } from "./XAxis";
import { YAxis } from "./YAxis";

interface Props {
    values: number[];
    animate?: boolean;
    spacing?: number;
    delay?: number;
    radius?: number;
    hasYAxis?: boolean;
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
export const BarChart: React.FC<Props> = ({ values, animate, spacing=15, delay=.25, radius=8, hasYAxis }) => {
    // Container height
    const [height, setHeight] = useState(0);
    // Container width
    const [width, setWidth] = useState(0);
    const [elements, setElements] = useState<Bar[]>([]);
    const [hovering, setHovering] = useState<null | Hover>(null);
    const ref = useRef<HTMLDivElement>(null);

    const largestValue = Math.max(...values);
    const YAxisWidth = hasYAxis ? 40 : 0;

    const updateElements = useMemo(() => () => {
        if(!ref.current) return;
        const elements = values.map(value => {
            if(!ref.current) return {height: 0, width: 0, value: 0};
            return {
                height: (value / largestValue) * (ref.current.offsetHeight - 20),
                width: (ref.current.offsetWidth - spacing * (values.length + 1) - YAxisWidth) / values.length,
                value
            }
        })
        setHeight(ref.current.offsetHeight);
        setWidth(ref.current.offsetWidth);
        setElements(elements);
    }, [values]);

    useEffect(updateElements, [ref.current, values]);
    useEffect(() => {
        window.addEventListener('resize', updateElements);

        return () => window.removeEventListener('resize', updateElements)
    }, []);

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
                <span className="current-hovering" style={{top: `${hovering.top}px`, left: `${hovering.left + YAxisWidth / 2 - 5}px`, width: `${hovering.width + YAxisWidth}px`}}>
                    {hovering.value}
                </span>
            )}
            {hasYAxis && (
                <XAxis />
            )}
            <svg height={'100%'} width={'100%'}>
                {hasYAxis && (
                    <YAxis 
                        values={values}
                        height={height}
                        width={width}
                    />
                )}
                {elements.map((value, key) => {
                    const x = spacing * (key + 1) + value.width * key + YAxisWidth;
                    const y = height - value.height;
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