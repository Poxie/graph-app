import { useEffect, useMemo, useRef, useState } from 'react';
import './LineChart.scss';
import { Flex } from './Flex';
import { ChartValue } from '../types/ChartValue';
import { YAxis } from './YAxis';
import { XAxis } from './XAxis';

interface Props {
    values: ChartValue[];
    animate?: boolean;
    hasXAxis?: boolean;
    hasYAxis?: boolean;
}
export const LineChart: React.FC<Props> = ({ values, animate, hasXAxis, hasYAxis }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [points, setPoints] = useState('');
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [hoverPoint, setHoverPoint] = useState<any>(['', '', {}]);
    
    const numberValues = values.map(value => value.value);
    const highestValue = Math.max(...numberValues);
    const valueLength = values.length;
    const yAxisWidth = hasYAxis ? 50 : 0;
    const xAxisHeight = hasXAxis ? 50 : 0;

    const getPoints = useMemo(() => (values: number[], chartWidth: number, chartHeight: number) => {
        return values.map((value, key) => {
            const x = (key / (valueLength - 1)) * chartWidth + yAxisWidth;
            const y = chartHeight - (value / highestValue) * (chartHeight - 20);

            return `${x},${y}`;
        })
    }, [highestValue, valueLength])

    const updatePoints = useMemo(() => () => {
        if(!ref.current) return
        
        const chartWidth = ref.current.offsetWidth;
        const chartHeight = ref.current.offsetHeight;
        const points = getPoints(numberValues, chartWidth - yAxisWidth, chartHeight - xAxisHeight).join(' ');
        setPoints(points);
        setWidth(chartWidth);
        setHeight(chartHeight);
    }, [values]);

    useEffect(updatePoints, [values]);
    useEffect(() => {
        // Updating svg on resize
        window.addEventListener('resize', updatePoints);

        const handleMouseMove = (e: MouseEvent) => {
            if(!ref.current) return;
            const { left: chartLeft } = ref.current.getBoundingClientRect();
            const left = e.pageX - chartLeft;
            const pointWidth = ref.current.offsetWidth / valueLength;
            const pointIndex = Math.floor(left / pointWidth);
            const newPoints = points.split(' ')[pointIndex]?.split(',').map(point => parseInt(point) - .006)?.join(' ');
            const newPointsToo = points.split(' ')[pointIndex]?.split(',').map(point => parseInt(point) + .006)?.join(' ');
            setHoverPoint([newPoints, newPointsToo, {value: numberValues[pointIndex], left: newPoints?.split(' ')[0], top: newPoints?.split(' ')[1]}]);
        }
        ref.current?.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', updatePoints);
            ref.current?.removeEventListener('mousemove', handleMouseMove);
        }
    }, [points, values]);

    const pathPointsObjects = points.split(' ').map(point => {return {top: point.split(',')[0], left: point.split(',')[1]}});
    let pathPoints = pathPointsObjects.map(point => `L ${point.top} ${point.left}`).join(' ');
    pathPoints += ` L ${pathPointsObjects[pathPointsObjects.length - 1].top} ${height}`
    let backgroundPathPoints: string | string[] = pathPoints.split(' ');
    backgroundPathPoints[2] = (parseInt(backgroundPathPoints[2]) - 5).toString();
    backgroundPathPoints = backgroundPathPoints.join(' ');
    return(
        <Flex className={`chart${animate ? ' animate' : ''}`} ref={ref}>
            <svg style={{height: '100%', width: '100%', backgroundColor: 'var(--secondary-background)'}} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="all">
                <path 
                    fill={'var(--third-background)'}
                    d={`M ${0} ${parseInt(pathPoints.split(' ')[2]) - 5} ${backgroundPathPoints} L ${0} ${height}`}
                />
                {hasYAxis && (
                    <YAxis 
                        height={height - xAxisHeight}
                        width={width}
                        values={numberValues}
                    />
                )}
                <polyline 
                    points={points}
                    fill={'none'}
                    strokeWidth={7}
                    stroke={'var(--primary-color)'}
                    strokeLinecap={'round'}
                />
                <path 
                    fill={'var(--primary-color)'}
                    strokeWidth={3}
                    d={`M ${hoverPoint[0]} A 9 9 0 1 1 ${hoverPoint[1]} Z`}
                    style={{transform: 'translateX(-4px)'}}
                    stroke={'var(--secondary-background)'}
                    className={'hover-point'}
                    data-point-value={hoverPoint[2]}
                />
                {hasXAxis && (
                    <XAxis 
                        axisHeight={xAxisHeight}
                        height={height}
                        valueWidth={10}
                        values={values.map(value => value.label)}
                        width={width}
                        yAxisWidth={yAxisWidth}
                        isAlignedLeft={true}
                    />
                )}
            </svg>
            <span className="hover-value" style={{left: `${hoverPoint[2].left - 48}px`, top: `${hoverPoint[2].top - 40}px`}}>
                {hoverPoint[2].value}
            </span>
        </Flex>
    )
}