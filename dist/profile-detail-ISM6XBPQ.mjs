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
import {
  languages
} from "./chunk-FTTSUETK.mjs";
import {
  useMe
} from "./chunk-ZMMQPAR2.mjs";
import {
  useDashboardExtension
} from "./chunk-ICKIQOG2.mjs";
import "./chunk-ONB3JEHR.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-WAYDNCEG.mjs";
import "./chunk-S47CVTVK.mjs";

// src/routes/profile/profile-detail/components/profile-general-section/profile-general-section.tsx
import { PencilSquare } from "@medusajs/icons";
import { Container, Heading, Text } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
var ProfileGeneralSection = ({ user }) => {
  const { i18n, t } = useTranslation();
  const name = [user.first_name, user.last_name].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs(Container, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Heading, { children: t("profile.domain") }),
        /* @__PURE__ */ jsx(Text, { className: "text-ui-fg-subtle", size: "small", children: t("profile.manageYourProfileDetails") })
      ] }),
      /* @__PURE__ */ jsx(
        ActionMenu,
        {
          groups: [
            {
              actions: [
                {
                  label: t("actions.edit"),
                  to: "edit",
                  icon: /* @__PURE__ */ jsx(PencilSquare, {})
                }
              ]
            }
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4", children: [
      /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", weight: "plus", children: t("fields.name") }),
      /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", children: name || "-" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 items-center px-6 py-4", children: [
      /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", weight: "plus", children: t("fields.email") }),
      /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", children: user.email })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 items-center px-6 py-4", children: [
      /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", weight: "plus", children: t("profile.fields.languageLabel") }),
      /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", children: languages.find((lang) => lang.code === i18n.language)?.display_name || "-" })
    ] })
  ] });
};

// src/routes/profile/profile-detail/profile-detail.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var ProfileDetail = () => {
  const { user, isPending: isLoading, isError, error } = useMe();
  const { getWidgets } = useDashboardExtension();
  if (isLoading || !user) {
    return /* @__PURE__ */ jsx2(SingleColumnPageSkeleton, { sections: 1 });
  }
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx2(
    SingleColumnPage,
    {
      widgets: {
        after: getWidgets("profile.details.after"),
        before: getWidgets("profile.details.before")
      },
      children: /* @__PURE__ */ jsx2(ProfileGeneralSection, { user })
    }
  );
};
export {
  ProfileDetail as Component
};
