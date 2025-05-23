import "./chunk-XRTVFYCW.mjs";
import {
  MetadataForm
} from "./chunk-HE7M25F2.mjs";
import "./chunk-LPEUYMRK.mjs";
import "./chunk-OC7BQLYI.mjs";
import {
  useCustomer,
  useUpdateCustomer
} from "./chunk-S3MWIWV4.mjs";
import "./chunk-IUCDCPJU.mjs";
import "./chunk-6HTZNHPT.mjs";
import "./chunk-JGQGO74V.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-WAYDNCEG.mjs";
import "./chunk-S47CVTVK.mjs";

// src/routes/customers/customer-metadata/customer-metadata.tsx
import { useParams } from "react-router-dom";
import { jsx } from "react/jsx-runtime";
var CustomerMetadata = () => {
  const { id } = useParams();
  const { customer, isPending, isError, error } = useCustomer(id);
  const { mutateAsync, isPending: isMutating } = useUpdateCustomer(id);
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx(
    MetadataForm,
    {
      metadata: customer?.metadata,
      hook: mutateAsync,
      isPending,
      isMutating
    }
  );
};
export {
  CustomerMetadata as Component
};
