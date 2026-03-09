import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Users, BookOpen, DollarSign, TrendingUp } from 'lucide-react';
import { mockCourses, mockEnrollments, mockPayments } from '../../data/mockData';

export default function AdminDashboard() {
  const { user } = useAuth();
  
  // Calculate stats from mock data
  const stats = {
    totalStudents: 1247, // Mock value
    totalCourses: mockCourses.length,
    totalRevenue: mockPayments.reduce((sum, p) => sum + p.amount, 0) / 100,
    totalEnrollments: mockEnrollments.length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user?.name}! Here's your platform overview</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="size-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-gray-600 mt-1">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="size-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCourses}</div>
            <p className="text-xs text-gray-600 mt-1">Active courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="size-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-gray-600 mt-1">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Enrollments</CardTitle>
            <TrendingUp className="size-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEnrollments}</div>
            <p className="text-xs text-gray-600 mt-1">Total enrollments</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 pb-4 border-b">
                <div className="p-2 bg-blue-50 rounded">
                  <Users className="size-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">New student registration</p>
                  <p className="text-sm text-gray-600">Jane Smith joined - 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4 pb-4 border-b">
                <div className="p-2 bg-green-50 rounded">
                  <BookOpen className="size-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">New course published</p>
                  <p className="text-sm text-gray-600">Advanced React Patterns - 5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-purple-50 rounded">
                  <DollarSign className="size-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Payment received</p>
                  <p className="text-sm text-gray-600">₦49,999 - Full Stack Web Development - Yesterday</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <a href="/admin/courses" className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="font-medium">Manage Courses</div>
              <div className="text-sm text-gray-600">Add, edit, or remove courses</div>
            </a>
            <a href="/admin/students" className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="font-medium">Manage Students</div>
              <div className="text-sm text-gray-600">View and manage student accounts</div>
            </a>
            <a href="/admin/certificates" className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="font-medium">Issue Certificates</div>
              <div className="text-sm text-gray-600">Generate completion certificates</div>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}