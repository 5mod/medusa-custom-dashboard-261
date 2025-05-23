import {
  isFetchError
} from "./chunk-ONB3JEHR.mjs";
import {
  Form
} from "./chunk-WAYDNCEG.mjs";
import {
  __publicField
} from "./chunk-S47CVTVK.mjs";

// src/extensions/dashboard-extension-manager/dashboard-extension-manager.tsx
import {
  NESTED_ROUTE_POSITIONS
} from "@medusajs/admin-shared";
import { jsx } from "react/jsx-runtime";
var DashboardExtensionManager = class {
  constructor({
    widgetModule,
    menuItemModule,
    displayModule,
    formModule
  }) {
    __publicField(this, "widgets");
    __publicField(this, "menus");
    __publicField(this, "fields");
    __publicField(this, "configs");
    __publicField(this, "displays");
    this.widgets = this.populateWidgets(widgetModule.widgets);
    this.menus = this.populateMenus(menuItemModule.menuItems);
    const { fields, configs } = this.populateForm(formModule);
    this.fields = fields;
    this.configs = configs;
    this.displays = this.populateDisplays(displayModule);
  }
  populateWidgets(widgets) {
    const registry = /* @__PURE__ */ new Map();
    if (!widgets) {
      return registry;
    }
    widgets.forEach((widget) => {
      widget.zone.forEach((zone) => {
        if (!registry.has(zone)) {
          registry.set(zone, []);
        }
        registry.get(zone).push(widget.Component);
      });
    });
    return registry;
  }
  populateMenus(menuItems) {
    const registry = /* @__PURE__ */ new Map();
    const tempRegistry = {};
    if (!menuItems) {
      return registry;
    }
    menuItems.sort((a, b) => a.path.length - b.path.length);
    menuItems.forEach((item) => {
      if (item.path.includes("/:")) {
        if (process.env.NODE_ENV === "development") {
          console.warn(
            `[@medusajs/dashboard] Menu item for path "${item.path}" can't be added to the sidebar as it contains a parameter.`
          );
        }
        return;
      }
      const isSettingsPath = item.path.startsWith("/settings");
      const key = isSettingsPath ? "settingsExtensions" : "coreExtensions";
      const pathParts = item.path.split("/").filter(Boolean);
      const parentPath = "/" + pathParts.slice(0, -1).join("/");
      if (isSettingsPath && pathParts.length > 2) {
        if (process.env.NODE_ENV === "development") {
          console.warn(
            `[@medusajs/dashboard] Nested settings menu item "${item.path}" can't be added to the sidebar. Only top-level settings items are allowed.`
          );
        }
        return;
      }
      const parentItem = menuItems.find(
        (menuItem) => menuItem.path === parentPath
      );
      if (parentItem?.nested && NESTED_ROUTE_POSITIONS.includes(parentItem?.nested) && pathParts.length > 1) {
        if (process.env.NODE_ENV === "development") {
          console.warn(
            `[@medusajs/dashboard] Nested menu item "${item.path}" can't be added to the sidebar as it is nested under "${parentItem.nested}".`
          );
        }
        return;
      }
      const navItem = {
        label: item.label,
        to: item.path,
        icon: item.icon ? /* @__PURE__ */ jsx(item.icon, {}) : void 0,
        items: [],
        nested: item.nested
      };
      if (parentPath !== "/" && tempRegistry[parentPath]) {
        if (!tempRegistry[parentPath].items) {
          tempRegistry[parentPath].items = [];
        }
        tempRegistry[parentPath].items.push(navItem);
      } else {
        if (!registry.has(key)) {
          registry.set(key, []);
        }
        registry.get(key).push(navItem);
      }
      tempRegistry[item.path] = navItem;
    });
    return registry;
  }
  populateForm(formModule) {
    const fields = /* @__PURE__ */ new Map();
    const configs = /* @__PURE__ */ new Map();
    Object.entries(formModule.customFields).forEach(
      ([model, customization]) => {
        fields.set(
          model,
          this.processFields(customization.forms)
        );
        configs.set(
          model,
          this.processConfigs(customization.configs)
        );
      }
    );
    return { fields, configs };
  }
  processFields(forms) {
    const formZoneMap = /* @__PURE__ */ new Map();
    forms.forEach(
      (fieldDef) => this.processFieldDefinition(formZoneMap, fieldDef)
    );
    return formZoneMap;
  }
  processConfigs(configs) {
    const modelConfigMap = /* @__PURE__ */ new Map();
    configs.forEach((configDef) => {
      const { zone, fields } = configDef;
      const zoneConfigs = [];
      Object.entries(fields).forEach(([name, config]) => {
        zoneConfigs.push({
          name,
          defaultValue: config.defaultValue,
          validation: config.validation
        });
      });
      modelConfigMap.set(zone, zoneConfigs);
    });
    return modelConfigMap;
  }
  processFieldDefinition(formZoneMap, fieldDef) {
    const { zone, tab, fields: fieldsDefinition } = fieldDef;
    const zoneStructure = this.getOrCreateZoneStructure(formZoneMap, zone);
    Object.entries(fieldsDefinition).forEach(([fieldKey, fieldDefinition]) => {
      const formField = this.createFormField(fieldKey, fieldDefinition);
      this.addFormFieldToZoneStructure(zoneStructure, formField, tab);
    });
  }
  getOrCreateZoneStructure(formZoneMap, zone) {
    let zoneStructure = formZoneMap.get(zone);
    if (!zoneStructure) {
      zoneStructure = { components: [], tabs: /* @__PURE__ */ new Map() };
      formZoneMap.set(zone, zoneStructure);
    }
    return zoneStructure;
  }
  createFormField(fieldKey, fieldDefinition) {
    return {
      name: fieldKey,
      validation: fieldDefinition.validation,
      label: fieldDefinition.label,
      description: fieldDefinition.description,
      Component: fieldDefinition.Component
    };
  }
  addFormFieldToZoneStructure(zoneStructure, formField, tab) {
    if (tab) {
      let tabFields = zoneStructure.tabs.get(tab);
      if (!tabFields) {
        tabFields = [];
        zoneStructure.tabs.set(tab, tabFields);
      }
      tabFields.push(formField);
    } else {
      zoneStructure.components.push(formField);
    }
  }
  populateDisplays(displayModule) {
    const displays = /* @__PURE__ */ new Map();
    Object.entries(displayModule.displays).forEach(([model, customization]) => {
      displays.set(
        model,
        this.processDisplays(customization)
      );
    });
    return displays;
  }
  processDisplays(displays) {
    const modelDisplayMap = /* @__PURE__ */ new Map();
    displays.forEach((display) => {
      const { zone, Component } = display;
      if (!modelDisplayMap.has(zone)) {
        modelDisplayMap.set(zone, []);
      }
      modelDisplayMap.get(zone).push(Component);
    });
    return modelDisplayMap;
  }
  getMenu(path) {
    return this.menus.get(path) || [];
  }
  getWidgets(zone) {
    return this.widgets.get(zone) || [];
  }
  getFormFields(model, zone, tab) {
    const zoneMap = this.fields.get(model)?.get(zone);
    if (!zoneMap) {
      return [];
    }
    if (tab) {
      return zoneMap.tabs.get(tab) || [];
    }
    return zoneMap.components;
  }
  getFormConfigs(model, zone) {
    return this.configs.get(model)?.get(zone) || [];
  }
  getDisplays(model, zone) {
    return this.displays.get(model)?.get(zone) || [];
  }
  get api() {
    return {
      getMenu: this.getMenu.bind(this),
      getWidgets: this.getWidgets.bind(this),
      getFormFields: this.getFormFields.bind(this),
      getFormConfigs: this.getFormConfigs.bind(this),
      getDisplays: this.getDisplays.bind(this)
    };
  }
};

