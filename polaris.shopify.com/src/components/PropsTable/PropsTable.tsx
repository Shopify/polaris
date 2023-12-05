import {createContext, useContext, useState} from 'react';
import {Type, FilteredTypes, StatusName} from '../../types';
import styles from './PropsTable.module.scss';
import Longform from '../Longform';
import {motion, AnimatePresence} from 'framer-motion';
import StatusBadge from '../StatusBadge';
import {className, toPascalCase} from '../../utils/various';

interface Props {
  componentName: string;
  types: FilteredTypes;
}

function syntaxKindToDeveloperFriendlyString(
  syntaxKind: string | undefined,
): string {
  if (syntaxKind === 'EnumDeclaration') {
    return `enum`;
  } else if (syntaxKind === 'TypeAliasDeclaration') {
    return `type`;
  }
  return `interface`;
}

const endWithPeriod = (str: string): string =>
  str.trim().endsWith('.') ? str.trim() : `${str.trim()}.`;

const TypeContext = createContext<{
  types: FilteredTypes;
}>({types: {}});

function PropsTable({types, componentName}: Props) {
  const feedbackTitle = '[polaris.shopify.com] Props table feedback';
  const feedbackUrl = `https://github.com/shopify/polaris/issues/new?title=${encodeURIComponent(
    feedbackTitle,
  )}&amp;labels=polaris.shopify.com`;

  const propsName = `${toPascalCase(componentName).replace(/\s/g, '')}Props`;
  const propsForComponent = types[propsName];

  if (!propsForComponent) throw new Error('Could not find props for component');

  const propsAreDefinedUsingInterface = !!propsForComponent.members;

  return (
    <TypeContext.Provider value={{types}}>
      <div className={styles.PropsTable}>
        <Longform firstParagraphIsLede={false}>
          <h2 id="props">Props</h2>
          <p>
            Want to help make this feature better? Please{' '}
            <a href={feedbackUrl}>share your feedback</a>.
          </p>
        </Longform>

        {!propsAreDefinedUsingInterface && (
          <div className={styles.UnparsablePropsWarning}>
            <p>{`This component defines its props in a way that our website can't automatically parse. The type definition is shown below, but it might be hard to read.`}</p>
          </div>
        )}

        <AnimatePresence initial={false}>
          <TypeTable types={types} type={propsForComponent} />
        </AnimatePresence>
      </div>
    </TypeContext.Provider>
  );
}

type ExpandedTypeInfo = {memberName: string | null; typeName: string};

const ExpandedTypesContext = createContext<{
  expandedTypes: ExpandedTypeInfo[];
  expandType: (typeName: string) => void;
  collapseType: (typeName: string) => void;
  currentMember: string | null;
}>({
  expandType: () => undefined,
  collapseType: () => undefined,
  expandedTypes: [],
  currentMember: null,
});

