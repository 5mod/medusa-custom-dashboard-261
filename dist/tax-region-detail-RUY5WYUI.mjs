import {
  TaxOverrideTable,
  TaxRateLine,
  useTaxOverrideTable
} from "./chunk-YQKW5NVA.mjs";
import {
  TaxRegionTable,
  useTaxRegionTable
} from "./chunk-6XTDCUWJ.mjs";
import {
  TaxRegionCard
} from "./chunk-JHNHXN7U.mjs";
import {
  getCountryProvinceObjectByIso2
} from "./chunk-THZJC662.mjs";
import "./chunk-V3MOBCDF.mjs";
import "./chunk-3WXBLS2P.mjs";
import {
  TaxRegionDetailBreadcrumb,
  taxRegionLoader
} from "./chunk-5EJJE3NE.mjs";
import "./chunk-YEDAFXMB.mjs";
import "./chunk-AOFGTNG6.mjs";
import "./chunk-WX2SMNCD.mjs";
import {
  useTaxRateTableQuery
} from "./chunk-I5HYE2RW.mjs";
import {
  useTaxRegionTableQuery
} from "./chunk-RIV7FKGN.mjs";
import "./chunk-M3VFKDXJ.mjs";
import "./chunk-EQTBJSBZ.mjs";
import "./chunk-VDBOSWVE.mjs";
import {
  SingleColumnPage
} from "./chunk-2RQLKDBF.mjs";
import {
  SingleColumnPageSkeleton
} from "./chunk-LPEUYMRK.mjs";
import "./chunk-3NJTXRIY.mjs";
import "./chunk-OC7BQLYI.mjs";
import "./chunk-C76H5USB.mjs";
import "./chunk-XCF3TZQZ.mjs";
import "./chunk-TXPNGFWJ.mjs";
import {
  useTaxRates
} from "./chunk-5OOAHPXU.mjs";
import {
  useTaxRegion,
  useTaxRegions
} from "./chunk-VJRTPNEA.mjs";
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
  useDashboardExtension
} from "./chunk-ICKIQOG2.mjs";
import "./chunk-ONB3JEHR.mjs";
import "./chunk-KPNKJVW6.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-WAYDNCEG.mjs";
import "./chunk-S47CVTVK.mjs";

// src/routes/tax-regions/tax-region-detail/tax-region-detail.tsx
import { useLoaderData, useParams } from "react-router-dom";

// src/routes/tax-regions/tax-region-detail/components/tax-region-detail-section/tax-region-detail-section.tsx
import { Badge, Container, Tooltip } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
var TaxRegionDetailSection = ({
  taxRegion
}) => {
  const { t } = useTranslation();
  const defaultRates = taxRegion.tax_rates.filter((r) => r.is_default === true);
  const showBage = defaultRates.length === 0;
  return /* @__PURE__ */ jsxs(Container, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsx(
      TaxRegionCard,
      {
        taxRegion,
        type: "header",
        asLink: false,
        badge: showBage && /* @__PURE__ */ jsx(Tooltip, { content: t("taxRegions.fields.noDefaultRate.tooltip"), children: /* @__PURE__ */ jsx(Badge, { color: "orange", size: "2xsmall", className: "cursor-default", children: t("taxRegions.fields.noDefaultRate.label") }) })
      }
    ),
    defaultRates.map((rate) => {
      return /* @__PURE__ */ jsx(TaxRateLine, { taxRate: rate }, rate.id);
    })
  ] });
};

// src/routes/tax-regions/tax-region-detail/components/tax-region-province-section/tax-region-province-section.tsx
import { Container as Container2, Heading } from "@medusajs/ui";
import { keepPreviousData } from "@tanstack/react-query";
import { useTranslation as useTranslation2 } from "react-i18next";
import { jsx as jsx2 } from "react/jsx-runtime";
var PAGE_SIZE = 10;
var PREFIX = "p";
var TaxRegionProvinceSection = ({
  taxRegion,
  showSublevelRegions
}) => {
  const { t } = useTranslation2();
  const { searchParams, raw } = useTaxRegionTableQuery({
    pageSize: PAGE_SIZE,
    prefix: PREFIX
  });
  const { tax_regions, count, isPending, isError, error } = useTaxRegions(
    {
      ...searchParams,
      parent_id: taxRegion.id
    },
    {
      placeholderData: keepPreviousData
    }
  );
  const { table } = useTaxRegionTable({
    count,
    data: tax_regions,
    pageSize: PAGE_SIZE,
    prefix: PREFIX
  });
  const provinceObject = getCountryProvinceObjectByIso2(taxRegion.country_code);
  if (!provinceObject && !showSublevelRegions && !taxRegion.children.length) {
    return null;
  }
  const type = provinceObject?.type || "sublevel";
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx2(Container2, { className: "divide-y p-0", children: /* @__PURE__ */ jsx2(
    TaxRegionTable,
    {
      variant: "province",
      action: { to: `provinces/create`, label: t("actions.create") },
      table,
      isPending,
      queryObject: raw,
      count,
      children: /* @__PURE__ */ jsx2(Heading, { level: "h2", children: t(`taxRegions.${type}.header`) })
    }
  ) });
};

