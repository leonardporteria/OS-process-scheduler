import { useEffect, useState } from 'react';

const FCFS = ({ processData }) => {
  const timelineData = processData.sort((a, b) =>
    parseInt(a.arrival_time) > parseInt(b.arrival_time) ? 1 : -1
  );

  const [FCFS_data, setFCFS_data] = useState([]);

  const handleFCFSData = () => {
    const getEndTimes = [];
    let end_time;
    console.log(timelineData);

    timelineData.forEach((data, index) => {
      if (index === 0) {
        end_time = parseInt(data.arrival_time);
        getEndTimes.push(end_time);
      }
      end_time += parseInt(data.burst_time);

      const FCFS_object = {
        id: data.id,
        job_name: data.job_name,
        arrival_time: data.arrival_time,
        burst_time: data.burst_time,
        priority_level: data.priority_level,
        end_time: end_time,
      };

      getEndTimes.push(FCFS_object);
      console.log(getEndTimes);
    });

    setFCFS_data(getEndTimes);
  };

  useEffect(() => {
    handleFCFSData();
  }, []);

  return (
    <section className='flex flex-col mt-8'>
      <h1 className='text-center font-semibold text-xl'>FCFS</h1>
      <h1 className='text-center font-semibold text-xl '>Gantt Chart</h1>
      {/* GANTT CHART */}
      <div className='flex flex-col mt-2'>
        <table>
          <thead>
            <tr>
              <th className='border-r-2'></th>
              {timelineData.map((data, index) => (
                <th key={index} className='text-center border-r-2 p-2'>
                  {data.job_name}
                  {data.burst_time}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {FCFS_data.map((data, index) => (
                <td
                  key={index}
                  className='text-right border-r-2 border-t-2 p-2'
                >
                  {data.end_time || data}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* TURNAROUND TIME */}
      <div className='flex flex-col mt-2'>
        <table className='border-2 border-solid border-slate-200'>
          <thead>
            <tr className='border-2 border-solid border-slate-200  bg-slate-200 text-lg  text-slate-900'>
              <th className='p-4'>Job Name</th>
              <th className='p-4'>Arrival Time</th>
              <th className='p-4'>Burst Time</th>
              <th className='p-4'>End Time</th>
              <th className='p-4'>Turn Around Time</th>
              <th className='p-4'>Waiting Time</th>
            </tr>
          </thead>
          <tbody>
            {FCFS_data.map((data, index) => {
              if (index !== 0) {
                return (
                  <tr key={index}>
                    <td className='text-center border-2 p-4'>
                      {data.job_name}
                    </td>
                    <td className='text-center border-2 p-4'>
                      {data.arrival_time}
                    </td>
                    <td className='text-center border-2 p-4'>
                      {data.burst_time}
                    </td>
                    <td className='text-center border-2 p-4'>
                      {data.end_time || data}
                    </td>
                    <td className='text-center border-2 p-4'>
                      {data.end_time - data.arrival_time}
                    </td>
                    <td className='text-center border-2 p-4'>
                      {data.end_time - data.arrival_time - data.burst_time}
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>

      {/* WAITING TIME */}
    </section>
  );
};

export default FCFS;