import {
  INVENTORY_ITEM_IDS_KEY
} from "./chunk-JHATTPS3.mjs";
import {
  DataGridTogglableNumberCell
} from "./chunk-IA6J5NRK.mjs";
import {
  DataGrid,
  DataGridReadonlyCell,
  createDataGridHelper
} from "./chunk-F7SXZIWW.mjs";
import "./chunk-MWVM4TYO.mjs";
import "./chunk-LPEUYMRK.mjs";
import "./chunk-OC7BQLYI.mjs";
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
  useStockLocations
} from "./chunk-QDC5CTTV.mjs";
import "./chunk-6EJHOUIV.mjs";
import "./chunk-PXOOHHBT.mjs";
import "./chunk-GX3K52WA.mjs";
import "./chunk-2XA3IEXQ.mjs";
import "./chunk-23LLRBGF.mjs";
import "./chunk-SY6HAFQV.mjs";
import "./chunk-HYULYW73.mjs";
import {
  castNumber
} from "./chunk-6GU6IDUA.mjs";
import "./chunk-IUCDCPJU.mjs";
import {
  KeyboundForm
} from "./chunk-6HTZNHPT.mjs";
import {
  RouteFocusModal,
  useRouteModal
} from "./chunk-JGQGO74V.mjs";
import {
  useBatchInventoryItemsLocationLevels,
  useInventoryItems
} from "./chunk-KPNKJVW6.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-WAYDNCEG.mjs";
import "./chunk-S47CVTVK.mjs";

// src/routes/inventory/inventory-stock/inventory-stock.tsx
import { useTranslation as useTranslation3 } from "react-i18next";
import { useSearchParams } from "react-router-dom";

// src/routes/inventory/inventory-stock/components/inventory-stock-form/inventory-stock-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, toast } from "@medusajs/ui";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useTranslation as useTranslation2 } from "react-i18next";

// src/routes/inventory/inventory-stock/hooks/use-inventory-stock-columns.tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { jsx } from "react/jsx-runtime";
var helper = createDataGridHelper();
var useInventoryStockColumns = (locations = []) => {
  const { t } = useTranslation();
  return useMemo(
    () => [
      helper.column({
        id: "title",
        name: "Title",
        header: "Title",
        cell: (context) => {
          const item = context.row.original;
          return /* @__PURE__ */ jsx(DataGridReadonlyCell, { context, color: "normal", children: /* @__PURE__ */ jsx("span", { title: item.title || void 0, children: item.title || "-" }) });
        },
        disableHiding: true
      }),
      helper.column({
        id: "sku",
        name: "SKU",
        header: "SKU",
        cell: (context) => {
          const item = context.row.original;
          return /* @__PURE__ */ jsx(DataGridReadonlyCell, { context, color: "normal", children: /* @__PURE__ */ jsx("span", { title: item.sku || void 0, children: item.sku || "-" }) });
        },
        disableHiding: true
      }),
      ...locations.map(
        (location) => helper.column({
          id: `location_${location.id}`,
          name: location.name,
          header: location.name,
          field: (context) => {
            const item = context.row.original;
            return `inventory_items.${item.id}.locations.${location.id}`;
          },
          type: "togglable-number",
          cell: (context) => {
            return /* @__PURE__ */ jsx(
              DataGridTogglableNumberCell,
              {
                context,
                disabledToggleTooltip: t(
                  "inventory.stock.disabledToggleTooltip"
                )
              }
            );
          }
        })
      )
    ],
    [locations, t]
  );
};

// src/routes/inventory/inventory-stock/schema.ts
import { z } from "zod";
var LocationQuantitySchema = z.object({
  id: z.string().optional(),
  quantity: z.union([z.number(), z.string()]),
  checked: z.boolean(),
  disabledToggle: z.boolean()
});
var InventoryLocationsSchema = z.record(LocationQuantitySchema);
var InventoryItemSchema = z.object({
  locations: InventoryLocationsSchema
});
var InventoryStockSchema = z.object({
  inventory_items: z.record(InventoryItemSchema)
});