function TypeTable({
  types,
  type,
  level = 0,
}: {
  types: FilteredTypes;
  type: Type;
  level?: number;
}) {
  const [expandedTypes, setExpandedTypes] = useState<ExpandedTypeInfo[]>([]);
  const {collapseType} = useContext(ExpandedTypesContext);

  return (
    <motion.div
      key={type.name}
      className={styles.TypeTable}
      initial={{opacity: 0, scale: 0.7, height: 0}}
      animate={{
        opacity: 1,
        scale: 1,
        height: 'auto',
        transition: {ease: 'backOut'},
      }}
      exit={{opacity: 0, scale: 0, height: 0, transition: {ease: 'backIn'}}}
    >
      <div className={styles.TypeTableHeader}>
        {syntaxKindToDeveloperFriendlyString(type.syntaxKind)} {type.name}{' '}
        {typeof level === 'number' && level > 0 && (
          <button onClick={() => collapseType(type.name)} aria-label="Collapse">
            &times;
          </button>
        )}
      </div>

      {!type.members && (
        <ExpandedTypesContext.Provider
          value={{
            expandedTypes,
            expandType: (typeName: string) =>
              setExpandedTypes([
                {typeName, memberName: null},
                ...expandedTypes,
              ]),
            collapseType: () => undefined,
            currentMember: null,
          }}
        >
          <div className={styles.RawInterfaceValue}>
            <Highlighter type={type.value.toString()} />

            <AnimatePresence initial={false}>
              {expandedTypes
                .filter((expanded) => expanded.memberName === null)
                .map((expanded) => {
                  const typeForExpandedType = types[expanded.typeName];
                  if (!typeForExpandedType) return null;
                  return (
                    <TypeTable
                      key={expanded.typeName}
                      types={types}
                      type={typeForExpandedType}
                    />
                  );
                })}
            </AnimatePresence>
          </div>
        </ExpandedTypesContext.Provider>
      )}

      {type.members && (
        <dl>
          {type.members.map(
            ({
              name,
              isOptional,
              description,
              defaultValue,
              value,
              deprecationMessage,
            }) => {
              const expandType = (typeName: string) => {
                setExpandedTypes([
                  {typeName, memberName: name},
                  ...expandedTypes,
                ]);
              };

              const collapseType = (typeName: string) =>
                setExpandedTypes((types) =>
                  types.filter(
                    (typeInfo) =>
                      !(
                        typeInfo.typeName === typeName &&
                        typeInfo.memberName === name
                      ),
                  ),
                );

              return (
                <ExpandedTypesContext.Provider
                  key={name}
                  value={{
                    expandedTypes,
                    expandType,
                    collapseType,
                    currentMember: name,
                  }}
                >
                  <span className={styles.Row}>
                    <dt className={styles.Key}>
                      <span
                        className={className(
                          styles.MemberName,
                          !!deprecationMessage && styles.isDeprecated,
                        )}
                      >
                        {name}
                        {isOptional && <span>?</span>}
                      </span>
                      <span className={styles.Valuex}>
                        <Highlighter type={value.toString()} />
                      </span>
                    </dt>
                    <dd>
                      <div className={styles.Description}>
                        {description && <p>{endWithPeriod(description)}</p>}
                        {defaultValue && (
                          <p>
                            {'Defaults to '}
                            <span className={styles.Default}>
                              <Highlighter type={defaultValue} />
                            </span>
                            .
                          </p>
                        )}
                        {deprecationMessage && (
                          <div className={styles.DeprecationNotice}>
                            <StatusBadge status={StatusName.Deprecated} />{' '}
                            {endWithPeriod(deprecationMessage)}
                          </div>
                        )}
                      </div>

                      <AnimatePresence initial={false}>
                        {expandedTypes
                          .filter((expanded) => expanded.memberName === name)
                          .map((expanded) => {
                            const typeForExpandedType =
                              types[expanded.typeName];
                            if (!typeForExpandedType) return null;
                            return (
                              <TypeTable
                                key={expanded.typeName}
                                types={types}
                                type={typeForExpandedType}
                                level={level + 1}
                              />
                            );
                          })}
                      </AnimatePresence>
                    </dd>
                  </span>
                </ExpandedTypesContext.Provider>
              );
            },
          )}
        </dl>
      )}
    </motion.div>
  );
}

function Highlighter({
  type,
  prev = '',
}: {
  type: string;
  prev?: string;
}): JSX.Element {
  const {expandType, expandedTypes, currentMember} =
    useContext(ExpandedTypesContext);
  const {types} = useContext(TypeContext);
  const hasBeenExpanded = expandedTypes.some(
    (expandedType) =>
      expandedType.typeName === type &&
      expandedType.memberName === currentMember,
  );

  const isString =
    type === 'string' ||
    type.match(/^['][^']+'$/) !== null ||
    type.match(/^["][^"]+"$/) !== null;
  const isType =
    type.match(/^[A-Z][A-Za-z]+$/) || type === 'any' || type === 'void';

  if (isString) {
    return <span className={styles.SyntaxString}>{type}</span>;
  } else if (type === 'boolean') {
    return <span className={styles.SyntaxBoolean}>{type}</span>;
  } else if (type === 'number' || !Number.isNaN(parseInt(type))) {
    return <span className={styles.SyntaxNumber}>{type}</span>;
  } else if (isType) {
    const referencedType = types[type];
    const referencedTypeExists = !!referencedType;
    const typeCanBeExpanded = referencedTypeExists;

    let autoInlinedValue =
      referencedType &&
      !referencedType.members &&
      typeof referencedType.value === 'string'
        ? referencedType.value
        : undefined;

    if (autoInlinedValue) {
      const needsParenthesesToMakeSense =
        prev.includes('&') || prev.includes('|');
      if (needsParenthesesToMakeSense) {
        autoInlinedValue = `(${autoInlinedValue})`;
      }
    }

    if (autoInlinedValue) {
      return <Highlighter type={autoInlinedValue} prev={type} />;
    }

    return (
      <span className={styles.SyntaxType}>
        {typeCanBeExpanded ? (
          <button
            className={styles.ExpandableType}
            onClick={() => expandType(type)}
            disabled={hasBeenExpanded}
            aria-expanded={hasBeenExpanded}
          >
            {type}
          </button>
        ) : (
          <span>{type}</span>
        )}
      </span>
    );
  } else if (type.match(/^[a-z]+$/gi) !== null) {
    return <span className={styles.SyntaxKeyword}>{type}</span>;
  } else {
    if (prev === type) return <>{type}</>;
    const tokenRegex = /([^a-z0-9'"/-]+)/gi;
    const tokens = type.split(tokenRegex);
    return (
      <>
        {tokens.map((token, i) => (
          <Highlighter key={prev + token + i} type={token} prev={type} />
        ))}
      </>
    );
  }
}

export default PropsTable;
