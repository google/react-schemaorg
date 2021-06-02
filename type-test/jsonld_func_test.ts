import { Person } from "schema-dts";

import { helmetJsonLdProp } from "../src/index";

export const T1: { innerHTML: string; type: "application/ld+json" } =
  helmetJsonLdProp<Person>({
    "@context": "https://schema.org",
    "@type": "Person",
  });

export const T2 = helmetJsonLdProp<Person>({
  "@context": "https://schema.org",
  "@type": "Patient",
});
