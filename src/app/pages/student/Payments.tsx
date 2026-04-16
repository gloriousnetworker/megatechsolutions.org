import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Skeleton } from '../../components/ui/skeleton';
import { useApi } from '../../hooks/useApi';
import { api } from '../../utils/api';
import { ErrorState } from '../../components/ErrorState';
import { CreditCard, CheckCircle, Clock, XCircle } from 'lucide-react';
import type { Payment } from '../../types';

export default function StudentPayments() {
  const { data: payments, isLoading, error, retry } = useApi<Payment[]>(() => api.payments.my());

  const getStatusBadge = (status: string) => {
    const config: Record<string, { icon: typeof Clock; label: string; color: string }> = {
      confirmed: { icon: CheckCircle, label: 'Confirmed', color: 'text-green-600' },
      pending: { icon: Clock, label: 'Pending', color: 'text-yellow-600' },
      failed: { icon: XCircle, label: 'Failed', color: 'text-red-600' },
    };
    const { icon: Icon, label, color } = config[status] || config.pending;
    return (
      <Badge variant="outline" className="flex items-center gap-1 w-fit">
        <Icon className={`size-3 ${color}`} />
        {label}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  if (error) return <ErrorState message={error} onRetry={retry} />;

  const allPayments = payments || [];
  const totalPaid = allPayments.filter(p => p.status === 'confirmed').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Payment History</h1>
        <p className="text-gray-600 mt-2">Track your course payments and transactions</p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Paid</CardDescription>
            <CardTitle className="text-2xl sm:text-3xl">&#8358;{totalPaid.toLocaleString()}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Transactions</CardDescription>
            <CardTitle className="text-2xl sm:text-3xl">{allPayments.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Pending Payments</CardDescription>
            <CardTitle className="text-2xl sm:text-3xl">{allPayments.filter(p => p.status === 'pending').length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {allPayments.length === 0 ? (
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
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="whitespace-nowrap">{new Date(payment.date).toLocaleDateString()}</TableCell>
                    <TableCell>{payment.course?.title || 'Course Payment'}</TableCell>
                    <TableCell className="capitalize">{payment.method}</TableCell>
                    <TableCell className="font-medium whitespace-nowrap">&#8358;{payment.amount.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
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
