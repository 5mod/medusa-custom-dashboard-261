import {
  formatProvider
} from "./chunk-IR5DHEKS.mjs";
import {
  TextCell,
  TextHeader
} from "./chunk-MSDRGCRR.mjs";
import "./chunk-LQTHYS2Z.mjs";
import "./chunk-P3UUX2T6.mjs";
import {
  _DataTable,
  useDataTable
} from "./chunk-X3LH6P65.mjs";
import "./chunk-YEDAFXMB.mjs";
import "./chunk-AOFGTNG6.mjs";
import "./chunk-WX2SMNCD.mjs";
import "./chunk-GW6TVOAA.mjs";
import "./chunk-CBSCX7RE.mjs";
import "./chunk-LT4MVCA7.mjs";
import "./chunk-HVUHNRLX.mjs";
import {
  useDateTableFilters
} from "./chunk-W7625H47.mjs";
import "./chunk-DLZWPHHO.mjs";
import "./chunk-LSEYENCI.mjs";
import "./chunk-B74XTET2.mjs";
import "./chunk-U6CSGYH6.mjs";
import "./chunk-TMAS4ILY.mjs";
import "./chunk-M3VFKDXJ.mjs";
import "./chunk-LPEUYMRK.mjs";
import "./chunk-OC7BQLYI.mjs";
import {
  useQueryParams
} from "./chunk-C76H5USB.mjs";
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
import {
  useFulfillmentProviders,
  useStockLocation,
  useUpdateStockLocationFulfillmentProviders
} from "./chunk-QDC5CTTV.mjs";
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
  RouteFocusModal,
  useRouteModal
} from "./chunk-JGQGO74V.mjs";
import "./chunk-KPNKJVW6.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-WAYDNCEG.mjs";
import "./chunk-S47CVTVK.mjs";

// src/routes/locations/location-fulfillment-providers/location-fulfillment-providers.tsx
import { useParams } from "react-router-dom";

// src/routes/locations/location-fulfillment-providers/components/edit-fulfillment-providers-form/edit-fulfillment-providers-form.tsx
import { Button, Checkbox, toast } from "@medusajs/ui";
import { keepPreviousData } from "@tanstack/react-query";
import {
  createColumnHelper as createColumnHelper2
} from "@tanstack/react-table";
import { useMemo as useMemo2, useState } from "react";
import { useTranslation as useTranslation2 } from "react-i18next";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// src/hooks/table/columns/use-fulfillment-provider-table-columns.tsx
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { jsx } from "react/jsx-runtime";
var columnHelper = createColumnHelper();
var useFulfillmentProviderTableColumns = () => {
  const { t } = useTranslation();
  return useMemo(
    () => [
      columnHelper.accessor("id", {
        header: () => /* @__PURE__ */ jsx(TextHeader, { text: "Provider" }),
        cell: ({ getValue }) => /* @__PURE__ */ jsx(TextCell, { text: formatProvider(getValue()) })
      })
    ],
    [t]
  );
};

// src/hooks/table/query/use-fulfillment-providers-table-query.tsx
var useFulfillmentProvidersTableQuery = ({
  prefix,
  pageSize = 20
}) => {
  const queryObject = useQueryParams(
    ["offset", "q", "stock_location_id"],
    prefix
  );
  const { offset, q, stock_location_id } = queryObject;
  const searchParams = {
    limit: pageSize,
    offset: offset ? Number(offset) : 0,
    stock_location_id,
    q
  };
  return {
    searchParams,
    raw: queryObject
  };
};

