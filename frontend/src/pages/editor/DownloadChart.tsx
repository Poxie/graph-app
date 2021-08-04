import { Button } from "../../components/Button"
const saveSvgAsPng = require('save-svg-as-png').saveSvgAsPng;

export const DownloadChart = () => {
    const downloadChart = () => {
        saveSvgAsPng(document.querySelector('svg'), 'chart.png');
    }

    return(
        <div className="download-chart">
            <Button onClick={downloadChart}>
                Download as PNG
            </Button>
        </div>
    )
}