// src/extensions/dashboard-extension-provider/dashboard-extension-context.tsx
import { createContext } from "react";
var DashboardExtensionContext = createContext(null);

// src/extensions/dashboard-extension-provider/dashboard-extension-provider.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var DashboardExtensionProvider = ({
  api,
  children
}) => {
  return /* @__PURE__ */ jsx2(DashboardExtensionContext.Provider, { value: api, children });
};

// src/extensions/dashboard-extension-provider/use-dashboard-extension.tsx
import { useContext } from "react";
var useDashboardExtension = () => {
  const context = useContext(DashboardExtensionContext);
  if (!context) {
    throw new Error(
      "useDashboardExtension must be used within a DashboardExtensionProvider"
    );
  }
  return context;
};

// src/extensions/forms/form-extension-zone/form-extension-zone.tsx
import { InlineTip, Input, Switch } from "@medusajs/ui";
import { useTranslation } from "react-i18next";

// src/extensions/forms/form-extension-zone/utils.ts
import {
  ZodBoolean,
  ZodEffects,
  ZodNull,
  ZodNullable,
  ZodNumber,
  ZodOptional,
  ZodString,
  ZodUndefined
} from "zod";
function getFieldType(type) {
  if (type instanceof ZodString) {
    return "text";
  }
  if (type instanceof ZodNumber) {
    return "number";
  }
  if (type instanceof ZodBoolean) {
    return "boolean";
  }
  if (type instanceof ZodNullable) {
    const innerType = type.unwrap();
    return getFieldType(innerType);
  }
  if (type instanceof ZodOptional) {
    const innerType = type.unwrap();
    return getFieldType(innerType);
  }
  if (type instanceof ZodEffects) {
    const innerType = type.innerType();
    return getFieldType(innerType);
  }
  return "unsupported";
}

