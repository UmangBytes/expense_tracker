import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverView from '../../components/Income/IncomeOverView'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import Modal from '../../components/Modal'
import AddIncomeForm from '../../components/Income/AddIncomeForm'
import toast from 'react-hot-toast'
import IncomeList from '../../components/Income/IncomeList'
import DeleteAlert from '../../components/DeleteAlert'
import { useUserAuth } from '../../hooks/useUserAuth'

const Income = () => {

  useUserAuth()

   const [incomeData,setIncomeData]=useState([])
    const [loading,setLoading]=useState(false);
    const [openDeleteAlert,setOpenDeleteAlert]=useState({
        show:false,
        data:null,
    })

  const [openAddIncomeModal,setOpenAddIncomeModal]=useState(false)

    const fetchIncomeDetails=async ()=>{

      if(loading) return ;
      

      try{
        const response=await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME)

        if(response.data){
          setIncomeData(response.data)
        }

      }catch(error){
          console.log('Something went wrong.Please try again.',error)
      }finally{
        setLoading(false)
      }
    }

    const handleAddIncome=async (income)=>{
      const {source,amount,date,icon}=income

      if(!source.trim()){
        toast.error("Source is required")
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
        await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME,{
          source,
          amount,
          date,
          icon
        })

        setOpenAddIncomeModal(false)
        toast.success("Income added successfully")
        fetchIncomeDetails()

       
      } catch (error) {
        console.error("Error adding income:",error.response?.data?.message || error.message)
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

    const handleDownloadIncomeDetails=async ()=>{}

    useEffect(()=>{
      fetchIncomeDetails();

      return ()=>{}
    },[])

    console.log('incomeData=',incomeData);
    
  return (
    <DashboardLayout activeMenu="Income">
        <div>
          <div className='my-5 mx-auto'>
              <div className='grid grid-cols-1 gap-6'>
                <IncomeOverView
                  transactions={incomeData}
                  onAddIncome={()=>setOpenAddIncomeModal(true)}
                />
              </div>

              <IncomeList
              transactions={incomeData}
              onDelete={(id)=>{
                setOpenDeleteAlert({show:true,data:id})
              }}
              onDownload={handleDownloadIncomeDetails}
              />
              
          </div>

        <Modal 
        isOpen={openAddIncomeModal}
        onClose={()=>setOpenAddIncomeModal(false)}
        title="Add Income"
        >
          
          <AddIncomeForm  onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
        isOpen={openDeleteAlert.show}
        onClose={()=>setOpenDeleteAlert({show:false,data:null})}
        title="Delete Income"
        >
            <DeleteAlert 
            content="Are you sure want to delete this income detail?"
            onDelete={()=>deleteIncome(openDeleteAlert.data)}
            />

        </Modal>

        </div>
        </DashboardLayout>
  )
}

export default Income
