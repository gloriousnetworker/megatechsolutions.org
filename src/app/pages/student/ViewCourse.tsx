import { useParams } from "react-router";
import { CheckCircle, Play, Lock } from "lucide-react";

export default function ViewCourse() {
  const { id } = useParams();
  
  const lessons = [
    { id: 1, title: "Introduction to Web Development", duration: "15 min", completed: true, locked: false },
    { id: 2, title: "HTML Fundamentals", duration: "30 min", completed: true, locked: false },
    { id: 3, title: "CSS Basics", duration: "45 min", completed: false, locked: false },
    { id: 4, title: "JavaScript Introduction", duration: "60 min", completed: false, locked: false },
    { id: 5, title: "React.js Fundamentals", duration: "90 min", completed: false, locked: true },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Web Development Bootcamp</h1>
        <p className="text-gray-600">Course ID: {id}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center mb-6">
            <Play className="w-16 h-16 text-white" />
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About this course</h2>
            <p className="text-gray-700">
              Learn the fundamentals of web development including HTML, CSS, JavaScript, and modern frameworks.
            </p>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Course Content</h3>
            <div className="space-y-2">
              {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                    lesson.locked ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
                  }`}
                  disabled={lesson.locked}
                >
                  {lesson.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : lesson.locked ? (
                    <Lock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-sm truncate">{lesson.title}</div>
                    <div className="text-xs text-gray-600">{lesson.duration}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
