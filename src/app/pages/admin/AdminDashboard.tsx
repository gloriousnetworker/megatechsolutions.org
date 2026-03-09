import { Users, BookOpen, DollarSign, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Students", value: "1,234", change: "+12%", trend: "up", icon: Users, color: "blue" },
    { label: "Total Courses", value: "45", change: "+3", trend: "up", icon: BookOpen, color: "green" },
    { label: "Revenue (This Month)", value: "₦12.5M", change: "+18%", trend: "up", icon: DollarSign, color: "purple" },
    { label: "Completion Rate", value: "87%", change: "-2%", trend: "down", icon: TrendingUp, color: "orange" },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of your platform's performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? ArrowUp : ArrowDown;
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <span className={`flex items-center gap-1 text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  <TrendIcon className="w-4 h-4" />
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Enrollments</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full"></div>
                  <div>
                    <div className="font-medium text-gray-900">Student Name</div>
                    <div className="text-sm text-gray-600">Web Development Bootcamp</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">2 hours ago</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left">
              <BookOpen className="w-8 h-8 text-blue-600 mb-2" />
              <div className="font-medium text-gray-900">Add Course</div>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors text-left">
              <Users className="w-8 h-8 text-green-600 mb-2" />
              <div className="font-medium text-gray-900">Add Student</div>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors text-left">
              <DollarSign className="w-8 h-8 text-purple-600 mb-2" />
              <div className="font-medium text-gray-900">Payments</div>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors text-left">
              <TrendingUp className="w-8 h-8 text-orange-600 mb-2" />
              <div className="font-medium text-gray-900">Analytics</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
