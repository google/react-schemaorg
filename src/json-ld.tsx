/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";
import type { Thing, WithContext, Graph } from "schema-dts";

interface JsonLdOptions {
  /** Adds indentation, white space, and line break characters to JSON-LD output. {@link JSON.stringify} */
  space?: string | number;
}

/**
 * Component that inline-includes a JSON-LD script where specified.
 *
 * For Example:
 *
 * ```tsx
 * <JsonLd<Person>
 *   item={{
 *     "@context": "https://schema.org",
 *     "@type": "Person",
 *     name: "Grace Hopper",
 *     alternateName: "Grace Brewster Murray Hopper",
 *     alumniOf: {
 *       "@type": "CollegeOrUniversity",
 *       name: ["Yale University", "Vassar College"]
 *     },
 *     knowsAbout: ["Compilers", "Computer Science"]
 *   }}
 *   space={2}
 * />
 * ```
 */
export function JsonLd(props: JsonLdOptions & { item: Graph }): JSX.Element;
export function JsonLd<T extends Thing>(
  props: JsonLdOptions & { item: WithContext<T> }
): JSX.Element;
export function JsonLd(
  props: JsonLdOptions & { item: Graph | WithContext<Thing> }
): JSX.Element;
export function JsonLd(
  props: JsonLdOptions & { item: Graph | WithContext<Thing> }
) {
  return <script {...jsonLdScriptProps(props.item, props)} />;
}

/**
 * Produces necessary props for a JSX <script> tag that includes JSON-LD.
 *
 * Can be used by spreading the props into a <script> JSX tag:
 *
 * ```tsx
 * <script {...jsonLdScriptProps<Person>({
 *   "@context": "https://schema.org",
 *   "@type": "Person",
 *   name: "Grace Hopper",
 *   alternateName: "Grace Brewster Murray Hopper",
 *   alumniOf: {
 *     "@type": "CollegeOrUniversity",
 *     name: ["Yale University", "Vassar College"]
 *   },
 *   knowsAbout: ["Compilers", "Computer Science"]
 * })} />
 * ```
 */
export function jsonLdScriptProps(
  item: Graph,
  options?: JsonLdOptions
): JSX.IntrinsicElements["script"];
export function jsonLdScriptProps<T extends Thing>(
  item: WithContext<T>,
  options?: JsonLdOptions
): JSX.IntrinsicElements["script"];
export function jsonLdScriptProps(
  item: Graph | WithContext<Thing>,
  options?: JsonLdOptions
): JSX.IntrinsicElements["script"];
export function jsonLdScriptProps(
  item: Graph | WithContext<Thing>,
  options: JsonLdOptions = {}
): JSX.IntrinsicElements["script"] {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(item, safeJsonLdReplacer, options.space),
    },
  };
}

/**
 * Produces a Helmet-style <script> prop for a given JSON-LD datum.
 *
 * For example:
 *
 * ```tsx
 * <Helmet script={[
 *     helmetJsonLdProp<Person>({
 *         "@context": "https://schema.org",
 *         "@type": "Person",
 *         name: "Grace Hopper",
 *         alternateName: "Grace Brewster Murray Hopper",
 *         alumniOf: {
 *           "@type": "CollegeOrUniversity",
 *           name: ["Yale University", "Vassar College"]
 *         },
 *         knowsAbout: ["Compilers", "Computer Science"]
 *     }),
 * ]} />
 * ```
 */
export function helmetJsonLdProp(
  item: Graph,
  options?: JsonLdOptions
): {
  type: "application/ld+json";
  innerHTML: string;
};
export function helmetJsonLdProp<T extends Thing>(
  item: WithContext<T>,
  options?: JsonLdOptions
): {
  type: "application/ld+json";
  innerHTML: string;
};
export function helmetJsonLdProp(
  item: Graph | WithContext<Thing>,
  options?: JsonLdOptions
): {
  type: "application/ld+json";
  innerHTML: string;
};
export function helmetJsonLdProp(
  item: Graph | WithContext<Thing>,
  options: JsonLdOptions = {}
): {
  type: "application/ld+json";
  innerHTML: string;
} {
  return {
    type: "application/ld+json" as const,
    innerHTML: JSON.stringify(item, safeJsonLdReplacer, options.space),
  };
}

type JsonValueScalar = string | boolean | number;
type JsonValue =
  | JsonValueScalar
  | Array<JsonValue>
  | { [key: string]: JsonValue };
type JsonReplacer = (_: string, value: JsonValue) => JsonValue | undefined;

const ESCAPE_ENTITIES = Object.freeze({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
});
const ESCAPE_REGEX = new RegExp(
  `[${Object.keys(ESCAPE_ENTITIES).join("")}]`,
  "g"
);
const ESCAPE_REPLACER = (t: string): string =>
  ESCAPE_ENTITIES[t as keyof typeof ESCAPE_ENTITIES];

/**
 * A replacer for JSON.stringify to strip JSON-LD of illegal HTML entities
 * per https://www.w3.org/TR/json-ld11/#restrictions-for-contents-of-json-ld-script-elements
 */
const safeJsonLdReplacer: JsonReplacer = (() => {
  // Replace per https://www.w3.org/TR/json-ld11/#restrictions-for-contents-of-json-ld-script-elements
  // Solution from https://stackoverflow.com/a/5499821/864313
  return (_: string, value: JsonValue): JsonValue | undefined => {
    switch (typeof value) {
      case "object":
        // Omit null values.
        if (value === null) {
          return undefined;
        }

        return value; // JSON.stringify will recursively call replacer.
      case "number":
      case "boolean":
      case "bigint":
        return value; // These values are not risky.
      case "string":
        return value.replace(ESCAPE_REGEX, ESCAPE_REPLACER);
      default: {
        // We shouldn't expect other types.
        isNever(value);

        // JSON.stringify will remove this element.
        return undefined;
      }
    }
  };
})();

// Utility: Assert never
function isNever(_: never): void {}
