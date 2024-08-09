// import { createSignal, Component } from 'solid-js';
// import { useNavigate } from '@solidjs/router';
// import { useStore } from '../../store';

// const Confirm_role: Component = () => {
//   const [{ sessionStore }] = useStore();
//   const navigate = useNavigate();
//   const [selectedRole, setSelectedRole] = createSignal("");

//   const handleRoleConfirmation = () => {
//     if (selectedRole()) {
//       // Perform role confirmation logic and store the selected role in sessionStore
//       sessionStore.setRole(selectedRole());

//       // Redirect the user to the login page
//       navigate('/login');
//     } else {
//       alert('Please select a role before proceeding.');
//     }
//   };

//   return (
//     <div>
//       <h2>Confirm Your Role</h2>
//       <label>
//         Select your role:
//         <select value={selectedRole()} onChange={(e) => setSelectedRole(e.target.value)}>
//           <option value="">Select Role</option>
//           <option value="admin">Admin</option>
//           <option value="direktur_utama">Direktur Utama</option>
//           <option value="direktur_keuangan">Direktur Keuangan</option>
//           {/* Add more role options as needed */}
//         </select>
//       </label>
//       <button onClick={handleRoleConfirmation}>Confirm Role</button>
//     </div>
//   );
// };

// export default Confirm_role;
