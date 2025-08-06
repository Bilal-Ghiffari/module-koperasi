import React from 'react';
import { Row, Col } from 'reactstrap';
import { Box } from '@mui/material';
import Header from '../../Header';
import Section from './Section';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { prevStep } from '@/store/actions';
dayjs.locale('id');

const KonfirmasiDataDetail = ({ formik, setActiveStep }) => {
  const identityPemberi = formik.values.identity_pemberi;
  const identityPenerima = formik.values.identity_penerima;
  const informationJaminan = formik.values.information_jaminan;
  const objectJaminan = formik.values.object_jaminan;

  // console.group();
  // console.log('identityPemberi', JSON.stringify(identityPemberi));
  // console.log('identityPenerima', JSON.stringify(identityPenerima));
  // console.log('informationJaminan', JSON.stringify(informationJaminan));
  // console.log('objectJaminan', JSON.stringify(objectJaminan));
  // console.group();

  // Jenis Pemberi Fidusia
  const jenisPemberiFidusia = [
    {
      label: 'Jenis Pendaftaran',
      value: identityPemberi?.jenisPendaftaran || '-',
    },
    { label: 'Jenis Korporasi', value: identityPemberi?.jenisKorporasi || '-' },
    {
      label: 'Jenis Sub Korporasi',
      value: identityPemberi?.jenisSubKorporasi || '-',
    },
    {
      label: 'Jenis Badan Hukum',
      value: identityPemberi?.jenisBadanHukum || '-',
    },
  ];

  // Informasi Pemberi Fidusia
  const informasiPemberiFidusia = [
    { label: 'Nama Pemberi', value: identityPemberi?.namaPemberi || '-' },
    { label: 'NPWP', value: identityPemberi?.npwp || '-' },
    { label: 'Nomor Surat Keputusan', value: identityPemberi?.noSK || '-' },
    {
      label: 'Nama Kantor Cabang',
      value: identityPemberi?.kantorCabang || '-',
    },
    { label: 'Email', value: identityPemberi?.email || '-' },
    { label: 'Nomor Telepon', value: identityPemberi?.noTelp || '-' },
    { label: 'Nama Debitur', value: identityPemberi?.namaDebitur || '-' },
  ];

  // Alamat Pemberi Fidusia
  const alamatPemberiFidusia = [
    { label: 'Alamat', value: identityPemberi?.alamat || '-' },
    { label: 'Provinsi', value: identityPemberi?.provinsi || '-' },
    { label: 'Kabupaten/Kota', value: identityPemberi?.kabupaten || '-' },
    { label: 'Kecamatan', value: identityPemberi?.kecamatan || '-' },
    { label: 'Kelurahan', value: identityPemberi?.kelurahan || '-' },
    { label: 'RT', value: identityPemberi?.rt || '-' },
    { label: 'RW', value: identityPemberi?.rw || '-' },
    { label: 'Kode Pos', value: identityPemberi?.kodePos || '-' },
  ];

  // Informasi Penerima Fidusia
  const informasiPenerimaFidusia = [
    { label: 'Nama', value: identityPenerima?.namaPenerima || '-' },
    { label: 'NPWP', value: identityPenerima?.npwpPenerima || '-' },
    {
      label: 'Nomor Telepon',
      value: identityPenerima?.noTeleponPenerima || '-',
    },
    {
      label: 'Jenis Korporasi',
      value: identityPenerima?.jenisKorporasiPenerima || '-',
    },
  ];

  // Akta Notaris Jaminan Fidusia
  const aktaNotarisJaminanFidusia = [
    { label: 'Nomor Akta', value: informationJaminan?.nomorAkta || '-' },
    {
      label: 'Tanggal Akta',
      value: informationJaminan?.tanggalAkta
        ? dayjs(informationJaminan.tanggalAkta).format('DD MMMM YYYY')
        : '-',
    },
    {
      label: 'Nama Notaris/Kedudukan',
      value: informationJaminan?.namaNotaris || '-',
    },
  ];

  // Informasi Perjanjian Pokok
  const informasiPerjanjianPokok = [
    {
      label: 'Nama/Jenis Perjanjian',
      value: informationJaminan?.namaPerjanjian || '-',
    },
    {
      label: 'Nomor Perjanjian',
      value: informationJaminan?.nomorPerjanjian || '-',
    },
    {
      label: 'Tanggal Perjanjian',
      value: informationJaminan?.tanggalPerjanjian || '-',
    },
    {
      label: 'Jangka Waktu Perjanjian',
      value: `${informationJaminan?.jangkaWaktuMulai || '-'} s/d ${
        informationJaminan?.jangkaWaktuSelesai || '-'
      }`,
    },
  ];

  // Tabel Perjanjian Pokok
  const tabelPerjanjianPokok = informationJaminan?.perjanjianPokok || [];

  // Jenis Objek Jaminan
  const jenisObjekJaminan = [
    { label: 'Kategori Objek', value: objectJaminan?.kategoriObyek || '-' },
    {
      label: 'Sub Kategori Objek',
      value: objectJaminan?.subKategoriObyek || '-',
    },
    { label: 'Merk', value: objectJaminan?.merk || '-' },
    { label: 'Tipe', value: objectJaminan?.tipe || '-' },
    { label: 'Nomor Rangka', value: objectJaminan?.nomorRangka || '-' },
    { label: 'Nomor Mesin', value: objectJaminan?.nomorMesin || '-' },
    { label: 'Bukti Objek', value: objectJaminan?.buktiObyek || '-' },
    { label: 'Alamat', value: objectJaminan?.alamatObyek || '-' },
  ];

  // Nilai Penjaminan
  const nilaiPenjaminan = [
    {
      label: 'Kategori Nilai Penjaminan',
      value: objectJaminan?.kategoriNilaiPenjaminan || '-',
    },
  ];

  // Tabel Nilai Penjaminan
  const tabelNilaiPenjaminan = objectJaminan?.nilaiPenjaminanList || [];

  if (!formik || !formik.values) {
    return <div>Tidak ada data yang tersedia</div>;
  }

  const handleBackStep = (step) => {
    setActiveStep(() => step);
  };
  return (
    <>
      <Row>
        {/* Jenis Pemberi Fidusia */}
        <Col xs="12" md="12">
          <Header
            label="Jenis Pemberi Fidusia"
            onEdit={() => handleBackStep(1)}
          />
          <Section data={jenisPemberiFidusia} />
        </Col>

        {/* Informasi Pemberi Fidusia */}
        <Col xs="12" md="12">
          <Header
            label="Informasi Pemberi Fidusia"
            onEdit={() => handleBackStep(1)}
          />
          <Section data={informasiPemberiFidusia} />
        </Col>

        {/* Alamat Pemberi Fidusia */}
        <Col xs="12" md="12">
          <Header
            label="Alamat Pemberi Fidusia"
            onEdit={() => handleBackStep(1)}
          />
          <Section data={alamatPemberiFidusia} />
        </Col>

        {/* Informasi Penerima Fidusia */}
        <Col xs="12" md="12">
          <Header
            label="Informasi Penerima Fidusia"
            onEdit={() => handleBackStep(2)}
          />
          <table className="table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>NPWP</th>
                <th>No Telepon</th>
                <th>Jenis Korporasi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{identityPenerima?.namaPenerima || '-'}</td>
                <td>{identityPenerima?.npwp || '-'}</td>
                <td>{identityPenerima?.noTelp || '-'}</td>
                <td>{identityPenerima?.jenisKorporasi || '-'}</td>
              </tr>
            </tbody>
          </table>
        </Col>

        {/* Akta Notaris Jaminan Fidusia */}
        <Col xs="12" md="12">
          <Header
            label="Akta Notaris Jaminan Fidusia"
            onEdit={() => handleBackStep(3)}
          />
          <Section data={aktaNotarisJaminanFidusia} />
        </Col>

        {/* Informasi Perjanjian Pokok */}
        <Col xs="12" md="12">
          <Header
            label="Informasi Perjanjian Pokok"
            onEdit={() => handleBackStep(3)}
          />
          <Section data={informasiPerjanjianPokok} />
        </Col>

        {/* Tabel Perjanjian Pokok */}
        <Col xs="12" md="12">
          <Header
            label="Tabel Perjanjian Pokok"
            onEdit={() => handleBackStep(3)}
          />
          <table className="table">
            <thead>
              <tr>
                <th>Kurs</th>
                <th>Nominal</th>
                <th>Nominal Rupiah</th>
                <th>Sebutan</th>
              </tr>
            </thead>
            <tbody>
              {tabelPerjanjianPokok.map((item, index) => (
                <tr key={index}>
                  <td>{item.kurs || '-'}</td>
                  <td>{item.nominal || '-'}</td>
                  <td>{item.nominalRupiah || '-'}</td>
                  <td>{item.sebutan || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>

        {/* Jenis Objek Jaminan */}
        <Col xs="12" md="12">
          <Header
            label="Jenis Objek Jaminan"
            onEdit={() => handleBackStep(4)}
          />
          <Section data={jenisObjekJaminan} />
        </Col>

        {/* Nilai Penjaminan */}
        <Col xs="12" md="12">
          <Header label="Nilai Penjaminan" onEdit={() => handleBackStep(4)} />

          <Section data={nilaiPenjaminan} />
        </Col>

        {/* Tabel Nilai Penjaminan */}
        <Col xs="12" md="12">
          <Header
            label="Tabel Nilai Penjaminan"
            onEdit={() => handleBackStep(4)}
          />
          <table className="table">
            <thead>
              <tr>
                <th>Kurs</th>
                <th>Nominal</th>
                <th>Nominal Rupiah</th>
                <th>Sebutan</th>
              </tr>
            </thead>
            <tbody>
              {tabelNilaiPenjaminan.map((item, index) => (
                <tr key={index}>
                  <td>{item.kurs || '-'}</td>
                  <td>{item.nominal || '-'}</td>
                  <td>{item.nominalRupiah || '-'}</td>
                  <td>{item.sebutan || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </>
  );
};

export default KonfirmasiDataDetail;
