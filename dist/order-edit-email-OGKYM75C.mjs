import {
  DEFAULT_FIELDS
} from "./chunk-7I5DQGWY.mjs";
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
import {
  useOrder,
  useUpdateOrder
} from "./chunk-6EJHOUIV.mjs";
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

// src/routes/orders/order-edit-email/order-edit-email.tsx
import { Heading } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useParams } from "react-router-dom";

// src/routes/orders/order-edit-email/components/edit-order-email-form/edit-order-email-form.tsx
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, toast } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
var EditOrderEmailSchema = zod.object({
  email: zod.string().email()
});
function EditOrderEmailForm({ order }) {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      email: order.email || ""
    },
    resolver: zodResolver(EditOrderEmailSchema)
  });
  const { mutateAsync, isPending } = useUpdateOrder(order.id);
  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await mutateAsync({
        email: data.email
      });
      toast.success(
        t("orders.edit.email.requestSuccess", { email: data.email })
      );
      handleSuccess();
    } catch (error) {
      toast.error(error.message);
    }
  });
  return /* @__PURE__ */ jsx(RouteDrawer.Form, { form, children: /* @__PURE__ */ jsxs(
    KeyboundForm,
    {
      onSubmit: handleSubmit,
      className: "flex size-full flex-col overflow-hidden",
      children: [
        /* @__PURE__ */ jsx(RouteDrawer.Body, { className: "flex-1 overflow-auto", children: /* @__PURE__ */ jsx(
          Form.Field,
          {
            control: form.control,
            name: "email",
            render: ({ field }) => {
              return /* @__PURE__ */ jsxs(Form.Item, { children: [
                /* @__PURE__ */ jsx(Form.Label, { children: t("fields.email") }),
                /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { type: "email", ...field }) }),
                /* @__PURE__ */ jsx(Form.ErrorMessage, {})
              ] });
            }
          }
        ) }),
        /* @__PURE__ */ jsx(RouteDrawer.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "small", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx(
            Button,
            {
              isLoading: isPending,
              type: "submit",
              variant: "primary",
              size: "small",
              children: t("actions.save")
            }
          )
        ] }) })
      ]
    }
  ) });
}

// src/routes/orders/order-edit-email/order-edit-email.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var OrderEditEmail = () => {
  const { t } = useTranslation2();
  const params = useParams();
  const { order, isPending, isError, error } = useOrder(params.id, {
    fields: DEFAULT_FIELDS
  });
  if (!isPending && isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs2(RouteDrawer, { children: [
    /* @__PURE__ */ jsx2(RouteDrawer.Header, { children: /* @__PURE__ */ jsx2(Heading, { children: t("orders.edit.email.title") }) }),
    order && /* @__PURE__ */ jsx2(EditOrderEmailForm, { order })
  ] });
};
export {
  OrderEditEmail as Component
};
