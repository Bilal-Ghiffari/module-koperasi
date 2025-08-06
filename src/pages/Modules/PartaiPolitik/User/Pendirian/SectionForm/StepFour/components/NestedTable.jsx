import React from "react";

const NestedTable = ({ data: provinces }) => {
  // Sample data struktur seperti gambar
  // const [provinces] = React.useState([
  //   {
  //     id: 1,
  //     namaProvinsi: "DKI Jakarta",
  //     susunanPengurus: [
  //       {
  //         id: 1,
  //         nama: "Budi Pengda",
  //         strukturKepengurusan: "Mahkamah Partai Politik",
  //         jabatan: "Bendahara Umum",
  //         nik: "3321321244124234234",
  //         jenisKelamin: "Laki-laki",
  //       },
  //       {
  //         id: 2,
  //         nama: "Siti Rahma",
  //         strukturKepengurusan: "Mahkamah Partai Politik",
  //         jabatan: "Sekretaris Umum",
  //         nik: "3321321244124234235",
  //         jenisKelamin: "Perempuan",
  //       },
  //       {
  //         id: 3,
  //         nama: "Ahmad Basuki",
  //         strukturKepengurusan: "Mahkamah Partai Politik",
  //         jabatan: "Ketua Umum",
  //         nik: "3321321244124234236",
  //         jenisKelamin: "Laki-laki",
  //       },
  //       {
  //         id: 4,
  //         nama: "Dewi Sartika",
  //         strukturKepengurusan: "Mahkamah Partai Politik",
  //         jabatan: "Wakil Ketua",
  //         nik: "3321321244124234237",
  //         jenisKelamin: "Perempuan",
  //       },
  //       {
  //         id: 5,
  //         nama: "Rudi Hartono",
  //         strukturKepengurusan: "Mahkamah Partai Politik",
  //         jabatan: "Koordinator",
  //         nik: "3321321244124234238",
  //         jenisKelamin: "Laki-laki",
  //       },
  //       {
  //         id: 6,
  //         nama: "Maya Indira",
  //         strukturKepengurusan: "Mahkamah Partai Politik",
  //         jabatan: "Staff Administrasi",
  //         nik: "3321321244124234239",
  //         jenisKelamin: "Perempuan",
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     namaProvinsi: "Jawa Barat",
  //     susunanPengurus: [],
  //   },
  //   {
  //     id: 3,
  //     namaProvinsi: "Bali",
  //     susunanPengurus: [],
  //   },
  //   {
  //     id: 4,
  //     namaProvinsi: "Jawa Timur",
  //     susunanPengurus: [],
  //   },
  //   {
  //     id: 5,
  //     namaProvinsi: "Sumatera Utara",
  //     susunanPengurus: [],
  //   },
  // ]);

  const [expandedProvince, setExpandedProvince] = React.useState(1); // DKI Jakarta expanded by default
  const [currentPage, setCurrentPage] = React.useState(1);
  const [nestedCurrentPage, setNestedCurrentPage] = React.useState({});

  const itemsPerPage = 3;
  const nestedItemsPerPage = 3;

  // Main table pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProvinces = provinces?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(provinces?.length / itemsPerPage);
  console.log("🚀 ~ NestedTable ~ totalPages:", totalPages);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNestedPageChange = (provinceId, pageNumber) => {
    setNestedCurrentPage((prev) => ({
      ...prev,
      [provinceId]: pageNumber,
    }));
  };

  const toggleExpand = (provinceId) => {
    setExpandedProvince(expandedProvince === provinceId ? null : provinceId);
    if (!nestedCurrentPage[provinceId]) {
      setNestedCurrentPage((prev) => ({
        ...prev,
        [provinceId]: 1,
      }));
    }
  };

  const handleAddMember = (provinceId) => {
    alert(
      `Tambah anggota untuk ${
        provinces?.find((p) => p.id === provinceId)?.namaProvinsi
      }`
    );
  };

  const handleEdit = (memberId, provinceName) => {
    alert(`Edit anggota ID: ${memberId} dari ${provinceName}`);
  };

  const handleDelete = (memberId, provinceName) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus anggota ini?")) {
      alert(`Hapus anggota ID: ${memberId} dari ${provinceName}`);
    }
  };

  const renderNestedTable = (province) => {
    const currentNestedPage = nestedCurrentPage[province.id] || 1;
    const nestedIndexOfLastItem = currentNestedPage * nestedItemsPerPage;
    const nestedIndexOfFirstItem = nestedIndexOfLastItem - nestedItemsPerPage;
    const currentMembers = province?.susunanPengurus.slice(
      nestedIndexOfFirstItem,
      nestedIndexOfLastItem
    );
    const nestedTotalPages = Math.ceil(
      province?.susunanPengurus?.length / nestedItemsPerPage
    );

    if (province?.susunanPengurus?.length === 0) {
      return (
        <tr>
          <td colSpan="3" className="p-0">
            <div className="bg-light p-3 text-center text-muted">
              Belum ada data pengurus
            </div>
          </td>
        </tr>
      );
    }

    return (
      <>
        <tr>
          <td colSpan="3" className="p-0">
            <div className="bg-light">
              <table className="table table-sm mb-0">
                <thead className="table-secondary">
                  <tr>
                    <th style={{ width: "5%" }}>No</th>
                    <th style={{ width: "15%" }}>Nama</th>
                    <th style={{ width: "20%" }}>Struktur Kepengurusan</th>
                    <th style={{ width: "15%" }}>Jabatan</th>
                    <th style={{ width: "20%" }}>NIK</th>
                    <th style={{ width: "15%" }}>Jenis Kelamin</th>
                    <th style={{ width: "10%" }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentMembers.map((member, index) => (
                    <tr key={member.id}>
                      <td>{nestedIndexOfFirstItem + index + 1}</td>
                      <td>{member.nama}</td>
                      <td>{member.strukturKepengurusan}</td>
                      <td>{member.jabatan}</td>
                      <td>{member.nik}</td>
                      <td>{member.jenisKelamin}</td>
                      <td>
                        <div className="d-flex gap-1">
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() =>
                              handleEdit(member.id, province.namaProvinsi)
                            }
                            title="Edit"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() =>
                              handleDelete(member.id, province.namaProvinsi)
                            }
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

              {/* Nested Pagination */}
              {nestedTotalPages > 1 && (
                <div className="d-flex justify-content-between align-items-center p-3 bg-white border-top">
                  <div className="text-muted small">
                    Menampilkan {nestedIndexOfFirstItem + 1} sampai{" "}
                    {Math.min(
                      nestedIndexOfLastItem,
                      province.susunanPengurus.length
                    )}{" "}
                    dari {province.susunanPengurus.length} anggota
                  </div>

                  <nav aria-label="Nested pagination">
                    <ul className="pagination pagination-sm mb-0">
                      <li
                        className={`page-item ${
                          currentNestedPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() =>
                            handleNestedPageChange(
                              province.id,
                              currentNestedPage - 1
                            )
                          }
                          disabled={currentNestedPage === 1}
                        >
                          Previous
                        </button>
                      </li>

                      {[...Array(nestedTotalPages)].map((_, index) => (
                        <li
                          key={index + 1}
                          className={`page-item ${
                            currentNestedPage === index + 1 ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() =>
                              handleNestedPageChange(province.id, index + 1)
                            }
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}

                      <li
                        className={`page-item ${
                          currentNestedPage === nestedTotalPages
                            ? "disabled"
                            : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() =>
                            handleNestedPageChange(
                              province.id,
                              currentNestedPage + 1
                            )
                          }
                          disabled={currentNestedPage === nestedTotalPages}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          </td>
        </tr>
      </>
    );
  };

  return (
    <div className="container-fluid mt-4">
      <div className="card shadow">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th scope="col" style={{ width: "10%" }}>
                    No
                  </th>
                  <th scope="col" style={{ width: "60%" }}>
                    Nama Provinsi
                  </th>
                  <th scope="col" style={{ width: "30%" }}>
                    Susunan Pengurus
                  </th>
                  <th scope="col" style={{ width: "15%" }}>
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentProvinces?.map((province, index) => (
                  <React.Fragment key={province.id}>
                    <tr
                      className={
                        expandedProvince === province.id ? "table-active" : ""
                      }
                    >
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>
                        <button
                          className="btn btn-link text-decoration-none p-0 text-start"
                          onClick={() => toggleExpand(province.id)}
                        >
                          <i
                            className={`fas fa-chevron-${
                              expandedProvince === province.id
                                ? "down"
                                : "right"
                            } me-2`}
                          ></i>
                          {province.namaProvinsi}
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => handleAddMember(province.id)}
                        >
                          <i className="fas fa-plus me-1"></i>
                          Tambah
                        </button>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-outline-primary btn-sm"
                            title="Edit Provinsi"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="btn btn-outline-info btn-sm"
                            title="Lihat Detail"
                          >
                            <i className="fas fa-search"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedProvince === province.id &&
                      renderNestedTable(province)}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Main Pagination */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="text-muted">
              Menampilkan {indexOfFirstItem + 1} sampai{" "}
              {Math.min(indexOfLastItem, provinces?.length)} dari{" "}
              {provinces?.length} provinsi
            </div>

            <nav aria-label="Main pagination">
              <ul className="pagination mb-0">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>

                {[...Array(totalPages)]?.map((_, index) => (
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
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
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
  );
};

export default NestedTable;
