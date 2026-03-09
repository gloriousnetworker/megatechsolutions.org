import { Plus, Edit, Trash2 } from "lucide-react";

const courses = [
  { id: 1, title: "Web Development Bootcamp", students: 234, price: 50000, status: "active" },
  { id: 2, title: "Data Science & Analytics", students: 187, price: 75000, status: "active" },
  { id: 3, title: "Digital Marketing", students: 312, price: 40000, status: "active" },
];

export default function AdminCourses() {
  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Management</h1>
          <p className="text-gray-600">Create, edit, and manage courses</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5" />
          Create Course
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Course</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Students</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Price</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Status</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="px-6 py-4 font-medium text-gray-900">{course.title}</td>
                <td className="px-6 py-4 text-gray-600">{course.students}</td>
                <td className="px-6 py-4 text-gray-600">₦{course.price.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    {course.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
