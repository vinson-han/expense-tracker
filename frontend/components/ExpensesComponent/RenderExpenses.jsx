import {useState, useEffect, React} from "react";

export default function RenderExpenses({ postChange }) {

const token = sessionStorage.getItem("jwt-token");

const [expenseData, setExpenseData] = useState([]);

const [deleteChange, setDeleteChange] = useState('')

async function deleteExpense(id) {
  const token = sessionStorage.getItem("jwt-token");
  const deleteExpenseUrl = `http://localhost:3001/api/expense/deleteExpense/${id}`;

  //include token authentication in headers
  //await for fetch to make a DELETE request
  try {
    const deleteResponse = await fetch(deleteExpenseUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });


    if (!deleteResponse.ok) {
      throw new Error(`${deleteResponse.status}`);
    }

    setDeleteChange(await deleteResponse.json());
    console.log("User Expense Deleted");
  } catch (error) {
    console.error(error);
  }
}


useEffect(() => {
  async function getData() {
    //await for fetch to make a GET request
    let dashboardUrl = "http://localhost:3001/api/dashboard";

    try {
      const getResponse = await fetch(dashboardUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Set request content type to JSON
          Authorization: `Bearer ${token}`,
        },
      });


      if (!getResponse.ok) {
        throw new Error(`${getResponse.status}`);
      }

      const data = await getResponse.json();

      console.log("User Expenses Retrieved");

      setExpenseData(data.data.Expense);
    } catch (error) {
      console.error(error);
    }
  }
  //call the getData() function when component mounts
  getData();
}, [deleteChange, postChange]);

  return (
    <>
      <div className="w-full h-fit max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Expenses
        </h5>
      </div>


<div className="w-full h-fit max-w-sm bg-green-200 border border-gray-200 rounded-lg shadow">
        <div>
          {/* use map() to dynamically render updatedData */}
          <ul>
            {expenseData.map((expense, key) => (
              <div
                key={key}
                className="bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 m-4 relative"
              >
                <ul>
                  <li className="flex">
                    <div className="text-sm font-medium mr-2">Description:</div>
                    <div className="text-sm font-small">
                      {expense.description}
                    </div>
                  </li>

                  <li className="flex">
                    <div className="text-sm font-medium mr-2">Category:</div>
                    <div className="text-sm font-small">{expense.category}</div>
                  </li>

                  <li className="flex">
                    <div className="text-sm font-medium mr-2">Amount:</div>
                    <div className="text-sm font-small">
                      {"$" + expense.amount}
                    </div>
                  </li>

                  <li className="flex">
                    <div className="text-sm font-medium mr-2">Recurrence:</div>
                    <div className="text-sm font-small">{expense.frequency}</div>
                  </li>

                  <li className="flex">
                    <div className="text-sm font-medium mr-2">Date:</div>
                    <div className="text-sm font-small">
                      {expense.targetDate}
                    </div>
                  </li>
                </ul>

                <button
                  //pass income.id through delete function to delete specific income
                  onClick={() => deleteExpense(expense.id)}
                  type="button"
                  className="transition duration-300 h-7 w-7 text-red-700 hover:text-white border border-red-700 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm text-center absolute right-3 bottom-3"
                >
                  X
                </button>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}