// src/routes/locations/location-fulfillment-providers/components/edit-fulfillment-providers-form/edit-fulfillment-providers-form.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var EditFulfillmentProvidersFormSchema = zod.object({
  fulfillment_providers: zod.array(zod.string()).optional()
});
var PAGE_SIZE = 50;
var LocationEditFulfillmentProvidersForm = ({
  location
}) => {
  const { t } = useTranslation2();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      fulfillment_providers: location.fulfillment_providers?.map((fp) => fp.id) ?? []
    },
    resolver: zodResolver(EditFulfillmentProvidersFormSchema)
  });
  const { setValue } = form;
  const initialState = location.fulfillment_providers?.reduce((acc, curr) => {
    acc[curr.id] = true;
    return acc;
  }, {}) ?? {};
  const [rowSelection, setRowSelection] = useState(initialState);
  const handleRowSelectionChange = (updater) => {
    const ids = typeof updater === "function" ? updater(rowSelection) : updater;
    setValue("fulfillment_providers", Object.keys(ids), {
      shouldDirty: true,
      shouldTouch: true
    });
    setRowSelection(ids);
  };
  const { searchParams, raw } = useFulfillmentProvidersTableQuery({
    pageSize: PAGE_SIZE
  });
  const { fulfillment_providers, count, isLoading, isError, error } = useFulfillmentProviders(
    { ...searchParams, is_enabled: true },
    { placeholderData: keepPreviousData }
  );
  const filters = useDateTableFilters();
  const columns = useColumns();
  const { table } = useDataTable({
    data: fulfillment_providers ?? [],
    columns,
    count,
    enablePagination: true,
    enableRowSelection: true,
    rowSelection: {
      state: rowSelection,
      updater: handleRowSelectionChange
    },
    getRowId: (row) => row.id,
    pageSize: PAGE_SIZE
  });
  const { mutateAsync, isPending: isMutating } = useUpdateStockLocationFulfillmentProviders(location.id);
  const handleSubmit = form.handleSubmit(async (data) => {
    const originalIds = location.fulfillment_providers?.map((sc) => sc.id);
    const arr = data.fulfillment_providers ?? [];
    await mutateAsync(
      {
        add: arr.filter((i) => !originalIds?.includes(i)),
        remove: originalIds?.filter((i) => !arr.includes(i))
      },
      {
        onSuccess: ({ stock_location }) => {
          toast.success(t("stockLocations.fulfillmentProviders.successToast"));
          handleSuccess(`/settings/locations/${stock_location.id}`);
        },
        onError: (e) => {
          toast.error(e.message);
        }
      }
    );
  });
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx2(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsxs(KeyboundForm, { onSubmit: handleSubmit, className: "flex size-full flex-col", children: [
    /* @__PURE__ */ jsx2(RouteFocusModal.Header, {}),
    /* @__PURE__ */ jsx2(RouteFocusModal.Body, { className: "flex flex-1 flex-col overflow-auto", children: /* @__PURE__ */ jsx2(
      _DataTable,
      {
        table,
        columns,
        pageSize: PAGE_SIZE,
        isLoading,
        count,
        filters,
        search: "autofocus",
        pagination: true,
        orderBy: [{ key: "id", label: t("fields.id") }],
        queryObject: raw,
        layout: "fill"
      }
    ) }),
    /* @__PURE__ */ jsx2(RouteFocusModal.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
      /* @__PURE__ */ jsx2(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx2(Button, { size: "small", variant: "secondary", type: "button", children: t("actions.cancel") }) }),
      /* @__PURE__ */ jsx2(Button, { size: "small", isLoading: isMutating, type: "submit", children: t("actions.save") })
    ] }) })
  ] }) });
};
var columnHelper2 = createColumnHelper2();
var useColumns = () => {
  const columns = useFulfillmentProviderTableColumns();
  return useMemo2(
    () => [
      columnHelper2.display({
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
      ...columns
    ],
    [columns]
  );
};

// src/routes/locations/location-fulfillment-providers/location-fulfillment-providers.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var LocationFulfillmentProviders = () => {
  const { location_id } = useParams();
  const { stock_location, isPending, isError, error } = useStockLocation(
    location_id,
    { fields: "id,*fulfillment_providers" }
  );
  const ready = !isPending && !!stock_location;
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx3(RouteFocusModal, { children: ready && /* @__PURE__ */ jsx3(LocationEditFulfillmentProvidersForm, { location: stock_location }) });
};
export {
  LocationFulfillmentProviders as Component
};
