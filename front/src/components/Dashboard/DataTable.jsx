import  React,{useState,useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import LoadingBook from '../LoadingBook';
import {getAllUsers} from '../../axios/requests';

const columns = [
  { field: 'id', headerName: 'ID', width: 300 },
  { field: 'name', headerName: 'name', width: 130 },
  { field: 'email', headerName: 'E-mail', width: 300 },
  {
    field: 'type',
    headerName: 'Type',
    type: 'string',
    width: 90,
  },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
];

const rows = [
  { id: 1, name: 'Snow', email: 'Jon', type: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataTable() {
    const [users,setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchUserData = async () => {
          try {
           
            const res  = await getAllUsers();
            const usersWithIds = res.data.map(user => ({
                ...user,
                id: user._id // Use the unique '_id' property as the 'id'
            }));
            setUsers(usersWithIds);
             
             console.log(res.data);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        //    finally {
        //     // Set loading to false regardless of success or error
        //     setLoading(false);
        //   }
        setTimeout(() => {
            setLoading(false);
        },3000)
        };
    
        fetchUserData();
      }, [users]);
    
  return (
    <div style={{ height: 400, width: '100%' }}>
      {loading?<LoadingBook/>:<DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />}
    </div>
  );
}
