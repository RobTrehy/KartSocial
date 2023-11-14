import moment from "moment"

export function FormatLapDiff(lap: object, text: boolean = true) {
    if (lap.lap_number != 1) {
        if (lap.lap_diff <= -60 || lap.lap_diff >= 60) {
            if (lap.lap_diff < 0) {
                return <div className={(text) ? 'text-green-500' : ''}>-{moment.unix(lap.lap_diff.substring(1)).format('mm:ss.SSS')}</div>
            } else {
                return <div className={(text) ? 'text-red-500' : ''}>{moment.unix(lap.lap_diff).format('mm:ss.SSS')}</div>
            }
        } else if (lap.lap_diff < 0) {
            return <div className={(text) ? 'text-green-500' : ''}>-{moment.unix(lap.lap_diff.substring(1)).format('ss.SSS')}</div>
        } else {
            return <div className={(text) ? 'text-red-500' : ''}>{moment.unix(lap.lap_diff).format('ss.SSS')}</div>
        }
    }
}