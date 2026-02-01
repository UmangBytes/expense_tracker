import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper'
import CustomBarChart from '../Charts/CustomBarChart'

const Last30DaysExpenses = ({data}) => {

    const [chartData,setChartData]=useState([])
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const result=prepareExpenseBarChartData(data)
        
        setChartData(result);
        
        setLoading(false)
        return ()=>{}
    },[data])

    if(loading){
        return <p>Loading..</p>
    }

  return (
    <div className='card  col-span-1'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Last 30 Days Expenses</h5>
        </div>

        <CustomBarChart data={chartData}/>
    </div>
  )
}

export default Last30DaysExpenses
