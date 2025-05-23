import {
  TaxOverrideTable,
  TaxRateLine,
  useTaxOverrideTable
} from "./chunk-YQKW5NVA.mjs";
import {
  TaxRegionCard
} from "./chunk-JHNHXN7U.mjs";
import {
  getProvinceByIso2,
  isProvinceInCountry
} from "./chunk-THZJC662.mjs";
import "./chunk-V3MOBCDF.mjs";
import "./chunk-3WXBLS2P.mjs";
import "./chunk-YEDAFXMB.mjs";
import "./chunk-AOFGTNG6.mjs";
import "./chunk-WX2SMNCD.mjs";
import {
  useTaxRateTableQuery
} from "./chunk-I5HYE2RW.mjs";
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
  taxRegionsQueryKeys,
  useTaxRegion
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
import {
  queryClient
} from "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import {
  sdk
} from "./chunk-WAYDNCEG.mjs";
import "./chunk-S47CVTVK.mjs";

// src/routes/tax-regions/tax-region-province-detail/tax-region-detail.tsx
import { useLoaderData, useParams } from "react-router-dom";

// src/routes/tax-regions/tax-region-province-detail/components/tax-region-province-detail-section/tax-region-detail-section.tsx
import { Badge, Container, Tooltip } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
var TaxRegionProvinceDetailSection = ({
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
      return /* @__PURE__ */ jsx(TaxRateLine, { taxRate: rate, isSublevelTaxRate: true }, rate.id);
    })
  ] });
};

// src/routes/tax-regions/tax-region-province-detail/components/tax-region-province-override-section/tax-region-province-override-section.tsx
import { Container as Container2, Heading } from "@medusajs/ui";
import { keepPreviousData } from "@tanstack/react-query";
import { useTranslation as useTranslation2 } from "react-i18next";
import { jsx as jsx2 } from "react/jsx-runtime";
var PAGE_SIZE = 10;
var PREFIX = "o";
var TaxRegionProvinceOverrideSection = ({
  taxRegion
}) => {
  const { t } = useTranslation2();
  const { searchParams, raw } = useTaxRateTableQuery({
    pageSize: PAGE_SIZE,
    prefix: PREFIX
  });
  const { tax_rates, count, isPending, isError, error } = useTaxRates(
    {
      ...searchParams,
      tax_region_id: taxRegion.id,
      is_default: false
    },
    {
      placeholderData: keepPreviousData
    }
  );
  const { table } = useTaxOverrideTable({
    count,
    data: tax_rates,
    pageSize: PAGE_SIZE,
    prefix: PREFIX
  });
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx2(Container2, { className: "p-0", children: /* @__PURE__ */ jsx2(
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
      prefix: PREFIX,
      children: /* @__PURE__ */ jsx2(Heading, { level: "h2", children: t("taxRegions.taxOverrides.header") })
    }
  ) });
};

// src/routes/tax-regions/tax-region-province-detail/tax-region-detail.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var TaxRegionDetail = () => {
  const { province_id } = useParams();
  const initialData = useLoaderData();
  const {
    tax_region: taxRegion,
    isLoading,
    isError,
    error
  } = useTaxRegion(province_id, void 0, { initialData });
  const { getWidgets } = useDashboardExtension();
  if (isLoading || !taxRegion) {
    return /* @__PURE__ */ jsx3(SingleColumnPageSkeleton, { sections: 2, showJSON: true });
  }
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs2(
    SingleColumnPage,
    {
      data: taxRegion,
      showJSON: true,
      widgets: {
        after: getWidgets("tax.details.after"),
        before: getWidgets("tax.details.before")
      },
      children: [
        /* @__PURE__ */ jsx3(TaxRegionProvinceDetailSection, { taxRegion }),
        /* @__PURE__ */ jsx3(TaxRegionProvinceOverrideSection, { taxRegion })
      ]
    }
  );
};

// src/routes/tax-regions/tax-region-province-detail/breadcrumb.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var TaxRegionDetailBreadcrumb = (props) => {
  const { province_id } = props.params || {};
  const { tax_region } = useTaxRegion(province_id, void 0, {
    initialData: props.data,
    enabled: Boolean(province_id)
  });
  if (!tax_region) {
    return null;
  }
  const countryCode = tax_region.country_code?.toUpperCase();
  const provinceCode = tax_region.province_code?.toUpperCase();
  const isValid = isProvinceInCountry(countryCode, provinceCode);
  return /* @__PURE__ */ jsx4("span", { children: isValid ? getProvinceByIso2(provinceCode) : provinceCode });
};

// src/routes/tax-regions/tax-region-province-detail/loader.ts
var taxRegionDetailQuery = (id) => ({
  queryKey: taxRegionsQueryKeys.detail(id),
  queryFn: async () => sdk.admin.taxRegion.retrieve(id)
});
var taxRegionLoader = async ({ params }) => {
  const id = params.province_id;
  const query = taxRegionDetailQuery(id);
  return queryClient.ensureQueryData(query);
};
export {
  TaxRegionDetailBreadcrumb as Breadcrumb,
  TaxRegionDetail as Component,
  TaxRegionDetail,
  taxRegionLoader as loader
};
