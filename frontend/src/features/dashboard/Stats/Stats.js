import StatsService from '../../../service/StatsService.js';
import { useState, useEffect } from 'react';

const Stats = () => {
    const [stats, setStats] = useState();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await StatsService.getAll();
                setStats(data);
            } catch (error) {
                console.error('Error al obtener las stats', error);
            }
        };
        fetchStats();
    }, []);

    return (
        <>
            {stats && (
                <div className="grid grid-cols-2 container mx-auto w-[90%] gap-4 mb-8 md:flex md:items-center md:justify-center mt-8">
                    {Object.keys(stats).map(key => {
                        const value = stats[key];
                        return (
                            <div key={key} className="px-2 py-4 border rounded-2xl bg-terciary text-primary text-center md:p-8 md:w-[200px] shadow-md">
                                <h3 className="text-2xl font-bold capitalize">{key}</h3>
                                <p className="text-2xl font-bold">{value}</p>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default Stats;
