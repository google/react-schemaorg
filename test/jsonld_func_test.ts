import { Person } from "schema-dts";

import { helmetJsonLdProp, jsonLdScriptProps } from "../src";

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

  expect(
    jsonLdScriptProps<Person>({
      "@context": "https://schema.org",
      "@type": "Person",
    })
  ).toMatchInlineSnapshot(`
    Object {
      "dangerouslySetInnerHTML": Object {
        "__html": "{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Person\\"}",
      },
      "type": "application/ld+json",
    }
  `);

  expect(
    jsonLdScriptProps<Person>(
      {
        "@context": "https://schema.org",
        "@type": "Person",
      },
      /* options=*/ {}
    )
  ).toMatchInlineSnapshot(`
    Object {
      "dangerouslySetInnerHTML": Object {
        "__html": "{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Person\\"}",
      },
      "type": "application/ld+json",
    }
  `);

  expect(
    jsonLdScriptProps<Person>(
      {
        "@context": "https://schema.org",
        "@type": "Person",
      },
      /* options=*/ { space: 2 }
    )
  ).toMatchInlineSnapshot(`
    Object {
      "dangerouslySetInnerHTML": Object {
        "__html": "{
      \\"@context\\": \\"https://schema.org\\",
      \\"@type\\": \\"Person\\"
    }",
      },
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

  expect(
    jsonLdScriptProps<Person>({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Foo</script>",
    })
  ).toMatchInlineSnapshot(`
    Object {
      "dangerouslySetInnerHTML": Object {
        "__html": "{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Person\\",\\"name\\":\\"Foo&lt;/script&gt;\\"}",
      },
      "type": "application/ld+json",
    }
  `);
});

test("escapes JSON-LD-illegal chars", () => {
  expect(
    helmetJsonLdProp<Person>(
      {
        "@context": "https://schema.org",
        "@type": "Person",
        name: ["Foo</script>", null!, undefined!],
        knows: [],
        knowsAbout: {
          "@type": "CreativeWork",
          name: "Foo",
          copyrightYear: 2020,
        },
      },
      { space: 2 }
    )
  ).toMatchInlineSnapshot(`
    Object {
      "innerHTML": "{
      \\"@context\\": \\"https://schema.org\\",
      \\"@type\\": \\"Person\\",
      \\"name\\": [
        \\"Foo&lt;/script&gt;\\",
        null,
        null
      ],
      \\"knows\\": [],
      \\"knowsAbout\\": {
        \\"@type\\": \\"CreativeWork\\",
        \\"name\\": \\"Foo\\",
        \\"copyrightYear\\": 2020
      }
    }",
      "type": "application/ld+json",
    }
  `);

  expect(
    jsonLdScriptProps<Person>(
      {
        "@context": "https://schema.org",
        "@type": "Person",
        name: ["Foo</script>", null!, undefined!],
        knows: [],
        knowsAbout: {
          "@type": "CreativeWork",
          name: "Foo",
          copyrightYear: 2020,
        },
      },
      { space: 2 }
    )
  ).toMatchInlineSnapshot(`
    Object {
      "dangerouslySetInnerHTML": Object {
        "__html": "{
      \\"@context\\": \\"https://schema.org\\",
      \\"@type\\": \\"Person\\",
      \\"name\\": [
        \\"Foo&lt;/script&gt;\\",
        null,
        null
      ],
      \\"knows\\": [],
      \\"knowsAbout\\": {
        \\"@type\\": \\"CreativeWork\\",
        \\"name\\": \\"Foo\\",
        \\"copyrightYear\\": 2020
      }
    }",
      },
      "type": "application/ld+json",
    }
  `);
});
