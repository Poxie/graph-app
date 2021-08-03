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
    color: string;
    isHovering?: boolean;
    hasHoveringElement?: boolean;
}
export const PieChart: React.FC<Props> = ({ values, strokeWidth=15, animate }) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [elements, setElements] = useState<Element[]>([]);
    const [hovering, setHovering] = useState<null | number>(null);
    const ref = useRef<HTMLDivElement>(null);
    const filled = useRef(0);

    const numberValues = values.map(value => value.value);

    const updateElements = useMemo(() => () => {
        if(!ref.current) return;
        setWidth(ref.current.offsetWidth);
        setHeight(ref.current.offsetHeight);
        const valueTotal = numberValues.reduce((a, b) => a + b);

        const elements = numberValues.map((value, key) => {
            return {
                percentage: (value / valueTotal) * 100,
                color: getPercentageColor(key),
                value
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
                    setHovering(element.percentage);
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

    const radius = 30;
    return(
        <div className="chart pie-chart" ref={ref}>
            <svg width={'100%'} height={'100%'} viewBox={`0 0 100 100`}>
                {elements.map((element, key) => {
                    const dashArray = 2*Math.PI*radius;
                    const dashOffset = dashArray - (dashArray * element.percentage / 100);
                    const angle = (filled.current * 360 / 100) + (-90);
                    const rotate = `rotate(${angle} 50 50)`;

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
                        />
                    )
                })}
                <text textAnchor={'middle'} alignmentBaseline={'middle'} fontSize="12" x="50%" y="50%" fill="var(--primary-text)" fontWeight="500">
                    {hovering && (
                        `${Math.floor(hovering)}%`
                    )}
                </text>
            </svg>
        </div>
    )
}