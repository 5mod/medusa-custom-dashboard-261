import {
  getPaymentsFromOrder
} from "./chunk-M6DIVLNP.mjs";
import "./chunk-HXH6YTQG.mjs";
import {
  formatCurrency
} from "./chunk-OV5NMSY6.mjs";
import {
  DEFAULT_FIELDS
} from "./chunk-7I5DQGWY.mjs";
import "./chunk-7DXVXBSA.mjs";
import {
  getLocaleAmount
} from "./chunk-PDWBYQOW.mjs";
import {
  getCurrencySymbol
} from "./chunk-MWVM4TYO.mjs";
import "./chunk-3NJTXRIY.mjs";
import "./chunk-OC7BQLYI.mjs";
import {
  useRefundReasons
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
import {
  useRefundPayment
} from "./chunk-3UEMCYR5.mjs";
import "./chunk-HGVADKNP.mjs";
import "./chunk-S3MWIWV4.mjs";
import "./chunk-2BXI62DA.mjs";
import "./chunk-SWYL3QGB.mjs";
import "./chunk-BF3VCHXD.mjs";
import "./chunk-QDC5CTTV.mjs";
import {
  useOrder
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

// src/routes/orders/order-create-refund/order-create-refund.tsx
import { Heading } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useParams } from "react-router-dom";

// src/routes/orders/order-create-refund/components/create-refund-form/create-refund-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  CurrencyInput,
  Label,
  Select,
  Textarea,
  toast
} from "@medusajs/ui";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as zod from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var CreateRefundSchema = zod.object({
  amount: zod.number(),
  refund_reason_id: zod.string().nullish(),
  note: zod.string().optional()
});
var CreateRefundForm = ({
  order,
  refundReasons
}) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  const payments = getPaymentsFromOrder(order);
  const payment = payments.find((p) => p.id === paymentId);
  const paymentAmount = payment?.amount || 0;
  const form = useForm({
    defaultValues: {
      amount: paymentAmount,
      note: ""
    },
    resolver: zodResolver(CreateRefundSchema)
  });
  useEffect(() => {
    const pendingDifference = order.summary.pending_difference;
    const paymentAmount2 = payment?.amount || 0;
    const pendingAmount = pendingDifference < 0 ? Math.min(pendingDifference, paymentAmount2) : paymentAmount2;
    const normalizedAmount = pendingAmount < 0 ? pendingAmount * -1 : pendingAmount;
    form.setValue("amount", normalizedAmount);
  }, [payment]);
  const { mutateAsync, isPending } = useRefundPayment(order.id, payment?.id);
  const handleSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(
      {
        amount: data.amount,
        refund_reason_id: data.refund_reason_id,
        note: data.note
      },
      {
        onSuccess: () => {
          toast.success(
            t("orders.payment.refundPaymentSuccess", {
              amount: formatCurrency(data.amount, payment?.currency_code)
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
  return /* @__PURE__ */ jsx(RouteDrawer.Form, { form, children: /* @__PURE__ */ jsxs(
    KeyboundForm,
    {
      onSubmit: handleSubmit,
      className: "flex size-full flex-col overflow-hidden",
      children: [
        /* @__PURE__ */ jsx(RouteDrawer.Body, { className: "flex-1 overflow-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-4", children: [
          /* @__PURE__ */ jsxs(
            Select,
            {
              value: payment?.id,
              onValueChange: (value) => {
                navigate(`/orders/${order.id}/refund?paymentId=${value}`, {
                  replace: true
                });
              },
              children: [
                /* @__PURE__ */ jsx(Label, { className: "txt-compact-small mb-[-6px] font-sans font-medium", children: t("orders.payment.selectPaymentToRefund") }),
                /* @__PURE__ */ jsx(Select.Trigger, { children: /* @__PURE__ */ jsx(
                  Select.Value,
                  {
                    placeholder: t("orders.payment.selectPaymentToRefund")
                  }
                ) }),
                /* @__PURE__ */ jsx(Select.Content, { children: payments.map((payment2) => {
                  const totalRefunded = payment2.refunds.reduce(
                    (acc, next) => next.amount + acc,
                    0
                  );
                  return /* @__PURE__ */ jsxs(
                    Select.Item,
                    {
                      value: payment2.id,
                      disabled: !!payment2.canceled_at || totalRefunded >= payment2.amount,
                      children: [
                        /* @__PURE__ */ jsxs("span", { children: [
                          getLocaleAmount(
                            payment2.amount,
                            payment2.currency_code
                          ),
                          " - "
                        ] }),
                        /* @__PURE__ */ jsx("span", { children: payment2.provider_id }),
                        /* @__PURE__ */ jsxs("span", { children: [
                          " - (",
                          payment2.id.replace("pay_", ""),
                          ")"
                        ] })
                      ]
                    },
                    payment2.id
                  );
                }) })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Field,
            {
              control: form.control,
              name: "amount",
              rules: {
                required: true,
                min: 0,
                max: paymentAmount
              },
              render: ({ field: { onChange, ...field } }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx(Form.Label, { children: t("fields.amount") }),
                  /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                    CurrencyInput,
                    {
                      ...field,
                      min: 0,
                      onValueChange: (value) => {
                        const fieldValue = value ? parseInt(value) : "";
                        if (fieldValue && !isNaN(fieldValue)) {
                          if (fieldValue < 0 || fieldValue > paymentAmount) {
                            form.setError(`amount`, {
                              type: "manual",
                              message: t(
                                "orders.payment.createRefundWrongQuantity",
                                { number: paymentAmount }
                              )
                            });
                          } else {
                            form.clearErrors(`amount`);
                          }
                        }
                        onChange(fieldValue);
                      },
                      code: order.currency_code,
                      symbol: getCurrencySymbol(order.currency_code),
                      value: field.value
                    }
                  ) }),
                  /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                ] });
              }
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Field,
            {
              control: form.control,
              name: `note`,
              render: ({ field }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx(Form.Label, { children: t("fields.note") }),
                  /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Textarea, { ...field }) }),
                  /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                ] });
              }
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx(RouteDrawer.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "small", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx(
            Button,
            {
              isLoading: isPending,
              type: "submit",
              variant: "primary",
              size: "small",
              disabled: !!Object.keys(form.formState.errors || {}).length,
              children: t("actions.save")
            }
          )
        ] }) })
      ]
    }
  ) });
};

// src/routes/orders/order-create-refund/order-create-refund.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var OrderCreateRefund = () => {
  const { t } = useTranslation2();
  const params = useParams();
  const { order } = useOrder(params.id, {
    fields: DEFAULT_FIELDS
  });
  const {
    refund_reasons: refundReasons,
    isLoading: isRefundReasonsLoading,
    isError: isRefundReasonsError,
    error: refundReasonsError
  } = useRefundReasons();
  if (isRefundReasonsError) {
    throw refundReasonsError;
  }
  return /* @__PURE__ */ jsxs2(RouteDrawer, { children: [
    /* @__PURE__ */ jsx2(RouteDrawer.Header, { children: /* @__PURE__ */ jsx2(Heading, { children: t("orders.payment.createRefund") }) }),
    order && !isRefundReasonsLoading && refundReasons && /* @__PURE__ */ jsx2(CreateRefundForm, { order, refundReasons })
  ] });
};
export {
  OrderCreateRefund as Component
};
