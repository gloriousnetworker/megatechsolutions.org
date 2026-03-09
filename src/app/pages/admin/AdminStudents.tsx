import { Plus, CheckCircle, XCircle } from "lucide-react";

const students = [
  { id: 1, name: "John Doe", email: "john@example.com", courses: 2, status: "approved" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", courses: 1, status: "pending" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", courses: 3, status: "approved" },
];

export default function AdminStudents() {
  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Management</h1>
          <p className="text-gray-600">Add, edit, and approve students</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5" />
          Add Student
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Student</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Email</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Courses</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Status</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full"></div>
                    <div className="font-medium text-gray-900">{student.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{student.email}</td>
                <td className="px-6 py-4 text-gray-600">{student.courses}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    student.status === "approved" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-orange-100 text-orange-700"
                  }`}>
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {student.status === "pending" && (
                    <div className="flex gap-2">
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
