import * as Yup from 'yup';
import { formSchemas } from '../Schemas';

export const stepFormConfigs = {
  0: {
    initialValues: {
      // onboarding / voucher
    },
    validationSchema: Yup.object({}),
  },
  1: {
    initialValues: {
      identity_pemberi: formSchemas.initialValues.identitasPemberi,
    },
    validationSchema: Yup.object({
      identity_pemberi: formSchemas.validationSchemas.identitasPemberi,
    }),
  },
  2: {
    initialValues: {
      identity_penerima: formSchemas.initialValues.identitasPenerima,
    },
    validationSchema: Yup.object({
      identity_penerima: formSchemas.validationSchemas.identitasPenerima,
    }),
  },
  3: {
    initialValues: {
      information_jaminan: formSchemas.initialValues.informasiJaminan,
    },
    validationSchema: Yup.object({
      information_jaminan: formSchemas.validationSchemas.informasiJaminan,
    }),
  },
  4: {
    initialValues: {
      object_jaminan: formSchemas.initialValues.ObyekJaminan,
    },
    validationSchema: Yup.object({
      object_jaminan: formSchemas.validationSchemas.ObyekJaminan,
    }),
  },
};

export const initialValues = Object.values(stepFormConfigs).reduce(
  (acc, step) => ({ ...acc, ...step.initialValues }),
  {}
);

export const validationSchemas = Object.fromEntries(
  Object.entries(stepFormConfigs).map(([step, config]) => [
    step,
    config.validationSchema,
  ])
);

// Untuk keperluan validasi field per step
export const STEP_FIELDS = Object.entries(stepFormConfigs).map(([key, step]) =>
  Object.keys(step.initialValues)
);

// Optional: Tambahkan fungsi untuk mendapatkan validation schema berdasarkan step
export const getValidationSchemaForStep = (step) => {
  return validationSchemas[step] || Yup.object({});
};

// import * as Yup from 'yup';

// import { formSchemas } from '../Schemas';

// export const stepFormConfigs = {
//   0: {
//     initialValues: {
//       // onboarding / voucher
//     },
//     validationSchema: Yup.object({}),
//   },
//   identityPemberi: {
//     initialValues: {
//       identity_pemberi: formSchemas.initialValues.identitasPemberi,
//     },
//     validationSchema: formSchemas.validationSchemas.identitasPemberi,
//   },

//   identityPenerima: {
//     initialValues: {
//       identity_penerima: formSchemas.initialValues.identitasPenerima,
//     },
//     validationSchema: formSchemas.validationSchemas.identitasPenerima,
//   },

//   informasiJaminan: {
//     initialValues: {
//       information_jaminan: formSchemas.initialValues.informasiJaminan,
//     },
//     validationSchema: formSchemas.validationSchemas.informasiJaminan,
//   },

//   objektJaminan: {
//     initialValues: {
//       object_jaminan: formSchemas.initialValues.ObyekJaminan,
//     },
//     validationSchema: formSchemas.validationSchemas.ObyekJaminan,
//   },
// };

// // export const stepFormConfigs = {
// //   0: {
// //     initialValues: {
// //       // onboarding / voucher
// //     },
// //     validationSchema: Yup.object({}),
// //   },
// //   // Identitas pemberi
// //   1: {
// //     initialValues: {
// //       identity_pemberi: formSchemas.initialValues.identitasPemberi,
// //     },
// //     validationSchema: formSchemas.validationSchemas.identitasPemberi,
// //   },
// //   // Identitas penerima
// //   2: {
// //     initialValues: {
// //       identity_penerima: formSchemas.initialValues.identitasPenerima,
// //     },
// //     validationSchema: formSchemas.validationSchemas.identitasPenerima,
// //   },
// //   // // Informasi Jaminan
// //   // 3: {
// //   //   initialValues: {
// //   //     information_jaminan: formSchemas.initialValues.informasiJaminan,
// //   //   },
// //   //   validationSchema: formSchemas.validationSchemas.informasiJaminan,
// //   // },
// //   // // Obyek Jaminan
// //   // 4: {
// //   //   initialValues: {
// //   //     object_jaminan: formSchemas.initialValues.ObyekJaminan,
// //   //   },
// //   //   validationSchema: formSchemas.validationSchemas.ObyekJaminan,
// //   // },
// //   // Step 5-7...
// // };

// // export const stepFormConfigs = {
// //   0: {
// //     initialValues: {
// //       // onboarding / voucher
// //     },
// //     validationSchema: Yup.object({}),
// //   },
// //   // identitas pemberi
// //   1: {
// //     initialValues: formSchemas.initialValues.identitasPemberi,
// //     validationSchema: formSchemas.validationSchemas.identitasPemberi,
// //   },
// //   // identitas penerima
// //   2: {
// //     initialValues: formSchemas.initialValues.identitasPenerima,
// //     validationSchema: formSchemas.validationSchemas.identitasPenerima,
// //   },
// //   // informasi jaminan
// //   3: {
// //     initialValues: formSchemas.initialValues.informasiJaminan,
// //     validationSchema: formSchemas.validationSchemas.informasiJaminan,
// //   },
// //   // obyek jaminann
// //   4: {
// //     initialValues: formSchemas.initialValues.informasiJaminan,
// //     validationSchema: formSchemas.validationSchemas.informasiJaminan,
// //   },
// //   // Step 4–7...
// // };

// // Digunakan di formik

// export const initialValues = Object.values(stepFormConfigs).reduce(
//   (acc, step) => ({ ...acc, ...step.initialValues }),
//   {}
// );

// export const validationSchemas = Object.fromEntries(
//   Object.entries(stepFormConfigs).map(([step, config]) => [
//     step,
//     config.validationSchema,
//   ])
// );

// // Untuk keperluan validasi field per step
// export const STEP_FIELDS = Object.values(stepFormConfigs).map((step) =>
//   Object.keys(step.initialValues)
// );
