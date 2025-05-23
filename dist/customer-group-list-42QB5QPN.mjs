import {
  SingleColumnPage
} from "./chunk-2RQLKDBF.mjs";
import {
  DataTable,
  useDataTableDateFilters
} from "./chunk-MGPZHEOT.mjs";
import "./chunk-3NJTXRIY.mjs";
import "./chunk-OC7BQLYI.mjs";
import {
  useQueryParams
} from "./chunk-C76H5USB.mjs";
import {
  useDate
} from "./chunk-DV5RB7II.mjs";
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
import {
  useCustomerGroups,
  useDeleteCustomerGroupLazy
} from "./chunk-S3MWIWV4.mjs";
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

// src/routes/customer-groups/customer-group-list/components/customer-group-list-table/customer-group-list-table.tsx
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
var PAGE_SIZE = 10;
var CustomerGroupListTable = () => {
  const { t } = useTranslation();
  const { getWidgets } = useDashboardExtension();
  const { q, order, offset, created_at, updated_at } = useQueryParams([
    "q",
    "order",
    "offset",
    "created_at",
    "updated_at"
  ]);
  const columns = useColumns();
  const filters = useFilters();
  const { customer_groups, count, isPending, isError, error } = useCustomerGroups(
    {
      q,
      order,
      offset: offset ? parseInt(offset) : void 0,
      limit: PAGE_SIZE,
      created_at: created_at ? JSON.parse(created_at) : void 0,
      updated_at: updated_at ? JSON.parse(updated_at) : void 0,
      fields: "id,name,created_at,updated_at,customers.id"
    },
    {
      placeholderData: keepPreviousData
    }
  );
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx(
    SingleColumnPage,
    {
      widgets: {
        before: getWidgets("customer_group.list.before"),
        after: getWidgets("customer_group.list.after")
      },
      children: /* @__PURE__ */ jsx(Container, { className: "overflow-hidden p-0", children: /* @__PURE__ */ jsx(
        DataTable,
        {
          data: customer_groups,
          columns,
          filters,
          heading: t("customerGroups.domain"),
          rowCount: count,
          getRowId: (row) => row.id,
          rowHref: (row) => `/customer-groups/${row.id}`,
          action: {
            label: t("actions.create"),
            to: "/customer-groups/create"
          },
          emptyState: {
            empty: {
              heading: t("customerGroups.list.empty.heading"),
              description: t("customerGroups.list.empty.description")
            },
            filtered: {
              heading: t("customerGroups.list.filtered.heading"),
              description: t("customerGroups.list.filtered.description")
            }
          },
          pageSize: PAGE_SIZE,
          isLoading: isPending
        }
      ) })
    }
  );
};
var columnHelper = createDataTableColumnHelper();
var useColumns = () => {
  const { t } = useTranslation();
  const { getFullDate } = useDate();
  const navigate = useNavigate();
  const prompt = usePrompt();
  const { mutateAsync: deleteCustomerGroup } = useDeleteCustomerGroupLazy();
  const handleDeleteCustomerGroup = useCallback(
    async ({ id, name }) => {
      const res = await prompt({
        title: t("customerGroups.delete.title"),
        description: t("customerGroups.delete.description", {
          name
        }),
        verificationText: name,
        verificationInstruction: t("general.typeToConfirm"),
        confirmText: t("actions.delete"),
        cancelText: t("actions.cancel")
      });
      if (!res) {
        return;
      }
      await deleteCustomerGroup(
        { id },
        {
          onSuccess: () => {
            toast.success(t("customerGroups.delete.successToast", { name }));
          },
          onError: (e) => {
            toast.error(e.message);
          }
        }
      );
    },
    [t, prompt, deleteCustomerGroup]
  );
  return useMemo(() => {
    return [
      columnHelper.accessor("name", {
        header: t("fields.name"),
        enableSorting: true,
        sortAscLabel: t("filters.sorting.alphabeticallyAsc"),
        sortDescLabel: t("filters.sorting.alphabeticallyDesc")
      }),
      columnHelper.accessor("customers", {
        header: t("customers.domain"),
        cell: ({ row }) => {
          return /* @__PURE__ */ jsx("span", { children: row.original.customers?.length ?? 0 });
        }
      }),
      columnHelper.accessor("created_at", {
        header: t("fields.createdAt"),
        cell: ({ row }) => {
          return /* @__PURE__ */ jsx("span", { children: getFullDate({
            date: row.original.created_at,
            includeTime: true
          }) });
        },
        enableSorting: true,
        sortAscLabel: t("filters.sorting.dateAsc"),
        sortDescLabel: t("filters.sorting.dateDesc")
      }),
      columnHelper.accessor("updated_at", {
        header: t("fields.updatedAt"),
        cell: ({ row }) => {
          return /* @__PURE__ */ jsx("span", { children: getFullDate({
            date: row.original.updated_at,
            includeTime: true
          }) });
        },
        enableSorting: true,
        sortAscLabel: t("filters.sorting.dateAsc"),
        sortDescLabel: t("filters.sorting.dateDesc")
      }),
      columnHelper.action({
        actions: [
          [
            {
              icon: /* @__PURE__ */ jsx(PencilSquare, {}),
              label: t("actions.edit"),
              onClick: (row) => {
                navigate(`/customer-groups/${row.row.original.id}/edit`);
              }
            }
          ],
          [
            {
              icon: /* @__PURE__ */ jsx(Trash, {}),
              label: t("actions.delete"),
              onClick: (row) => {
                handleDeleteCustomerGroup({
                  id: row.row.original.id,
                  name: row.row.original.name ?? ""
                });
              }
            }
          ]
        ]
      })
    ];
  }, [t, navigate, getFullDate, handleDeleteCustomerGroup]);
};
var useFilters = () => {
  const dateFilters = useDataTableDateFilters();
  return useMemo(() => {
    return dateFilters;
  }, [dateFilters]);
};

// src/routes/customer-groups/customer-group-list/customer-group-list.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var CustomerGroupsList = () => {
  const { getWidgets } = useDashboardExtension();
  return /* @__PURE__ */ jsx2(
    SingleColumnPage,
    {
      widgets: {
        after: getWidgets("customer_group.list.after"),
        before: getWidgets("customer_group.list.before")
      },
      children: /* @__PURE__ */ jsx2(CustomerGroupListTable, {})
    }
  );
};
export {
  CustomerGroupsList as Component
};
