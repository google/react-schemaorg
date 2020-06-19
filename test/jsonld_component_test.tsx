import * as React from "react";
import { JsonLd } from "../src/index";
import { Person } from "schema-dts";
import { create } from "react-test-renderer";

test("works", () => {
  expect(
    create(
      <JsonLd<Person>
        item={{
          "@context": "https://schema.org",
          "@type": "Person",
        }}
      />
    ).toJSON()
  ).toMatchInlineSnapshot(`
    <script
      dangerouslySetInnerHTML={
        Object {
          "__html": "{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Person\\"}",
        }
      }
      type="application/ld+json"
    />
  `);
});

test("escapes JSON-LD-illegal chars", () => {
  expect(
    create(
      <JsonLd<Person>
        item={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Foo</script>",
        }}
      />
    ).toJSON()
  ).toMatchInlineSnapshot(`
    <script
      dangerouslySetInnerHTML={
        Object {
          "__html": "{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Person\\",\\"name\\":\\"Foo&lt;/script&gt;\\"}",
        }
      }
      type="application/ld+json"
    />
  `);
});
