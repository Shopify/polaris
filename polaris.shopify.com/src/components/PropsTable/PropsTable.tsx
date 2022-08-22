import {BaseNode, NodeWithMembers, NodeWithType, TypeList} from '../../types';
import StatusBadge from '../StatusBadge';
import {Disclosure} from '@headlessui/react';
import styles from './PropsTable.module.scss';
import Longform from '../Longform';

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
  const typesWithSameName = allTypes.filter((type) => type.name === typeName);
  if (typesWithSameName.length === 0) {
    console.log('No types found');
  } else if (typesWithSameName.length === 1) {
    console.log('Found a perfect match', typesWithSameName);
    return typesWithSameName[0];
  } else {
    console.log('Multiple types match. Narrowing down...', typesWithSameName);
    console.log(fileName, typesWithSameName);
    const typeWithSameNameInSameFile = typesWithSameName.filter(
      (type) => type.id.split('#')[0] === fileName,
    );
    if (typeWithSameNameInSameFile.length === 1) {
      console.log('Narrowed down to this type:', typeWithSameNameInSameFile);
      return typeWithSameNameInSameFile[0];
    } else {
      console.log('Failed to narrow results down.', typeWithSameNameInSameFile);
    }
  }

  return null;
}

function resolveMember(
  allTypes: TypeList,
  node: NodeWithType,
): NodeWithMembers | string {
  const fileName = node.id.split('#')[0];
  const nodeType = node.type.replace(/^readonly/, '').trim();
  const isJustAType = nodeType.match(/^[A-Z][A-Za-z]+$/);
  const isArrayType = nodeType.match(/^[A-Z][A-Za-z]+\[\]$/);

  if (isJustAType) {
    const referencedType = findReferencedType({
      allTypes,
      typeName: nodeType,
      fileName,
    });
    if (referencedType) {
      if ('type' in referencedType) {
        return `${referencedType.type} 🪄`;
      } else {
        return referencedType;
      }
    }
  } else if (isArrayType) {
    const typeWithoutArrayNotation = nodeType.replace(/\[\]$/gi, '');
    const referencedType = findReferencedType({
      allTypes,
      typeName: typeWithoutArrayNotation,
      fileName,
    });
    if (referencedType) {
      if ('type' in referencedType) {
        return `(${referencedType.type})[] 🪄`;
      } else {
        return referencedType;
      }
    }
  }
  return node.type;
}

function highlightType(type: string, prev: string = ''): React.ReactNode {
  if (
    type === 'string' ||
    type.match(/^['][^']+'$/) !== null ||
    type.match(/^["][^"]+"$/) !== null
  ) {
    return <span className={styles.SyntaxString}>{type}</span>;
  } else if (type === 'boolean') {
    return <span className={styles.SyntaxBoolean}>{type}</span>;
  } else if (type === 'number') {
    return <span className={styles.SyntaxNumber}>{type}</span>;
  } else if (type.endsWith('ReactNode') || type.endsWith('ReactElement')) {
    return <span className={styles.SyntaxReactNode}>{type}</span>;
  } else if (type === 'void') {
    return <span className={styles.SyntaxReactNode}>{type}</span>;
  } else if (type.match(/^[A-Z][A-Za-z]+$/) || type === 'any') {
    return <span className={styles.SyntaxReactNode}>{type}</span>;
  } else if (type.match(/^[a-z]+$/gi) !== null) {
    return <span className={styles.SyntaxKeyword}>{type}</span>;
  } else {
    if (prev === type) {
      return <>{type}</>;
    }
    const tokenRegex = /([^a-z0-9'"/-]+)/gi;
    const tokens = type.split(tokenRegex);
    return (
      <>
        {tokens.map((token) => {
          return <>{highlightType(token, type)}</>;
        })}
      </>
    );
  }
}

function getDefaultValue(type: BaseNode): string | null {
  const defaultTag = type.tags.find((tag) => tag.name === 'default');
  if (defaultTag) {
    return defaultTag.text;
  }
  return null;
}

function PropsTable({types, componentName}: Props) {
  const feedbackTitle = '[polaris.shopify.com] Props table feedback';
  const feedbackUrl = `https://github.com/shopify/polaris/issues/new?title=${encodeURIComponent(
    feedbackTitle,
  )}&amp;labels=polaris.shopify.com`;

  const propsForComponent = types.find(
    (type) =>
      type.name.toLowerCase() ===
      `${componentName.replace(/\s/g, '').toLowerCase()}props`,
  );

  const propsAreDefinedUsingInterface =
    propsForComponent && 'members' in propsForComponent;

  return (
    <div className={styles.PropsTable}>
      <Longform>
        <h2 id="props">Props</h2>
        <p>
          Want to help make this feature better? Please{' '}
          <a href={feedbackUrl}>share your feedback</a>.
        </p>
      </Longform>
      {propsAreDefinedUsingInterface ? (
        <InterfaceList allTypes={types} node={propsForComponent} />
      ) : (
        <div className={styles.UnparsablePropsWarning}>
          <p>{`This component uses prop types that our website can't automatically parse.`}</p>
          <pre>
            type {propsForComponent?.name} = {propsForComponent?.type};
          </pre>
        </div>
      )}
    </div>
  );
}

function InterfaceList({
  allTypes,
  node,
  level = 0,
  isArrayed = false,
}: {
  allTypes: TypeList;
  node: TypeList[number];
  level?: number;
  isArrayed?: boolean;
}) {
  if (!('members' in node)) return <p>Hmmm</p>;

  if (node.members.length === 0) {
    return <p>{`This component doesn't have any props.`}</p>;
  }

  return (
    <div className={styles.InterfaceList}>
      <Disclosure defaultOpen={level === 0}>
        <Disclosure.Button className={styles.InterfaceListHeader}>
          {node.name}
          {isArrayed && '[]'}
        </Disclosure.Button>

        <Disclosure.Panel className={styles.InterfaceListContent}>
          <ul>
            {node.members.map((type) => {
              const memberType = resolveMember(allTypes, type);
              const defaultValue = getDefaultValue(type);
              return (
                <li key={type.name}>
                  <span className={styles.KeyValue}>
                    <span className={styles.Key}>
                      {type.name}{' '}
                      {type.isOptional ? (
                        ''
                      ) : (
                        <>
                          {' '}
                          <StatusBadge
                            status={{value: 'warning', message: 'Required'}}
                          />
                        </>
                      )}
                    </span>
                    <span className={styles.Value}>
                      <span className={styles.Description}>
                        {type.description}
                        {defaultValue && (
                          <>
                            {'. Defaults to '}
                            <span className={styles.Default}>
                              {highlightType(defaultValue)}
                            </span>
                            .
                          </>
                        )}
                      </span>

                      {typeof memberType === 'string' ? (
                        <span className={styles.ValueText}>
                          {highlightType(memberType)}
                        </span>
                      ) : (
                        <>
                          <InterfaceList
                            allTypes={allTypes}
                            node={memberType}
                            level={level + 1}
                            isArrayed={type.type.endsWith('[]')}
                          />
                        </>
                      )}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
}

export default PropsTable;
