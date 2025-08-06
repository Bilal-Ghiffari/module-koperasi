import CustomTableDashboard from "@/components/Common/Dashboard/TableDashboard";
import TableListNew from "@/components/Common/TableListNew";
import { Chip } from "@mui/material";
import ActionComp from "./ActionComp";
import { postFormData } from "@/helpers/api_helper";
import { apiDeletePerseroanPerorangan } from "@/helpers/backend_helper";
import { ToastifyService } from "@/components/Toastify/toastifyService";

const SectionRiwayatPermohonan = ({ data, fetchData, setQuery, query }) => {
  const toastifyService = new ToastifyService();
  const handle = (type, id) => {
    switch (type) {
      case "delete":
        toastifyService.confirmationDelete().then((res) => {
          if (res) {
            apiDeletePerseroanPerorangan(id)
              .then((res) => {
                console.log("res", res);
                fetchData();
              })
              .catch((err) => {
                console.log("err", err);
              });
          }
        });

        break;
      default:
        break;
    }
  };
  function removeUnderscore(text) {
    if (!text) return "";
    return text
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  const columns = [
    { id: "no", label: "No" },
    { id: "nama_lengkap", label: "Nama Lengkap", width: "150px" },
    { id: "no_permohonan", label: "No. Permohonan", width: "150px" },
    { id: "created_at", label: "Tanggal Permohonan", width: "170px" },
    {
      id: "status_permohonan",
      label: "Status",
      cell: (row, index) => (
        <>
          {/* <p>{removeUnderscore(row.status_permohonan)}</p> */}
          <Chip
            label={removeUnderscore(row.status_permohonan)}
            size="small"
            style={{
              backgroundColor: "#DFF5E1",
            }}
            sx={{
              fontWeight: 500,
              fontFamily: "Poppins",
              fontSize: "12px",
              color: "#2E7D32",
              width: "180px",
            }}
          />
        </>
      ),
    },
    {
      id: "aksi",
      label: "Aksi",
      align: "left",
      width: "100px",
      cell: (row, index) => <ActionComp handle={handle} row={row} />,
      isNotSticky: true,
    },
  ];

  const handlePageChange = (page) => {
    setQuery((prev) => ({ ...prev, page }));
    fetchData();
  };

  return (
    // <CustomTableDashboard
    //   data={data}
    //   title="Riwayat Permohonan"
    //   url="/perseroan/perorangan/detail-permohonan"
    //   columns={columns}
    //   enableSearch={true}
    //   searchKeys={["name", "applicationNumber"]} // Specify which keys to search
    //   enablePagination={true} // Enable pagination
    //   rowsPerPage={5} // Set 5 rows per page
    //   emptyMessage="Tidak ada data permohonan."
    // />
    <TableListNew
      url="/perseroan/perorangan/detail-permohonan"
      data={data?.data}
      totalData={data?.total_count}
      column={columns}
      isServerSide
      onPageChange={handlePageChange}
      page={query?.page}
      limit={query?.limit}
    />
  );
};

export default SectionRiwayatPermohonan;
