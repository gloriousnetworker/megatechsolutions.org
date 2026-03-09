import { BookOpen, Users, FileText, TrendingUp } from "lucide-react";

export default function StaffDashboard() {
  const stats = [
    { label: "Courses Teaching", value: "3", icon: BookOpen, color: "blue" },
    { label: "Total Students", value: "156", icon: Users, color: "green" },
    { label: "Assignments to Grade", value: "12", icon: FileText, color: "orange" },
    { label: "Avg. Course Rating", value: "4.8", icon: TrendingUp, color: "purple" },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Staff Dashboard</h1>
        <p className="text-gray-600">Manage your courses and students</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
