import {LineChart,Line,XAxis,YAxis,CartesianGrid,
    ResponsiveContainer
} from 'recharts';

import {Card,CardContent ,CardDescription,CardHeader,CardTitle } from "@/components/ui/card";

// import { AnalyticsItem } from '../types/analytics';
// import { analyticsData } from '../Data/analytics';
export default function AnalyticsChart() {

    return (
        <>
        <Card className='m-2'>
            {/* <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>View analytics</CardDescription>
            </CardHeader>
            <CardContent>
                <div style={{width:'100%',height:'300px'}}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
                </div>
            </CardContent> */}
        </Card>
        </>
    )
}