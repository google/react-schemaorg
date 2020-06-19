[![react-schemaorg npm version](https://badge.fury.io/js/react-schemaorg.svg)](https://www.npmjs.com/package/react-schemaorg) [![Build Status](https://travis-ci.org/google/react-schemaorg.svg?branch=master)](https://travis-ci.org/google/react-schemaorg) [![Coverage Status](https://coveralls.io/repos/github/google/react-schemaorg/badge.svg?branch=master)](https://coveralls.io/github/google/react-schemaorg?branch=master)

# react-schemaorg

Easily insert valid Schema.org JSON-LD in your React apps.

This library provides `<JsonLd>` for plain React apps, and `helmetJsonLdProp()`
for use with [`<Helmet>`](https://github.com/nfl/react-helmet).

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

### Plain React Usage

To insert a simple JSON-LD snippet:

```tsx
import { Person } from "schema-dts";
import { JsonLd } from "react-schemaorg";

export function GraceHopper() {
  return (
    <JsonLd<Person>
      item={{
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Grace Hopper",
        alternateName: "Grace Brewster Murray Hopper",
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: ["Yale University", "Vassar College"],
        },
        knowsAbout: ["Compilers", "Computer Science"],
      }}
    />
  );
}
```

### [React Helmet](https://github.com/nfl/react-helmet) Usage

To set JSON-LD in React Helmet, you need to pass it to the `script={[...]}` prop
array in the `Helmet` component:

```tsx
import { Person } from "schema-dts";
import { helmetJsonLdProp } from "react-schemaorg";
import { Helmet } from "react-helmet";

<Helmet
  script={[
    helmetJsonLdProp<Person>({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Grace Hopper",
      alternateName: "Grace Brewster Murray Hopper",
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: ["Yale University", "Vassar College"],
      },
      knowsAbout: ["Compilers", "Computer Science"],
    }),
  ]}
/>;
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
