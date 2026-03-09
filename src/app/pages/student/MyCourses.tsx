import { Link } from "react-router";
import { BookOpen, Play } from "lucide-react";

const enrolledCourses = [
  { id: 1, title: "Web Development Bootcamp", progress: 65, totalLessons: 45, completedLessons: 29 },
  { id: 2, title: "Data Science & Analytics", progress: 30, totalLessons: 60, completedLessons: 18 },
];

export default function MyCourses() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
        <p className="text-gray-600">Continue learning and track your progress</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {enrolledCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-white opacity-50" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{course.title}</h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{course.completedLessons} / {course.totalLessons} lessons completed</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
              <Link
                to={`/student/courses/${course.id}`}
                className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Play className="w-5 h-5" />
                Continue Learning
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
