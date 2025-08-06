import withRouter from "@/components/Common/withRouter";
import PropTypes from "prop-types";
import React from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const PartaiPolitikMenuVertical = (props) => {
  //   const PATH_PARENT = "/partai-politik";
  const { roles } = props;
  console.log("🚀 ~ PartaiPolitikMenuVertical ~ props:", roles?.module_code);
  const menuStructure = [
    {
      menu_code: "01",
      title: "Dashboard",
      level: 1,
      permission: 1,
      children: [],
      url: "/partai-politik/dashboard",
    },
    {
      menu_code: "12",
      title: "Pendirian Partai Politik",
      level: 1,
      permission: 1,
      children: [],
      url: "/partai-politik/pendirian",
    },
    {
      menu_code: "02",
      title: "Perubahan AD/ART",
      level: 1,
      permission: 1,
      children: [],
      url: "/partai-politik/perubahan-ad-art",
    },
    {
      menu_code: "03",
      title: "Perubahan Kepengurusan",
      level: 1,
      permission: 1,
      children: [],
      url: "/partai-politik/perubahan-kepengurusan",
    },
    {
      menu_code: "04",
      title: "Penyampaian Mahkamah Partai",
      level: 1,
      permission: 1,
      children: [],
      url: "/partai-politik/penyampaian-mahkamah",
    },
    {
      menu_code: "05",
      title: "Verifikasi Akun",
      level: 1,
      permission: 1,
      children: [],
      url: "/partai-politik/verifikasi-akun",
    },
    {
      menu_code: "06",
      title: "Verifikasi Akses Perubahan",
      level: 1,
      permission: 1,
      children: [],
      url: "/partai-politik/verifikasi-akses-perubahan",
    },
    {
      menu_code: "07",
      title: "Verifikasi Permohonan",
      level: 1,
      permission: 1,
      children: [],
      url: "/partai-politik/verifikasi-permohonan",
    },
    {
      menu_code: "08",
      title: "Verifikasi Akun Mahkamah Partai",
      level: 1,
      permission: 1,
      children: [],
      url: "/partai-politik/verifikasi-akun-mahkamah",
    },
    {
      menu_code: "09",
      title: "List Permohonan",
      level: 1,
      permission: 1,
      children: [],
      url: "/partai-politik/list-permohonan",
    },
    {
      menu_code: "10",
      title: "Manual Parpol",
      level: 1,
      permission: 1,
      children: [],
      url: "/partai-politik/manual-parpol",
    },
    {
      menu_code: "11",
      title: "Master",
      level: 1,
      permission: 1,
      children: [
        {
          menu_code: "11.01",
          title: "Content",
          level: 2,
          permission: 1,
          children: [],
          url: "/partai-politik/master/content",
        },
        {
          menu_code: "11.02",
          title: "Jabatan",
          level: 2,
          permission: 1,
          children: [],
          url: "/partai-politik/master/jabatan",
        },
        {
          menu_code: "11.03",
          title: "Jenis Kepengurusan",
          level: 2,
          permission: 1,
          children: [],
          url: "/partai-politik/master/jenis-kepengurusan",
        },
        {
          menu_code: "11.04",
          title: "Negara",
          level: 2,
          permission: 1,
          children: [],
          url: "/partai-politik/master/negara",
        },
        {
          menu_code: "11.05",
          title: "Periode",
          level: 2,
          permission: 1,
          children: [],
          url: "/partai-politik/master/periode",
        },
        {
          menu_code: "11.06",
          title: "Persyaratan",
          level: 2,
          permission: 1,
          children: [],
          url: "/partai-politik/master/persyaratan",
        },
        {
          menu_code: "11.07",
          title: "Partai",
          level: 2,
          permission: 1,
          children: [],
          url: "/partai-politik/master/partai",
        },
        {
          menu_code: "11.08",
          title: "Wilayah",
          level: 2,
          permission: 1,
          children: [],
          url: "/partai-politik/master/wilayah",
        },
        {
          menu_code: "11.09",
          title: "Unduh Data Partai",
          level: 2,
          permission: 1,
          children: [],
          url: "/partai-politik/master/unduh-data",
        },
      ],
      //   url: "/partai-politik/master",
    },
  ];
  return (
    <>
      <ul className="metismenu list-unstyled" id="side-menu">
        <li className="menu-title">{props.t("PARTAI POLITIK")} </li>
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

PartaiPolitikMenuVertical.propTypes = {
  t: PropTypes.any,
  roles: PropTypes.any,
};

export default withRouter(withTranslation()(PartaiPolitikMenuVertical));
