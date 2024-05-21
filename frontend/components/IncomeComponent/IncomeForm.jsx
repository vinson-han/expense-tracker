import { React, useEffect, useState } from "react";
import RenderIncome from "./RenderIncome";

//component responsible for rendering form, posting data, and getting data
function IncomeForm() {
  //an object that holds respective income properties and is set to empty strings
  const emptyForm = {
    amount: "",
    category: "",
    description: "",
    frequency: "",
    targetDate: "",
  };

  //state to hold data from database
  const [incomeData, setIncomeData] = useState([]);
  //state to hold all the data being inputted into form, initialize it to emptyForm
  const [formData, setFormData] = useState(emptyForm);


  //function that handles changes in our form
  //takes in the event parameter
  //extracts the name and value properties from the event,
  //update the formData state whenever change is detected
  //retains previous state by using spread operator and sets the value according to input
  function handleChange(e) {
    const { name, value } = e.target;
    //for example: for description field -> name=description, value=what is inputted
    setFormData(function (prevState) {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  //function that handles form submission
  //e.preventDefault() to prevent default behavior of button refreshing page when clicked
  async function handleSubmit(e) {
    e.preventDefault();

    const token = sessionStorage.getItem("jwt-token");
    let addIncomeUrl = "http://localhost:3001/api/expense/addIncome";

    try {
      //await for fetch to make a POST request
      //included authorization in headers
      //token taken from browser's session storage when user logged in
      const postResponse = await fetch(addIncomeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set request content type to JSON
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      //if response is not succesful then throw error status
      if (!postResponse.ok) {
        throw new Error(`${postResponse.status}`);
      }

      //reset the inputs by setting formData back to emptyForm
      setFormData(emptyForm);


    } catch (error) {
      //catch block for handling errors
      console.error(error);
    }
  }

//useEffect(()=> {},[]) so when component mounts, code inside is ran
//get data from backend api, include token authorization
  useEffect(()=> {
    const token = sessionStorage.getItem("jwt-token");
    async function getData() {
      //await for fetch to make a GET request
      let dashboardUrl = "http://localhost:3001/api/dashboard";
      const getResponse = await fetch(dashboardUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Set request content type to JSON
          Authorization: `Bearer ${token}`,
        },
      });
        
      //if response is not succesful then throw error status
      if (!getResponse.ok) {
        throw new Error(`${getResponse.status}`);
      }
  
      //parse json and produce javascript object
      //store in data variable
      const data = await getResponse.json();
      //store income data in incomeData state variable
      setIncomeData(data.data.Income);
    }

    //call the getData() function when component mounts
    getData();
  },[])


  return (
    <>
      <div className="">
        <div className="w-full h-fit max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Add Income
            </h5>

            <div className="mb-5">
              <label
                htmlFor="base-input"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <input
                type="text"
                name="description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="amount"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Amount
                </label>
                <input
                  type="text"
                  name="amount"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="$"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Date
                </label>

                <input
                  aria-label="Date"
                  type="date"
                  name="targetDate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formData.targetDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Category
                </label>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option id="0"> </option>
                  <option id="1">One-time Payment</option>
                  <option id="2">Employment Income</option>
                  <option id="3">Freelance Income</option>
                  <option id="4">Investment Income</option>
                  <option id="5">Other</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Reccurrence
                </label>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  required
                >
                  <option id="0"> </option>
                  <option id="1">No Recurrence</option>
                  <option id="2">Daily</option>
                  <option id="3">Weekly</option>
                  <option id="4">Bi-weekly</option>
                  <option id="5">Monthly</option>
                  <option id="5">Yearly</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full my-4 text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add Income
            </button>
          </form>
        </div>

        {/* pass incomeData as a prop to render in RenderIncome component */}
        <div className="mt-10">
          <RenderIncome incomeData={incomeData} />
        </div>

      </div>
    </>
  );
}

export default IncomeForm;