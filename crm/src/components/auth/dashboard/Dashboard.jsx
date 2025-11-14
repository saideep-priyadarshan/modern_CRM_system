import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardData } from '../../features/dashboard/dashboardSlice';
import MetricsCard from './MetricsCard';
import LeadsByStage from './charts/LeadsByStage';
import ConversionRate from './charts/ConversionRate';
import RevenueChart from './charts/RevenueChart';
import { FiUsers, FiDollarSign, FiTrendingUp, FiTarget } from 'react-icons/fi';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { metrics, isLoading } = useSelector((state) => state.dashboard);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getDashboardData());
  }, [dispatch]);

  if (isLoading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening with your sales today
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MetricsCard
          title="Total Leads"
          value={metrics?.totalLeads || 0}
          icon={FiUsers}
          color="blue"
          change={metrics?.leadsChange}
        />
        <MetricsCard
          title="Qualified Leads"
          value={metrics?.qualifiedLeads || 0}
          icon={FiTarget}
          color="green"
          change={metrics?.qualifiedChange}
        />
        <MetricsCard
          title="Conversion Rate"
          value={`${metrics?.conversionRate || 0}%`}
          icon={FiTrendingUp}
          color="purple"
          change={metrics?.conversionChange}
        />
        <MetricsCard
          title="Revenue"
          value={`$${metrics?.revenue?.toLocaleString() || 0}`}
          icon={FiDollarSign}
          color="yellow"
          change={metrics?.revenueChange}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <LeadsByStage data={metrics?.leadsByStage} />
        <ConversionRate data={metrics?.conversionData} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <RevenueChart data={metrics?.revenueData} />
      </div>
    </div>
  );
};

export default Dashboard;