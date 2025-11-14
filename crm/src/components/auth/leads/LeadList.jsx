import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLeads, setFilters } from '../../features/leads/leadsSlice';
import LeadCard from './LeadCard';
import LeadForm from './LeadForm';
import { FiPlus, FiSearch, FiFilter } from 'react-icons/fi';

const LeadList = () => {
  const dispatch = useDispatch();
  const { leads, isLoading, filters } = useSelector((state) => state.leads);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getLeads(filters));
  }, [dispatch, filters]);

  const handleSearch = (e) => {
    dispatch(setFilters({ search: e.target.value }));
  };

  const handleStatusFilter = (status) => {
    dispatch(setFilters({ status }));
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
      lead.email?.toLowerCase().includes(filters.search.toLowerCase()) ||
      lead.company?.toLowerCase().includes(filters.search.toLowerCase());

    const matchesStatus =
      filters.status === 'all' || lead.status === filters.status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Leads</h1>
          <p className="text-gray-600 mt-1">
            Manage and track your sales leads
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <FiPlus /> Add Lead
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search leads..."
                value={filters.search}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-2">
            {['all', 'new', 'contacted', 'qualified', 'lost'].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusFilter(status)}
                className={`px-4 py-2 rounded-lg capitalize transition ${
                  filters.status === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">Loading leads...</div>
      ) : filteredLeads.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500">No leads found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLeads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      )}

      {showModal && <LeadForm onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default LeadList;