[![react-schemaorg npm version](https://badge.fury.io/js/react-schemaorg.svg)](https://www.npmjs.com/package/react-schemaorg)

# react-schemaorg

Easily insert valid Schema.org JSON-LD using the custom `<JsonLd>` react
component.

Uses [schema-dts](https://github.com/google/schema-dts) for Schema.org
TypeScript definitions.

Note: This is not an officially supported Google product.

## Usage

Install [`react-schemaorg`](https://www.npmjs.com/package/react-schemaorg) and
your desired version of
[`schema-dts`](https://www.npmjs.com/package/schema-dts):

```sh
npm install schema-dts
npm install react-schemaorg
```

Then, to insert a simple JSON-LD snippet:

```ts
import { Person } from "schema-dts";
import { JsonLd } from "react-schemaorg";

export function GraceHopper() {
  return <JsonLd<Person>
    item={{
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Grace Hopper",
      alternateName: "Grace Brewster Murray Hopper",
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: ["Yale University", "Vassar College"]
      },
      knowsAbout: ["Compilers", "Computer Science"]
    }}/>;
}
```

## Developers

Use NPM to install dependencies:

```sh
npm install
```

Use tsc to build:

```sh
tsc
```

To contribute changes, see [the CONTRIBUTING.md file](./CONTRIBUTING.md).
