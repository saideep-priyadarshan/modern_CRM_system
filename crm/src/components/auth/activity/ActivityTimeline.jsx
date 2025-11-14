import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActivities } from '../../features/activities/activitiesSlice';
import ActivityItem from './ActivityItem';
import { FiClock } from 'react-icons/fi';

const ActivityTimeline = ({ leadId }) => {
  const dispatch = useDispatch();
  const { activities, isLoading } = useSelector((state) => state.activities);

  useEffect(() => {
    if (leadId) {
      dispatch(getActivities(leadId));
    }
  }, [dispatch, leadId]);

  if (isLoading) {
    return <div className="text-center py-8">Loading activities...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <FiClock className="text-gray-600" />
        <h2 className="text-xl font-semibold text-gray-800">
          Activity Timeline
        </h2>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-6">
          {activities.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No activities yet
            </p>
          ) : (
            activities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityTimeline;