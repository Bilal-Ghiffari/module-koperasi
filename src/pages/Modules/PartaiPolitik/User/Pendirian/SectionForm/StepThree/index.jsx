import { CustomButton } from "@/components/Common/CustomBUtton";
import { FormHeaderWithButton } from "@/components/Common/FormField";
import LineDashed from "@/components/Common/Line/Dashed";
import { ArrowForward } from "@mui/icons-material";
import { Box } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { Button } from "reactstrap";
import AlamatPengurus from "./AlamatPengurus";
import InformasiPengurusSurat from "./InformasiPengurusSurat";
import { InitialValues } from "./utils/InitialValues";
import { validationSchema } from "./utils/schema";
import { ToastifyService } from "@/components/Toastify/toastifyService";

export default function DataPengurusPusat({ goToNext, goToPrev, saveDraft }) {
  const [employees] = React.useState([
    {
      id: 1,
      nama: "Budi Rahmawan",
      strukturKepengurusan: "Ketua",
      jabatan: "Ketua Umum",
      jenisKelamin: "Laki-laki",
      nik: "3326160802070000",
      pekerjaan: "Bekerja",
    },
  ]);
  const toastifyService = React.useMemo(() => new ToastifyService(), []);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [formState, setFormState] = React.useState({
    mode: null, // 'create' or 'edit'
    initialValues: null,
    id: null,
  });

  const itemsPerPage = 5;

  // Calculate pagination
  const paginationData = React.useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(employees.length / itemsPerPage);

    return {
      currentItems,
      totalPages,
      indexOfFirstItem,
      indexOfLastItem,
    };
  }, [currentPage, employees, itemsPerPage]);

  const handlePageChange = React.useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  const handleCreate = React.useCallback(() => {
    setFormState({
      mode: "create",
      initialValues: InitialValues,
      id: null,
    });
  }, []);

  const handleEdit = React.useCallback(
    (id) => {
      const employeeToEdit = employees.find((emp) => emp.id === id);
      if (employeeToEdit) {
        setFormState({
          mode: "edit",
          initialValues: mapEmployeeToFormValues(employeeToEdit),
          id,
        });
      }
    },
    [employees]
  );

  const handleDelete = React.useCallback((id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      // Delete logic here
      alert(`Hapus data untuk ID: ${id}`);
    }
  }, []);

  const handleCancel = React.useCallback(() => {
    setFormState({
      mode: null,
      initialValues: null,
      id: null,
    });
  }, []);

  const handleSubmit = React.useCallback(
    (values, { setSubmitting }) => {
      try {
        if (formState.mode === "create") {
          console.log("Creating new record:", values);
          // Add create logic here
        } else if (formState.mode === "edit") {
          console.log("Updating record ID:", formState.id, "with:", values);
          // Add update logic here
        }

        // Reset form state after submission
        setFormState({
          mode: null,
          initialValues: null,
          id: null,
        });
      } catch (error) {
        console.error("Submission error:", error);
      } finally {
        setSubmitting(false);
      }
    },
    [formState.mode, formState.id]
  );

  // Helper function to map employee data to form values
  const mapEmployeeToFormValues = (employee) => {
    return {
      // Map your employee data to form initial values here
      nama: employee.nama,
      strukturKepengurusan: employee.strukturKepengurusan,
      jabatan: employee.jabatan,
      jenisKelamin: employee.jenisKelamin,
      nik: employee.nik,
      pekerjaan: employee.pekerjaan,
      // Add other fields as needed
    };
  };

  const handleGoToNextStep = React.useCallback(() => {
    if (employees.length === 0) {
      toastifyService.required("Data pengurus tidak boleh kosong");
      return;
    }
    goToNext();
  }, [employees]);

  return (
    <Box className="bg-white page-content mb-4" sx={{ width: "100%" }}>
      <Box
        className="mt-3 mb-3"
        sx={{
          border: "1px solid #E7E7E7",
          borderRadius: 5,
          padding: "24px",
        }}
      >
        <FormHeaderWithButton
          title={"Data Notaris"}
          buttonText={"Tambah"}
          onButtonClick={handleCreate}
        />
        {formState.mode && (
          <Formik
            initialValues={formState.initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form>
                <InformasiPengurusSurat formik={formik} />
                <LineDashed />
                <AlamatPengurus formik={formik} />
                <section className="d-flex justify-content-end gap-3">
                  <CustomButton
                    text={"Batal"}
                    bgColor="transparent"
                    border="1px solid #E7E7E7"
                    textColor="#041662"
                    onClick={handleCancel}
                    type="button"
                  />
                  <Button
                    color="primary"
                    type="submit"
                    disabled={formik.isSubmitting}
                    style={{
                      backgroundColor: "#041662",
                      borderColor: "#041662",
                      paddingLeft: "30px",
                      paddingRight: "30px",
                    }}
                  >
                    {formState.mode === "create"
                      ? "Tambah"
                      : "Simpan Perubahan"}
                  </Button>
                </section>
              </Form>
            )}
          </Formik>
        )}

        {formState.mode && <LineDashed />}

        <div className="container-fluid mt-4">
          <div className="">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" style={{ width: "5%" }}>
                        No
                      </th>
                      <th scope="col" style={{ width: "15%" }}>
                        Nama
                      </th>
                      <th scope="col" style={{ width: "15%" }}>
                        Struktur Kepengurusan
                      </th>
                      <th scope="col" style={{ width: "15%" }}>
                        Jabatan
                      </th>
                      <th scope="col" style={{ width: "12%" }}>
                        Jenis Kelamin
                      </th>
                      <th scope="col" style={{ width: "18%" }}>
                        NIK
                      </th>
                      <th scope="col" style={{ width: "10%" }}>
                        Pekerjaan
                      </th>
                      <th scope="col" style={{ width: "10%" }}>
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginationData.currentItems.map((employee, index) => (
                      <tr key={employee.id}>
                        <td>{paginationData.indexOfFirstItem + index + 1}</td>
                        <td>{employee.nama}</td>
                        <td>{employee.strukturKepengurusan}</td>
                        <td>{employee.jabatan}</td>
                        <td>{employee.jenisKelamin}</td>
                        <td>{employee.nik}</td>
                        <td>
                          <span className="badge bg-success">
                            {employee.pekerjaan}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => handleEdit(employee.id)}
                              title="Edit"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleDelete(employee.id)}
                              title="Hapus"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="text-muted">
                  Menampilkan {paginationData.indexOfFirstItem + 1} sampai{" "}
                  {Math.min(paginationData.indexOfLastItem, employees.length)}{" "}
                  dari {employees.length} data
                </div>

                <nav aria-label="Page navigation">
                  <ul className="pagination mb-0">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>

                    {[...Array(paginationData.totalPages)].map((_, index) => (
                      <li
                        key={index + 1}
                        className={`page-item ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}

                    <li
                      className={`page-item ${
                        currentPage === paginationData.totalPages
                          ? "disabled"
                          : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === paginationData.totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <LineDashed />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            pt: 2,
            px: 2,
          }}
        >
          <CustomButton
            text={"Simpan Draft"}
            bgColor="#f97316"
            border="1px solid #E7E7E7"
            textColor="#fff"
            hoverColor="#ea580c"
          />
          <CustomButton
            type="button"
            onClick={handleGoToNextStep}
            //   loading={loading}
            //   onClick={() => {
            //     if (activeStep === stepsResult.length - 1) {
            //       handleSubmit('submit');
            //     } else {
            //       handleNext();
            //     }
            //   }}
            text={"Selanjutnya"}
            rightIcon={<ArrowForward fontSize="14" />}
          />
        </Box>
      </Box>
    </Box>
  );
}
