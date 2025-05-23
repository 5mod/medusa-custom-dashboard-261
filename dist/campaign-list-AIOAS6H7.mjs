import {
  useCampaignTableColumns
} from "./chunk-YDX6VKEM.mjs";
import "./chunk-WYX5PIA3.mjs";
import "./chunk-MSDRGCRR.mjs";
import "./chunk-LQTHYS2Z.mjs";
import "./chunk-P3UUX2T6.mjs";
import {
  _DataTable,
  useDataTable
} from "./chunk-X3LH6P65.mjs";
import "./chunk-YEDAFXMB.mjs";
import "./chunk-AOFGTNG6.mjs";
import "./chunk-WX2SMNCD.mjs";
import {
  useCampaignTableQuery
} from "./chunk-OMC5JCQH.mjs";
import "./chunk-TMAS4ILY.mjs";
import "./chunk-M3VFKDXJ.mjs";
import {
  SingleColumnPage
} from "./chunk-2RQLKDBF.mjs";
import "./chunk-LPEUYMRK.mjs";
import {
  ActionMenu
} from "./chunk-3NJTXRIY.mjs";
import "./chunk-OC7BQLYI.mjs";
import "./chunk-C76H5USB.mjs";
import "./chunk-DV5RB7II.mjs";
import "./chunk-FTTSUETK.mjs";
import {
  useCampaigns,
  useDeleteCampaign
} from "./chunk-SWYL3QGB.mjs";
import {
  useDashboardExtension
} from "./chunk-ICKIQOG2.mjs";
import "./chunk-ONB3JEHR.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-WAYDNCEG.mjs";
import "./chunk-S47CVTVK.mjs";

// src/routes/campaigns/campaign-list/components/campaign-list-table.tsx
import { PencilSquare, Trash } from "@medusajs/icons";
import { Button, Container, Heading, toast, usePrompt } from "@medusajs/ui";
import { keepPreviousData } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { jsx, jsxs } from "react/jsx-runtime";
var PAGE_SIZE = 20;
var CampaignListTable = () => {
  const { t } = useTranslation();
  const { raw, searchParams } = useCampaignTableQuery({ pageSize: PAGE_SIZE });
  const {
    campaigns,
    count,
    isPending: isLoading,
    isError,
    error
  } = useCampaigns(searchParams, {
    placeholderData: keepPreviousData
  });
  const columns = useColumns();
  const { table } = useDataTable({
    data: campaigns ?? [],
    columns,
    count,
    enablePagination: true,
    getRowId: (row) => row.id,
    pageSize: PAGE_SIZE
  });
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs(Container, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsx(Heading, { level: "h2", children: t("campaigns.domain") }),
      /* @__PURE__ */ jsx(Link, { to: "/campaigns/create", children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.create") }) })
    ] }),
    /* @__PURE__ */ jsx(
      _DataTable,
      {
        table,
        columns,
        count,
        pageSize: PAGE_SIZE,
        pagination: true,
        search: true,
        navigateTo: (row) => row.id,
        isLoading,
        queryObject: raw,
        orderBy: [
          { key: "name", label: t("fields.name") },
          { key: "created_at", label: t("fields.createdAt") },
          { key: "updated_at", label: t("fields.updatedAt") }
        ]
      }
    )
  ] });
};
var CampaignActions = ({ campaign }) => {
  const { t } = useTranslation();
  const prompt = usePrompt();
  const { mutateAsync } = useDeleteCampaign(campaign.id);
  const handleDelete = async () => {
    const confirm = await prompt({
      title: t("general.areYouSure"),
      description: t("campaigns.deleteCampaignWarning", {
        name: campaign.name
      }),
      verificationInstruction: t("general.typeToConfirm"),
      verificationText: campaign.name,
      confirmText: t("actions.delete"),
      cancelText: t("actions.cancel")
    });
    if (!confirm) {
      return;
    }
    await mutateAsync(void 0, {
      onSuccess: () => {
        toast.success(
          t("campaigns.delete.successToast", { name: campaign.name })
        );
      },
      onError: (e) => {
        toast.error(e.message);
      }
    });
  };
  return /* @__PURE__ */ jsx(
    ActionMenu,
    {
      groups: [
        {
          actions: [
            {
              icon: /* @__PURE__ */ jsx(PencilSquare, {}),
              label: t("actions.edit"),
              to: `/campaigns/${campaign.id}/edit`
            }
          ]
        },
        {
          actions: [
            {
              icon: /* @__PURE__ */ jsx(Trash, {}),
              label: t("actions.delete"),
              onClick: handleDelete
            }
          ]
        }
      ]
    }
  );
};
var columnHelper = createColumnHelper();
var useColumns = () => {
  const base = useCampaignTableColumns();
  return useMemo(
    () => [
      ...base,
      columnHelper.display({
        id: "actions",
        cell: ({ row }) => {
          return /* @__PURE__ */ jsx(CampaignActions, { campaign: row.original });
        }
      })
    ],
    [base]
  );
};

// src/routes/campaigns/campaign-list/campaign-list.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var CampaignList = () => {
  const { getWidgets } = useDashboardExtension();
  return /* @__PURE__ */ jsx2(
    SingleColumnPage,
    {
      widgets: {
        after: getWidgets("campaign.list.after"),
        before: getWidgets("campaign.list.before")
      },
      hasOutlet: true,
      children: /* @__PURE__ */ jsx2(CampaignListTable, {})
    }
  );
};
export {
  CampaignList as Component
};
