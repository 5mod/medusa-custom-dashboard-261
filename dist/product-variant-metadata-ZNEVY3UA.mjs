import {
  MetadataForm
} from "./chunk-HE7M25F2.mjs";
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
import "./chunk-QDC5CTTV.mjs";
import "./chunk-6EJHOUIV.mjs";
import "./chunk-PXOOHHBT.mjs";
import "./chunk-GX3K52WA.mjs";
import "./chunk-2XA3IEXQ.mjs";
import "./chunk-23LLRBGF.mjs";
import "./chunk-SY6HAFQV.mjs";
import "./chunk-HYULYW73.mjs";
import "./chunk-IUCDCPJU.mjs";
import "./chunk-6HTZNHPT.mjs";
import "./chunk-JGQGO74V.mjs";
import {
  useProductVariant,
  useUpdateProductVariant
} from "./chunk-KPNKJVW6.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-WAYDNCEG.mjs";
import "./chunk-S47CVTVK.mjs";

// src/routes/product-variants/product-variant-metadata/product-variant-metadata.tsx
import { useParams } from "react-router-dom";
import { jsx } from "react/jsx-runtime";
var ProductVariantMetadata = () => {
  const { id, variant_id } = useParams();
  const { variant, isPending, isError, error } = useProductVariant(
    id,
    variant_id
  );
  const { mutateAsync, isPending: isMutating } = useUpdateProductVariant(
    id,
    variant_id
  );
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx(
    MetadataForm,
    {
      metadata: variant?.metadata,
      hook: mutateAsync,
      isPending,
      isMutating
    }
  );
};
export {
  ProductVariantMetadata as Component
};
