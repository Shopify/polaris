import {createContext, useContext, useState} from 'react';
import {TypeMeta} from '../../types';
import StatusBadge from '../StatusBadge';
import {Disclosure} from '@headlessui/react';
import styles from './PropsTable.module.scss';
import Longform from '../Longform';

interface Props {
  componentName: string;
  typeMeta: TypeMeta[];
}

function inlineTypeValue(
  typeMeta: TypeMeta,
): string | number | object | undefined {
  if (typeMeta.members) {
    return undefined;
  } else {
    return typeMeta.value;
  }
}

function getTypeWithName(
  typeMeta: TypeMeta[],
  name: string,
): TypeMeta | undefined {
  return typeMeta.find((type) => type.name === name);
}

const toPascalCase = (str: string) =>
  (str.match(/[a-zA-Z0-9]+/g) || [])
    .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
    .join('');

function PropsTable({typeMeta, componentName}: Props) {
  const feedbackTitle = '[polaris.shopify.com] Props table feedback';
  const feedbackUrl = `https://github.com/shopify/polaris/issues/new?title=${encodeURIComponent(
    feedbackTitle,
  )}&amp;labels=polaris.shopify.com`;

  const propsName = `${toPascalCase(componentName).replace(/\s/g, '')}Props`;
  const propsForComponent = getTypeWithName(typeMeta, propsName);

  if (!propsForComponent) {
    throw new Error('Could not find props for component');
  }

  const propsAreDefinedUsingInterface = !!propsForComponent.members;

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
        <InterfaceList typeMeta={propsForComponent} />
      ) : (
        <div className={styles.UnparsablePropsWarning}>
          <p>{`This component uses prop types that our website can't automatically parse.`}</p>
          <pre>{propsForComponent?.value}</pre>
        </div>
      )}
    </div>
  );
}

function Highlighter({
  type,
  prev = '',
}: {
  type: string;
  prev?: string;
}): JSX.Element {
  const {expandType} = useContext(ExpandedTypesContext);

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
    return (
      <span className={styles.SyntaxReactNode}>
        <button onClick={() => expandType(type)}>{type}</button>
      </span>
    );
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
          return <Highlighter key={token} type={token} prev={type} />;
        })}
      </>
    );
  }
}

const ExpandedTypesContext = createContext<{
  expandType: (typeName: string) => void;
}>({expandType: () => undefined});

function InterfaceList({
  typeMeta,
  level = 0,
}: {
  typeMeta: TypeMeta;
  level?: number;
}) {
  const [expandedTypes, setExpandedTypes] = useState<
    {memberName: string; typeName: string}[]
  >([]);

  return (
    <div className={styles.InterfaceList}>
      <Disclosure defaultOpen={level === 0}>
        <Disclosure.Button className={styles.InterfaceListHeader}>
          {typeMeta.name}
        </Disclosure.Button>

        <Disclosure.Panel className={styles.InterfaceListContent}>
          <ul>
            {typeMeta.members?.map(
              ({
                name,
                isOptional,
                description,
                defaultValue,
                members,
                value,
              }) => {
                return (
                  <ExpandedTypesContext.Provider
                    key={name}
                    value={{
                      expandType: (typeName) => {
                        setExpandedTypes([
                          ...expandedTypes,
                          {typeName, memberName: name},
                        ]);
                      },
                    }}
                  >
                    <li>
                      <span className={styles.KeyValue}>
                        <span className={styles.Key}>
                          {name}{' '}
                          {isOptional ? (
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
                            {description}
                            {defaultValue && (
                              <>
                                {'. Defaults to '}
                                <span className={styles.Default}>
                                  <Highlighter type={defaultValue} />
                                </span>
                                .
                              </>
                            )}
                          </span>

                          {!members ? (
                            <span className={styles.ValueText}>
                              <Highlighter type={value.toString()} />
                            </span>
                          ) : (
                            <>
                              {/* <InterfaceList
                              typeMeta={members}
                              level={level + 1}
                            /> */}
                              <p>I have members</p>
                            </>
                          )}

                          {expandedTypes
                            .filter((expanded) => expanded.memberName === name)
                            .map((expanded) => {
                              return (
                                <p key={expanded.typeName}>
                                  {expanded.typeName}
                                </p>
                              );
                            })}
                        </span>
                      </span>
                    </li>
                  </ExpandedTypesContext.Provider>
                );
              },
            )}
          </ul>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
}

export default PropsTable;