// src/extensions/forms/form-extension-zone/form-extension-zone.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
var FormExtensionZone = ({ fields, form }) => {
  return /* @__PURE__ */ jsx3("div", { children: fields.map((field, index) => /* @__PURE__ */ jsx3(FormExtensionField, { field, form }, index)) });
};
function getFieldLabel(field) {
  if (field.label) {
    return field.label;
  }
  return field.name.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
var FormExtensionField = ({ field, form }) => {
  const label = getFieldLabel(field);
  const description = field.description;
  const placeholder = field.placeholder;
  const Component = field.Component;
  const type = getFieldType(field.validation);
  const { control } = form;
  return /* @__PURE__ */ jsx3(
    Form.Field,
    {
      control,
      name: `additional_data.${field.name}`,
      render: ({ field: field2 }) => {
        return /* @__PURE__ */ jsxs(Form.Item, { children: [
          /* @__PURE__ */ jsx3(Form.Label, { children: label }),
          description && /* @__PURE__ */ jsx3(Form.Hint, { children: description }),
          /* @__PURE__ */ jsx3(Form.Control, { children: /* @__PURE__ */ jsx3(
            FormExtensionFieldComponent,
            {
              field: field2,
              type,
              component: Component,
              placeholder
            }
          ) }),
          /* @__PURE__ */ jsx3(Form.ErrorMessage, {})
        ] });
      }
    }
  );
};
var FormExtensionFieldComponent = ({
  field,
  type,
  component,
  placeholder
}) => {
  const { t } = useTranslation();
  if (component) {
    const Component = component;
    return /* @__PURE__ */ jsx3(Component, { ...field, placeholder });
  }
  switch (type) {
    case "text": {
      return /* @__PURE__ */ jsx3(Input, { ...field, placeholder });
    }
    case "number": {
      return /* @__PURE__ */ jsx3(Input, { ...field, placeholder, type: "number" });
    }
    case "boolean": {
      return /* @__PURE__ */ jsx3(Switch, { ...field });
    }
    default: {
      return /* @__PURE__ */ jsx3(InlineTip, { variant: "warning", label: t("general.warning"), children: "The field type does not support rendering a fallback component. Please provide a component prop." });
    }
  }
};

// src/extensions/forms/hooks.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodEffects as ZodEffects2 } from "zod";
function createAdditionalDataSchema(configs) {
  return configs.reduce((acc, config) => {
    acc[config.name] = config.validation;
    return acc;
  }, {});
}
function createExtendedSchema(baseSchema, additionalDataSchema) {
  const extendedObjectSchema = z.object({
    ...baseSchema instanceof ZodEffects2 ? baseSchema.innerType().shape : baseSchema.shape,
    additional_data: z.object(additionalDataSchema).optional()
  });
  return baseSchema instanceof ZodEffects2 ? baseSchema.superRefine((data, ctx) => {
    const result = extendedObjectSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => ctx.addIssue(issue));
    }
  }).and(extendedObjectSchema) : extendedObjectSchema;
}
function createExtendedDefaultValues(baseDefaultValues, configs, data) {
  const additional_data = configs.reduce((acc, config) => {
    const { name, defaultValue } = config;
    acc[name] = typeof defaultValue === "function" ? defaultValue(data) : defaultValue;
    return acc;
  }, {});
  return Object.assign(baseDefaultValues, { additional_data });
}
var useExtendableForm = ({
  defaultValues: baseDefaultValues,
  schema: baseSchema,
  configs,
  data,
  ...props
}) => {
  const additionalDataSchema = createAdditionalDataSchema(configs);
  const schema = createExtendedSchema(baseSchema, additionalDataSchema);
  const defaultValues = createExtendedDefaultValues(
    baseDefaultValues,
    configs,
    data
  );
  return useForm({
    ...props,
    defaultValues,
    resolver: zodResolver(schema)
  });
};

// src/extensions/links/utils.ts
import linkModule from "virtual:medusa/links";
function appendLinkableFields(fields = "", linkable = []) {
  const linkableFields = linkable.flatMap((link) => {
    return typeof link === "string" ? [`+${link}.*`] : link.map((l) => `+${l}.*`);
  });
  return [fields, ...linkableFields].join(",");
}
function getLinkedFields(model, fields = "") {
  const links = linkModule.links[model];
  return appendLinkableFields(fields, links);
}

