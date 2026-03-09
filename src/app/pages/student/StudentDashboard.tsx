import { Link } from "react-router";
import { BookOpen, FileText, Award, TrendingUp, Clock, CheckCircle } from "lucide-react";

export default function StudentDashboard() {
  const enrolledCourses = [
    {
      id: 1,
      title: "Web Development Bootcamp",
      progress: 65,
      nextLesson: "React Hooks Deep Dive",
      instructor: "John Doe",
    },
    {
      id: 2,
      title: "Data Science & Analytics",
      progress: 30,
      nextLesson: "Data Visualization with Matplotlib",
      instructor: "Jane Smith",
    },
  ];

  const recentAssignments = [
    { id: 1, title: "Build a Portfolio Website", course: "Web Development", dueDate: "2026-03-01", status: "pending" },
    { id: 2, title: "Data Analysis Project", course: "Data Science", dueDate: "2026-03-05", status: "submitted" },
  ];

  const stats = [
    { label: "Courses Enrolled", value: "2", icon: BookOpen, color: "blue" },
    { label: "Assignments", value: "5", icon: FileText, color: "purple" },
    { label: "Certificates", value: "0", icon: Award, color: "green" },
    { label: "Overall Progress", value: "48%", icon: TrendingUp, color: "orange" },
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome Back, {localStorage.getItem("userName")?.split(" ")[0] || "Student"}! 👋
        </h1>
        <p className="text-gray-600">Here's what's happening with your learning journey</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* My Courses */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
            <Link to="/student/courses" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {enrolledCourses.map((course) => (
              <Link
                key={course.id}
                to={`/student/courses/${course.id}`}
                className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                    <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
                  </div>
                  <span className="text-sm font-semibold text-blue-600">{course.progress}%</span>
                </div>
                <div className="mb-3">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Next: {course.nextLesson}</span>
                </div>
              </Link>
            ))}

            {enrolledCourses.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No courses enrolled yet</p>
                <Link to="/courses" className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 inline-block">
                  Browse Courses
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Assignments */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Assignments</h2>
            <Link to="/student/assignments" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {recentAssignments.map((assignment) => (
              <div key={assignment.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{assignment.title}</h3>
                    <p className="text-sm text-gray-600">{assignment.course}</p>
                  </div>
                  {assignment.status === "submitted" ? (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Submitted
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                      Pending
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Continue Learning Section */}
      <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Continue Your Learning Journey</h2>
            <p className="text-blue-100">
              You're making great progress! Keep it up and unlock your potential.
            </p>
          </div>
          <Link
            to="/student/courses"
            className="px-6 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap"
          >
            Resume Learning
          </Link>
        </div>
      </div>
    </div>
  );
}
