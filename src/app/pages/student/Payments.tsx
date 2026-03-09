import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { CreditCard, CheckCircle, Clock, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function StudentPayments() {
  const { accessToken } = useAuth();
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, [accessToken]);

  const fetchPayments = async () => {
    if (!accessToken) return;
    
    try {
      const data = await api.getMyPayments(accessToken);
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

  const totalPaid = payments
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
        <h1 className="text-3xl font-bold">Payment History</h1>
        <p className="text-gray-600 mt-2">Track your course payments and transactions</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Paid</CardDescription>
            <CardTitle className="text-3xl">${totalPaid.toFixed(2)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Transactions</CardDescription>
            <CardTitle className="text-3xl">{payments.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Pending Payments</CardDescription>
            <CardTitle className="text-3xl">
              {payments.filter(p => p.status === 'pending').length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {payments.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <CreditCard className="size-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Payments Yet</h3>
            <p className="text-gray-600">Your payment history will appear here.</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
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
          </CardContent>
        </Card>
      )}
    </div>
  );
}
