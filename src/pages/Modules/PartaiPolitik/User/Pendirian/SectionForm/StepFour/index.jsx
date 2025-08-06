import { Box } from "@mui/material";
import React from "react";
import NestedTable from "./components/NestedTable";
import { FormHeaderWithButton } from "@/components/Common/FormField";
import LineDashed from "@/components/Common/Line/Dashed";
import { CustomButton } from "@/components/Common/CustomBUtton";
import { ArrowForward } from "@mui/icons-material";
import { ToastifyService } from "@/components/Toastify/toastifyService";

export default function DataPengurusProvinsi() {
  const [provinces] = React.useState([
    {
      id: 1,
      namaProvinsi: "DKI Jakarta",
      susunanPengurus: [
        {
          id: 1,
          nama: "Budi Pengda",
          strukturKepengurusan: "Mahkamah Partai Politik",
          jabatan: "Bendahara Umum",
          nik: "3321321244124234234",
          jenisKelamin: "Laki-laki",
        },
        {
          id: 2,
          nama: "Siti Rahma",
          strukturKepengurusan: "Mahkamah Partai Politik",
          jabatan: "Sekretaris Umum",
          nik: "3321321244124234235",
          jenisKelamin: "Perempuan",
        },
        {
          id: 3,
          nama: "Ahmad Basuki",
          strukturKepengurusan: "Mahkamah Partai Politik",
          jabatan: "Ketua Umum",
          nik: "3321321244124234236",
          jenisKelamin: "Laki-laki",
        },
        {
          id: 4,
          nama: "Dewi Sartika",
          strukturKepengurusan: "Mahkamah Partai Politik",
          jabatan: "Wakil Ketua",
          nik: "3321321244124234237",
          jenisKelamin: "Perempuan",
        },
        {
          id: 5,
          nama: "Rudi Hartono",
          strukturKepengurusan: "Mahkamah Partai Politik",
          jabatan: "Koordinator",
          nik: "3321321244124234238",
          jenisKelamin: "Laki-laki",
        },
        {
          id: 6,
          nama: "Maya Indira",
          strukturKepengurusan: "Mahkamah Partai Politik",
          jabatan: "Staff Administrasi",
          nik: "3321321244124234239",
          jenisKelamin: "Perempuan",
        },
      ],
    },
    {
      id: 2,
      namaProvinsi: "Jawa Barat",
      susunanPengurus: [],
    },
    {
      id: 3,
      namaProvinsi: "Bali",
      susunanPengurus: [],
    },
    {
      id: 4,
      namaProvinsi: "Jawa Timur",
      susunanPengurus: [],
    },
    {
      id: 5,
      namaProvinsi: "Sumatera Utara",
      susunanPengurus: [],
    },
  ]);
  const toastifyService = React.useMemo(() => new ToastifyService(), []);
  console.log("🚀 ~ DataPengurusProvinsi ~ provinces:", provinces);
  const handleCreate = React.useCallback(() => {
    console.log("TESTING");
  }, []);

  const handleGoToNextStep = React.useCallback(() => {
    if (provinces.length <= 8) {
      toastifyService.required("Data pengurus provinsi minimal 8 provinsi");
      return;
    }
    goToNext();
  }, [provinces]);
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
          title={"Informasi Pengurus Provinsi"}
          buttonText={"Tambah"}
          onButtonClick={handleCreate}
        />
        <NestedTable data={provinces} />
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
