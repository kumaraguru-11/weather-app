import React from 'react'

const Current = ({currentData}) => {
  return (
    <div className="c_header">
      <div> 
      Current Weather Report
      </div>

      <div className='c_container'>
        <div>
            <img src={currentData.condition.icon} alt={currentData.condition.text}/>
            <span>{currentData.condition.text}</span>
        </div>
        <div>
            <span>Temp:</span>
            <span>{`${currentData.temp_c} deg`}</span>
        </div>
        <div>
          <span>Feels like:</span>
          <span>{`${currentData.feelslike_c} deg`}</span>
        </div>
        <div>
            <span>Wind:</span>
            <span>{`${currentData.wind_kph} KPH`}</span>
        </div>
      </div>
    </div>
  );
}

export default Current;