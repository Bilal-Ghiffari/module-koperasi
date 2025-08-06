import { Box, Typography } from "@mui/material";
import { Col, Row } from "reactstrap";
import { FormInput } from "@/components/Common/FormField";
import Region from "@/components/Region";
import { CustomTooltipMui } from "@/components/Common/TooltipMui";
import Header from "../../Header";
import { DynamicDropdown } from "@/components/DynamicDropdown";
import Checked from "@/components/Common/Checked";
import { Label } from "reactstrap";

const PemilikUsaha = ({ formik, disabled = false, label }) => {
  return (
    <div className="mt-5 mb-3 px-2 ">
      <Box sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: 2 }}>
        {label == "Perubahan Data" && (
          <>
            {/* Modal Pemilik Usaha Baru Section */}
            <Row>
              <Col xs="12" md="12">
                <Box
                  className="d-flex align-items-center gap-2"
                  sx={{
                    backgroundColor: "#EFF7FF",
                    padding: 1,
                    borderRadius: 2,
                    mb: 2,
                  }}
                >
                  <CustomTooltipMui title="Lorem Ipsum Produksi 30" arrow>
                    <i
                      className="mdi mdi-progress-question fw-bold text-primary"
                      style={{ fontSize: "14px" }}
                    />
                  </CustomTooltipMui>
                  <p className="m-0 p-0">
                    Apakah Anda ingin melakukan pergantian pemilik usaha?
                  </p>
                  <div className="d-flex gap-3 mx-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="pergantian_usaha"
                        id="pergantianYa"
                        value="1"
                        checked={formik.values.pergantian_usaha === "1"}
                        onChange={formik.handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="pergantianYa"
                      >
                        Ya
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="pergantian_usaha"
                        id="pergantianTidak"
                        value="0"
                        checked={formik.values.pergantian_usaha === "0"}
                        onChange={formik.handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="pergantianTidak"
                      >
                        Tidak
                      </label>
                    </div>
                  </div>
                </Box>
              </Col>
            </Row>

            {/* Informasi Pemilik Usaha Baru Section */}
            {formik.values.pergantian_usaha == "1" && (
              <Row>
                <Col xs="12" md="12">
                  <Header label={"Informasi Pemilik Usaha Baru"} />
                </Col>
                <Col xs="12" md="12" lg="12" xl="6">
                  <FormInput
                    formik={formik}
                    name="nama_lengkap_baru"
                    placeholder="Nama Lengkap"
                    required
                    // readonly={disabled}
                  />
                </Col>
                <Col xs="12" md="6" lg="4" xl="3">
                  <FormInput
                    formik={formik}
                    name="nik_baru"
                    type="text"
                    placeholder="NIK"
                    required
                    // readonly={disabled}
                  />
                </Col>
                <Col xs="12" md="6" lg="4" xl="3">
                  <FormInput
                    formik={formik}
                    name="no_telp_baru"
                    type="tel"
                    placeholder="Nomor Telepon"
                    required
                    // readonly={disabled}
                  />
                </Col>
                <Col xs="12" md="6" lg="4" xl="3">
                  <FormInput
                    formik={formik}
                    name="tempat_lahir_baru"
                    placeholder="Tempat Lahir"
                    required
                    // readonly={disabled}
                  />
                </Col>
                <Col xs="12" md="6" lg="4" xl="3">
                  <FormInput
                    formik={formik}
                    name="tanggal_lahir_baru"
                    type="date"
                    placeholder="Tanggal Lahir"
                    required
                    // readonly={disabled}
                  />
                </Col>
                <Col xs="12" md="6" lg="4" xl="3">
                  <FormInput
                    formik={formik}
                    name="npwp_baru"
                    type="text"
                    placeholder="NPWP"
                    required
                    // readonly={disabled}
                  />
                </Col>
                <Col xs="12" md="6" lg="4" xl="3">
                  <DynamicDropdown
                    formik={formik}
                    fieldName={"jabatan_baru"}
                    data={[]}
                    label="Jabatan"
                    isDisabled={disabled}
                    required
                  />
                </Col>
              </Row>
            )}
          </>
        )}
        {/* Informasi Pemilik Usaha Section */}
        <Row>
          <Col xs="12" md="12">
            <Header label={"Informasi Pemilik Usaha"} disabled={disabled} />
          </Col>
          <Col xs="12" md="12" lg="12" xl="6">
            <FormInput
              formik={formik}
              name="nama_lengkap"
              placeholder="Nama Lengkap"
              required
              readonly={disabled}
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="3">
            <FormInput
              formik={formik}
              name="nik"
              type="text"
              placeholder="NIK"
              required
              readonly={disabled}
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="3">
            <FormInput
              formik={formik}
              name="no_telp"
              type="tel"
              placeholder="Nomor Telepon"
              required
              readonly={disabled}
            />
          </Col>

          <Col xs="12" md="6" lg="4" xl="3">
            <FormInput
              formik={formik}
              name="tanggal_lahir"
              type="date"
              placeholder="Tanggal Lahir"
              required
              readonly={disabled}
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="3">
            <FormInput
              formik={formik}
              name="email"
              type="email"
              placeholder="Email"
              required
              readonly={disabled}
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="3">
            <FormInput
              formik={formik}
              name="npwp"
              type="text"
              placeholder="NPWP"
              required
              readonly={disabled}
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="3">
            <FormInput
              formik={formik}
              name="jabatan"
              type="text"
              placeholder="Jabatan"
              required
              readonly={true}
            />
          </Col>
          <Col xs="12" className="px-3">
            <Label className="mb-0" style={{ fontSize: "12px" }}>
              Tempat Lahir <span className="text-danger">*</span>
            </Label>
            <div
              className="d-flex align-items-center gap-5 mt-1"
              style={{ padding: "0px 22px" }}
            >
              <Checked
                label="Dalam Negeri"
                value="dalam_negeri"
                fieldName="tempat_lahir"
                formik={formik}
                type="radio"
              />
              <Checked
                label="Luar Negeri"
                value="luar_negeri"
                fieldName="tempat_lahir"
                formik={formik}
                type="radio"
              />
            </div>
          </Col>
          <Col xs="12" className="px-3 mt-2">
            <Region
              formik={formik}
              disabled={disabled}
              provinsiKey="pemilik_provinsi_lahir"
              kabupatenKey="pemilik_kab_kota_lahir"
              negaraKey="pemilik_negara_lahir"
              showProvinsi={
                formik.values.tempat_lahir == "luar_negeri" ? false : true
              }
              showKabupaten={
                formik.values.tempat_lahir == "luar_negeri" ? false : true
              }
              showKecamatan={false}
              showKelurahan={false}
              showNegara={
                formik.values.tempat_lahir == "luar_negeri" ? true : false
              }
              required
            />
          </Col>
        </Row>

        {/* Alamat Pemilik Usaha Section */}
        <Row className="mt-4">
          <Col xs="12">
            <Header label={"Alamat Pemilik Usaha"} />
          </Col>
          <Region
            formik={formik}
            disabled={disabled}
            provinsiKey="provinsi_pemilik"
            kabupatenKey="kabupaten_pemilik"
            kecamatanKey="kecamatan_pemilik"
            kelurahanKey="kelurahan_pemilik"
            required
          />

          <Col xs="12" md="6" lg="4" xl="3">
            <FormInput
              formik={formik}
              name="alamat_pemilik"
              type="text"
              required
              placeholder="Alamat"
              readonly={disabled}
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="3">
            <FormInput
              formik={formik}
              name="no_telp_pemilik"
              type="tel"
              required
              placeholder="Nomor Telepon"
              readonly={disabled}
            />
          </Col>

          <Col xs="12" md="6" lg="4" xl="2">
            <FormInput
              formik={formik}
              name="rt_pemilik"
              required
              placeholder="RT"
              type="number"
              readonly={disabled}
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="2">
            <FormInput
              formik={formik}
              name="rw_pemilik"
              required
              placeholder="RW"
              type="number"
              readonly={disabled}
            />
          </Col>
          <Col xs="12" md="6" lg="4" xl="2">
            <FormInput
              formik={formik}
              name="kode_pos_pemilik"
              required
              placeholder="Kode Pos"
              type="number"
              readonly={disabled}
            />
          </Col>
        </Row>
      </Box>
    </div>
  );
};

export default PemilikUsaha;
