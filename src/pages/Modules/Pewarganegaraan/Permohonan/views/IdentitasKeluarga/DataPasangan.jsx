import {
  FormHeader,
  FormInput,
  FormSelect,
} from "@/components/Common/FormField";
import { Box } from "@mui/material";
import { BsPlus } from "react-icons/bs";
import { Col, Row } from "reactstrap";
import { FIELD_OPTIONS } from "../../constants/options";
import { useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { FormAutocomplete } from "@/components/Common/AutoComplete";

const InformasiPasanganSection = ({ formik }) => {
  const { values, setFieldValue, touched, errors } = formik;
  const isDalamNegeri = values.tempat_lahir_pasangan === "Dalam Negeri";
  const isLuarNegeri = values.tempat_lahir_pasangan === "Luar Negeri";
  const prevTempatLahir = useRef();

  const { agama, negara, provinsi, kotakabPsgn, pekerjaan } = useSelector(
    (state) => state.master
  );

  // Effect untuk membersihkan field yang tidak relevan ketika tempat lahir berubah
  useEffect(() => {
    // Cek apakah tempat lahir benar-benar berubah
    if (prevTempatLahir.current !== values.tempat_lahir_pasangan) {
      if (values.tempat_lahir_pasangan === "Dalam Negeri") {
        // Bersihkan field negara dan error-nya
        setFieldValue("id_negara_lahir_pasangan", null);

        // Bersihkan error terkait negara jika ada
        if (errors.id_negara_lahir_pasangan) {
          const newErrors = { ...errors };
          delete newErrors.id_negara_lahir_pasangan;
          formik.setErrors(newErrors);
        }

        // Bersihkan touched state untuk negara
        if (touched.id_negara_lahir_pasangan) {
          const newTouched = { ...touched };
          delete newTouched.id_negara_lahir_pasangan;
          formik.setTouched(newTouched);
        }

        console.log("Field negara dibersihkan");
      } else if (values.tempat_lahir_pasangan === "Luar Negeri") {
        // Bersihkan field provinsi dan kota kab beserta error-nya
        setFieldValue("id_provinsi_lahir_pasangan", null);
        setFieldValue("id_kab_kota_lahir_pasangan", null);

        // Bersihkan error terkait provinsi dan kota kab
        const fieldsToClean = [
          "id_provinsi_lahir_pasangan",
          "id_kab_kota_lahir_pasangan",
        ];
        let hasErrorChanges = false;
        const newErrors = { ...errors };

        fieldsToClean.forEach((field) => {
          if (newErrors[field]) {
            delete newErrors[field];
            hasErrorChanges = true;
          }
        });

        if (hasErrorChanges) {
          formik.setErrors(newErrors);
        }

        // Bersihkan touched state untuk provinsi dan kota kab
        let hasTouchedChanges = false;
        const newTouched = { ...touched };

        fieldsToClean.forEach((field) => {
          if (newTouched[field]) {
            delete newTouched[field];
            hasTouchedChanges = true;
          }
        });

        if (hasTouchedChanges) {
          formik.setTouched(newTouched);
        }

        console.log("Field provinsi dan kota kab dibersihkan");
      } else {
        // Jika tempat lahir kosong atau tidak valid, bersihkan semua field lokasi
        setFieldValue("id_provinsi_lahir_pasangan", null);
        setFieldValue("id_kab_kota_lahir_pasangan", null);
        setFieldValue("id_negara_lahir_pasangan", null);

        console.log("Semua field lokasi dibersihkan");
      }

      // Update referensi
      prevTempatLahir.current = values.tempat_lahir_pasangan;
    }
  }, [values.tempat_lahir_pasangan, setFieldValue, errors, touched, formik]);

  // Effect untuk set default kewarganegaraan
  useEffect(() => {
    if (!values.id_kewarganegaraan_pasangan) {
      setFieldValue("id_kewarganegaraan_pasangan", 76);
    }
  }, [setFieldValue, values.id_kewarganegaraan_pasangan]);

  // Effect untuk debugging - log perubahan nilai penting
  useEffect(() => {
    console.log("Current form values (pasangan location fields):", {
      tempat_lahir_pasangan: values.tempat_lahir_pasangan,
      id_provinsi_lahir_pasangan: values.id_provinsi_lahir_pasangan,
      id_kab_kota_lahir_pasangan: values.id_kab_kota_lahir_pasangan,
      id_negara_lahir_pasangan: values.id_negara_lahir_pasangan,
    });
  }, [
    values.tempat_lahir_pasangan,
    values.id_provinsi_lahir_pasangan,
    values.id_kab_kota_lahir_pasangan,
    values.id_negara_lahir_pasangan,
  ]);

  return (
    <>
      <FormHeader title="Informasi Pasangan" />
      <Box className="form-horizontal">
        <Row>
          <Col xs="12" md="6" xl="3">
            <FormInput
              formik={formik}
              name="nama_pasangan"
              placeholder="Tulis nama lengkap"
              title="Nama Lengkap"
              required
            />
          </Col>
          <Col xs="12" md="6" xl="3">
            <FormInput
              formik={formik}
              name="nik_pasangan"
              placeholder="Tulis NIK pasangan"
              title="NIK"
              required
            />
          </Col>
          <Col xs="12" md="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="jenis_kelamin_pasangan"
              placeholder="Pilih jenis kelamin"
              options={FIELD_OPTIONS.genderOption}
              title="Jenis Kelamin"
              required
            />
          </Col>
          <Col xs="12" md="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="agama_pasangan"
              placeholder="agama sesuai identitas"
              options={agama.data}
              title="Agama"
              required
            />
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="6" xl="3">
            <FormInput
              formik={formik}
              name="tgl_lahir_pasangan"
              type="date"
              placeholder="Tanggal Lahir"
              title="Tanggal Lahir"
              required
            />
          </Col>
          <Col xs="12" md="6" xl="3">
            <FormInput
              formik={formik}
              name="id_kewarganegaraan_pasangan"
              placeholder="Pilih kewarganegaraan"
              value={"Indonesia"}
              title="Kewarganegaraan Asal"
              readonly
            />
          </Col>
          <Col xs="12" md="6" xl="3">
            <FormInput
              formik={formik}
              name="no_telp_pasangan"
              title="Nomor HP"
              type="number"
              leftIcon={<BsPlus />}
              placeholder="Tulis nomor handphone aktif"
              required
            />
          </Col>
          <Col xs="12" md="6" xl="3">
            <FormInput
              formik={formik}
              name="email_pasangan"
              title="Email"
              placeholder="Tulis alamat email aktif"
              required
            />
          </Col>
        </Row>

        <Row>
          <Col xs="12" md="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="tempat_lahir_pasangan"
              placeholder="Tulis tempat lahir"
              options={FIELD_OPTIONS.bornOption}
              title="Tempat Lahir"
              required
            />
          </Col>
          <Col xs="12" md="6" xl="3">
            <FormAutocomplete
              formik={formik}
              name="id_pekerjaan_pasangan"
              placeholder="Tulis pekerjaan"
              options={pekerjaan.data}
              title="Pekerjaan"
              required
            />
          </Col>

          {/* Field Provinsi - Hanya tampil jika Dalam Negeri atau belum dipilih */}
          {!isLuarNegeri && (
            <Col xs="12" md="6" xl="3">
              <FormAutocomplete
                formik={formik}
                name="id_provinsi_lahir_pasangan"
                placeholder="Tulis provinsi"
                options={provinsi.data}
                title="Provinsi"
                required={isDalamNegeri}
              />
            </Col>
          )}

          {/* Field Kota/Kab - Hanya tampil jika Dalam Negeri atau belum dipilih */}
          {!isLuarNegeri && (
            <Col xs="12" md="6" xl="3">
              <FormAutocomplete
                formik={formik}
                name="id_kab_kota_lahir_pasangan"
                placeholder="Tulis kabupaten/kota"
                options={kotakabPsgn.data}
                title="Kab/Kota"
                required={isDalamNegeri}
              />
            </Col>
          )}

          {/* Field Negara - Hanya tampil jika Luar Negeri */}
          {isLuarNegeri && (
            <Col xs="12" md="6" xl="3">
              <FormAutocomplete
                formik={formik}
                name="id_negara_lahir_pasangan"
                placeholder="Tulis negara domisili"
                options={negara.data}
                title="Negara"
                required
              />
            </Col>
          )}
        </Row>
      </Box>
    </>
  );
};

export default InformasiPasanganSection;
