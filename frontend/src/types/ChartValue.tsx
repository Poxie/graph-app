export interface ChartValue {
    value: number;
    label: string;
}
export const initialChartValues: (() => ChartValue[]) = () => {
    return [
        {value: 1, label: 'Banan'},
        {value: 5, label: 'Orange'},
        {value: 12, label: 'Pineapple'},
        {value: 10, label: 'Plum'},
        {value: 15, label: 'Watermelon'}
    ]
}