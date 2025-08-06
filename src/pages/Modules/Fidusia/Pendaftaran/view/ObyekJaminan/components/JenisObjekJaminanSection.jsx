import {
  FormInputNested,
  FormSelect,
} from '@/components/Common/FormFieldNested';
import { DynamicDropdown } from '@/components/DynamicDropdown';
import { Grid, Typography, Button } from '@mui/material';
import {
  KATEGORI_OBJEK,
  SUB_OBJEK_BERSERIAL_NOMOR,
  SUB_OBJEK_TIDAK_BERSERIAL_NOMOR,
} from '../../../Constants/master';
import ObjekTidakBerserialSection from '../sectionForm/ObjekTidakBerserialSection';
import ObjekBerserialSection from '../sectionForm/ObjetBerserialSection';
import { Save } from '@mui/icons-material';

const JenisObjekJaminanSection = ({
  formik,
  currencyData,
  onCancel,
  onSave,
}) => {
  const { object_jaminan } = formik.values;

  const kategoriObyek = object_jaminan.kategoriObyek;
  const subKategoriObyek = object_jaminan.subKategoriObyek;
  const jumlahNilai = object_jaminan.jumlahNilai;
  const kurs = object_jaminan.nilaiObyek;

  // Handle save
  const handleSimpan = () => {
    const data = {
      ...object_jaminan,
      kategori: kategoriObyek,
      subKategori: subKategoriObyek,
      // Add more fields as necessary
      nilai: jumlahNilai,
      kurs: kurs,
    };

    onSave(data);
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormSelect
            formik={formik}
            name="object_jaminan.kategoriObyek"
            title="Kategori Objek *"
            placeholder="Pilih kategori objek"
            select
            fullWidth
            options={KATEGORI_OBJEK}
            onChange={(e) => {
              formik.setFieldValue(
                'object_jaminan.kategoriObyek',
                e.target.value
              ); // Set Kategori Objek
              formik.setFieldValue('object_jaminan.subKategoriObyek', ''); // Reset Sub Kategori Objek
            }}
          />
        </Grid>

        {kategoriObyek && (
          <Grid item xs={12} md={6}>
            <FormSelect
              formik={formik}
              name="object_jaminan.subKategoriObyek"
              title="Sub Kategori Objek *"
              placeholder="Pilih sub kategori objek"
              select
              fullWidth
              options={
                kategoriObyek === 'OBJEK_BERSERIAL_NOMOR'
                  ? SUB_OBJEK_BERSERIAL_NOMOR // Opsi untuk objek berserial
                  : SUB_OBJEK_TIDAK_BERSERIAL_NOMOR // Opsi untuk objek tidak berserial
              }
              onChange={(e) => {
                formik.setFieldValue(
                  'object_jaminan.subKategoriObyek',
                  e.target.value
                ); // Set Sub Kategori Objek
              }}
            />
          </Grid>
        )}
      </Grid>

      {/* Render Form Section */}
      {!kategoriObyek ? (
        <Typography variant="body1">
          Harap pilih kategori objek terlebih dahulu.
        </Typography>
      ) : !subKategoriObyek ? (
        <Typography variant="body1">
          Harap pilih sub kategori objek setelah memilih kategori.
        </Typography>
      ) : (
        <>
          {/* Section untuk objek berserial */}
          {kategoriObyek === 'OBJEK_BERSERIAL_NOMOR' && (
            <ObjekBerserialSection
              formik={formik}
              subKategoriObyek={subKategoriObyek}
            />
          )}

          {/* Section untuk objek tidak berserial */}
          {kategoriObyek === 'OBJEK_TIDAK_BERSERIAL_NOMOR' && (
            <ObjekTidakBerserialSection
              formik={formik}
              subKategoriObyek={subKategoriObyek}
            />
          )}

          {/* Form untuk nilai objek dan jumlah nilai */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <DynamicDropdown
                formik={formik}
                fieldName="object_jaminan.nilaiObyek"
                label="Nilai Objek *"
                data={currencyData} // Data mata uang untuk dropdown
                placeholder="Pilih mata uang"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInputNested
                formik={formik}
                name="object_jaminan.jumlahNilai"
                title="Jumlah Nilai *"
                placeholder="Tulis jumlah nilai"
                fullWidth
              />
            </Grid>
          </Grid>
        </>
      )}
      <Grid
        contaier
        style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          onClick={onCancel}
          color="primary"
          variant="outlined"
          sx={{
            width: '20%',
            marginRight: '10px',
            fontSize: '14px',
            textTransform: 'none',
            color: '#041662',
            borderColor: '#041662',
          }}
        >
          Batal
        </Button>
        <Button
          onClick={handleSimpan}
          color="primary"
          variant="contained"
          sx={{
            width: '20%',
            fontSize: '14px',
            textTransform: 'none',
            backgroundColor: '#041662',
            color: '#fff',
          }}
          startIcon={<Save fontSize="20px" />}
        >
          Simpan
        </Button>
      </Grid>
    </>
  );
};

export default JenisObjekJaminanSection;

// import {
//   FormInputNested,
//   FormSelect,
// } from '@/components/Common/FormFieldNested';
// import { DynamicDropdown } from '@/components/DynamicDropdown';
// import { Grid, Typography } from '@mui/material';
// import {
//   KATEGORI_OBJEK,
//   SUB_OBJEK_BERSERIAL_NOMOR,
//   SUB_OBJEK_TIDAK_BERSERIAL_NOMOR,
// } from '../../../Constants/master';
// import ObjekTidakBerserialSection from '../sectionForm/ObjekTidakBerserialSection';
// import ObjekBerserialSection from '../sectionForm/ObjetBerserialSection';

// const JenisObjekJaminanSection = ({ formik, currencyData }) => {
//   const kategoriObyek = formik.values.kategoriObyek;
//   const subKategoriObyek = formik.values.subKategoriObyek;

//   return (
//     <>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6}>
//           <FormSelect
//             formik={formik}
//             name="object_jaminan.kategoriObyek"
//             title="Kategori Objek *"
//             placeholder="Pilih kategori objek"
//             select
//             fullWidth
//             options={KATEGORI_OBJEK}
//             onChange={(e) => {
//               formik.setFieldValue('kategoriObyek', e.target.value); // Set Kategori Objek
//               formik.setFieldValue('subKategoriObyek', ''); // Reset Sub Kategori Objek
//             }}
//           />
//         </Grid>

//         {/* Sub Kategori Objek Select */}
//         {kategoriObyek && (
//           <Grid item xs={12} md={6}>
//             <FormSelect
//               formik={formik}
//               name="object_jaminan.subKategoriObyek"
//               title="Sub Kategori Objek *"
//               placeholder="Pilih sub kategori objek"
//               select
//               fullWidth
//               options={
//                 kategoriObyek === 'OBJEK_BERSERIAL_NOMOR'
//                   ? SUB_OBJEK_BERSERIAL_NOMOR // Opsi untuk objek berserial
//                   : SUB_OBJEK_TIDAK_BERSERIAL_NOMOR // Opsi untuk objek tidak berserial
//               }
//               onChange={(e) => {
//                 formik.setFieldValue('subKategoriObyek', e.target.value); // Set Sub Kategori Objek
//               }}
//             />
//           </Grid>
//         )}
//       </Grid>

//       {/* Render Form Section */}
//       {!kategoriObyek ? (
//         <Typography variant="body1" >
//           Harap pilih kategori objek terlebih dahulu.
//         </Typography>
//       ) : !subKategoriObyek ? (
//         <Typography variant="body1" >
//           Harap pilih sub kategori objek setelah memilih kategori.
//         </Typography>
//       ) : (
//         <>
//           {/* Section untuk objek berserial */}
//           {kategoriObyek === 'OBJEK_BERSERIAL_NOMOR' && (
//             <ObjekBerserialSection
//               formik={formik}
//               subKategoriObyek={subKategoriObyek}
//             />
//           )}

//           {/* Section untuk objek tidak berserial */}
//           {kategoriObyek === 'OBJEK_TIDAK_BERSERIAL_NOMOR' && (
//             <ObjekTidakBerserialSection
//               formik={formik}
//               subKategoriObyek={subKategoriObyek}
//             />
//           )}

//           {/* Form untuk nilai objek dan jumlah nilai */}
//           <Grid container spacing={2} >
//             <Grid item xs={12} md={6}>
//               <DynamicDropdown
//                 formik={formik}
//                 fieldName="nilaiObyek"
//                 label="Nilai Objek *"
//                 data={currencyData} // Data mata uang untuk dropdown
//                 placeholder="Pilih mata uang"
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <FormInputNested
//                 formik={formik}
//                 name="object_jaminan.jumlahNilai"
//                 title="Jumlah Nilai *"
//                 placeholder="Tulis jumlah nilai"
//                 fullWidth
//               />
//             </Grid>
//           </Grid>
//         </>
//       )}
//     </>
//   );
// };

// export default JenisObjekJaminanSection;
