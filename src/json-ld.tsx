import * as React from "react";
import { Thing, WithContext } from "schema-dts";

/**
 * Component that inline-includes a JSON-LD script where specified.
 *
 * @example
 * ```tsx
 * <JsonLd<Person>
 *   item={{
 *     "@context": "https://schema.org",
 *     "@type": "Person",
 *     name: "Grace Hopper",
 *     alternateName: "DescriptionGrace Brewster Murray Hopper",
 *     alumniOf: {
 *       "@type": "CollegeOrUniversity",
 *       name: ["Yale University", "Vassar College"]
 *     },
 *     knowsAbout: ["Compilers", "Computer Science"]
 *   }}
 * />
 * ```
 */
export class JsonLd<T extends Thing> extends React.Component<{
  item: WithContext<T>;
}> {
  render() {
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(this.props.item) }}
      />
    );
  }
}
