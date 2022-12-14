import { useEffect, useState } from 'react';

const NPP = ({ processData }) => {
  const [NPP_data, setNPP_data] = useState([]);

  const timelineData = processData.sort((a, b) =>
    parseInt(a.arrival_time) > parseInt(b.arrival_time) ? 1 : -1
  );
  const NPP_gantt = [
    ...NPP_data.sort((a, b) => (a.end_time > b.end_time ? 1 : -1)),
  ];
  const NPP_output = [...NPP_data.sort((a, b) => (a.id > b.id ? 1 : -1))];

  const [NPP_averageTurnAroundTime, setNPP_averageTurnAroundTime] = useState(0);
  const [NPP_averageWaitingTime, setNPP_averageWaitingTime] = useState(0);

  const handleNPPData = () => {
    // filter all array that's within the end time
    // push to tempNPPData the used object

    const temporaryNPPData = [];
    const finishedId = [];
    let end_time = parseInt(timelineData[0].arrival_time);

    timelineData.forEach(() => {
      const qualifiedData = timelineData.filter(
        (data) =>
          parseInt(data.arrival_time) <= end_time &&
          !finishedId.includes(data.id)
      );

      // if qualifiedData.lenght === 0 return qualified data, else reduce
      const highestPriority =
        qualifiedData.length < 1
          ? qualifiedData
          : qualifiedData.reduce((a, b) =>
              parseInt(a.priority_level) <= parseInt(b.priority_level) ? a : b
            );

      // add the end time
      end_time += parseInt(highestPriority.burst_time);

      finishedId.push(highestPriority.id);
      temporaryNPPData.push({ ...highestPriority, end_time: end_time });
    });
    setNPP_data(temporaryNPPData);

    // Compute the average turnaround time and waiting time
    // TT = et - at
    // WT = tt- bt
    let tempTurnAroundTime = 0;
    let tempWaitingTime = 0;

    // total all tt and wt
    temporaryNPPData.forEach((data) => {
      tempTurnAroundTime +=
        parseInt(data.end_time) - parseInt(data.arrival_time);
      tempWaitingTime += tempTurnAroundTime - parseInt(data.burst_time);
    });

    // get the average
    tempTurnAroundTime = (tempTurnAroundTime / temporaryNPPData.length).toFixed(
      2
    );
    tempWaitingTime = (tempWaitingTime / temporaryNPPData.length).toFixed(2);

    setNPP_averageTurnAroundTime(tempTurnAroundTime);
    setNPP_averageWaitingTime(tempWaitingTime);
  };

  useEffect(() => {
    handleNPPData();
  }, []);

  return (
    <section className='flex flex-col mt-8'>
      <h1 className='text-center font-semibold text-xl'>NPP</h1>
      <h1 className='text-center font-semibold text-xl '>Gantt Chart</h1>
      {/* GANTT CHART */}
      <div className='flex flex-col mt-2'>
        <table>
          <thead>
            <tr>
              <th className='border-r-2'></th>
              {NPP_gantt.map((data, index) => (
                <th key={index} className='text-center border-r-2 p-2'>
                  {data.job_name}
                  {data.burst_time}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='text-right border-r-2 border-t-2 p-2'>
                {timelineData[0].arrival_time}
              </td>
              {NPP_gantt.map((data, index) => (
                <td
                  key={index}
                  className='text-right border-r-2 border-t-2 p-2'
                >
                  {data.end_time}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* TURNAROUND AND WAITING TIME */}
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
            {NPP_output.map((data, index) => (
              <tr key={index}>
                <td className='text-center border-2 p-4'>{data.job_name}</td>
                <td className='text-center border-2 p-4'>
                  {data.arrival_time}
                </td>
                <td className='text-center border-2 p-4'>{data.burst_time}</td>
                <td className='text-center border-2 p-4'>
                  {data.end_time || data}
                </td>
                <td className='text-center border-2 p-4'>
                  {data.end_time - parseInt(data.arrival_time)}
                </td>
                <td className='text-center border-2 p-4'>
                  {data.end_time -
                    parseInt(data.arrival_time) -
                    parseInt(data.burst_time)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan='4'
                className='border-2 border-slate-200 p-4 text-right font-semibold'
              >
                Average Turn Around Time and Waiting Time
              </td>
              <td className='border-2 border-slate-200 p-4 text-center font-semibold'>
                {NPP_averageTurnAroundTime}
              </td>
              <td className='border-2 border-slate-200 p-4 text-center font-semibold'>
                {NPP_averageWaitingTime}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
};

export default NPP;
