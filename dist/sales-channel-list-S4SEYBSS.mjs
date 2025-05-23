import {
  useSalesChannelTableColumns,
  useSalesChannelTableEmptyState,
  useSalesChannelTableFilters,
  useSalesChannelTableQuery
} from "./chunk-UVGNHHSZ.mjs";
import {
  SingleColumnPage
} from "./chunk-2RQLKDBF.mjs";
import "./chunk-FFVOUYTF.mjs";
import {
  DataTable
} from "./chunk-MGPZHEOT.mjs";
import "./chunk-3NJTXRIY.mjs";
import "./chunk-OC7BQLYI.mjs";
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
  useDeleteSalesChannelLazy,
  useSalesChannels
} from "./chunk-GX3K52WA.mjs";
import "./chunk-2XA3IEXQ.mjs";
import {
  useStore
} from "./chunk-23LLRBGF.mjs";
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

// src/routes/sales-channels/sales-channel-list/components/sales-channel-list-table.tsx
import { PencilSquare, Trash } from "@medusajs/icons";
import {
  Container,
  createDataTableColumnHelper,
  toast,
  usePrompt
} from "@medusajs/ui";
import { keepPreviousData } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { jsx } from "react/jsx-runtime";
var PAGE_SIZE = 20;
var SalesChannelListTable = () => {
  const { t } = useTranslation();
  const { store } = useStore();
  const searchParams = useSalesChannelTableQuery({
    pageSize: PAGE_SIZE
  });
  const { sales_channels, count, isPending, isError, error } = useSalesChannels(
    searchParams,
    {
      placeholderData: keepPreviousData
    }
  );
  const columns = useColumns();
  const filters = useSalesChannelTableFilters();
  const emptyState = useSalesChannelTableEmptyState();
  const sales_channels_data = sales_channels?.map((sales_channel) => {
    return {
      ...sales_channel,
      is_default: store?.default_sales_channel_id === sales_channel.id
    };
  }) ?? [];
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx(Container, { className: "p-0", children: /* @__PURE__ */ jsx(
    DataTable,
    {
      data: sales_channels_data,
      columns,
      rowCount: count,
      getRowId: (row) => row.id,
      pageSize: PAGE_SIZE,
      filters,
      isLoading: isPending,
      emptyState,
      heading: t("salesChannels.domain"),
      subHeading: t("salesChannels.subtitle"),
      action: {
        label: t("actions.create"),
        to: "/settings/sales-channels/create"
      },
      rowHref: (row) => `/settings/sales-channels/${row.id}`
    }
  ) });
};
var columnHelper = createDataTableColumnHelper();
var useColumns = () => {
  const { t } = useTranslation();
  const prompt = usePrompt();
  const navigate = useNavigate();
  const base = useSalesChannelTableColumns();
  const { mutateAsync } = useDeleteSalesChannelLazy();
  const handleDelete = useCallback(
    async (salesChannel) => {
      const confirm = await prompt({
        title: t("general.areYouSure"),
        description: t("salesChannels.deleteSalesChannelWarning", {
          name: salesChannel.name
        }),
        verificationInstruction: t("general.typeToConfirm"),
        verificationText: salesChannel.name,
        confirmText: t("actions.delete"),
        cancelText: t("actions.cancel")
      });
      if (!confirm) {
        return;
      }
      await mutateAsync(salesChannel.id, {
        onSuccess: () => {
          toast.success(t("salesChannels.toast.delete"));
        },
        onError: (e) => {
          toast.error(e.message);
        }
      });
    },
    [t, prompt, mutateAsync]
  );
  return useMemo(
    () => [
      ...base,
      columnHelper.action({
        actions: (ctx) => {
          const disabledTooltip = ctx.row.original.is_default ? t("salesChannels.tooltip.cannotDeleteDefault") : void 0;
          return [
            [
              {
                icon: /* @__PURE__ */ jsx(PencilSquare, {}),
                label: t("actions.edit"),
                onClick: () => navigate(
                  `/settings/sales-channels/${ctx.row.original.id}/edit`
                )
              }
            ],
            [
              {
                icon: /* @__PURE__ */ jsx(Trash, {}),
                label: t("actions.delete"),
                onClick: () => handleDelete(ctx.row.original),
                disabled: ctx.row.original.is_default,
                disabledTooltip
              }
            ]
          ];
        }
      })
    ],
    [base, handleDelete, navigate, t]
  );
};

// src/routes/sales-channels/sales-channel-list/sales-channel-list.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var SalesChannelList = () => {
  const { getWidgets } = useDashboardExtension();
  return /* @__PURE__ */ jsx2(
    SingleColumnPage,
    {
      widgets: {
        before: getWidgets("sales_channel.list.before"),
        after: getWidgets("sales_channel.list.after")
      },
      hasOutlet: true,
      children: /* @__PURE__ */ jsx2(SalesChannelListTable, {})
    }
  );
};
export {
  SalesChannelList as Component
};
