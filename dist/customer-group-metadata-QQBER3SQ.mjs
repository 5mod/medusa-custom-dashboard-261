import "./chunk-XRTVFYCW.mjs";
import {
  MetadataForm
} from "./chunk-HE7M25F2.mjs";
import "./chunk-LPEUYMRK.mjs";
import "./chunk-OC7BQLYI.mjs";
import {
  useCustomerGroup,
  useUpdateCustomerGroup
} from "./chunk-S3MWIWV4.mjs";
import "./chunk-IUCDCPJU.mjs";
import "./chunk-6HTZNHPT.mjs";
import "./chunk-JGQGO74V.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-WAYDNCEG.mjs";
import "./chunk-S47CVTVK.mjs";

// src/routes/customer-groups/customer-group-metadata/customer-metadata.tsx
import { useParams } from "react-router-dom";
import { jsx } from "react/jsx-runtime";
var CustomerGroupMetadata = () => {
  const { id } = useParams();
  const { customer_group, isPending, isError, error } = useCustomerGroup(id);
  const { mutateAsync, isPending: isMutating } = useUpdateCustomerGroup(id);
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx(
    MetadataForm,
    {
      metadata: customer_group?.metadata,
      hook: mutateAsync,
      isPending,
      isMutating
    }
  );
};
export {
  CustomerGroupMetadata as Component
};
