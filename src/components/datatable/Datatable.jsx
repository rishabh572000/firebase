import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc, onSnapshot  } from "firebase/firestore";
import { db } from "../../firebase";

const Datatable = () => {
  const [data, setData] = useState([]);

  const handleDelete = async(id) => {
    await deleteDoc(doc(db, "users", id));
    setData(data.filter((item) => item.id !== id));
  };

  useEffect(async()=>{
    // const querySnapshot = await getDocs(collection(db, "users"));
    // let myData = []
    // querySnapshot.forEach((doc) => {
    //   myData =[...myData, {...doc.data(), id: doc.id}]
    // });
    // setData(myData)
    const unsub = onSnapshot(collection(db, "users"), (snapShort) => {     
      const list =[];
      snapShort.docs.forEach((doc)=>{
        list.push({id:doc.id, ...doc.data()})
      })
      setData(list)
  });

  return()=>{
    unsub();
  };
  }, [])


  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
