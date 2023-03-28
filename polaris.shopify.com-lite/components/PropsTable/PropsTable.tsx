'use client';

import {
  createContext,
  Dispatch,
  Fragment,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import {JSONOutput} from 'typedoc';
import {Popover} from '@headlessui/react';
import styles from './PropsTable.module.scss';
import {className} from '@/utils';
import {useFloating} from '@floating-ui/react-dom';
import Pill from '../Pill';

interface Props {
  props: JSONOutput.DeclarationReflection | undefined;
  references: JSONOutput.DeclarationReflection[];
}

const endWithPeriod = (str: string): string =>
  str.trim().endsWith('.') ? str.trim() : `${str.trim()}.`;

const propIsDeprecated = (
  declarationReflection: JSONOutput.DeclarationReflection,
) =>
  declarationReflection.comment?.blockTags
    ?.map((tag) => tag.tag)
    .includes('@deprecated');

const ExpandPropsTableContext = createContext<{
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
}>({setIsExpanded: () => undefined});

function PropsTable({props, references}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!props) return <p>No props found</p>;

  if (!(props.children || props.type)) {
    return <p>This component doesn't take any props</p>;
  }

  const propsUrl = props.sources?.[0].url;
  const shouldHaveToggle = props.children && props.children.length > 5;

  return (
    <div className={styles.PropsTableContent}>
      <div className={styles.PropsTableHeader}>
        <span>{props.name}</span>
        {propsUrl && (
          <>
            {' '}
            <a href={propsUrl} target="_blank">
              View source
            </a>
          </>
        )}
      </div>
      <div
        className={className(
          styles.DisclosureWrapper,
          (!shouldHaveToggle || isExpanded) && styles.isExpanded,
        )}
        id="props-table"
        aria-labelledby={
          !shouldHaveToggle || isExpanded ? undefined : 'props-table-toggle'
        }
      >
        <ExpandPropsTableContext.Provider value={{setIsExpanded}}>
          <HandleDeclarationReflection
            declarationReflection={props}
            references={references}
          />
        </ExpandPropsTableContext.Provider>
      </div>
      {shouldHaveToggle && !isExpanded && (
        <div className={styles.DisclosureToggle}>
          <button
            id="props-table-toggle"
            aria-controls="props-table"
            aria-expanded="true"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            Show all
          </button>
        </div>
      )}
    </div>
  );
}

function PropItemWrapper({
  declarationReflection,
  children,
}: {
  declarationReflection: JSONOutput.DeclarationReflection;
  children: ReactNode;
}) {
  const comment = declarationReflection.comment?.summary
    ?.map((comment) => comment.text)
    .join(' ');

  const isDeprecated = propIsDeprecated(declarationReflection);
  const isOptional = declarationReflection.flags?.isOptional;
  const defaultValue =
    declarationReflection.defaultValue ||
    declarationReflection.comment?.blockTags
      ?.filter((tag) => tag.tag === '@default')
      ?.map((tag) => tag.content.map((part) => part.text))
      .join(' ');

  return (
    <div className={styles.Prop}>
      {isDeprecated && (
        <>
          <Pill label="Deprecated" />{' '}
        </>
      )}
      <h3 className={styles.PropName}>
        {declarationReflection.name}
        {isOptional && '?'}
      </h3>
      {children}
      <p className={styles.PropComment}>
        {comment && endWithPeriod(comment)}{' '}
        {defaultValue && <> Default value: {defaultValue}.</>}
      </p>
    </div>
  );
}

function HandleDeclarationReflection({
  declarationReflection,
  references,
}: {
  declarationReflection: JSONOutput.DeclarationReflection;
  references: JSONOutput.DeclarationReflection[];
}) {
  const definitionUrl = declarationReflection.sources?.[0]?.url;
  if (declarationReflection.children || declarationReflection.signatures) {
    const items =
      declarationReflection.children || declarationReflection.signatures || [];
    return (
      <>
        {[...items]
          .sort((child) => (propIsDeprecated(child) ? 1 : -1))
          .map((child) => (
            <HandleDeclarationReflection
              key={child.id}
              declarationReflection={child}
              references={references}
            />
          ))}
      </>
    );
  } else if (declarationReflection.kindString === 'Call signature') {
    if (declarationReflection.name === '__type') {
      return (
        <ExpandType
          type={declarationReflection.type}
          references={references}
          definitionUrl={definitionUrl}
        />
      );
    } else {
      return (
        <PropItemWrapper declarationReflection={declarationReflection}>
          <ExpandCallSignature
            declarationReflection={declarationReflection}
            references={references}
          />
        </PropItemWrapper>
      );
    }
  } else if (
    declarationReflection.type &&
    declarationReflection.type.type === 'reference'
  ) {
    const referencedDeclaration = references.find(
      ({id}) => id === declarationReflection.id,
    );
    if (referencedDeclaration) {
      return (
        <HandleDeclarationReflection
          declarationReflection={referencedDeclaration}
          references={references}
        />
      );
    } else {
      return (
        <PropItemWrapper declarationReflection={declarationReflection}>
          <ExpandType
            type={declarationReflection.type}
            references={references}
            definitionUrl={definitionUrl}
          />
        </PropItemWrapper>
      );
    }
  } else if (declarationReflection.type) {
    return (
      <PropItemWrapper declarationReflection={declarationReflection}>
        <ExpandType
          type={declarationReflection.type}
          references={references}
          definitionUrl={definitionUrl}
        />
      </PropItemWrapper>
    );
  }

  return null;
}

