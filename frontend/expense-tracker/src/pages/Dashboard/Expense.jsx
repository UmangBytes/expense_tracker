import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import ExpenseOverView from '../../components/Expense/ExpenseOverView';

const Expense = () => {

  useUserAuth();

  const [expenseData,setExpenseData]=useState([])
  const [loading,setLoading]=useState(false);
  const [openDeleteAlert,setOpenDeleteAlert]=useState({
          show:false,
          data:null,
  })
  
  const [openAddExpenseModal,setOpenAddExpenseModal]=useState(false)


    const fetchExpenseDetails=async ()=>{

      if(loading) return ;
      

      try{
        const response=await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE)

        // console.log('response=',response);

        if(response.data){
          setExpenseData(response.data)
        }

      }catch(error){
          console.log('Something went wrong.Please try again.',error)
      }finally{
        setLoading(false)
      }
    }

    const handleAddExpense=async (expense)=>{
      const {category,amount,date,icon}=expense

      if(!category.trim()){
        toast.error("Category is required")
        return ;
      }

      if(!amount || isNaN(amount || Number(amount)<=0)){
        toast.error("Amount should be a valid number greater than 0.")
        return ;
      }

      if(!date){
        toast.error("Date is required")
        return;
      }

      try {
        await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE,{
          category,
          amount,
          date,
          icon
        })

        setOpenAddExpenseModal(false)
        toast.success("Expense added successfully")
        fetchExpenseDetails()

       
      } catch (error) {
        console.error("Error adding expense:",error.response?.data?.message || error.message)
      }

    } 

    const deleteIncome=async (id)=>{
        try {
          
          setOpenDeleteAlert({
            show:false,
            data:null
          })
          toast.success("Income details deleted successfully")
          setIncomeData((prev) =>
          prev.filter((item) => String(item._id) !== String(id))
          );

          await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))
          //  fetchIncomeDetails();
          
        } catch (error) {
          console.error("Error deleting income:",error.response?.data?.message || error.message) 
        }
    }

    useEffect(()=>{
      fetchExpenseDetails()

      return ()=>{}
    },[])

  return (
    <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'>
          <div className='grid grid-cols-1 gap-6'>
            <div>
              <ExpenseOverView 
              transactions={expenseData}
              onExpenseIncome={()=>setOpenAddExpenseModal(true)}
              />
            </div>
          </div>
      </div>
    </DashboardLayout>
  )
}

export default Expense
