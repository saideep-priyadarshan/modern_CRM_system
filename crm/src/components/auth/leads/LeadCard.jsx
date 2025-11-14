import { useNavigate } from 'react-router-dom';
import { FiMail, FiPhone, FiBuilding, FiCalendar } from 'react-icons/fi';
import { format } from 'date-fns';

const LeadCard = ({ lead }) => {
  const navigate = useNavigate();

  const statusColors = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    qualified: 'bg-green-100 text-green-800',
    lost: 'bg-red-100 text-red-800',
  };

  return (
    <div
      onClick={() => navigate(`/leads/${lead.id}`)}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{lead.name}</h3>
          <p className="text-sm text-gray-500">{lead.title}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            statusColors[lead.status]
          }`}
        >
          {lead.status}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <FiBuilding className="mr-2" />
          {lead.company}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <FiMail className="mr-2" />
          {lead.email}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <FiPhone className="mr-2" />
          {lead.phone}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <FiCalendar className="mr-2" />
          {format(new Date(lead.createdAt), 'MMM dd, yyyy')}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">Potential Value</p>
        <p className="text-lg font-semibold text-gray-800">
          ${lead.value?.toLocaleString() || '0'}
        </p>
      </div>
    </div>
  );
};

export default LeadCard;