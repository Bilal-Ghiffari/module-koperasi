import { useEffect, useRef } from "react";
import {
  FormHeader,
  FormInput,
  FormSelect,
} from "@/components/Common/FormField";
import { Col, Row } from "reactstrap";
import {
  KABUPATEN_KOTA_OPTIONS,
  PROVINSI_OPTIONS,
} from "../../../Constant/master";

const NEGARA = [
  { label: "Indonesia", value: "ID" },
  { label: "Malaysia", value: "MY" },
  { label: "Singapura", value: "SG" },
  { label: "Thailand", value: "TH" },
  { label: "Vietnam", value: "VN" },
];

const TEMPAT_TINGGAL = [
  { label: "Dalam Negeri", value: "Dalam Negeri" },
  { label: "Luar Negeri", value: "Luar Negeri" },
];

const AlamatTinggalSection = ({ formik }) => {
  const { values, setFieldValue } = formik;

  const isTmptTglSelected = values.tmpTglAnak !== "";
  const isDalamNegeri = values.tmpTglAnak === "Dalam Negeri";
  const isProvinsiSelected = values.provinsiAnak !== "";

  const prevTmpTglRef = useRef("");

  useEffect(() => {
    const current = values.tmpTglAnak;
    const prev = prevTmpTglRef.current;

    if (prev !== current) {
      if (current === "Dalam Negeri") {
        // Reset field luar negeri
        setFieldValue("negaraAnak", "");
      } else if (current === "Luar Negeri") {
        // Reset field dalam negeri
        setFieldValue("provinsiAnak", "");
        setFieldValue("kabkotAnak", "");
      }

      prevTmpTglRef.current = current;
    }
  }, [values.tmpTglAnak, setFieldValue]);

  return (
    <>
      <FormHeader title="Alamat Tempat Tinggal Anak" />
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormSelect
            formik={formik}
            name="tmpTglAnak"
            placeholder="tempat tinggal"
            options={TEMPAT_TINGGAL}
            title="Tempat Tinggal"
            required
          />
        </Col>

        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormSelect
            formik={formik}
            name="negaraAnak"
            placeholder="negara tinggal"
            options={NEGARA}
            title="Negara Tinggal"
            disabled={!isTmptTglSelected || isDalamNegeri}
            required
          />
        </Col>
      </Row>

      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormSelect
            formik={formik}
            name="provinsiAnak"
            placeholder="provinsi"
            options={PROVINSI_OPTIONS}
            title="Provinsi"
            disabled={!isTmptTglSelected || !isDalamNegeri}
            required
          />
        </Col>

        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormSelect
            formik={formik}
            name="kabkotAnak"
            placeholder="kabupaten/kota"
            options={KABUPATEN_KOTA_OPTIONS}
            title="Kabupaten/Kota"
            disabled={!isProvinsiSelected}
            required
          />
        </Col>
      </Row>

      <Row>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <FormInput
            formik={formik}
            name="AlamatTmpTglAnak"
            placeholder="Tulis alamat lengkap domisili saat ini"
            title="Alamat Tempat Tinggal"
            type="textarea"
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default AlamatTinggalSection;
