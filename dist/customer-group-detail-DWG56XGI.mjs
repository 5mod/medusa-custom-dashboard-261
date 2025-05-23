import {
  useCustomerTableColumns
} from "./chunk-IDYOGWSG.mjs";
import "./chunk-WYX5PIA3.mjs";
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
import {
  useCustomerTableQuery
} from "./chunk-WRSGHGAT.mjs";
import {
  useCustomerTableFilters
} from "./chunk-HVUHNRLX.mjs";
import "./chunk-TMAS4ILY.mjs";
import "./chunk-M3VFKDXJ.mjs";
import {
  SingleColumnPage
} from "./chunk-2RQLKDBF.mjs";
import {
  SingleColumnPageSkeleton
} from "./chunk-LPEUYMRK.mjs";
import {
  ActionMenu
} from "./chunk-3NJTXRIY.mjs";
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
import {
  useCustomerGroup,
  useCustomers,
  useDeleteCustomerGroup,
  useRemoveCustomersFromGroup
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
import {
  productsQueryKeys
} from "./chunk-KPNKJVW6.mjs";
import {
  queryClient
} from "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import {
  sdk
} from "./chunk-WAYDNCEG.mjs";
import "./chunk-S47CVTVK.mjs";

// src/routes/customer-groups/customer-group-detail/constants.ts
var CUSTOMER_GROUP_DETAIL_FIELDS = "+customers.id";

// src/routes/customer-groups/customer-group-detail/breadcrumb.tsx
import { jsx } from "react/jsx-runtime";
var CustomerGroupDetailBreadcrumb = (props) => {
  const { id } = props.params || {};
  const { customer_group } = useCustomerGroup(
    id,
    {
      fields: CUSTOMER_GROUP_DETAIL_FIELDS
    },
    {
      initialData: props.data,
      enabled: Boolean(id)
    }
  );
  if (!customer_group) {
    return null;
  }
  return /* @__PURE__ */ jsx("span", { children: customer_group.name });
};

// src/routes/customer-groups/customer-group-detail/customer-group-detail.tsx
import { useLoaderData, useParams } from "react-router-dom";

// src/routes/customer-groups/customer-group-detail/components/customer-group-customer-section/customer-group-customer-section.tsx
import { PencilSquare, Trash } from "@medusajs/icons";
import { Button, Checkbox, Container, Heading, usePrompt } from "@medusajs/ui";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var PAGE_SIZE = 10;
var CustomerGroupCustomerSection = ({
  group
}) => {
  const [rowSelection, setRowSelection] = useState({});
  const { t } = useTranslation();
  const prompt = usePrompt();
  const { searchParams, raw } = useCustomerTableQuery({ pageSize: PAGE_SIZE });
  const { customers, count, isLoading, isError, error } = useCustomers({
    ...searchParams,
    groups: group.id
  });
  const columns = useColumns();
  const filters = useCustomerTableFilters(["groups"]);
  const { table } = useDataTable({
    data: customers ?? [],
    columns,
    count,
    getRowId: (row) => row.id,
    enablePagination: true,
    enableRowSelection: true,
    pageSize: PAGE_SIZE,
    rowSelection: {
      state: rowSelection,
      updater: setRowSelection
    },
    meta: {
      customerGroupId: group.id
    }
  });
  if (isError) {
    throw error;
  }
  const { mutateAsync } = useRemoveCustomersFromGroup(group.id);
  const handleRemove = async () => {
    const keys = Object.keys(rowSelection);
    const res = await prompt({
      title: t("customerGroups.customers.remove.title", {
        count: keys.length
      }),
      description: t("customerGroups.customers.remove.description", {
        count: keys.length
      }),
      confirmText: t("actions.continue"),
      cancelText: t("actions.cancel")
    });
    if (!res) {
      return;
    }
    await mutateAsync(keys, {
      onSuccess: () => {
        setRowSelection({});
      }
    });
  };
  return /* @__PURE__ */ jsxs(Container, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsx2(Heading, { level: "h2", children: t("customers.domain") }),
      /* @__PURE__ */ jsx2(Link, { to: `/customer-groups/${group.id}/add-customers`, children: /* @__PURE__ */ jsx2(Button, { variant: "secondary", size: "small", children: t("general.add") }) })
    ] }),
    /* @__PURE__ */ jsx2(
      _DataTable,
      {
        table,
        columns,
        pageSize: PAGE_SIZE,
        isLoading,
        count,
        navigateTo: (row) => `/customers/${row.id}`,
        filters,
        search: true,
        pagination: true,
        orderBy: [
          { key: "email", label: t("fields.email") },
          { key: "first_name", label: t("fields.firstName") },
          { key: "last_name", label: t("fields.lastName") },
          { key: "has_account", label: t("customers.hasAccount") },
          { key: "created_at", label: t("fields.createdAt") },
          { key: "updated_at", label: t("fields.updatedAt") }
        ],
        queryObject: raw,
        commands: [
          {
            action: handleRemove,
            label: t("actions.remove"),
            shortcut: "r"
          }
        ],
        noRecords: {
          message: t("customerGroups.customers.list.noRecordsMessage")
        }
      }
    )
  ] });
};
var CustomerActions = ({
  customer,
  customerGroupId
}) => {
  const { t } = useTranslation();
  const { mutateAsync } = useRemoveCustomersFromGroup(customerGroupId);
  const prompt = usePrompt();
  const handleRemove = async () => {
    const res = await prompt({
      title: t("customerGroups.customers.remove.title", {
        count: 1
      }),
      description: t("customerGroups.customers.remove.description", {
        count: 1
      }),
      confirmText: t("actions.continue"),
      cancelText: t("actions.cancel")
    });
    if (!res) {
      return;
    }
    await mutateAsync([customer.id]);
  };
  return /* @__PURE__ */ jsx2(
    ActionMenu,
    {
      groups: [
        {
          actions: [
            {
              icon: /* @__PURE__ */ jsx2(PencilSquare, {}),
              label: t("actions.edit"),
              to: `/customers/${customer.id}/edit`
            }
          ]
        },
        {
          actions: [
            {
              icon: /* @__PURE__ */ jsx2(Trash, {}),
              label: t("actions.remove"),
              onClick: handleRemove
            }
          ]
        }
      ]
    }
  );
};
var columnHelper = createColumnHelper();
var useColumns = () => {
  const columns = useCustomerTableColumns();
  return useMemo(
    () => [
      columnHelper.display({
        id: "select",
        header: ({ table }) => {
          return /* @__PURE__ */ jsx2(
            Checkbox,
            {
              checked: table.getIsSomePageRowsSelected() ? "indeterminate" : table.getIsAllPageRowsSelected(),
              onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value)
            }
          );
        },
        cell: ({ row }) => {
          return /* @__PURE__ */ jsx2(
            Checkbox,
            {
              checked: row.getIsSelected(),
              onCheckedChange: (value) => row.toggleSelected(!!value),
              onClick: (e) => {
                e.stopPropagation();
              }
            }
          );
        }
      }),
      ...columns,
      columnHelper.display({
        id: "actions",
        cell: ({ row, table }) => {
          const { customerGroupId } = table.options.meta;
          return /* @__PURE__ */ jsx2(
            CustomerActions,
            {
              customer: row.original,
              customerGroupId
            }
          );
        }
      })
    ],
    [columns]
  );
};

