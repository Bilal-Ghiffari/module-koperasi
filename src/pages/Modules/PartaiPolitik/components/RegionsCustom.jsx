import { Col, Row } from "reactstrap";
// import { DynamicDropdownNested } from "@/components/DynamicDropdownNested"; // Pastikan jalur ini benar
import { useEffect, useState, useCallback } from "react";
import {
  getProvinces,
  getRegencies,
  getDistricts,
  getVillages,
  getCountries,
} from "@/services/RegionService";
import {
  // filterEmptyValues,
  transformData,
} from "@/helpers/services/convert";
import get from "lodash/get";
import set from "lodash/set";
import { SearchableFormSelect } from "./FormField";

const Regions = ({
  formik,
  disabled,
  negaraKey = "negara",
  provinsiKey = "provinsi",
  kabupatenKey = "kabupaten",
  kecamatanKey = "kecamatan",
  kelurahanKey = "kelurahan",
  required = false,
  showProvinsi = true,
  showKabupaten = true,
  showKecamatan = true,
  showKelurahan = true,
  showNegara = true,
  col = "4",
}) => {
  const [region, setRegion] = useState({
    provinsi: [],
    kabupaten: [],
    kecamatan: [],
    desa: [],
  });

  // Helper: fetch data + transform + update partial region state
  const fetchAndSetRegion = async (apiFunc, key, params = {}) => {
    const value = Object.values(params)[0];
    try {
      const res = await apiFunc(value);
      const transformed = transformData(res.data, {
        // Memastikan kita ambil `data` dari respons
        value: "id",
        label: "nama",
      });
      setRegion((prev) => ({
        ...prev,
        [key]: transformed,
      }));
    } catch (error) {
      console.error(`Error fetching ${key}:`, error);
    }
  };

  // Helper untuk mendapatkan nilai - support nested dan flat
  const getNestedValue = (obj, path) => {
    return path.includes(".") ? get(obj, path, "") : obj[path] || "";
  };

  // Helper untuk set nilai - support nested dan flat
  const setNestedValue = (formik, path, value) => {
    if (!path.includes(".")) {
      formik.setFieldValue(path, value);
      return;
    }

    const newValues = { ...formik.values };
    set(newValues, path, value);
    formik.setValues(newValues);
  };

  // Reset bertingkat dengan support nested dan flat
  const resetNestedFields = useCallback((formik, keys) => {
    keys.forEach((key) => setNestedValue(formik, key, ""));
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await getCountries(); // Menggunakan layanan API baru
      setRegion((prev) => ({
        ...prev,
        negara: transformData(data.data, {
          value: "id_negara",
          label: "nama_negara",
        }),
      }));
    };
    fetchCountries();
  }, []);

  // Fetch provinsi pertama kali
  useEffect(() => {
    const fetchProvinces = async () => {
      const data = await getProvinces(); // Menggunakan layanan API baru
      setRegion((prev) => ({
        ...prev,
        provinsi: transformData(data.data, { value: "id", label: "nama" }),
      }));
    };
    fetchProvinces();
  }, []);

  // Bertingkat: jika provinsi berubah
  useEffect(() => {
    const provinsiValue = getNestedValue(formik.values, provinsiKey);

    if (provinsiValue) {
      fetchAndSetRegion(getRegencies, "kabupaten", {
        provinceId: provinsiValue,
      });
    } else {
      resetNestedFields(formik, [kabupatenKey, kecamatanKey, kelurahanKey]);
      setRegion((prev) => ({
        ...prev,
        kabupaten: [],
        kecamatan: [],
        desa: [],
      }));
    }
  }, [getNestedValue(formik.values, provinsiKey)]);

  // Bertingkat: jika kabupaten berubah
  useEffect(() => {
    const kabupatenValue = getNestedValue(formik.values, kabupatenKey);

    if (kabupatenValue) {
      fetchAndSetRegion(getDistricts, "kecamatan", {
        regencyId: kabupatenValue,
      });
    } else {
      resetNestedFields(formik, [kecamatanKey, kelurahanKey]);
      setRegion((prev) => ({
        ...prev,
        kecamatan: [],
        desa: [],
      }));
    }
  }, [getNestedValue(formik.values, kabupatenKey)]);

  // Bertingkat: jika kecamatan berubah
  useEffect(() => {
    const kecamatanValue = getNestedValue(formik.values, kecamatanKey);

    if (kecamatanValue) {
      fetchAndSetRegion(getVillages, "desa", {
        districtId: kecamatanValue,
      });
    } else {
      resetNestedFields(formik, [kelurahanKey]);
      setRegion((prev) => ({
        ...prev,
        desa: [],
      }));
    }
  }, [getNestedValue(formik.values, kecamatanKey)]);

  return (
    <>
      {showProvinsi && (
        <Col xs="12" md="12" lg="6" xl={col} className="px-3">
          <SearchableFormSelect
            formik={formik}
            name={provinsiKey}
            options={region.provinsi}
            title="Provinsi"
            isDisabled={disabled}
            required={required}
            onChange={(value) => {
              formik.setFieldValue(provinsiKey, value?.value);
              formik.setFieldValue(`${provinsiKey}_nama`, value?.label);
            }}
          />
        </Col>
      )}
      {showKabupaten && (
        <Col xs="12" md="12" lg="6" xl={col} className="px-3">
          <SearchableFormSelect
            formik={formik}
            name={kabupatenKey}
            options={region.kabupaten}
            title="Kabupaten/Kota"
            isDisabled={disabled || !getNestedValue(formik.values, provinsiKey)}
            required={required}
            onChange={(value) => {
              formik.setFieldValue(kabupatenKey, value?.value);
              formik.setFieldValue(`${kabupatenKey}_nama`, value?.label);
            }}
          />
        </Col>
      )}
      {showKecamatan && (
        <Col xs="12" md="12" lg="6" xl={col} className="px-3">
          <SearchableFormSelect
            formik={formik}
            name={kecamatanKey}
            options={region.kecamatan}
            title="Kecamatan"
            isDisabled={
              disabled || !getNestedValue(formik.values, kabupatenKey)
            }
            required={required}
            onChange={(value) => {
              formik.setFieldValue(kecamatanKey, value?.value);
              formik.setFieldValue(`${kecamatanKey}_nama`, value?.label);
            }}
          />
        </Col>
      )}
      {showKelurahan && (
        <Col xs="12" md="12" lg="6" xl={col} className="px-3">
          <SearchableFormSelect
            formik={formik}
            name={kelurahanKey}
            options={region.desa}
            title="Kelurahan/Desa"
            isDisabled={
              disabled || !getNestedValue(formik.values, kecamatanKey)
            }
            required={required}
            onChange={(value) => {
              formik.setFieldValue(kelurahanKey, value?.value);
              formik.setFieldValue(`${kelurahanKey}_nama`, value?.label);
            }}
          />
        </Col>
      )}
      {showNegara && (
        <Col xs="12" md="12" lg="6" xl={col} className="px-3">
          <SearchableFormSelect
            // formik={formik}
            formik={{
              ...formik,
              setFieldValue: (field, value) => {
                formik.setFieldValue(field, Number(value));
              },
            }}
            name={negaraKey}
            options={region.negara}
            title="Negara"
            isDisabled={disabled}
            required={required}
            onChange={(value) => {
              formik.setFieldValue(negaraKey, value?.value);
              formik.setFieldValue(`${negaraKey}_nama`, value?.label);
            }}
          />
        </Col>
      )}
    </>
  );
};

export default Regions;
