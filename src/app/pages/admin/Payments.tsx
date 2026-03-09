import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminPayments() {
  const { accessToken } = useAuth();
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, [accessToken]);

  const fetchPayments = async () => {
    if (!accessToken) return;
    
    try {
      const data = await api.getAllPayments(accessToken);
      setPayments(data.payments || []);
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast.error('Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const config: any = {
      completed: { variant: 'default', icon: CheckCircle, label: 'Completed', color: 'text-green-600' },
      pending: { variant: 'secondary', icon: Clock, label: 'Pending', color: 'text-yellow-600' },
      failed: { variant: 'destructive', icon: XCircle, label: 'Failed', color: 'text-red-600' },
    };

    const { icon: Icon, label, color } = config[status] || config.pending;

    return (
      <Badge variant="outline" className="flex items-center gap-1 w-fit">
        <Icon className={`size-3 ${color}`} />
        {label}
      </Badge>
    );
  };

  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payment Management</h1>
        <p className="text-gray-600 mt-2">View and manage all platform payments</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Total Revenue</p>
              <DollarSign className="size-4 text-gray-600" />
            </div>
            <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Completed</p>
              <CheckCircle className="size-4 text-green-600" />
            </div>
            <p className="text-3xl font-bold">
              {payments.filter(p => p.status === 'completed').length}
            </p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Pending</p>
              <Clock className="size-4 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold">
              {payments.filter(p => p.status === 'pending').length}
            </p>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <div className="text-center py-12 text-gray-600">
              No payments recorded yet
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment: any) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      {new Date(payment.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {payment.userId?.substring(0, 8)}...
                    </TableCell>
                    <TableCell>
                      {payment.description || payment.courseTitle || 'Course Payment'}
                    </TableCell>
                    <TableCell className="font-medium">
                      ${payment.amount?.toFixed(2) || '0.00'}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(payment.status)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
