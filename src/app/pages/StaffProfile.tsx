import { useParams, Link } from "react-router";
import { Mail, Phone, Linkedin, Twitter, Github, ArrowLeft } from "lucide-react";
import { staff, courses } from "../data/mockData";

export default function StaffProfile() {
  const { id } = useParams();
  const member = staff.find((s) => s.id === parseInt(id || "0"));
  
  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Staff Member Not Found</h1>
          <Link to="/staff" className="text-blue-600 hover:text-blue-700">Back to Staff</Link>
        </div>
      </div>
    );
  }

  const instructorCourses = courses.filter((c) => c.instructorId === member.id);

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-br from-blue-900 to-purple-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/staff" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Staff
          </Link>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="aspect-square bg-white/10 rounded-2xl"></div>
            </div>
            
            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold mb-2">{member.name}</h1>
              <p className="text-xl text-blue-200 mb-6">{member.position}</p>
              <p className="text-blue-100 mb-6">{member.bio}</p>
              
              <div className="space-y-3">
                <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-blue-100 hover:text-white">
                  <Mail className="w-5 h-5" />
                  {member.email}
                </a>
                <a href={`tel:${member.phone}`} className="flex items-center gap-2 text-blue-100 hover:text-white">
                  <Phone className="w-5 h-5" />
                  {member.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills & Expertise</h2>
          <div className="flex flex-wrap gap-3 mb-12">
            {member.skills.map((skill, idx) => (
              <span key={idx} className="px-4 py-2 bg-white border border-gray-200 rounded-lg font-medium text-gray-700">
                {skill}
              </span>
            ))}
          </div>

          {instructorCourses.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Courses by {member.name.split(" ")[0]}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {instructorCourses.map((course) => (
                  <Link key={course.id} to={`/courses/${course.id}`} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600"></div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
