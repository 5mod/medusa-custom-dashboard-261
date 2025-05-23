import {
  AddCampaignPromotionForm
} from "./chunk-TJY3W2YI.mjs";
import "./chunk-UGE5SYTC.mjs";
import "./chunk-MWVM4TYO.mjs";
import {
  useCampaigns,
  usePromotion
} from "./chunk-SWYL3QGB.mjs";
import "./chunk-23LLRBGF.mjs";
import "./chunk-HYULYW73.mjs";
import "./chunk-IUCDCPJU.mjs";
import "./chunk-6HTZNHPT.mjs";
import {
  RouteDrawer
} from "./chunk-JGQGO74V.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-WAYDNCEG.mjs";
import "./chunk-S47CVTVK.mjs";

// src/routes/promotions/promotion-add-campaign/promotion-add-campaign.tsx
import { Heading } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { jsx, jsxs } from "react/jsx-runtime";
var PromotionAddCampaign = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { promotion, isPending, isError, error } = usePromotion(id);
  let campaignQuery = {};
  if (promotion?.application_method?.currency_code) {
    campaignQuery = {
      budget: {
        currency_code: promotion?.application_method?.currency_code
      }
    };
  }
  const {
    campaigns,
    isPending: areCampaignsLoading,
    isError: isCampaignError,
    error: campaignError
  } = useCampaigns(campaignQuery);
  if (isError || isCampaignError) {
    throw error || campaignError;
  }
  return /* @__PURE__ */ jsxs(RouteDrawer, { children: [
    /* @__PURE__ */ jsx(RouteDrawer.Header, { children: /* @__PURE__ */ jsx(Heading, { children: t("promotions.campaign.edit.header") }) }),
    !isPending && !areCampaignsLoading && promotion && campaigns && /* @__PURE__ */ jsx(AddCampaignPromotionForm, { promotion, campaigns })
  ] });
};
export {
  PromotionAddCampaign as Component
};
