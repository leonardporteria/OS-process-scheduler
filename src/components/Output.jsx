import Timeline from './utils/Timeline';
import FCFS from './algorithms/FCFS';
import SJF from './algorithms/SJF';
import NPP from './algorithms/NPP';

import { useState, useEffect } from 'react';

const Output = ({ processData }) => {
  const [totalBurstTime, setTotalBurstTime] = useState(0);

  const inputData = processData.sort((a, b) => (a.id > b.id ? 1 : -1));

  const handleTotalBurstTime = () => {
    let total_burst_time = 0;
    processData.map((data) => {
      total_burst_time += parseInt(data.burst_time);
    });
    setTotalBurstTime(total_burst_time);
  };

  useEffect(() => {
    handleTotalBurstTime();
  }, []);

  return (
    <section className='flex flex-col p-4 text-blue-50 font-poppins'>
      <table className='border-2 border-slate-200'>
        <thead>
          <tr className='border-2 border-slate-200  bg-slate-200 text-lg  text-slate-900'>
            <th className='border-2 border-slate-200 p-4'>Job Name</th>
            <th className='border-2 border-slate-200 p-4'>Arrival Time</th>
            <th className='border-2 border-slate-200 p-4'>Burst Time</th>
            <th className='border-2 border-slate-200 p-4'>Priority Level</th>
          </tr>
        </thead>
        <tbody>
          {inputData.map((data) => (
            <tr key={data.id} className='border-2 border-slate-200 text-center'>
              <td className='border-2 border-slate-200 p-4'>{data.job_name}</td>
              <td className='border-2 border-slate-200 p-4'>
                {data.arrival_time}
              </td>
              <td className='border-2 border-slate-200 p-4'>
                {data.burst_time}
              </td>
              <td className='border-2 border-slate-200 p-4'>
                {data.priority_level}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th
              className='border-2 border-slate-200 p-4 text-right'
              colSpan='2'
            >
              Total Burst Time:
            </th>
            <th className='border-2 border-slate-200 p-4'>{totalBurstTime}</th>
            <th className='border-2 border-slate-200 p-4'></th>
          </tr>
        </tfoot>
      </table>

      {/* ALGORITHM TABLES */}
      <Timeline processData={processData} />
      <FCFS processData={processData} />
      <SJF processData={processData} />
      <NPP processData={processData} />
    </section>
  );
};

export default Output;
