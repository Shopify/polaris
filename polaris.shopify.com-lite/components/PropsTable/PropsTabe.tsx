'use client';

import {Fragment, ReactNode, useState} from 'react';
import {JSONOutput} from 'typedoc';
import {Popover} from '@headlessui/react';
import styles from './PropsTable.module.scss';
import {className} from '@/utils';
import {useFloating} from '@floating-ui/react';

interface Props {
  props: JSONOutput.DeclarationReflection | undefined;
  references: JSONOutput.DeclarationReflection[];
}

function PropsTable({props, references}: Props) {
  if (!props) return <p>No props found</p>;

  return (
    <div className={styles.PropsTableContent}>
      <div className={styles.PropsTableHeader}>{props.name}</div>
      <HandleDeclarationReflection
        declarationReflection={props}
        references={references}
      />
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
  const comment = (
    <p>
      {declarationReflection.comment?.summary.map((segment, index) => {
        if (segment.kind === 'text') {
          return <Fragment key={index}>{segment.text}</Fragment>;
        } else if (segment.kind === 'code') {
          return <code key={index}>{segment.text}</code>;
        }
      })}
    </p>
  );
  const isOptional = declarationReflection.flags?.isOptional;
  return (
    <div className={styles.Prop}>
      <span className={styles.PropName}>
        {declarationReflection.name}
        {isOptional && '?'}
      </span>
      {children}
      <span className={styles.PropComment}>{comment}</span>
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
  if (declarationReflection.children) {
    return (
      <>
        {declarationReflection.children.map((child) => (
          <HandleDeclarationReflection
            key={child.id}
            declarationReflection={child}
            references={references}
          />
        ))}
      </>
    );
  } else if (declarationReflection.signatures) {
    return (
      <>
        {declarationReflection.signatures.map((child) => (
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
      <ExpandType
        type={declarationReflection.type}
        references={references}
        definitionUrl={definitionUrl}
        isPartOfAnotherType={false}
      />;
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
      (ref) => ref.id === declarationReflection.id,
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
            isPartOfAnotherType={false}
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
          isPartOfAnotherType={false}
        />
      </PropItemWrapper>
    );
  }
  return (
    <ExpandType
      type={declarationReflection.type}
      isPartOfAnotherType={false}
      references={references}
    />
  );
}

function ExpandType({
  type,
  references,
  definitionUrl,
  isPartOfAnotherType,
}: {
  type: JSONOutput.DeclarationReflection['type'];
  references: JSONOutput.DeclarationReflection[];
  definitionUrl?: string;
  isPartOfAnotherType: boolean;
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
          isPartOfAnotherType={true}
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
              isPartOfAnotherType={true}
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
              isPartOfAnotherType={true}
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
            <MyPopover buttonText={'click me'}>
              <p>Weehoo</p>
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
    }
    if (definitionUrl) {
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
    return <p>Type is not exported: ❌ {type.name}</p>;
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
              <ExpandType
                type={child.type}
                isPartOfAnotherType={true}
                references={references}
              />
              ;{index < children.length - 1 && ' '}
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
          isPartOfAnotherType={false}
        />
      </>
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
            <ExpandType
              type={parameter.type}
              references={references}
              isPartOfAnotherType={true}
            />
            {index < parameters.length - 1 && ', '}
          </Fragment>
        ))}
      ) =&gt;{' '}
      <ExpandType
        type={declarationReflection.type}
        references={references}
        isPartOfAnotherType={true}
      />
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
  let [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const {x, y, strategy, refs} = useFloating();

  return (
    <Popover as="span" className={className(styles.PopoverContainer)}>
      <Popover.Button className={styles.PopoverButton} ref={refs.setReference}>
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
