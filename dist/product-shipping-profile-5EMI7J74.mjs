import {
  useComboboxData
} from "./chunk-6CNRNROJ.mjs";
import {
  Combobox
} from "./chunk-3LLQ6F7F.mjs";
import "./chunk-IUCDCPJU.mjs";
import {
  KeyboundForm
} from "./chunk-6HTZNHPT.mjs";
import {
  RouteDrawer,
  useRouteModal
} from "./chunk-JGQGO74V.mjs";
import {
  PRODUCT_DETAIL_FIELDS
} from "./chunk-3YSKURVJ.mjs";
import "./chunk-ICKIQOG2.mjs";
import "./chunk-ONB3JEHR.mjs";
import {
  useProduct,
  useUpdateProduct
} from "./chunk-KPNKJVW6.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import {
  Form,
  sdk
} from "./chunk-WAYDNCEG.mjs";
import "./chunk-S47CVTVK.mjs";

// src/routes/products/product-shipping-profile/product-shipping-profile.tsx
import { Heading } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useParams } from "react-router-dom";

// src/routes/products/product-shipping-profile/components/product-organization-form/product-shipping-profile-form.tsx
import { Button, toast } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var ProductShippingProfileSchema = zod.object({
  shipping_profile_id: zod.string()
});
var ProductShippingProfileForm = ({
  product
}) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const shippingProfiles = useComboboxData({
    queryKey: ["shipping_profiles"],
    queryFn: (params) => sdk.admin.shippingProfile.list(params),
    getOptions: (data) => data.shipping_profiles.map((shippingProfile) => ({
      label: shippingProfile.name,
      value: shippingProfile.id
    }))
  });
  const form = useForm({
    defaultValues: {
      shipping_profile_id: product.shipping_profile?.id ?? ""
    },
    resolver: zodResolver(ProductShippingProfileSchema)
  });
  const selectedShippingProfile = form.watch("shipping_profile_id");
  const { mutateAsync, isPending } = useUpdateProduct(product.id);
  const handleSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(
      {
        shipping_profile_id: data.shipping_profile_id === "" ? null : data.shipping_profile_id
      },
      {
        onSuccess: ({ product: product2 }) => {
          toast.success(
            t("products.shippingProfile.edit.toasts.success", {
              title: product2.title
            })
          );
          handleSuccess();
        },
        onError: (error) => {
          toast.error(error.message);
        }
      }
    );
  });
  useEffect(() => {
    if (typeof selectedShippingProfile === "undefined") {
      form.setValue("shipping_profile_id", "");
    }
  }, [selectedShippingProfile]);
  return /* @__PURE__ */ jsx(RouteDrawer.Form, { form, children: /* @__PURE__ */ jsxs(KeyboundForm, { onSubmit: handleSubmit, className: "flex h-full flex-col", children: [
    /* @__PURE__ */ jsx(RouteDrawer.Body, { children: /* @__PURE__ */ jsx("div", { className: "flex h-full flex-col gap-y-4", children: /* @__PURE__ */ jsx(
      Form.Field,
      {
        control: form.control,
        name: "shipping_profile_id",
        render: ({ field }) => {
          return /* @__PURE__ */ jsxs(Form.Item, { children: [
            /* @__PURE__ */ jsx(Form.Label, { children: t("products.fields.shipping_profile.label") }),
            /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
              Combobox,
              {
                ...field,
                allowClear: true,
                options: shippingProfiles.options,
                searchValue: shippingProfiles.searchValue,
                onSearchValueChange: shippingProfiles.onSearchValueChange,
                fetchNextPage: shippingProfiles.fetchNextPage
              }
            ) }),
            /* @__PURE__ */ jsx(Form.ErrorMessage, {})
          ] });
        }
      }
    ) }) }),
    /* @__PURE__ */ jsx(RouteDrawer.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
      /* @__PURE__ */ jsx(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
      /* @__PURE__ */ jsx(Button, { size: "small", type: "submit", isLoading: isPending, children: t("actions.save") })
    ] }) })
  ] }) });
};

// src/routes/products/product-shipping-profile/product-shipping-profile.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var ProductShippingProfile = () => {
  const { id } = useParams();
  const { t } = useTranslation2();
  const { product, isLoading, isError, error } = useProduct(id, {
    fields: PRODUCT_DETAIL_FIELDS
  });
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs2(RouteDrawer, { children: [
    /* @__PURE__ */ jsx2(RouteDrawer.Header, { children: /* @__PURE__ */ jsx2(RouteDrawer.Title, { asChild: true, children: /* @__PURE__ */ jsx2(Heading, { children: t("products.shippingProfile.edit.header") }) }) }),
    !isLoading && product && /* @__PURE__ */ jsx2(ProductShippingProfileForm, { product })
  ] });
};
export {
  ProductShippingProfile as Component
};
