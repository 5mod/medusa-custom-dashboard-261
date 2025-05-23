import "./chunk-EMNHBSFU.mjs";
import "./chunk-I5HYE2RW.mjs";
import "./chunk-RIV7FKGN.mjs";
import "./chunk-TDK3JDOB.mjs";
import "./chunk-GW6TVOAA.mjs";
import "./chunk-CBSCX7RE.mjs";
import "./chunk-FHSC5X62.mjs";
import "./chunk-XR4GEMGR.mjs";
import "./chunk-LT4MVCA7.mjs";
import "./chunk-WRSGHGAT.mjs";
import "./chunk-HVUHNRLX.mjs";
import "./chunk-W7625H47.mjs";
import "./chunk-MOSRJHJ3.mjs";
import "./chunk-DLZWPHHO.mjs";
import "./chunk-OMC5JCQH.mjs";
import "./chunk-LSEYENCI.mjs";
import "./chunk-XMAWMECC.mjs";
import "./chunk-B74XTET2.mjs";
import {
  useProductTableQuery
} from "./chunk-Y2ZAIM5S.mjs";
import {
  useProductTableFilters
} from "./chunk-U6CSGYH6.mjs";
import {
  DataTableFilter
} from "./chunk-TMAS4ILY.mjs";
import "./chunk-M3VFKDXJ.mjs";
import "./chunk-C76H5USB.mjs";
import "./chunk-DV5RB7II.mjs";
import "./chunk-FTTSUETK.mjs";
import "./chunk-XCF3TZQZ.mjs";
import "./chunk-TXPNGFWJ.mjs";
import "./chunk-5OOAHPXU.mjs";
import "./chunk-VJRTPNEA.mjs";
import "./chunk-S4HBRQEC.mjs";
import "./chunk-HY62FC6W.mjs";
import "./chunk-SFPKA7H3.mjs";
import "./chunk-GVRV2SOJ.mjs";
import "./chunk-O3US4QMC.mjs";
import "./chunk-NAC6TXKN.mjs";
import "./chunk-OCNMY23F.mjs";
import "./chunk-ZMMQPAR2.mjs";
import "./chunk-3UEMCYR5.mjs";
import "./chunk-HGVADKNP.mjs";
import "./chunk-S3MWIWV4.mjs";
import "./chunk-2BXI62DA.mjs";
import "./chunk-SWYL3QGB.mjs";
import "./chunk-BF3VCHXD.mjs";
import "./chunk-QDC5CTTV.mjs";
import "./chunk-6EJHOUIV.mjs";
import "./chunk-PXOOHHBT.mjs";
import "./chunk-GX3K52WA.mjs";
import "./chunk-2XA3IEXQ.mjs";
import "./chunk-23LLRBGF.mjs";
import "./chunk-SY6HAFQV.mjs";
import "./chunk-HYULYW73.mjs";
import {
  RouteDrawer,
  useRouteModal
} from "./chunk-JGQGO74V.mjs";
import {
  useExportProducts
} from "./chunk-KPNKJVW6.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-WAYDNCEG.mjs";
import "./chunk-S47CVTVK.mjs";

// src/routes/products/product-export/product-export.tsx
import { Button, Heading as Heading2, toast } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";

// src/routes/products/product-export/components/export-filters.tsx
import { Heading, Text } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
var ExportFilters = () => {
  const { t } = useTranslation();
  const filters = useProductTableFilters();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Heading, { level: "h2", children: t("products.export.filters.title") }),
    /* @__PURE__ */ jsx(Text, { size: "small", className: "text-ui-fg-subtle", children: t("products.export.filters.description") }),
    /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(DataTableFilter, { filters, readonly: true }) })
  ] });
};

// src/routes/products/product-export/product-export.tsx
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var ProductExport = () => {
  const { t } = useTranslation2();
  return /* @__PURE__ */ jsxs2(RouteDrawer, { children: [
    /* @__PURE__ */ jsxs2(RouteDrawer.Header, { children: [
      /* @__PURE__ */ jsx2(RouteDrawer.Title, { asChild: true, children: /* @__PURE__ */ jsx2(Heading2, { children: t("products.export.header") }) }),
      /* @__PURE__ */ jsx2(RouteDrawer.Description, { className: "sr-only", children: t("products.export.description") })
    ] }),
    /* @__PURE__ */ jsx2(ProductExportContent, {})
  ] });
};
var ProductExportContent = () => {
  const { t } = useTranslation2();
  const { searchParams } = useProductTableQuery({});
  const { mutateAsync } = useExportProducts(searchParams);
  const { handleSuccess } = useRouteModal();
  const handleExportRequest = async () => {
    await mutateAsync(
      {},
      {
        onSuccess: () => {
          toast.info(t("products.export.success.title"), {
            description: t("products.export.success.description")
          });
          handleSuccess();
        },
        onError: (err) => {
          toast.error(err.message);
        }
      }
    );
  };
  return /* @__PURE__ */ jsxs2(Fragment, { children: [
    /* @__PURE__ */ jsx2(RouteDrawer.Body, { children: /* @__PURE__ */ jsx2(ExportFilters, {}) }),
    /* @__PURE__ */ jsx2(RouteDrawer.Footer, { children: /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-x-2", children: [
      /* @__PURE__ */ jsx2(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx2(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
      /* @__PURE__ */ jsx2(Button, { onClick: handleExportRequest, size: "small", children: t("actions.export") })
    ] }) })
  ] });
};
export {
  ProductExport as Component
};
