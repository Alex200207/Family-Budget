// import React, { useState } from "react";
// import useExpenses from "./../hook/useExpenses"; // Adjust path if necessary
// import { Gasto } from "./../types/"; // Adjust path if necessary

// const AddExpenseComponent = () => {
//   const { createNewExpense, expense} = useExpenses();
  
//   const [newExpense, setNewExpense] = useState<Gasto>({
//     id: 0,
//     presupuesto_id: 1,  // Replace with actual presupuesto_id
//     tipo: "Alimentación", // Example category
//     usuario_id: 2, // Replace with actual user_id
//     monto: 150,
//     estado: 1,  // Assuming 1 means active, replace if needed
//     fecha: new Date(),
//   });

//   const handleAddExpense = async () => {
//     // Here we're passing the newExpense in an array, as the hook expects an array of expenses
//     await createNewExpense([newExpense]);
//   };

//   return (
//     <div>
//       <button onClick={handleAddExpense} className="btn btn-primary">
//         Agregar Gasto
//       </button>
//       <div>
//         <h3>Lista de Gastos</h3>
//         <ul>
//           {expense.map((gasto) => (
//             <li key={gasto.id}>
//               {gasto.tipo} - ${gasto.monto}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default AddExpenseComponent;