// src/routes/customer-groups/customer-group-detail/components/customer-group-general-section/customer-group-general-section.tsx
import { PencilSquare as PencilSquare2, Trash as Trash2 } from "@medusajs/icons";
import { Container as Container2, Heading as Heading2, Text, toast, usePrompt as usePrompt2 } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var CustomerGroupGeneralSection = ({
  group
}) => {
  const { t } = useTranslation2();
  const prompt = usePrompt2();
  const navigate = useNavigate();
  const { mutateAsync } = useDeleteCustomerGroup(group.id);
  const handleDelete = async () => {
    const res = await prompt({
      title: t("customerGroups.delete.title"),
      description: t("customerGroups.delete.description", {
        name: group.name
      }),
      confirmText: t("actions.delete"),
      cancelText: t("actions.cancel")
    });
    if (!res) {
      return;
    }
    await mutateAsync(void 0, {
      onSuccess: () => {
        toast.success(
          t("customerGroups.delete.successToast", {
            name: group.name
          })
        );
        navigate("/customer-groups", { replace: true });
      },
      onError: (error) => {
        toast.error(error.message);
      }
    });
  };
  return /* @__PURE__ */ jsxs2(Container2, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsx3(Heading2, { children: group.name }),
      /* @__PURE__ */ jsx3(
        ActionMenu,
        {
          groups: [
            {
              actions: [
                {
                  icon: /* @__PURE__ */ jsx3(PencilSquare2, {}),
                  label: t("actions.edit"),
                  to: `/customer-groups/${group.id}/edit`
                }
              ]
            },
            {
              actions: [
                {
                  icon: /* @__PURE__ */ jsx3(Trash2, {}),
                  label: t("actions.delete"),
                  onClick: handleDelete
                }
              ]
            }
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs2("div", { className: "text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4", children: [
      /* @__PURE__ */ jsx3(Text, { size: "small", leading: "compact", weight: "plus", children: t("customers.domain") }),
      /* @__PURE__ */ jsx3(Text, { size: "small", leading: "compact", children: group.customers?.length || "-" })
    ] })
  ] });
};

// src/routes/customer-groups/customer-group-detail/customer-group-detail.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var CustomerGroupDetail = () => {
  const initialData = useLoaderData();
  const { id } = useParams();
  const { customer_group, isLoading, isError, error } = useCustomerGroup(
    id,
    {
      fields: CUSTOMER_GROUP_DETAIL_FIELDS
    },
    { initialData }
  );
  const { getWidgets } = useDashboardExtension();
  if (isLoading || !customer_group) {
    return /* @__PURE__ */ jsx4(SingleColumnPageSkeleton, { sections: 2, showJSON: true, showMetadata: true });
  }
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs3(
    SingleColumnPage,
    {
      widgets: {
        before: getWidgets("customer_group.details.before"),
        after: getWidgets("customer_group.details.after")
      },
      showJSON: true,
      showMetadata: true,
      data: customer_group,
      children: [
        /* @__PURE__ */ jsx4(CustomerGroupGeneralSection, { group: customer_group }),
        /* @__PURE__ */ jsx4(CustomerGroupCustomerSection, { group: customer_group })
      ]
    }
  );
};

// src/routes/customer-groups/customer-group-detail/loader.ts
var customerGroupDetailQuery = (id) => ({
  queryKey: productsQueryKeys.detail(id),
  queryFn: async () => sdk.admin.customerGroup.retrieve(id, {
    fields: CUSTOMER_GROUP_DETAIL_FIELDS
  })
});
var customerGroupLoader = async ({ params }) => {
  const id = params.id;
  const query = customerGroupDetailQuery(id);
  return queryClient.ensureQueryData(query);
};
export {
  CustomerGroupDetailBreadcrumb as Breadcrumb,
  CustomerGroupDetail as Component,
  customerGroupLoader as loader
};
