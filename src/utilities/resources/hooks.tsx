import {useContext, useState, useCallback} from 'react';
import {
  ResourceManagerForEmptyStateContext,
  ResourceManagerForHeaderContext,
  ResourceManagerForListContext,
  ResourceManagerForItemContext,
} from './context';
import {MissingResourceManagerError, ResourceSelectionError} from './errors';
import {SelectionType, ResourceIDResolver} from './types';

export function useResourceManagerForEmptyState() {
  const context = useContext(ResourceManagerForEmptyStateContext);

  if (!context) throw new MissingResourceManagerError();

  return context;
}

export function useResourceManagerForHeader() {
  const context = useContext(ResourceManagerForHeaderContext);

  if (!context) throw new MissingResourceManagerError();

  return context;
}

export function useResourceManagerForList() {
  const context = useContext(ResourceManagerForListContext);

  if (!context) throw new MissingResourceManagerError();

  return context;
}

export function useResourceManagerForItem() {
  const context = useContext(ResourceManagerForItemContext);

  if (!context) throw new MissingResourceManagerError();

  return context;
}

function defaultResourceIDResolver<T extends {[key: string]: any}>(
  resource: T,
): string {
  if ('id' in resource) {
    return resource.id;
  }

  throw new ResourceSelectionError(
    'Your resource does not directly contain an `id`. Pass a `resourceIDResolver` to `useResourceSelection`',
  );
}

export function useResourceSelection<T extends {}>(
  resources: T[],
  {
    selectedResources: initSelectedResources = [],
    allResourcesSelected: initAllResourcesSelected = false,
    resourceIDResolver = defaultResourceIDResolver,
  }: {
    selectedResources?: string[];
    allResourcesSelected?: boolean;
    resourceIDResolver?: typeof defaultResourceIDResolver | ResourceIDResolver;
  } = {
    selectedResources: [],
    allResourcesSelected: false,
    resourceIDResolver: defaultResourceIDResolver,
  },
) {
  const [selectedResources, setSelectedResources] = useState(
    initSelectedResources,
  );
  const [allResourcesSelected, setAllResourcesSelected] = useState(
    initAllResourcesSelected,
  );

  const handleSelectionChange = useCallback(
    (
      selectionType: SelectionType,
      isSelecting: boolean,
      selection?: string | [number, number],
    ) => {
      if (selectionType === SelectionType.All) {
        setAllResourcesSelected(isSelecting);
      } else if (allResourcesSelected) {
        setAllResourcesSelected(false);
      }

      switch (selectionType) {
        case SelectionType.Single:
          setSelectedResources((currentSelectedResources) =>
            isSelecting
              ? [...currentSelectedResources, selection as string]
              : currentSelectedResources.filter((id) => id !== selection),
          );
          break;
        case SelectionType.All:
        case SelectionType.Page:
          setSelectedResources(
            isSelecting ? resources.map(resourceIDResolver) : [],
          );
          break;
        case SelectionType.Multi:
          setSelectedResources((currentSelectedResources) => {
            const ids: string[] = [];

            if (isRange(selection)) {
              for (let i = selection[0] as number; i <= selection[1]; i++) {
                const id = resourceIDResolver(resources[i]);

                if (
                  (isSelecting && !currentSelectedResources.includes(id)) ||
                  (!isSelecting && currentSelectedResources.includes(id))
                ) {
                  ids.push(id);
                }
              }
            }

            return isSelecting
              ? [...currentSelectedResources, ...ids]
              : currentSelectedResources.filter((id) => !ids.includes(id));
          });
          break;
      }
    },
    [allResourcesSelected, resourceIDResolver, resources],
  );

  return {selectedResources, allResourcesSelected, handleSelectionChange};
}

function isRange(selection: any | Range): selection is Range {
  return (
    Array.isArray(selection) &&
    typeof selection[0] === 'number' &&
    typeof selection[1] === 'number'
  );
}