function ExpandType({
  type,
  references,
  definitionUrl,
}: {
  type: JSONOutput.DeclarationReflection['type'];
  references: JSONOutput.DeclarationReflection[];
  definitionUrl?: string;
}) {
  if (!type) return <p>Type is empty</p>;

  if (type.type === 'array') {
    return (
      <>
        Array&lt;
        <ExpandType
          type={type.elementType}
          references={references}
          definitionUrl={definitionUrl}
        />
        &gt;
      </>
    );
  } else if (type.type === 'union') {
    return (
      <span>
        {type.types.map((subType, index) => (
          <Fragment key={index}>
            <ExpandType
              type={subType}
              references={references}
              definitionUrl={definitionUrl}
            />
            {index < type.types.length - 1 && <span> | </span>}
          </Fragment>
        ))}
      </span>
    );
  } else if (type.type === 'intersection') {
    return (
      <span>
        {type.types.map((subType, index) => (
          <Fragment key={index}>
            <ExpandType
              type={subType}
              references={references}
              definitionUrl={definitionUrl}
            />
            {index < type.types.length - 1 && <span> & </span>}
          </Fragment>
        ))}
      </span>
    );
  } else if (type.type === 'literal') {
    if (typeof type.value === 'string') {
      return (
        <span className={styles.Primitive} data-type={typeof type.value}>
          "{type.value}"
        </span>
      );
    } else if (typeof type.value === 'number') {
      return (
        <span className={styles.Primitive} data-type={typeof type.value}>
          {type.value}
        </span>
      );
    } else if (typeof type.value === 'boolean') {
      return (
        <span className={styles.Primitive} data-type={typeof type.value}>
          {type.value}
        </span>
      );
    }
    if (typeof type.value === null) {
      return (
        <span className={styles.Primitive} data-type={typeof type.value}>
          null
        </span>
      );
    } else if (typeof type.value === 'object') {
      return <p>{JSON.stringify(type.value)}</p>;
    }
  } else if (type.type === 'intrinsic') {
    return (
      <span className={styles.Primitive} data-type={type.name}>
        {type.name}
      </span>
    );
  } else if (type.type === 'reference') {
    if (type.id) {
      const referencedDeclaration = references.find(
        (ref) => ref.id === type.id,
      );

      if (referencedDeclaration) {
        return (
          <>
            <MyPopover buttonText={referencedDeclaration.name}>
              {referencedDeclaration.children && (
                <p className={styles.PropsTableHeader}>
                  {referencedDeclaration.name}
                </p>
              )}
              <HandleDeclarationReflection
                declarationReflection={referencedDeclaration}
                references={references}
              />
            </MyPopover>
          </>
        );
      }
    } else if (type.package) {
      return (
        <span className={styles.Primitive} data-type="function">
          {type.name}
        </span>
      );
    } else if (definitionUrl) {
      return (
        <a
          className={styles.GithubSourceLink}
          href={definitionUrl}
          target="_blank"
        >
          {type.name}
        </a>
      );
    }
    return <span>{type.name}</span>;
  } else if (type.type === 'reflection' && type.declaration) {
    if (type.declaration.signatures) {
      return (
        <HandleDeclarationReflection
          declarationReflection={type.declaration}
          references={references}
        />
      );
    } else if (type.declaration.children) {
      if (type.declaration.kindString === 'Type literal') {
        const {children} = type.declaration;
        const nodes: (() => ReactNode)[] = [];
        children.forEach((child, index) => {
          nodes.push(() => (
            <>
              {child.name}:{' '}
              <ExpandType type={child.type} references={references} />;
              {index < children.length - 1 && ' '}
            </>
          ));
        });
        return (
          <span>
            {'{'}
            {nodes.map((node, index) => (
              <Fragment key={index}>{node()}</Fragment>
            ))}
            {'}'}
          </span>
        );
      }
    }

    return (
      <>
        Reflect:
        {JSON.stringify(type)}
        <ExpandType
          type={type.declaration.type}
          references={references}
          definitionUrl={definitionUrl}
        />
      </>
    );
  } else if (type.type === 'typeOperator') {
    return (
      <ExpandType
        type={type.target}
        references={references}
        definitionUrl={definitionUrl}
      />
    );
  }

  return <>{JSON.stringify(type)}</>;
}

function ExpandCallSignature({
  declarationReflection,
  references,
}: {
  declarationReflection: JSONOutput.SignatureReflection;
  references: JSONOutput.DeclarationReflection[];
}) {
  const parameters = declarationReflection.parameters;
  return (
    <>
      (
      {parameters &&
        parameters.map((parameter, index) => (
          <Fragment key={parameter.id}>
            {parameter.name}:{' '}
            <ExpandType type={parameter.type} references={references} />
            {index < parameters.length - 1 && ', '}
          </Fragment>
        ))}
      ) =&gt;{' '}
      <ExpandType type={declarationReflection.type} references={references} />
    </>
  );
}

function MyPopover({
  buttonText,
  children,
}: {
  buttonText: string;
  children: ReactNode;
}) {
  const {setIsExpanded} = useContext(ExpandPropsTableContext);
  const {x, y, strategy, refs} = useFloating();

  return (
    <Popover as="span" className={styles.PopoverContainer}>
      <Popover.Button
        className={styles.PopoverButton}
        ref={refs.setReference}
        onClick={() => setIsExpanded(true)}
      >
        {buttonText}
      </Popover.Button>

      <Popover.Panel
        className={className(styles.PropsTableContent, styles.isPopover)}
        ref={refs.setFloating}
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0,
          width: 'max-content',
        }}
      >
        {children}
      </Popover.Panel>
    </Popover>
  );
}

export default PropsTable;
