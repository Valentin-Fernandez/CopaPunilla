import Stats from '../features/dashboard/Stats/Stats.js';
import Torneos from '../features/dashboard/Torneos/Torneos.js';

const Dashboard = () => {
    return (
        <div className="container mx-auto mb-10">
            <Stats />
            <Torneos />
        </div>
    );
};

export default Dashboard;
