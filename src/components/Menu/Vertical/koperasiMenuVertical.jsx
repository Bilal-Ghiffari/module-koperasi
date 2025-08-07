import withRouter from "@/components/Common/withRouter";
import { AUTH_KEY } from "@/constants/api.constant";
import { Box, CircularProgress, Fade, Modal, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const KoperasiMenuVertical = (props) => {
  console.log("🚀 ~ KoperasiMenuVertical ~ props:", props);
  const menuStructure = [
    {
      menu_code: "01",
      title: "Dashboard",
      level: 1,
      permission: 1,
      children: [],
      url: "/koperasi",
    },
    {
      menu_code: "02",
      title: "Pesan Nama",
      level: 1,
      permission: 1,
      children: [],
      url: "/ahu-koperasi/pesan-nama",
    },
    {
      menu_code: "03",
      title: "Pendirian",
      level: 1,
      permission: 1,
      children: [],
      url: "/ahu-koperasi/pendirian",
    },
    {
      menu_code: "04",
      title: "Perubahan",
      level: 1,
      permission: 1,
      children: [],
      url: "/ahu-koperasi/perubahan",
    },
    {
      menu_code: "05",
      title: "Pembubaran",
      level: 1,
      permission: 1,
      children: [],
      url: "/ahu-koperasi/pembubaran",
    },
    {
      menu_code: "06",
      title: "Transaksi",
      level: 1,
      permission: 1,
      children: [
        {
          menu_code: "06.01",
          title: "Daftar Koperasi",
          level: 2,
          permission: 1,
          children: [],
          url: "/ahu-koperasi/transaksi/daftar-koperasi",
        },
        {
          menu_code: "06.02",
          title: "Daftar Pesan Nama",
          level: 2,
          permission: 1,
          children: [],
          url: "/ahu-koperasi/transaksi/daftar-pesan-nama",
        },
        {
          menu_code: "06.03",
          title: "Daftar Transaksi Pendirian",
          level: 2,
          permission: 1,
          children: [],
          url: "/ahu-koperasi/transaksi/daftar-transaksi-pendirian",
        },
        {
          menu_code: "06.04",
          title: "Daftar Transaksi Perubahan",
          level: 2,
          permission: 1,
          children: [],
          url: "/ahu-koperasi/transaksi/daftar-transaksi-perubahan",
        },
        {
          menu_code: "06.05",
          title: "Daftar Transaksi Pembubaran",
          level: 2,
          permission: 1,
          children: [],
          url: "/ahu-koperasi/transaksi/daftar-transaksi-pembubaran",
        },
      ],
      url: "/ahu-koperasi/transaksi",
    },
    {
      menu_code: "07",
      title: "Admin",
      level: 1,
      permission: 1,
      children: [
        {
          menu_code: "07.01",
          title: "Daftar Koperasi",
          level: 2,
          permission: 1,
          children: [],
          url: "/ahu-koperasi/admin/daftar-koperasi",
        },
        {
          menu_code: "07.02",
          title: "Daftar Pesan Nama",
          level: 2,
          permission: 1,
          children: [],
          url: "/ahu-koperasi/admin/daftar-pesan-nama",
        },
        {
          menu_code: "07.03",
          title: "NPAK",
          level: 2,
          permission: 1,
          children: [],
          url: "/ahu-koperasi/admin/npak",
        },
        {
          menu_code: "07.04",
          title: "User Dinas",
          level: 2,
          permission: 1,
          children: [],
          url: "/ahu-koperasi/admin/user-dinas",
        },
        {
          menu_code: "07.05",
          title: "Whitelist",
          level: 2,
          permission: 1,
          children: [],
          url: "/ahu-koperasi/admin/whitelist",
        },
        {
          menu_code: "07.06",
          title: "Setting Expired",
          level: 2,
          permission: 1,
          children: [],
          url: "/ahu-koperasi/admin/setting-expired",
        },
        {
          menu_code: "07.07",
          title: "Modal Koperasi",
          level: 2,
          permission: 1,
          children: [],
          url: "/ahu-koperasi/admin/modal-koperasi",
        },
        {
          menu_code: "07.08",
          title: "Blokir Nama",
          level: 2,
          permission: 1,
          children: [],
          url: "/ahu-koperasi/admin/blokir-nama",
        },
        {
          menu_code: "07.09",
          title: "Blokir Alamat",
          level: 2,
          permission: 1,
          children: [],
          url: "/ahu-koperasi/admin/blokir-alamat",
        },
        {
          menu_code: "07.10",
          title: "Blokir Koperasi",
          level: 2,
          permission: 1,
          children: [],
          url: "/ahu-koperasi/admin/blokir-koperasi",
        },
        {
          menu_code: "07.11",
          title: "Log Koperasi",
          level: 2,
          permission: 1,
          children: [],
          url: "/ahu-koperasi/admin/log-koperasi",
        },
      ],
      url: "/ahu-koperasi/admin",
    },
    {
      menu_code: "08",
      title: "Dinas",
      level: 1,
      permission: 1,
      children: [
        {
          menu_code: "08.01",
          title: "Daftar Koperasi",
          level: 2,
          permission: 1,
          children: [],
          url: "/ahu-koperasi/dinas/daftar-koperasi",
        },
      ],
      url: "/ahu-koperasi/dinas",
    },
  ];

  return (
    <>
      <ul className="metismenu list-unstyled" id="side-menu">
        <li className="menu-title">{props.t("KOPERASI")} </li>
        {menuStructure.map((item, idx) => (
          <li key={idx}>
            {item.children.length > 0 ? (
              <React.Fragment>
                <Link to="#" className="has-arrow">
                  <span>{props.t(item.title)}</span>
                </Link>
                <ul className="sub-menu">
                  {item.children.map((child, cidx) => (
                    <li key={cidx}>
                      <Link to={child.url}>{props.t(child.title)}</Link>
                    </li>
                  ))}
                </ul>
              </React.Fragment>
            ) : (
              <Link to={item.url}>
                <span>{props.t(item.title)}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

KoperasiMenuVertical.propTypes = {
  t: PropTypes.any,
  roles: PropTypes.any,
};

export default withRouter(withTranslation()(KoperasiMenuVertical));
