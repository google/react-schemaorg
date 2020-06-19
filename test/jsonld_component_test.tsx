import * as React from "react";
import { JsonLd } from "../src/index";
import { Person } from "schema-dts";

test("works", () => {
  expect(
    <JsonLd<Person>
      item={{
        "@context": "https://schema.org",
        "@type": "Person",
      }}
    />
  ).toBeDefined();
});