// src/routes/tax-regions/tax-region-detail/tax-region-detail.tsx
import { useState as useState2 } from "react";

// src/routes/tax-regions/tax-region-detail/components/tax-region-override-section/tax-region-override-section.tsx
import { Container as Container3, Heading as Heading2 } from "@medusajs/ui";
import { keepPreviousData as keepPreviousData2 } from "@tanstack/react-query";
import { useTranslation as useTranslation3 } from "react-i18next";
import { jsx as jsx3 } from "react/jsx-runtime";
var PAGE_SIZE2 = 10;
var PREFIX2 = "o";
var TaxRegionOverrideSection = ({
  taxRegion
}) => {
  const { t } = useTranslation3();
  const { searchParams, raw } = useTaxRateTableQuery({
    pageSize: PAGE_SIZE2,
    prefix: PREFIX2
  });
  const { tax_rates, count, isPending, isError, error } = useTaxRates(
    {
      ...searchParams,
      tax_region_id: taxRegion.id,
      is_default: false
    },
    {
      placeholderData: keepPreviousData2
    }
  );
  const { table } = useTaxOverrideTable({
    count,
    data: tax_rates,
    pageSize: PAGE_SIZE2,
    prefix: PREFIX2
  });
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx3(Container3, { className: "p-0", children: /* @__PURE__ */ jsx3(
    TaxOverrideTable,
    {
      isPending,
      table,
      count,
      action: {
        label: t("actions.create"),
        to: "overrides/create"
      },
      queryObject: raw,
      prefix: PREFIX2,
      children: /* @__PURE__ */ jsx3(Heading2, { level: "h2", children: t("taxRegions.taxOverrides.header") })
    }
  ) });
};

// src/routes/tax-regions/tax-region-detail/components/tax-region-sublevel-alert/tax-region-sublevel-alert.tsx
import { Alert, Button, Text } from "@medusajs/ui";
import { useState } from "react";
import { useTranslation as useTranslation4 } from "react-i18next";
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
var TaxRegionSublevelAlert = ({
  taxRegion,
  showSublevelRegions,
  setShowSublevelRegions
}) => {
  const { t } = useTranslation4();
  const [dismissed, setDismissed] = useState(false);
  const provinceObject = getCountryProvinceObjectByIso2(taxRegion.country_code);
  if (provinceObject || showSublevelRegions || dismissed || taxRegion.children.length) {
    return null;
  }
  return /* @__PURE__ */ jsx4(Alert, { dismissible: true, variant: "info", className: "bg-ui-bg-base", children: /* @__PURE__ */ jsxs2("div", { className: "flex flex-col gap-y-3", children: [
    /* @__PURE__ */ jsxs2("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsx4(Text, { size: "small", leading: "compact", weight: "plus", asChild: true, children: /* @__PURE__ */ jsx4("h2", { children: t("taxRegions.fields.sublevels.alert.header") }) }),
      /* @__PURE__ */ jsx4(Text, { size: "small", leading: "compact", className: "text-pretty", children: t("taxRegions.fields.sublevels.alert.description") })
    ] }),
    /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-x-3", children: [
      /* @__PURE__ */ jsx4(
        Button,
        {
          variant: "secondary",
          size: "small",
          onClick: () => setShowSublevelRegions(true),
          children: t("taxRegions.fields.sublevels.alert.action")
        }
      ),
      /* @__PURE__ */ jsx4(
        Button,
        {
          variant: "transparent",
          size: "small",
          onClick: () => setDismissed(true),
          children: t("actions.hide")
        }
      )
    ] })
  ] }) });
};

// src/routes/tax-regions/tax-region-detail/tax-region-detail.tsx
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
var TaxRegionDetail = () => {
  const { id } = useParams();
  const [showSublevelRegions, setShowSublevelRegions] = useState2(false);
  const initialData = useLoaderData();
  const {
    tax_region: taxRegion,
    isLoading,
    isError,
    error
  } = useTaxRegion(id, void 0, { initialData });
  const { getWidgets } = useDashboardExtension();
  if (isLoading || !taxRegion) {
    return /* @__PURE__ */ jsx5(SingleColumnPageSkeleton, { sections: 4, showJSON: true });
  }
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs3(
    SingleColumnPage,
    {
      data: taxRegion,
      showJSON: true,
      widgets: {
        after: getWidgets("tax.details.after"),
        before: getWidgets("tax.details.before")
      },
      children: [
        /* @__PURE__ */ jsx5(
          TaxRegionSublevelAlert,
          {
            taxRegion,
            showSublevelRegions,
            setShowSublevelRegions
          }
        ),
        /* @__PURE__ */ jsx5(TaxRegionDetailSection, { taxRegion }),
        /* @__PURE__ */ jsx5(
          TaxRegionProvinceSection,
          {
            taxRegion,
            showSublevelRegions
          }
        ),
        /* @__PURE__ */ jsx5(TaxRegionOverrideSection, { taxRegion })
      ]
    }
  );
};
export {
  TaxRegionDetailBreadcrumb as Breadcrumb,
  TaxRegionDetail as Component,
  TaxRegionDetail,
  taxRegionLoader as loader
};
