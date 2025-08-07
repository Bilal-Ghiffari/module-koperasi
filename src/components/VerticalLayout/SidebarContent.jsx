import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { useLocation } from "react-router-dom";

//i18n
import { useCallback } from "react";
import DynamicMenu from "../Menu/Vertical/DynamicMenu";
import PerseroanPeroranganMenuVertical from "../Menu/Vertical/PerseroanPerorangan";
import FidusiaMenuVertical from "../Menu/Vertical/FidusiaMenuVertical";
import { useMemo } from "react";
import { getUser } from "@/helpers/services/checkProduction";
import ApostileMenuVertical from "../Menu/Vertical/ApostileMenuVertical";
import KewarMenuVertical from "../Menu/Vertical/KewarMenuVertical";
import PewarMenuVertical from "../Menu/Vertical/PewarMenuVertical";
import PerseroanTerbatas from "../Menu/Vertical/PerseroanTerbatas";
import UserManagementMenuVertical from "../Menu/Vertical/UserManagement";
import PartaiPolitikMenuVertical from "../Menu/Vertical/PartaiPolitikMenuVertical";
import KoperasiMenuVertical from "../Menu/Vertical/koperasiMenuVertical";
import useLoginData from "@/hooks/useLoginData";
import {
  Backdrop,
  Box,
  CircularProgress,
  Fade,
  Modal,
  Typography,
} from "@mui/material";

const SidebarContent = (props) => {
  const ref = useRef();
  const path = useLocation();
  // const user = getUser();
  // console.log("🚀 ~ SidebarContent ~ user:", user);
  const { loginData: user, loading, error } = useLoginData();

  const activateParentDropdown = useCallback((item) => {
    if (!item) return; // pastikan item tidak null

    item.classList.add("active");

    const parent = item.parentElement;
    const parent2El = parent?.childNodes?.[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag
        if (parent3) {
          parent3.classList.add("mm-active");
          parent3.childNodes?.[0]?.classList.add("mm-active");

          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show");

            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show");
              parent5.childNodes?.[0]?.classList.add("mm-active");
            }
          }
        }
      }
    }

    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.length && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const activeMenu = useCallback(() => {
    const pathName = path.pathname;
    // karena data statistik punya kondisi active menu sendiri
    if (
      !pathName.startsWith("/portals/data-statistik") &&
      !pathName.startsWith("/produksi")
    ) {
      let matchingMenuItem = null;
      const ul = document.getElementById("side-menu");
      const items = ul.getElementsByTagName("a");
      removeActivation(items);

      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    }
  }, [path.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    new MetisMenu("#side-menu");
    activeMenu();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    activeMenu();
  }, [activeMenu]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  };

  const module_code = useMemo(() => {
    const { pathname } = path;

    switch (true) {
      case pathname.startsWith("/koperasi"):
        return "25";
      case pathname.startsWith("/pewarganegaraan"):
        return "19";
      case pathname.startsWith("/perseroan/perorangan"):
        return "20";
      case pathname.startsWith("/partai-politik"):
        return "22";
      case pathname.startsWith("/fidusia"):
        return "27";
      case pathname.startsWith("/apostille"):
        return "23";
      case pathname.startsWith("/kewarganegaraan"):
        return "26";
      case pathname.startsWith("/perseroan/terbatas"):
        return "15";
      case pathname.startsWith("/user-management/"):
        return "42";
      default:
        return; // Atau nilai default lainnya
    }
  }, [path]);

  // const roles = user?.roles || [];
  const roles = user?.user_detail?.roles || [];
  console.log("roles", roles);

  return (
    <React.Fragment>
      <Modal
        open={loading}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={loading}>
          <Box sx={style}>
            <CircularProgress size={60} />
            <Typography variant="h6" component="h2" align="center">
              Sedang memuat data...
            </Typography>
            <Typography variant="body2" align="center">
              Harap tunggu sebentar
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          {/* <DynamicMenu roles={[]} /> */}
          {module_code == "25" &&
            ((role) => role && <KoperasiMenuVertical roles={role} />)(
              roles.find((o) => o.module_code == "25")
            )}
          {module_code == "19" &&
            ((role) => role && <PewarMenuVertical roles={role} />)(
              roles.find((o) => o.module_code == "19")
            )}
          {module_code == "20" &&
            ((role) =>
              role && <PerseroanPeroranganMenuVertical roles={role} />)(
              roles.find((o) => o.module_code == "20")
            )}
          {module_code == "22" &&
            ((role) => role && <PartaiPolitikMenuVertical roles={role} />)(
              roles.find((o) => o.module_code == "22")
            )}
          {module_code == "27" &&
            ((role) => role && <FidusiaMenuVertical roles={role} />)(
              roles.find((o) => o.module_code == "27")
            )}
          {module_code == "23" &&
            ((role) => role && <ApostileMenuVertical roles={role} />)(
              roles.find((o) => o.module_code == "23")
            )}
          {module_code == "26" &&
            ((role) => role && <KewarMenuVertical roles={role} />)(
              roles.find((o) => o.module_code == "26")
            )}
          {module_code == "15" &&
            ((role) => role && <PerseroanTerbatas roles={role} />)(
              roles.find((o) => o.module_code == "15")
            )}
          {module_code == "42" && <UserManagementMenuVertical />}
          <ul className="metismenu list-unstyled" id="side-menu"></ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default SidebarContent;
