import React, { useRef, useState } from "react";
import { Button, FormGroup, Label, Form } from "reactstrap";
import { Box, Typography, Checkbox } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Checked from "@/components/Common/Checked";
import { CustomButton } from "@/components/Common/CustomBUtton";
import { FaFilePdf } from "react-icons/fa";
import MessageBox from "@/components/Common/MessageBox";

export default function SuratPermohonanAnakAngkat({ formik }) {
  const suratRef = useRef(null);

  // Download PDF with HTML layout
  const handleDownload = async () => {
    if (suratRef.current) {
      const canvas = await html2canvas(suratRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save("SuratPermohonan.pdf");
    }
  };

  return (
    <div className="mt-5 mb-3 px-2">
      <div
        style={{ border: "1px solid #E7E7E7", borderRadius: 20, padding: 16 }}
      >
        <div className="row">
          <div className="col">
            <div
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: 8,
                marginBottom: 24,
                maxWidth: 890,
                margin: "0 auto",
              }}
            >
              <div
                ref={suratRef}
                style={{
                  padding: 50,
                  fontFamily: "Times New Roman",
                  fontSize: 12,
                  lineHeight: 1.6,
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                    marginBottom: 30,
                  }}
                >
                  FORMULIR PERNYATAAN PERMOHONAN PENYAMPAIAN PERNYATAAN MEMILIH
                  KEWARGANEGARAAN REPUBLIK INDONESIA BAGI ANAK
                  BERKEWARGANEGARAAN GANDA
                </div>

                <div style={{ marginTop: 20 }}>
                  <table style={{ fontSize: 12, width: "100%" }}>
                    <tbody>
                      <tr>
                        <td style={{ width: "15%" }}>Lampiran</td>
                        <td style={{ width: "5%" }}>:</td>
                        <td>
                          <div
                            style={{
                              minWidth: 200,
                              height: 22,
                            }}
                          >
                            1 (satu) Berkas
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "15%" }}>Perihal</td>
                        <td style={{ width: "5%" }}>:</td>
                        <td>
                          <div
                            style={{
                              minWidth: 200,
                              height: 22,
                            }}
                          >
                            Pernyataan Permohonan Penyampaian Pernyataan Memilih
                            Kewarganegaraan Republik Indonesia Bagi Anak
                            Berkewarganegaraan Ganda
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div style={{ fontSize: 12, marginTop: 30, lineHeight: 1.6 }}>
                  <div style={{ marginBottom: 20 }}>
                    Merujuk pada Pasal 6 Undang-Undang Nomor 12 Tahun 2006
                    tentang Kewarganegaraan Republik Indonesia Juncto Pasal 49
                    Peraturan Pemerintah Nomor 2 Tahun 2007 tentang Tata Cara
                    Memperoleh, Kehilangan, Pembatalan, dan Memperoleh kembali
                    Kewarganegaraan Republik Indonesia, bersama ini dengan
                    hormat saya :
                  </div>

                  <table
                    style={{ width: "100%", marginTop: 20, marginBottom: 30 }}
                  >
                    <tbody>
                      <tr>
                        <td style={{ width: "25%", verticalAlign: "top" }}>
                          Nama
                        </td>
                        <td style={{ width: "3%" }}>:</td>
                        <td>Oktavia Ardiani</td>
                      </tr>
                      <tr>
                        <td style={{ verticalAlign: "top" }}>Jenis Kelamin</td>
                        <td>:</td>
                        <td>WANITA</td>
                      </tr>
                      <tr>
                        <td style={{ verticalAlign: "top" }}>
                          Tempat/Tanggal Lahir
                        </td>
                        <td>:</td>
                        <td>Prancis, 09 November 1999</td>
                      </tr>
                      <tr>
                        <td style={{ verticalAlign: "top" }}>
                          Kewarganegaraan
                        </td>
                        <td>:</td>
                        <td>Indonesia dan Prancis</td>
                      </tr>
                      <tr>
                        <td style={{ verticalAlign: "top" }}>
                          Status Perkawinan
                        </td>
                        <td>:</td>
                        <td>BELUM KAWIN</td>
                      </tr>
                      <tr>
                        <td style={{ verticalAlign: "top" }}>Pekerjaan</td>
                        <td>:</td>
                        <td>Pelajar</td>
                      </tr>
                      <tr>
                        <td style={{ verticalAlign: "top" }}>
                          Alamat Tempat Tinggal
                        </td>
                        <td>:</td>
                        <td>
                          <div>Jl. Karya Utama</div>
                          <div style={{ marginLeft: 20, marginTop: 10 }}>
                            <div>1. Paspor Republik Indonesia :</div>
                            <div style={{ marginLeft: 20 }}>
                              <div>- nomor : 1</div>
                              <div>- diterbitkan di : DKI</div>
                              <div>
                                - berlaku sampai dengan : 09 November 2017
                              </div>
                            </div>
                            <div>2. Paspor Kebangsaan :</div>
                            <div style={{ marginLeft: 20 }}>
                              <div>- nomor : 1</div>
                              <div>- diterbitkan di : DKI</div>
                              <div>
                                - berlaku sampai dengan : 09 November 2017
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ verticalAlign: "top" }}>
                          Nomor Surat WNI/Affdavit/Surat Asal
                        </td>
                        <td>:</td>
                        <td>
                          <div>
                            Nomor 2 diterbitkan tanggal 09 November 2017
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ verticalAlign: "top" }}>Orang Tua</td>
                        <td>:</td>
                        <td>
                          <div>1. Ayah :</div>
                          <div style={{ marginLeft: 20 }}>
                            <div>- nama : Tony Ardiani</div>
                            <div>- kewarganegaraan : Prancis</div>
                          </div>
                          <div>2. Ibu :</div>
                          <div style={{ marginLeft: 20 }}>
                            <div>- nama : Patricia Agrestin</div>
                            <div>- kewarganegaraan : Indonesia</div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div style={{ marginBottom: 20 }}>
                    Dengan ini menyampaikan pernyataan untuk Permohonan
                    Penyampaian Pernyataan Memilih Kewarganegaraan Republik
                    Indonesia Bagi Anak Berkewarganegaraan Ganda.
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    Saya menyadari sepenuhnya konsekuensi akibat hukum dengan
                    penyampaian Pernyataan Permohonan Penyampaian Pernyataan
                    Memilih Kewarganegaraan Republik Indonesia Bagi Anak
                    Berkewarganegaraan Ganda, dan akan tunduk pada ketentuan
                    peraturan perundang-undangan.
                  </div>

                  <div style={{ marginBottom: 30 }}>
                    Demikian penyampaian Permohonan Penyampaian Pernyataan
                    Memilih Kewarganegaraan Republik Indonesia Bagi Anak
                    Berkewarganegaraan Ganda ini disampaikan, atas perhatiannya
                    diucapkan terima kasih.
                  </div>

                  <div
                    style={{
                      marginTop: 50,
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div>
                      <div style={{ textAlign: "center", marginBottom: 10 }}>
                        Yang menyampaikan pernyataan,
                      </div>
                      <div style={{ height: 60 }} />
                      <div
                        style={{
                          textAlign: "center",
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        Oktavia Ardiani
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                border: "none",
                marginBottom: 24,
                maxWidth: 890,
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0 32px",
                  marginBottom: "32px",
                  marginTop: "32px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Checked
                    fontSize="0.95rem"
                    label="Saya telah membaca, mengerti dan menyetujui syarat dan
                    ketentuan penggunaan nama perseroan."
                    value="1"
                    fieldName={"suratPermohonan"}
                    formik={formik}
                  />
                </div>
                <CustomButton
                  text={"Download"}
                  leftIcon={<FaFilePdf />}
                  textColor="#041662"
                  bgColor="transparent"
                  border="1px solid #E7E7E7"
                  onClick={handleDownload}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
