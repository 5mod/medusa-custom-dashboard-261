import {
  useProductTableColumns
} from "./chunk-G3QXMPRB.mjs";
import "./chunk-IQBAUTU5.mjs";
import "./chunk-ADOCJB6L.mjs";
import "./chunk-LQTHYS2Z.mjs";
import "./chunk-P3UUX2T6.mjs";
import {
  _DataTable,
  useDataTable
} from "./chunk-X3LH6P65.mjs";
import "./chunk-YEDAFXMB.mjs";
import "./chunk-AOFGTNG6.mjs";
import "./chunk-WX2SMNCD.mjs";
import "./chunk-MNXC6Q4F.mjs";
import {
  useProductTableQuery
} from "./chunk-Y2ZAIM5S.mjs";
import {
  useProductTableFilters
} from "./chunk-U6CSGYH6.mjs";
import "./chunk-TMAS4ILY.mjs";
import "./chunk-M3VFKDXJ.mjs";
import "./chunk-LPEUYMRK.mjs";
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
import {
  useSalesChannel,
  useSalesChannelAddProducts
} from "./chunk-GX3K52WA.mjs";
import "./chunk-2XA3IEXQ.mjs";
import "./chunk-23LLRBGF.mjs";
import "./chunk-SY6HAFQV.mjs";
import "./chunk-HYULYW73.mjs";
import "./chunk-IUCDCPJU.mjs";
import {
  KeyboundForm
} from "./chunk-6HTZNHPT.mjs";
import {
  RouteFocusModal,
  useRouteModal
} from "./chunk-JGQGO74V.mjs";
import {
  useProducts
} from "./chunk-KPNKJVW6.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-WAYDNCEG.mjs";
import "./chunk-S47CVTVK.mjs";

// src/routes/sales-channels/sales-channel-add-products/sales-channel-add-products.tsx
import { useParams } from "react-router-dom";

// src/routes/sales-channels/sales-channel-add-products/components/add-products-to-sales-channel-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Hint, Tooltip, toast } from "@medusajs/ui";
import { keepPreviousData } from "@tanstack/react-query";
import {
  createColumnHelper
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as zod from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var AddProductsToSalesChannelSchema = zod.object({
  product_ids: zod.array(zod.string()).min(1)
});
var PAGE_SIZE = 50;
var AddProductsToSalesChannelForm = ({
  salesChannel
}) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      product_ids: []
    },
    resolver: zodResolver(AddProductsToSalesChannelSchema)
  });
  const { setValue } = form;
  const { mutateAsync, isPending } = useSalesChannelAddProducts(salesChannel.id);
  const [rowSelection, setRowSelection] = useState({});
  const updater = (fn) => {
    const state = typeof fn === "function" ? fn(rowSelection) : fn;
    const ids = Object.keys(state);
    setValue("product_ids", ids, {
      shouldDirty: true,
      shouldTouch: true
    });
    setRowSelection(state);
  };
  const { searchParams, raw } = useProductTableQuery({ pageSize: PAGE_SIZE });
  const {
    products,
    count,
    isPending: isLoading,
    isError,
    error
  } = useProducts(
    {
      fields: "*variants,*sales_channels",
      ...searchParams
    },
    {
      placeholderData: keepPreviousData
    }
  );
  const columns = useColumns();
  const filters = useProductTableFilters(["sales_channel_id"]);
  const { table } = useDataTable({
    data: products ?? [],
    columns,
    enableRowSelection: (row) => {
      return !row.original.sales_channels?.map((sc) => sc.id).includes(salesChannel.id);
    },
    enablePagination: true,
    getRowId: (row) => row.id,
    pageSize: PAGE_SIZE,
    count,
    rowSelection: {
      state: rowSelection,
      updater
    },
    meta: {
      salesChannelId: salesChannel.id
    }
  });
  const handleSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(values.product_ids, {
      onSuccess: () => {
        toast.success(t("salesChannels.toast.update"));
        handleSuccess();
      },
      onError: (error2) => toast.error(error2.message)
    });
  });
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsxs(
    KeyboundForm,
    {
      onSubmit: handleSubmit,
      className: "flex h-full flex-col overflow-hidden",
      children: [
        /* @__PURE__ */ jsx(RouteFocusModal.Header, { children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end gap-x-2", children: form.formState.errors.product_ids && /* @__PURE__ */ jsx(Hint, { variant: "error", children: form.formState.errors.product_ids.message }) }) }),
        /* @__PURE__ */ jsx(RouteFocusModal.Body, { className: "flex size-full flex-col overflow-y-auto", children: /* @__PURE__ */ jsx(
          _DataTable,
          {
            table,
            count,
            columns,
            pageSize: PAGE_SIZE,
            isLoading,
            filters,
            orderBy: [
              { key: "title", label: t("fields.title") },
              { key: "status", label: t("fields.status") },
              { key: "created_at", label: t("fields.createdAt") },
              { key: "updated_at", label: t("fields.updatedAt") }
            ],
            queryObject: raw,
            layout: "fill",
            pagination: true,
            search: "autofocus",
            noRecords: {
              message: t("salesChannels.products.add.list.noRecordsMessage")
            }
          }
        ) }),
        /* @__PURE__ */ jsx(RouteFocusModal.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx(Button, { size: "small", type: "submit", isLoading: isPending, children: t("actions.save") })
        ] }) })
      ]
    }
  ) });
};
var columnHelper = createColumnHelper();
var useColumns = () => {
  const base = useProductTableColumns();
  const { t } = useTranslation();
  return useMemo(
    () => [
      columnHelper.display({
        id: "select",
        header: ({ table }) => {
          return /* @__PURE__ */ jsx(
            Checkbox,
            {
              checked: table.getIsSomePageRowsSelected() ? "indeterminate" : table.getIsAllPageRowsSelected(),
              onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value)
            }
          );
        },
        cell: ({ row, table }) => {
          const { salesChannelId } = table.options.meta;
          const isAdded = row.original.sales_channels?.map((sc) => sc.id).includes(salesChannelId);
          const isSelected = row.getIsSelected() || isAdded;
          const Component = /* @__PURE__ */ jsx(
            Checkbox,
            {
              checked: isSelected,
              disabled: isAdded,
              onCheckedChange: (value) => row.toggleSelected(!!value),
              onClick: (e) => {
                e.stopPropagation();
              }
            }
          );
          if (isAdded) {
            return /* @__PURE__ */ jsx(
              Tooltip,
              {
                content: t("salesChannels.productAlreadyAdded"),
                side: "right",
                children: Component
              }
            );
          }
          return Component;
        }
      }),
      ...base
    ],
    [t, base]
  );
};

// src/routes/sales-channels/sales-channel-add-products/sales-channel-add-products.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var SalesChannelAddProducts = () => {
  const { id } = useParams();
  const {
    sales_channel,
    isPending: isLoading,
    isError,
    error
  } = useSalesChannel(id);
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx2(RouteFocusModal, { children: !isLoading && sales_channel && /* @__PURE__ */ jsx2(AddProductsToSalesChannelForm, { salesChannel: sales_channel }) });
};
export {
  SalesChannelAddProducts as Component
};
