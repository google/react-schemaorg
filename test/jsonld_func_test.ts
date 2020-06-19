import { Person } from "schema-dts";

import { helmetJsonLdProp } from "../src/index";

test("works", () => {
  expect(
    helmetJsonLdProp<Person>({
      "@context": "https://schema.org",
      "@type": "Person",
    })
  ).toMatchInlineSnapshot(`
    Object {
      "innerHTML": "{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Person\\"}",
      "type": "application/ld+json",
    }
  `);
});

test("escapes JSON-LD-illegal chars", () => {
  expect(
    helmetJsonLdProp<Person>({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Foo</script>",
    })
  ).toMatchInlineSnapshot(`
    Object {
      "innerHTML": "{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Person\\",\\"name\\":\\"Foo&lt;/script&gt;\\"}",
      "type": "application/ld+json",
    }
  `);
});
