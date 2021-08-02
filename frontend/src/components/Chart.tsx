import { useEffect, useMemo, useRef, useState } from 'react';
import './Chart.scss';
import { Flex } from './Flex';

interface Props {
    values: number[];
    animate?: boolean;
}
export const Chart: React.FC<Props> = ({ values, animate }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [points, setPoints] = useState('');
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [hoverPoint, setHoverPoint] = useState(['', '']);
    
    const highestValue = Math.max(...values);
    const valueLength = values.length;

    const getPoints = useMemo(() => (values: number[], chartWidth: number, chartHeight: number) => {
        return values.map((value, key) => {
            const x = (key / (valueLength - 1)) * chartWidth;
            const y = chartHeight - (value / highestValue) * (chartHeight - 20);

            return `${x},${y}`;
        })
    }, [highestValue, valueLength])

    const updatePoints = useMemo(() => () => {
        if(!ref.current) return
        
        const chartWidth = ref.current.offsetWidth;
        const chartHeight = ref.current.offsetHeight;
        const points = getPoints(values, chartWidth, chartHeight).join(' ');
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
            const newPoints = points.split(' ')[pointIndex]?.split(',').map(point => parseInt(point) - 1.006)?.join(' ');
            const newPointsToo = points.split(' ')[pointIndex]?.split(',').map(point => parseInt(point) + 1.006)?.join(' ');
            setHoverPoint([newPoints, newPointsToo]);
        }
        ref.current?.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', updatePoints);
            ref.current?.removeEventListener('mousemove', handleMouseMove);
        }
    }, [points]);

    const pathPointsObjects = points.split(' ').map(point => {return {top: point.split(',')[0], left: point.split(',')[1]}});
    let pathPoints = pathPointsObjects.map(point => `L ${point.top} ${point.left}`).join(' ');
    pathPoints += ` L ${pathPointsObjects[pathPointsObjects.length - 1].top} ${height}`
    return(
        <Flex className={`chart${animate ? ' animate' : ''}`} ref={ref}>
            <svg style={{height: '100%', width: '100%'}} viewBox={`0 0 ${width} ${height}`}>
                <polyline 
                    points={points}
                    fill={'none'}
                    strokeWidth={10}
                    stroke={'var(--primary-color)'}
                    strokeLinecap={'round'}
                />
                <path 
                    fill={'var(--third-background)'}
                    d={`M 0 ${height} ${pathPoints}`}
                />
                <path 
                    fill={'var(--primary-color)'}
                    strokeWidth={3}
                    d={`M ${hoverPoint[0]} A 9 9 0 1 1 ${hoverPoint[1]} Z`}
                    style={{transform: 'translateX(-4px)'}}
                    stroke={'var(--secondary-background)'}
                    className={'hover-point'}
                />
            </svg>
        </Flex>
    )
}