import type {
  API,
  ASTPath,
  FileInfo,
  JSXAttribute,
  JSXOpeningElement,
  Options,
} from 'jscodeshift';

import {POLARIS_MIGRATOR_COMMENT} from '../../utilities/constants';
import {
  getImportSpecifierName,
  hasImportDeclaration,
  hasImportSpecifier,
} from '../../utilities/imports';
import {insertCommentBefore, insertJSXComment} from '../../utilities/jsx';

export default function transformer(
  fileInfo: FileInfo,
  {jscodeshift: j}: API,
  _: Options,
) {
  const source = j(fileInfo.source);

  // If `Button` component name or `buttonFrom` function is not imported, exit
  if (
    !(
      hasImportDeclaration(j, source, '@shopify/polaris') &&
      (hasImportSpecifier(j, source, 'Button', '@shopify/polaris') ||
        hasImportSpecifier(j, source, 'ButtonProps', '@shopify/polaris') ||
        hasImportSpecifier(j, source, 'buttonFrom', '@shopify/polaris') ||
        hasImportSpecifier(j, source, 'buttonsFrom', '@shopify/polaris'))
    )
  ) {
    return fileInfo.source;
  }

  const localFunctionName =
    getImportSpecifierName(j, source, 'buttonFrom', '@shopify/polaris') ||
    'buttonFrom';

  const localFunctionPluralName =
    getImportSpecifierName(j, source, 'buttonsFrom', '@shopify/polaris') ||
    'buttonsFrom';

  const localElementName =
    getImportSpecifierName(j, source, 'Button', '@shopify/polaris') || 'Button';

  const localElementTypeName = getImportSpecifierName(
    j,
    source,
    'ButtonProps',
    '@shopify/polaris',
  );

  // For each instance of a `Button` get all the attributes and update accordingly
  source.findJSXElements(localElementName).forEach((element: ASTPath<any>) => {
    const openingElement = j(element).find(j.JSXOpeningElement).get()
      .value as JSXOpeningElement;

    const allAttributes = openingElement.attributes ?? [];
    const jsxAttributes = allAttributes as JSXAttribute[];

    // Check for spread syntax on props
    if (allAttributes.some((attribute) => attribute.type !== 'JSXAttribute')) {
      insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
      return;
    }

    // Find the boolean props we want to update
    // and ensure they are not set to a conditional value
    const plain = jsxAttributes.find(
      (attribute) => attribute.name.name === 'plain',
    );
    const isPlainValid = plain?.value === null;
    const monochrome = jsxAttributes.find(
      (attribute) => attribute.name.name === 'monochrome',
    );
    const isMonochromeValid = monochrome?.value === null;
    const primary = jsxAttributes.find(
      (attribute) => attribute.name.name === 'primary',
    );
    const isPrimaryValid = primary?.value === null;
    const primarySuccess = jsxAttributes.find(
      (attribute) => attribute.name.name === 'primarySuccess',
    );
    const isPrimarySuccessValid = primarySuccess?.value === null;
    const outline = jsxAttributes.find(
      (attribute) => attribute.name.name === 'outline',
    );
    const isOutlineValid = outline?.value === null;
    const destructive = jsxAttributes.find(
      (attribute) => attribute.name.name === 'destructive',
    );
    const isDestructiveValid = destructive?.value === null;

    // A collection of the booleans that will be updated to a variant
    const variantAttributes = [
      plain,
      monochrome,
      primary,
      outline,
      primarySuccess,
    ].filter(Boolean);

    // Set flags
    let canRemovePlain = false;
    let canRemoveMonochrome = false;
    let canRemovePrimary = false;
    let canRemoveOutline = false;
    let canRemovePrimarySuccess = false;
    let canRemoveDestructive = false;
    let variantValue = '';
    let toneValue = '';

    // Checks for combinations
    const isPrimaryAndPlain =
      plain && primary && isPlainValid && isPrimaryValid;
    const isPrimaryAndDestructive =
      primary && destructive && isPrimaryValid && isDestructiveValid;
    const isPlainAndMonochrome =
      plain && monochrome && isPlainValid && isMonochromeValid;
    const isPlainAndDestructive =
      plain && destructive && isPlainValid && isDestructiveValid;
    const isMonochromeAndOutline =
      monochrome && outline && isMonochromeValid && isOutlineValid;
    const isOutlineAndDestructive =
      outline && destructive && isOutlineValid && isDestructiveValid;

    if (plain) {
      if (variantAttributes.length > 2) {
        insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
        return;
      }
      if (isPrimaryAndPlain) {
        canRemovePlain = true;
        canRemovePrimary = true;
        variantValue = 'tertiary';
      } else if (isPlainAndMonochrome) {
        canRemovePlain = true;
        canRemoveMonochrome = true;
        variantValue = 'monochromePlain';
      } else if (isPlainAndDestructive) {
        canRemovePlain = true;
        canRemoveDestructive = true;
        variantValue = 'plain';
        toneValue = 'critical';
      } else if (plain && isPlainValid) {
        canRemovePlain = true;
        variantValue = 'plain';
      } else {
        insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
        return;
      }
    }

    if (monochrome) {
      if (variantAttributes.length > 2) {
        insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
        return;
      }
      if (isMonochromeAndOutline) {
        canRemoveMonochrome = true;
        canRemoveOutline = true;
      } else if (isPlainAndMonochrome) {
        canRemovePlain = true;
        canRemoveMonochrome = true;
        variantValue = 'monochromePlain';
      } else if (monochrome && isMonochromeValid) {
        canRemoveMonochrome = true;
      } else {
        insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
        return;
      }
    }

    if (primary) {
      if (variantAttributes.length > 2) {
        insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
        return;
      }
      if (isPrimaryAndPlain) {
        canRemovePlain = true;
        canRemovePrimary = true;
        variantValue = 'tertiary';
      } else if (isPrimaryAndDestructive) {
        canRemovePrimary = true;
        canRemoveDestructive = true;
        variantValue = 'primary';
        toneValue = 'critical';
      } else if (primary && isPrimaryValid) {
        canRemovePrimary = true;
        variantValue = 'primary';
      } else {
        insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
        return;
      }
    }

    if (outline) {
      if (variantAttributes.length > 2) {
        insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
        return;
      }
      if (isOutlineAndDestructive) {
        canRemoveOutline = true;
        canRemoveDestructive = true;
        toneValue = 'critical';
      } else if (isMonochromeAndOutline) {
        canRemoveMonochrome = true;
        canRemoveOutline = true;
      } else if (outline && isOutlineValid) {
        canRemoveOutline = true;
      } else {
        insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
        return;
      }
    }

    if (primarySuccess) {
      if (variantAttributes.length > 2) {
        insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
        return;
      }
      if (primarySuccess && isPrimarySuccessValid) {
        canRemovePrimarySuccess = true;
        variantValue = 'primary';
        toneValue = 'success';
      } else {
        insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
        return;
      }
    }

    if (destructive) {
      if (isPlainAndDestructive) {
        canRemovePlain = true;
        canRemoveDestructive = true;
        variantValue = 'plain';
        toneValue = 'critical';
      } else if (isOutlineAndDestructive) {
        canRemoveOutline = true;
        canRemoveDestructive = true;
        toneValue = 'critical';
      } else if (isPrimaryAndDestructive) {
        canRemovePrimary = true;
        canRemoveDestructive = true;
        variantValue = 'primary';
        toneValue = 'critical';
      } else if (
        destructive &&
        isDestructiveValid &&
        variantAttributes.length === 0
      ) {
        canRemoveDestructive = true;
        toneValue = 'critical';
        variantValue = 'primary';
      } else if (destructive && isDestructiveValid) {
        canRemoveDestructive = true;
        toneValue = 'critical';
      } else {
        insertJSXComment(j, element, POLARIS_MIGRATOR_COMMENT);
        return;
      }
    }

    // Remove the boolean attributes based on the checks
    if (plain && canRemovePlain) {
      plain.name.name = '';
      plain.value = null;
    }

    if (monochrome && canRemoveMonochrome) {
      monochrome.name.name = '';
      monochrome.value = null;
    }

    if (primary && canRemovePrimary) {
      primary.name.name = '';
      primary.value = null;
    }

    if (outline && canRemoveOutline) {
      outline.name.name = '';
      outline.value = null;
    }

    if (primarySuccess && canRemovePrimarySuccess) {
      primarySuccess.name.name = '';
      primarySuccess.value = null;
    }

    if (destructive && canRemoveDestructive) {
      destructive.name.name = '';
      destructive.value = null;
    }

    // Add the variant attribute based on the checks
    if (variantValue && openingElement && openingElement.attributes) {
      openingElement.attributes.push(
        j.jsxAttribute(
          j.jsxIdentifier('variant'),
          j.stringLiteral(variantValue),
        ),
      );
    }

    // Add the tone attribute based on the checks
    if (toneValue && openingElement && openingElement.attributes) {
      openingElement.attributes.push(
        j.jsxAttribute(j.jsxIdentifier('tone'), j.stringLiteral(toneValue)),
      );
    }
  });

  source
    .find(j.Identifier)
    .filter(
      (path) =>
        path.node.name === localElementName ||
        path.node.name === localElementTypeName ||
        path.node.name === localFunctionName ||
        path.node.name === localFunctionPluralName,
    )
    .forEach((path) => {
      if (path.node.type !== 'Identifier') return;

      if (
        path.parent.value.type === 'ImportSpecifier' ||
        path.parent.value.type === 'MemberExpression'
      ) {
        return;
      }

      insertCommentBefore(j, path, POLARIS_MIGRATOR_COMMENT);
    });
  return source.toSource();
}
