import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function DashboardStats() {
  const earningsData = [
    { month: "Jan", earnings: 4000 },
    { month: "Feb", earnings: 3000 },
    { month: "Mar", earnings: 5000 },
    { month: "Apr", earnings: 4200 },
    { month: "May", earnings: 6000 },
    { month: "Jun", earnings: 5500 },
  ];

  const studentsData = [
    { month: "Jan", students: 50 },
    { month: "Feb", students: 75 },
    { month: "Mar", students: 90 },
    { month: "Apr", students: 120 },
    { month: "May", students: 150 },
    { month: "Jun", students: 200 },
  ];

  const topCourses = [
    { name: "React Mastery", revenue: 12000 },
    { name: "Node.js Advanced", revenue: 9500 },
    { name: "UI Design", revenue: 7200 },
    { name: "Python Pro", revenue: 6400 },
    { name: "Next.js Crash", revenue: 5800 },
  ];

  const categoryData = [
    { name: "Web Dev", value: 400 },
    { name: "Design", value: 300 },
    { name: "Data Science", value: 300 },
    { name: "Marketing", value: 200 },
  ];

  const COLORS = ["#34d399", "#60a5fa", "#fbbf24", "#f87171"];

  return (
    <div className="flex flex-wrap gap-6 justify-start mt-7">
      {/* Earnings Over Time */}
      <div className="bg-white shadow rounded-2xl p-4 w-full sm:w-[48%] xl:w-[48%]">
        <h2 className="text-lg font-semibold mb-2">Earnings Over Time</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={earningsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="earnings" stroke="#34d399" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* New Students Per Month */}
      <div className="bg-white shadow rounded-2xl p-4 w-full sm:w-[48%] xl:w-[48%]">
        <h2 className="text-lg font-semibold mb-2">New Students Per Month</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={studentsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="students" fill="#60a5fa" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top 5 Courses by Revenue */}
      <div className="bg-white shadow rounded-2xl p-4 w-full sm:w-[48%] xl:w-[48%]">
        <h2 className="text-lg font-semibold mb-2">Top 5 Courses by Revenue</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={topCourses} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Bar dataKey="revenue" fill="#fbbf24" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category-wise Enrollments */}
      <div className="bg-white shadow rounded-2xl p-4 w-full sm:w-[48%] xl:w-[48%]">
        <h2 className="text-lg font-semibold mb-2">Category-wise Enrollments</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name} (${value})`}
            >
              {categoryData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

