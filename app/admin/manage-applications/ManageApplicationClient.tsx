"use client";

import Heading from "@/app/components/Heading";
import { Application } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import moment from "moment";
import ActionBtn from "../admincomponents/ActionBtn";
import { MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md";

// Define the type for rows used in DataGrid
interface ApplicationRow {
  id: string;
  fullname: string;
  type: string;
  date: string;
}

interface ManageApplicationClientProps {
  applications: Application[];
}

const ManageApplicationClient: React.FC<ManageApplicationClientProps> = ({
  applications,
}) => {
  const router = useRouter();

  // Type the rows array properly
  let rows: ApplicationRow[] = [];
  if (applications) {
    rows = applications.map((app) => ({
      id: app.id,
      fullname: app.fullName,
      type: app.type,
      email: app.email,
      destination: app.destination,
      date: moment(app.createdAt).fromNow(), // Adjust as needed for formatting
    }));
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "fullname", headerName: "Full Name", width: 130 },
    {
      field: "type",
      headerName: "Apply For",
      width: 130,
    },
    { field: "email", headerName: "Email", width: 220 },
    { field: "destination", headerName: "Destination", width: 200 },
    {
      field: "date",
      headerName: "Date",
      width: 200,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full my-2">
            <ActionBtn
              icon={MdDeliveryDining}
              onClick={() => {
                // handleDispatch(params.row.id);
              }}
            />
            <ActionBtn
              icon={MdDone}
              onClick={() => {
                // handleDeliver(params.row.id);
              }}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/application/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  const paginationModel = { page: 0, pageSize: 9 };

  return (
    <div className="max-w-[1450px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Applications" center />
      </div>
      <div className="border-2" style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          sx={{ border: 0 }}
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ManageApplicationClient;
