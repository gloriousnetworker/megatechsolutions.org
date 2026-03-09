import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { BookOpen, Users, FileText } from 'lucide-react';

export default function StaffDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600 mt-2">Here's an overview of your teaching activities</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">My Courses</CardTitle>
            <BookOpen className="size-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-gray-600 mt-1">Active courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="size-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-gray-600 mt-1">Enrolled students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <FileText className="size-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-600 mt-1">Assignments to review</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest teaching activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 pb-4 border-b">
              <div className="p-2 bg-blue-50 rounded">
                <BookOpen className="size-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">New course materials uploaded</p>
                <p className="text-sm text-gray-600">Web Development Fundamentals - 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4 pb-4 border-b">
              <div className="p-2 bg-green-50 rounded">
                <FileText className="size-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Assignment reviewed and graded</p>
                <p className="text-sm text-gray-600">Student submission for Python Basics - 5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-purple-50 rounded">
                <Users className="size-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">New student enrolled</p>
                <p className="text-sm text-gray-600">React Advanced Concepts - Yesterday</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
