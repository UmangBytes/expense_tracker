import CARD_2 from "../../assets/images/card2.png";
import {LuTrendingUpDown} from "react-icons/lu"

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-x-hidden">
      
      <div className="w-full md:w-[60%] px-12 py-8 flex flex-col bg-white">
        <h2 className="text-lg font-medium text-black">
          Expense Tracker
        </h2>

        <div className="flex-1 flex items-center">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>

      <div className="hidden md:block relative w-[40%] h-full bg-violet-50">
        

        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-[40px] bg-purple-600" />
        <div className="absolute top-[32%] -right-24 w-64 h-72 rounded-[40px] border-[18px] border-fuchsia-600" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-[40px] bg-violet-500" />

        <div className="absolute w-[90%] top-24 left-1/2 -translate-x-1/2 z-20">
            <StatusInfoCard 
            icon={<LuTrendingUpDown />}
            label="Treack Your Income & Expenses"
            value="430,000"
            color="bg-primary"
            />
        </div>

        <img
          src={CARD_2}
          alt="Dashboard Preview"
          className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[80%] max-w-lg shadow-xl"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

const StatusInfoCard =({icon,label,value,color})=>{
    return <div className="flex gap-6 bg-white p-4 rounded-xl  shadow-md shadow-purple-400/10 border border-gray-200/50 z-10">
        <div
        className={`w-12 h-12  flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
        >
        {icon}
        </div>

        <div>
        <h6 className="">{label}</h6>
        <span className="">${value}</span>
        </div>

    </div>
}
