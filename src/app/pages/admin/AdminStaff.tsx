import { Plus, Edit, Trash2 } from "lucide-react";

const staffMembers = [
  { id: 1, name: "John Doe", position: "Lead Instructor", courses: 3, students: 234 },
  { id: 2, name: "Jane Smith", position: "Data Science Instructor", courses: 2, students: 187 },
];

export default function AdminStaff() {
  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Staff Management</h1>
          <p className="text-gray-600">Add and manage staff members</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5" />
          Add Staff
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Staff Member</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Position</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Courses</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Students</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {staffMembers.map((staff) => (
              <tr key={staff.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full"></div>
                    <div className="font-medium text-gray-900">{staff.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{staff.position}</td>
                <td className="px-6 py-4 text-gray-600">{staff.courses}</td>
                <td className="px-6 py-4 text-gray-600">{staff.students}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
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
