export const analyticsData = [
    { name: 'Jan', sales: 4000, revenue: 2400 },
    { name: 'Feb', sales: 3000, revenue: 1398 },
    { name: 'Mar', sales: 2000, revenue: 9800 },
    { name: 'Apr', sales: 2780, revenue: 3908 },
    { name: 'May', sales: 1890, revenue: 4800 },
    { name: 'Jun', sales: 2390, revenue: 3800 },
    { name: 'Jul', sales: 3490, revenue: 4300 }
  ];
  
 export const Analytics = () => (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Analytics Dashboard</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <ChartContainer
          config={{
            sales: { color: '#6366f1', label: 'Sales' },
            revenue: { color: '#f59e42', label: 'Revenue' }
          }}
        >
          <LineChart
            data={analyticsData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            width={700}
            height={300}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" strokeWidth={3} />
            <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={3} />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
  