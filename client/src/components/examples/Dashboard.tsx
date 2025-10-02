import Dashboard from '../../pages/Dashboard';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../lib/queryClient";
import { ThemeProvider } from '../ThemeProvider';

export default function DashboardExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Dashboard />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
