import React from 'react';
import {
    Bar,
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

function AdminSalesChart({
    sales,
    month,
    keyName,
    dataKey,
    barColor,
    lineColor,
}) {
    // sales 데이터를 월을 기준으로 정렬
    const sortedSales = [...sales].sort((a, b) => {
        const aDate = new Date(`${a[month]}-01`);  // 월을 'YYYY-MM-01' 형태로 변환
        const bDate = new Date(`${b[month]}-01`);
        return aDate - bDate;  // 날짜 순으로 정렬
    });

    return (
        <ResponsiveContainer width="100%" height="90%">
            <ComposedChart data={sortedSales}>
                <XAxis dataKey={month} tick={{ fontSize: 11 }} />
                
                <YAxis
                    width={100}
                    tickCount={7}
                    type="number"
                    domain={[0, "auto"]}
                    allowDecimals={false}
                    tick={{ fontSize: 11 }}
                />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#f5f5f5" />
                <Bar
                    dataKey={dataKey}
                    barSize={20}
                    name={keyName}
                    fill={barColor}
                />
                <Line
                    type="monotone"
                    dataKey={dataKey}
                    stroke={lineColor}
                    legendType="none"
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
}

export default AdminSalesChart;