// src/components/utilities/error-boundary/error-boundary.tsx
import { ExclamationCircle } from "@medusajs/icons";
import { Text } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { Navigate, useLocation, useRouteError } from "react-router-dom";
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
var ErrorBoundary = () => {
  const error = useRouteError();
  const location = useLocation();
  const { t } = useTranslation2();
  let code = null;
  if (isFetchError(error)) {
    if (error.status === 401) {
      return /* @__PURE__ */ jsx4(Navigate, { to: "/login", state: { from: location }, replace: true });
    }
    code = error.status ?? null;
  }
  if (process.env.NODE_ENV === "development") {
    console.error(error);
  }
  let title;
  let message;
  switch (code) {
    case 400:
      title = t("errorBoundary.badRequestTitle");
      message = t("errorBoundary.badRequestMessage");
      break;
    case 404:
      title = t("errorBoundary.notFoundTitle");
      message = t("errorBoundary.notFoundMessage");
      break;
    case 500:
      title = t("errorBoundary.internalServerErrorTitle");
      message = t("errorBoundary.internalServerErrorMessage");
      break;
    default:
      title = t("errorBoundary.defaultTitle");
      message = t("errorBoundary.defaultMessage");
      break;
  }
  return /* @__PURE__ */ jsx4("div", { className: "flex size-full min-h-[calc(100vh-57px-24px)] items-center justify-center", children: /* @__PURE__ */ jsx4("div", { className: "flex flex-col gap-y-6", children: /* @__PURE__ */ jsxs2("div", { className: "text-ui-fg-subtle flex flex-col items-center gap-y-3", children: [
    /* @__PURE__ */ jsx4(ExclamationCircle, {}),
    /* @__PURE__ */ jsxs2("div", { className: "flex flex-col items-center justify-center gap-y-1", children: [
      /* @__PURE__ */ jsx4(Text, { size: "small", leading: "compact", weight: "plus", children: title }),
      /* @__PURE__ */ jsx4(
        Text,
        {
          size: "small",
          className: "text-ui-fg-muted text-balance text-center",
          children: message
        }
      )
    ] })
  ] }) }) });
};

// src/extensions/routes/utils.ts
var settingsRouteRegex = /^\/settings\//;
var getRouteExtensions = (module, type) => {
  return module.routes.filter((route) => {
    if (type === "settings") {
      return settingsRouteRegex.test(route.path);
    }
    return !settingsRouteRegex.test(route.path);
  });
};
var createBranchRoute = (segment) => ({
  path: segment,
  children: []
});
var createLeafRoute = (Component, loader, handle) => ({
  path: "",
  ErrorBoundary,
  async lazy() {
    const result = { Component };
    if (loader) {
      result.loader = loader;
    }
    if (handle) {
      result.handle = handle;
    }
    return result;
  }
});
var createParallelRoute = (path, Component, loader, handle) => ({
  path,
  async lazy() {
    const result = { Component };
    if (loader) {
      result.loader = loader;
    }
    if (handle) {
      result.handle = handle;
    }
    return result;
  }
});
var processParallelRoutes = (parallelRoutes, currentFullPath) => {
  return parallelRoutes?.map(({ path, Component, loader, handle }) => {
    const childPath = path?.replace(currentFullPath, "").replace(/^\/+/, "");
    if (!childPath) {
      return null;
    }
    return createParallelRoute(childPath, Component, loader, handle);
  }).filter(Boolean);
};
var addRoute = (pathSegments, Component, currentLevel, loader, handle, parallelRoutes, fullPath) => {
  if (!pathSegments.length) {
    return;
  }
  const [currentSegment, ...remainingSegments] = pathSegments;
  let route = currentLevel.find((r) => r.path === currentSegment);
  if (!route) {
    route = createBranchRoute(currentSegment);
    currentLevel.push(route);
  }
  const currentFullPath = fullPath ? `${fullPath}/${currentSegment}` : currentSegment;
  if (remainingSegments.length === 0) {
    route.children || (route.children = []);
    const leaf = createLeafRoute(Component, loader);
    if (handle) {
      route.handle = handle;
    }
    leaf.children = processParallelRoutes(parallelRoutes, currentFullPath);
    route.children.push(leaf);
  } else {
    route.children || (route.children = []);
    addRoute(
      remainingSegments,
      Component,
      route.children,
      loader,
      handle,
      parallelRoutes,
      currentFullPath
    );
  }
};
var createRouteMap = (routes, ignore) => {
  const root = [];
  routes.forEach(({ path, Component, loader, handle, children }) => {
    const cleanedPath = ignore ? path.replace(ignore, "").replace(/^\/+/, "") : path.replace(/^\/+/, "");
    const pathSegments = cleanedPath.split("/").filter(Boolean);
    addRoute(pathSegments, Component, root, loader, handle, children);
  });
  return root;
};

export {
  DashboardExtensionManager,
  DashboardExtensionProvider,
  useDashboardExtension,
  FormExtensionZone,
  useExtendableForm,
  getLinkedFields,
  ErrorBoundary,
  getRouteExtensions,
  createRouteMap
};
