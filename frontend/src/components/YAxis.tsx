import './Axis.scss';

interface Props {
    values: number[];
    height: number;
    width: number;
}
export const YAxis: React.FC<Props> = ({ values, height, width }) => {
    const lowest = Math.min(...values);
    const largest = Math.max(...values);
    height = height - 20;
    
    const axisValues = [];
    const delta = Math.floor(largest / (values.length));
    for(let i = largest; i > 0; i-=delta) {
        if(!i) continue;
        axisValues.push(i);
    }

    const axisElements = axisValues.map((value, key) => {
        let y = height - (value / largest) * height + 24;
        if(y + 20 > height) return null;
        if(value === largest) {
            y = 23;
        } 
        const x = 10;

        return(
            <g key={key}>
            <path 
                stroke-width="3" 
                stroke="var(--third-background)" 
                d={`M ${x * 3} ${y - 5} l ${width} 0`}
            />
            <text 
                x={x}
                y={y}
                fill={'var(--text-muted)'}
                fontWeight={'600'}
            >
                {value}
            </text>
            </g>
        )
    });
    
    return(
        <g className="axis">
            {axisElements}
        </g>
    )
}