// src/routes/inventory/inventory-stock/components/inventory-stock-form/inventory-stock-form.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var InventoryStockForm = ({
  items,
  locations
}) => {
  const { t } = useTranslation2();
  const { setCloseOnEscape, handleSuccess } = useRouteModal();
  const initialValues = useRef(getDefaultValues(items, locations));
  console.log("initialValues", initialValues.current);
  const form = useForm({
    defaultValues: getDefaultValues(items, locations),
    resolver: zodResolver(InventoryStockSchema)
  });
  const columns = useInventoryStockColumns(locations);
  const { mutateAsync, isPending } = useBatchInventoryItemsLocationLevels();
  const onSubmit = form.handleSubmit(async (data) => {
    const payload = {
      create: [],
      update: [],
      delete: [],
      force: true
    };
    for (const [inventory_item_id, item] of Object.entries(
      data.inventory_items
    )) {
      for (const [location_id, level] of Object.entries(item.locations)) {
        if (level.id) {
          const wasChecked = initialValues.current?.inventory_items?.[inventory_item_id]?.locations?.[location_id]?.checked;
          if (wasChecked && !level.checked) {
            payload.delete.push(level.id);
          } else {
            const newQuantity = level.quantity !== "" ? castNumber(level.quantity) : 0;
            const originalQuantity = initialValues.current?.inventory_items?.[inventory_item_id]?.locations?.[location_id]?.quantity;
            if (newQuantity !== originalQuantity) {
              payload.update.push({
                id: level.id,
                inventory_item_id,
                location_id,
                stocked_quantity: newQuantity
              });
            }
          }
        }
        if (!level.id && level.quantity !== "") {
          payload.create.push({
            inventory_item_id,
            location_id,
            stocked_quantity: castNumber(level.quantity)
          });
        }
      }
    }
    await mutateAsync(payload, {
      onSuccess: () => {
        toast.success(t("inventory.stock.successToast"));
        handleSuccess();
      },
      onError: (error) => {
        toast.error(error.message);
      }
    });
  });
  return /* @__PURE__ */ jsx2(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsxs(KeyboundForm, { onSubmit, className: "flex size-full flex-col", children: [
    /* @__PURE__ */ jsx2(RouteFocusModal.Header, {}),
    /* @__PURE__ */ jsx2(RouteFocusModal.Body, { className: "size-full flex-1 overflow-y-auto", children: /* @__PURE__ */ jsx2(
      DataGrid,
      {
        columns,
        data: items,
        state: form,
        onEditingChange: (editing) => {
          setCloseOnEscape(!editing);
        }
      }
    ) }),
    /* @__PURE__ */ jsx2(RouteFocusModal.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
      /* @__PURE__ */ jsx2(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx2(Button, { variant: "secondary", size: "small", type: "button", children: t("actions.cancel") }) }),
      /* @__PURE__ */ jsx2(Button, { type: "submit", size: "small", isLoading: isPending, children: t("actions.save") })
    ] }) })
  ] }) });
};
function getDefaultValues(items, locations) {
  return {
    inventory_items: items.reduce((acc, item) => {
      const locationsMap = locations.reduce((locationAcc, location) => {
        const level = item.location_levels?.find(
          (level2) => level2.location_id === location.id
        );
        locationAcc[location.id] = {
          id: level?.id,
          quantity: typeof level?.stocked_quantity === "number" ? level?.stocked_quantity : "",
          checked: !!level,
          disabledToggle: (level?.incoming_quantity || 0) > 0 || (level?.reserved_quantity || 0) > 0
        };
        return locationAcc;
      }, {});
      acc[item.id] = { locations: locationsMap };
      return acc;
    }, {})
  };
}

// src/routes/inventory/inventory-stock/inventory-stock.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var InventoryStock = () => {
  const { t } = useTranslation3();
  const [searchParams] = useSearchParams();
  const inventoryItemIds = searchParams.get(INVENTORY_ITEM_IDS_KEY)?.split(",") || void 0;
  const { inventory_items, isPending, isError, error } = useInventoryItems({
    id: inventoryItemIds
  });
  const {
    stock_locations,
    isPending: isPendingStockLocations,
    isError: isErrorStockLocations,
    error: errorStockLocations
  } = useStockLocations({
    limit: 9999,
    fields: "id,name"
  });
  const ready = !isPending && !!inventory_items && !isPendingStockLocations && !!stock_locations;
  if (isError) {
    throw error;
  }
  if (isErrorStockLocations) {
    throw errorStockLocations;
  }
  return /* @__PURE__ */ jsxs2(RouteFocusModal, { children: [
    /* @__PURE__ */ jsx3(RouteFocusModal.Title, { asChild: true, children: /* @__PURE__ */ jsx3("span", { className: "sr-only", children: t("inventory.stock.title") }) }),
    /* @__PURE__ */ jsx3(RouteFocusModal.Description, { asChild: true, children: /* @__PURE__ */ jsx3("span", { className: "sr-only", children: t("inventory.stock.description") }) }),
    ready && /* @__PURE__ */ jsx3(
      InventoryStockForm,
      {
        items: inventory_items,
        locations: stock_locations
      }
    )
  ] });
};
export {
  InventoryStock as Component
};
