import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Skeleton } from '../../components/ui/skeleton';
import { useApi } from '../../hooks/useApi';
import { api } from '../../utils/api';
import { ErrorState } from '../../components/ErrorState';
import { CreditCard, CheckCircle, Clock, XCircle } from 'lucide-react';
import type { Payment } from '../../types';

export default function AdminPayments() {
  const { data: payments, isLoading, error, retry } = useApi<Payment[]>(() => api.payments.all());

  const getStatusBadge = (status: string) => {
    const config: Record<string, { icon: typeof Clock; label: string; color: string }> = {
      confirmed: { icon: CheckCircle, label: 'Confirmed', color: 'text-green-600' },
      pending: { icon: Clock, label: 'Pending', color: 'text-yellow-600' },
      failed: { icon: XCircle, label: 'Failed', color: 'text-red-600' },
    };
    const { icon: Icon, label, color } = config[status] || config.pending;
    return <Badge variant="outline" className="flex items-center gap-1 w-fit"><Icon className={`size-3 ${color}`} />{label}</Badge>;
  };

  if (isLoading) return <div className="space-y-4"><div className="grid gap-4 sm:grid-cols-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}</div><Skeleton className="h-64 rounded-xl" /></div>;
  if (error) return <ErrorState message={error} onRetry={retry} />;

  const allPayments = payments || [];
  const totalRevenue = allPayments.filter(p => p.status === 'confirmed').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Payment Management</h1>
        <p className="text-gray-600 mt-2">View all payments across the platform</p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Card><CardHeader className="pb-3"><CardDescription>Total Revenue</CardDescription><CardTitle className="text-2xl">&#8358;{totalRevenue.toLocaleString()}</CardTitle></CardHeader></Card>
        <Card><CardHeader className="pb-3"><CardDescription>Total Transactions</CardDescription><CardTitle className="text-2xl">{allPayments.length}</CardTitle></CardHeader></Card>
        <Card><CardHeader className="pb-3"><CardDescription>Pending</CardDescription><CardTitle className="text-2xl">{allPayments.filter(p => p.status === 'pending').length}</CardTitle></CardHeader></Card>
      </div>

      {allPayments.length === 0 ? (
        <Card><CardContent className="pt-6 text-center py-12"><CreditCard className="size-16 mx-auto text-gray-400 mb-4" /><h3 className="text-lg font-semibold mb-2">No Payments Yet</h3></CardContent></Card>
      ) : (
        <Card>
          <CardHeader><CardTitle>All Transactions</CardTitle></CardHeader>
          <CardContent className="overflow-x-auto">
            <Table className="min-w-[700px]">
              <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Student</TableHead><TableHead>Course</TableHead><TableHead>Method</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
              <TableBody>
                {allPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="whitespace-nowrap">{new Date(payment.date).toLocaleDateString()}</TableCell>
                    <TableCell className="whitespace-nowrap">{payment.student?.name || 'N/A'}</TableCell>
                    <TableCell className="whitespace-nowrap">{payment.course?.title || 'N/A'}</TableCell>
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
