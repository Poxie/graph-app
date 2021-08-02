import { Flex } from "./Flex"
import './BarChart.scss';
import { useEffect, useMemo, useRef, useState } from "react";

interface Props {
    values: number[];
    animate?: boolean;
    spacing?: number;
    delay?: number;
    radius?: number;
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
export const BarChart: React.FC<Props> = ({ values, animate, spacing=15, delay=.25, radius=8 }) => {
    // Container height
    const [height, setHeight] = useState(0);
    // Container width
    const [width, setWidth] = useState(0);
    const [elements, setElements] = useState<Bar[]>([]);
    const [hovering, setHovering] = useState<null | Hover>(null);
    const ref = useRef<HTMLDivElement>(null);

    const largestValue = Math.max(...values);

    const updateElements = useMemo(() => () => {
        if(!ref.current) return;
        const elements = values.map(value => {
            if(!ref.current) return {height: 0, width: 0, value: 0};
            return {
                height: (value / largestValue) * (ref.current.offsetHeight - 20),
                width: (ref.current.offsetWidth - spacing * (values.length + 1)) / values.length,
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
            <span className="current-hovering" style={{top: `${hovering?.top}px`, left: `${hovering?.left}px`, width: `${hovering?.width}px`}}>
                {hovering?.value}
            </span>
            <svg height={'100%'} width={'100%'}>
                {elements.map((value, key) => {
                    return(
                        <g key={key}>
                            <rect 
                                width={value.width} 
                                height={value.height} 
                                y={height - value.height} 
                                x={spacing * (key + 1) + value.width * key}
                                rx={radius}
                                className={"no-animation"}
                            />
                            <rect 
                                width={value.width} 
                                height={value.height} 
                                y={height - value.height} 
                                x={spacing * (key + 1) + value.width * key}
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