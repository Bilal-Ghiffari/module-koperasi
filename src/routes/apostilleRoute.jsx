import SuspenseWrapper from "@/components/Common/SuspenseWrapper";
import Detail from "@/pages/Modules/Apostille/Components/Detail";
import DynamicMenu from "@/pages/Modules/Apostille/DynamicMenu";
import { lazy } from "react";

const Dashboard = lazy(() => import("@/pages/Modules/Apostille/Dashboard"));
const Pendaftaran = lazy(() =>
  import("@/pages/Modules/Apostille/Components/Pendaftaran")
);

const apostilleRoutes = [
  {
    path: "/apostille",
    component: (
      <SuspenseWrapper>
        <Dashboard />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/apostille/detail-permohonan/:id",
    component: (
      <SuspenseWrapper>
        <Detail />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/apostille/pendaftaran",
    component: (
      <SuspenseWrapper>
        <Pendaftaran />
      </SuspenseWrapper>
    ),
  },
  // {
  //   path: "/apostille/permohonan-apostille",
  //   component: (
  //     <SuspenseWrapper>
  //       <DynamicMenu label="Daftar Permohonan Apostille" />
  //     </SuspenseWrapper>
  //   ),
  // },
  // {
  //   path: "/apostille/permohonan-legalisasi",
  //   component: (
  //     <SuspenseWrapper>
  //       <DynamicMenu label="Daftar Permohonan Legalisasi" />
  //     </SuspenseWrapper>
  //   ),
  // },
  {
    path: "/apostille/permohonan",
    component: (
      <SuspenseWrapper>
        <DynamicMenu label="Daftar Permohonan" />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/apostille/verifikasi",
    component: (
      <SuspenseWrapper>
        <DynamicMenu label="Daftar Verifikasi" />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/apostille/sertifikat",
    component: (
      <SuspenseWrapper>
        <DynamicMenu label="Daftar Sertifikat" />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/apostille/cetak-sticker",
    component: (
      <SuspenseWrapper>
        <DynamicMenu label="Daftar Cetak Sticker Legalisasi" />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/apostille/cetak-sticker/:id",
    component: (
      <SuspenseWrapper>
        <DynamicMenu label="Detail Permohonan Legalisasi" />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/apostille/cetak-sertifikat",
    component: (
      <SuspenseWrapper>
        <DynamicMenu label="Daftar Cetak Sertifikat Apostille" />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/apostille/cetak-sertifikat/:id",
    component: (
      <SuspenseWrapper>
        <DynamicMenu label="Detail Permohonan Apostille" />
      </SuspenseWrapper>
    ),
  },
];

export default apostilleRoutes;
