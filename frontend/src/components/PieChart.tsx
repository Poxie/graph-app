import { createRef, useEffect, useMemo, useRef, useState } from "react";
import { ChartValue } from "../types/ChartValue";
import './PieChart.scss';

const colors = ['#80e080', '#4fc3f7', '#9575cd', '#f06292', '#bc23f3'];
const getPercentageColor = (index: number) => {
    if(index > colors.length - 1) {
        const colorHex = Math.floor(Math.random()*16777215).toString(16);
        console.log(`#${colorHex}`)
        return `#${colorHex}`;
    } else {
        return colors[index];
    }
}

interface Props {
    values: ChartValue[];
    strokeWidth?: number
    animate?: boolean;
}
interface Element {
    percentage: number;
    value: number;
    label: string;
    color: string;
    isHovering?: boolean;
    hasHoveringElement?: boolean;
}
export const PieChart: React.FC<Props> = ({ values, strokeWidth=100, animate }) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [elements, setElements] = useState<Element[]>([]);
    const [hovering, setHovering] = useState<null | Element>(null);
    const ref = useRef<HTMLDivElement>(null);
    const filled = useRef(0);
    const colors = useRef<string[]>([]);

    const numberValues = values.map(value => value.value);

    const generateColor = useMemo(() => (index: number) => {
        const color = getPercentageColor(index);
        colors.current.push(color);
        return color;
    }, []);

    const updateElements = useMemo(() => () => {
        if(!ref.current) return;
        setWidth(ref.current.offsetWidth);
        setHeight(ref.current.offsetHeight);
        const valueTotal = numberValues.reduce((a, b) => a + b);

        const elements = values.map((value, key) => {
            return {
                percentage: (value.value / valueTotal) * 100,
                color: colors.current[key] || generateColor(key),
                label: value.label,
                value: value.value
            }
        })
        setElements(elements);
    }, [setElements, values]);

    useEffect(updateElements, [setElements, ref.current, values]);
    useEffect(() => {
        window.addEventListener('resize', updateElements);

        return () => window.removeEventListener('resize', updateElements);
    }, []);

    const onEnter = useMemo(() => (index: number) => {
        setElements(elements => {
            const newElements = elements.map((element, key) => {
                if(key === index) {
                    element.isHovering = true;
                    element.hasHoveringElement = false;
                    setHovering(element);
                } else {
                    element.isHovering = false;
                    element.hasHoveringElement = true;
                }
                return element;
            })
            return newElements;
        })
    }, []);
    const onLeave = useMemo(() => () => {
        setElements(elements => elements.map(element => {
            element.isHovering = false;
            element.hasHoveringElement = false;
            setHovering(null);
            return element;
        }));
    }, []);

    let radius = 200;
    if(radius * 2 + 100 > width) {
        radius = width / 2 - 100;
    }
    return(
        <div className="chart pie-chart" ref={ref}>
            <svg width={'100%'} height={'100%'} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="all">
                {elements.map((element, key) => {
                    const dashArray = 2*Math.PI*radius;
                    const dashOffset = dashArray - (dashArray * element.percentage / 100);
                    const angle = (filled.current * 360 / 100) + (-90);
                    const rotate = `rotate(${angle} ${width / 2} ${height / 2})`;

                    const ref = createRef<SVGCircleElement>()

                    if(animate) {
                        setTimeout(() => {
                            if(!ref.current) return;
                            ref.current.style.strokeDashoffset = dashOffset.toString();
                        }, 10);
                    }

                    const animationDuration = 800;
                    const duration = animationDuration * element.percentage / 100;
                    const delay = animationDuration * filled.current / 100 - 2000;

                    filled.current += element.percentage;
                    return(
                        <circle 
                            r={radius}
                            cx="50%"
                            cy="50%"
                            strokeDasharray={dashArray}
                            strokeDashoffset={animate ? dashArray : dashOffset}
                            transform={rotate}
                            fill={'transparent'}
                            stroke={element.color}
                            strokeWidth={strokeWidth}
                            onMouseEnter={() => onEnter(key)}
                            onMouseLeave={onLeave}
                            className={`${element.isHovering ? ' is-hovering' : ''}${element.hasHoveringElement ? ' has-hovering' : ''}`}
                            style={{transition: animate ? `stroke-dashoffset ${duration}ms linear ${delay}ms` : 'none'}}
                            ref={ref}
                            key={key}
                        />
                    )
                })}
                {hovering && (
                    <g>
                        <text textAnchor={'middle'} alignmentBaseline={'middle'} fontSize="100" x="50%" y="48%" fill="var(--primary-text)" fontWeight="500">
                            {Math.floor(hovering.percentage)}%
                        </text>
                        <text textAnchor={'middle'} alignmentBaseline={'middle'} fontSize="40" x="50%" y="58%" fill="var(--primary-text)" fontWeight="700">
                            {hovering.value}
                        </text>
                    </g>
                )}
                {elements.map((element, key) => {
                    const rectWidth = 25;
                    const rectHeight = 25;
                    const y = height - key * rectHeight * 1.3 - 25;
                    const x = 15;
                    return(
                        <g 
                            key={key}
                            onMouseEnter={() => onEnter(key)}
                            onMouseLeave={onLeave}
                        >
                            <rect 
                                fill={element.color}
                                width={rectWidth}
                                height={rectHeight}
                                y={y - 17.5}
                                x={x}
                                radius={50}
                                rx={5}
                            />
                            <text 
                                y={y} 
                                fontSize="16"
                                x={x + rectWidth + 10} 
                                fill={'var(--text-muted)'} 
                                fontWeight="600"
                            >
                                {element.label}
                            </text>
                        </g>
                    )
                })}
            </svg>
        </div>
    )
}