import SuspenseWrapper from "@/components/Common/SuspenseWrapper";
import { lazy } from "react";

const PageHomeDashboard = lazy(() =>
  import("@/pages/Modules/Koperasi/Pendirian/HomeDashboard")
);

// const PagePendirian = lazy(() =>
//   import("@/pages/Modules/PartaiPolitik/User/Pendirian")
// );

const userRoutes = [
  {
    path: "/ahu-koperasi/dashboard",
    component: (
      <SuspenseWrapper>
        <PageHomeDashboard />
      </SuspenseWrapper>
    ),
  },
  //   {
  //     path: "/partai-politik/pendirian",
  //     component: (
  //       <SuspenseWrapper>
  //         <PagePendirian />
  //       </SuspenseWrapper>
  //     ),
  //   },
];

export default userRoutes;
