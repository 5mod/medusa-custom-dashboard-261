import {
  useProductTag,
  useUpdateProductTag
} from "./chunk-XCF3TZQZ.mjs";
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
import "./chunk-IUCDCPJU.mjs";
import {
  KeyboundForm
} from "./chunk-6HTZNHPT.mjs";
import {
  RouteDrawer,
  useRouteModal
} from "./chunk-JGQGO74V.mjs";
import "./chunk-KPNKJVW6.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import {
  Form
} from "./chunk-WAYDNCEG.mjs";
import "./chunk-S47CVTVK.mjs";

// src/routes/product-tags/product-tag-edit/product-tag-edit.tsx
import { Heading } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useParams } from "react-router-dom";

// src/routes/product-tags/product-tag-edit/components/product-tag-edit-form/product-tag-edit-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, toast } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var ProductTagEditSchema = z.object({
  value: z.string().min(1)
});
var ProductTagEditForm = ({ productTag }) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      value: productTag.value
    },
    resolver: zodResolver(ProductTagEditSchema)
  });
  const { mutateAsync, isPending } = useUpdateProductTag(productTag.id);
  const handleSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(data, {
      onSuccess: ({ product_tag }) => {
        toast.success(
          t("productTags.edit.successToast", {
            value: product_tag.value
          })
        );
        handleSuccess();
      },
      onError: (error) => {
        toast.error(error.message);
      }
    });
  });
  return /* @__PURE__ */ jsx(RouteDrawer.Form, { form, children: /* @__PURE__ */ jsxs(
    KeyboundForm,
    {
      className: "flex size-full flex-col overflow-hidden",
      onSubmit: handleSubmit,
      children: [
        /* @__PURE__ */ jsx(RouteDrawer.Body, { className: "flex flex-1 flex-col overflow-auto", children: /* @__PURE__ */ jsx(
          Form.Field,
          {
            control: form.control,
            name: "value",
            render: ({ field }) => {
              return /* @__PURE__ */ jsxs(Form.Item, { children: [
                /* @__PURE__ */ jsx(Form.Label, { children: t("productTags.fields.value") }),
                /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
                /* @__PURE__ */ jsx(Form.ErrorMessage, {})
              ] });
            }
          }
        ) }),
        /* @__PURE__ */ jsx(RouteDrawer.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "small", type: "button", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx(Button, { size: "small", type: "submit", isLoading: isPending, children: t("actions.save") })
        ] }) })
      ]
    }
  ) });
};

// src/routes/product-tags/product-tag-edit/product-tag-edit.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var ProductTagEdit = () => {
  const { id } = useParams();
  const { t } = useTranslation2();
  const { product_tag, isPending, isError, error } = useProductTag(id);
  const ready = !isPending && !!product_tag;
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs2(RouteDrawer, { children: [
    /* @__PURE__ */ jsxs2(RouteDrawer.Header, { children: [
      /* @__PURE__ */ jsx2(RouteDrawer.Title, { asChild: true, children: /* @__PURE__ */ jsx2(Heading, { children: t("productTags.edit.header") }) }),
      /* @__PURE__ */ jsx2(RouteDrawer.Description, { className: "sr-only", children: t("productTags.edit.subtitle") })
    ] }),
    ready && /* @__PURE__ */ jsx2(ProductTagEditForm, { productTag: product_tag })
  ] });
};
export {
  ProductTagEdit as Component
};
