import * as React from "react";
import { JsonLd } from "../src/index";
import { Person } from "schema-dts";

const T1: React.FunctionComponent = () => (
  <JsonLd<Person>
    item={{
      "@context": "https://schema.org",
      "@type": "Person",
    }}
  />
);

const T2: React.FunctionComponent = () => (
  <JsonLd<Person>
    item={{
      "@context": "https://schema.org",
      "@type": "Person",
    }}
    space={2}
  />
);

const T3 = () => (
  <JsonLd<Person>
    item={{
      "@context": "https://schema.org",
      // @ts-expect-error
      "@type": "Organization",
    }}
  />
);
