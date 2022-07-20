import { useState } from "react";
import {
  NodeWithMembers,
  NodeWithType,
  TypeList,
} from "../../scripts/get-props";
import StatusBadge from "../StatusBadge";
import styles from "./PropsTable.module.scss";

interface Props {
  componentName: string;
  types: TypeList;
}

function findReferencedType({
  allTypes,
  typeName,
  fileName,
}: {
  allTypes: TypeList;
  typeName: string;
  fileName: string;
}): TypeList[number] | null {
  console.log({ typeName });
  const typesWithSameName = allTypes.filter((type) => type.name === typeName);
  if (typesWithSameName.length === 0) {
    console.log("No types found");
  } else if (typesWithSameName.length === 1) {
    console.log("Found a perfect match", typesWithSameName);
    return typesWithSameName[0];
  } else {
    console.log("Multiple types match. Narrowing down...", typesWithSameName);
    console.log(fileName, typesWithSameName);
    const typeWithSameNameInSameFile = typesWithSameName.filter(
      (type) => type.id.split("#")[0] === fileName
    );
    if (typeWithSameNameInSameFile.length === 1) {
      console.log("Narrowed down to this type:", typeWithSameNameInSameFile);
      return typeWithSameNameInSameFile[0];
    } else {
      console.log("Failed to narrow results down.", typeWithSameNameInSameFile);
    }
  }

  return null;
}

function resolveMember(
  allTypes: TypeList,
  node: NodeWithType
): NodeWithMembers | string {
  const fileName = node.id.split("#")[0];
  const nodeType = node.type.replace(/^readonly/, "").trim();
  const isJustAType = nodeType.match(/^[A-Z][A-Za-z]+$/);
  const isArrayType = nodeType.match(/^[A-Z][A-Za-z]+\[\]$/);

  if (isJustAType) {
    const referencedType = findReferencedType({
      allTypes,
      typeName: nodeType,
      fileName,
    });
    if (referencedType) {
      if ("type" in referencedType) {
        return `🪄 ${referencedType.type}`;
      } else {
        return referencedType;
      }
    }
  } else if (isArrayType) {
    const typeWithoutArrayNotation = nodeType.replace(/\[\]$/gi, "");
    const referencedType = findReferencedType({
      allTypes,
      typeName: typeWithoutArrayNotation,
      fileName,
    });
    if (referencedType) {
      if ("type" in referencedType) {
        return `🪄 (${referencedType.type})[]`;
      } else {
        return referencedType;
      }
    }
  }
  return node.type;
}

function PropsTable({ types, componentName }: Props) {
  const feedbackTitle = "[polaris.shopify.com] Props table feedback";
  const feedbackUrl = `https://github.com/shopify/polaris/issues/new?title=${encodeURIComponent(
    feedbackTitle
  )}&amp;labels=polaris.shopify.com`;

  const propsForComponent = types.find(
    (type) =>
      type.name.toLowerCase() ===
      `${componentName.replace(/\s/g, "").toLowerCase()}props`
  );

  const propsAreDefinedUsingInterface =
    propsForComponent && "members" in propsForComponent;

  return (
    <div className={styles.PropsTable}>
      <h2 id="props">Props</h2>
      <p>
        Want to help make this feature better? Please{" "}
        <a href={feedbackUrl}>share your feedback</a>.
      </p>

      {propsAreDefinedUsingInterface && (
        <InterfaceList allTypes={types} node={propsForComponent} />
      )}
    </div>
  );
}

function InterfaceList({
  allTypes,
  node,
}: {
  allTypes: TypeList;
  node: TypeList[number];
}) {
  if (!("members" in node)) return null;

  return (
    <div
      className={styles.InterfaceList}
      style={{ background: `rgba(0,0,0,.1)`, borderRadius: 8, padding: 20 }}
    >
      <p>
        <strong>{node.name}</strong>
      </p>

      <ul>
        {node.members.map((type) => {
          const memberType = resolveMember(allTypes, type);
          return (
            <li key={type.name}>
              {type.name}:{" "}
              {typeof memberType === "string" ? (
                resolveMember(allTypes, type)
              ) : (
                <InterfaceList allTypes={allTypes} node={memberType} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PropsTable;
