// Import expense-tracker components
import SavingsForm from "./SavingsComponent/SavingsForm";
import IncomeForm from "./IncomeComponent/IncomeForm";
import ExpensesForm from "./ExpensesComponent/ExpensesForm";

//import context for name
import DataVisualization from "./ChartComponents/DataVisualization";

function ExpenseGoals() {
  return (
    <>
      <div className="flex-col">
        <DataVisualization />
      </div>

      <div className="flex flex-col justify-items-center mb-64">
        <div className="flex flex-col justify-evenly lg:flex-row">
          <SavingsForm />
          <IncomeForm />
          <ExpensesForm />
        </div>
      </div>
    </>
  );
}

export default ExpenseGoals;
