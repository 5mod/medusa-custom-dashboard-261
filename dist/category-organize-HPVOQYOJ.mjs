import {
  CategoryTree
} from "./chunk-JFEIBBH7.mjs";
import "./chunk-Z3UZDUSB.mjs";
import {
  categoriesQueryKeys,
  useProductCategories
} from "./chunk-2XA3IEXQ.mjs";
import {
  RouteFocusModal
} from "./chunk-JGQGO74V.mjs";
import "./chunk-KPNKJVW6.mjs";
import {
  queryClient
} from "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import {
  sdk
} from "./chunk-WAYDNCEG.mjs";
import "./chunk-S47CVTVK.mjs";

// src/routes/categories/category-organize/components/organize-category-form/organize-category-form.tsx
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@medusajs/icons";
import { toast } from "@medusajs/ui";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var QUERY = {
  fields: "id,name,parent_category_id,rank,*category_children",
  parent_category_id: "null",
  include_descendants_tree: true,
  limit: 9999
};
var OrganizeCategoryForm = () => {
  const {
    product_categories,
    isPending,
    isError,
    error: fetchError
  } = useProductCategories(QUERY);
  const [snapshot, setSnapshot] = useState([]);
  const { mutateAsync, isPending: isMutating } = useMutation({
    mutationFn: async ({
      value
    }) => {
      await sdk.admin.productCategory.update(value.id, {
        rank: value.rank ?? 0,
        parent_category_id: value.parent_category_id
      });
    },
    onMutate: async (update) => {
      await queryClient.cancelQueries({
        queryKey: categoriesQueryKeys.list(QUERY)
      });
      const previousValue = queryClient.getQueryData(categoriesQueryKeys.list(QUERY));
      const nextValue = {
        ...previousValue,
        product_categories: update.arr
      };
      queryClient.setQueryData(categoriesQueryKeys.list(QUERY), nextValue);
      return {
        previousValue
      };
    },
    onError: (error, _newValue, context) => {
      queryClient.setQueryData(
        categoriesQueryKeys.list(QUERY),
        context?.previousValue
      );
      toast.error(error.message);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: categoriesQueryKeys.all
      });
    }
  });
  const handleRankChange = async (value, arr) => {
    const val = {
      id: value.id,
      parent_category_id: value.parentId,
      rank: value.index
    };
    setSnapshot(arr);
    await mutateAsync({ value: val, arr });
  };
  const loading = isPending || isMutating;
  if (isError) {
    throw fetchError;
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex h-full flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsx(RouteFocusModal.Header, { children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end", children: loading && /* @__PURE__ */ jsx(Spinner, { className: "animate-spin" }) }) }),
    /* @__PURE__ */ jsx(RouteFocusModal.Body, { className: "bg-ui-bg-subtle flex flex-1 flex-col overflow-y-auto", children: /* @__PURE__ */ jsx(
      CategoryTree,
      {
        renderValue: (item) => item.name,
        value: loading ? snapshot : product_categories || [],
        onChange: handleRankChange
      }
    ) })
  ] });
};

// src/routes/categories/category-organize/category-organize.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var CategoryOrganize = () => {
  return /* @__PURE__ */ jsx2(RouteFocusModal, { children: /* @__PURE__ */ jsx2(OrganizeCategoryForm, {}) });
};
export {
  CategoryOrganize as Component
};
