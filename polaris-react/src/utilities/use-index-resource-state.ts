import {useState, useCallback, useEffect, useRef} from 'react';
import isEqual from 'react-fast-compare';

export enum SelectionType {
  All = 'all',
  Page = 'page',
  Multi = 'multi',
  Single = 'single',
  Range = 'range',
}
type Range = [number, number];
type ResourceIDResolver<T extends {[key: string]: unknown}> = (
  resource: T,
) => string;

function defaultResourceIDResolver(resource: {[key: string]: any}): string {
  if ('id' in resource) {
    return resource.id;
  }

  throw new Error(
    'Your resource does not directly contain an `id`. Pass a `resourceIDResolver` to `useIndexResourceState`',
  );
}

export function useIndexResourceState<T extends {[key: string]: unknown}>(
  resources: readonly T[],
  {
    selectedResources: preCheckedResources = [],
    allResourcesSelected: initAllResourcesSelected = false,
    resourceIDResolver = defaultResourceIDResolver,
    resourceFilter = undefined,
  }: {
    selectedResources?: readonly string[];
    allResourcesSelected?: boolean;
    resourceIDResolver?: ResourceIDResolver<T>;
    resourceFilter?: (value: T, index: number) => boolean;
  } = {
    selectedResources: [],
    allResourcesSelected: false,
    resourceIDResolver: defaultResourceIDResolver,
    resourceFilter: undefined,
  },
) {
  const [selectedResources, setSelectedResources] = useState<
    ReadonlySet<string>
  >(new Set(preCheckedResources));
  const [allResourcesSelected, setAllResourcesSelected] = useState(
    initAllResourcesSelected,
  );
  const [unselectedResources, setUnselectedResources] = useState<
    ReadonlySet<string>
  >(new Set());
  const [dirty, setDirty] = useState(false);

  const prevPreCheckedResourcesRef = useRef(preCheckedResources);
  const initialSelectedResources = useRef(selectedResources);
  const initialUnselectedResources = useRef(unselectedResources);

  useEffect(() => {
    if (!isEqual(prevPreCheckedResourcesRef.current, preCheckedResources)) {
      const filteredResources = dirty
        ? preCheckedResources.filter(
            (resource) => !unselectedResources.has(resource),
          )
        : preCheckedResources;

      setSelectedResources(new Set(filteredResources));
      prevPreCheckedResourcesRef.current = preCheckedResources;
    }
  }, [dirty, preCheckedResources, unselectedResources]);

  useEffect(() => {
    if (
      dirty &&
      isEqual(initialSelectedResources.current, selectedResources) &&
      isEqual(initialUnselectedResources.current, unselectedResources)
    ) {
      setDirty(false);
    }
  }, [dirty, selectedResources, unselectedResources]);

  useEffect(() => {
    return () => {
      setDirty(false);
    };
  }, []);

  const handleSelectionChange = useCallback(
    (
      selectionType: SelectionType,
      isSelecting: boolean,
      selection?: string | Range,
      // This is not used in the function, but needed to keep the type compatible with IndexProviderProps onSelectionChange
      _position?: number,
    ) => {
      if (!dirty) {
        setDirty(true);
      }

      if (selectionType === SelectionType.All) {
        setAllResourcesSelected(isSelecting);
      } else if (allResourcesSelected) {
        setAllResourcesSelected(false);
      }

      switch (selectionType) {
        case SelectionType.Single:
          if (typeof selection !== 'string') break;

          setSelectedResources((currentSelectedResources) => {
            const newSelectedResources = new Set(currentSelectedResources);
            const newUnselectedResources = new Set(unselectedResources);
            const [resourcesToAddTo, resourcesToRemoveFrom] = isSelecting
              ? [newSelectedResources, newUnselectedResources]
              : [newUnselectedResources, newSelectedResources];

            resourcesToAddTo.add(selection);
            resourcesToRemoveFrom.delete(selection);

            setUnselectedResources(newUnselectedResources);
            return newSelectedResources;
          });
          break;

        case SelectionType.All:
        case SelectionType.Page: {
          const resourceList = resourceFilter
            ? resources.filter(resourceFilter)
            : resources;
          const mappedResources = new Set(resourceList.map(resourceIDResolver));

          const hasRoomForMoreSelection =
            isSelecting && selectedResources.size < resourceList.length;

          setSelectedResources(
            hasRoomForMoreSelection || isSelecting
              ? mappedResources
              : new Set(),
          );
          setUnselectedResources(
            hasRoomForMoreSelection || isSelecting
              ? new Set()
              : mappedResources,
          );
          break;
        }
        case SelectionType.Multi:
          if (!selection) break;

          setSelectedResources((currentSelectedResources) => {
            const ids: Set<string> = new Set();
            const filteredResourcesSet = new Set(
              resourceFilter ? resources.filter(resourceFilter) : resources,
            );

            for (
              let i = selection[0] as number;
              i <= (selection[1] as number);
              i++
            ) {
              if (filteredResourcesSet.has(resources[i])) {
                const id = resourceIDResolver(resources[i]);

                if (
                  (isSelecting && !currentSelectedResources.has(id)) ||
                  (!isSelecting && currentSelectedResources.has(id))
                ) {
                  ids.add(id);
                }
              }
            }

            const newSelectedResources = new Set(currentSelectedResources);
            const newUnselectedResources = new Set(unselectedResources);

            ids.forEach((id) => {
              if (isSelecting) {
                newSelectedResources.add(id);
                newUnselectedResources.delete(id);
              } else {
                newSelectedResources.delete(id);
                newUnselectedResources.add(id);
              }
            });

            setUnselectedResources(newUnselectedResources);
            return newSelectedResources;
          });

          break;
        case SelectionType.Range:
          if (!selection) break;

          setSelectedResources((currentSelectedResources) => {
            const filteredResources = resourceFilter
              ? resources.filter(resourceFilter)
              : resources;

            const resourceIds = filteredResources.map(resourceIDResolver);

            const selectedIds = resourceIds.slice(
              Number(selection[0]),
              Number(selection[1]) + 1,
            );

            const isIndeterminate = selectedIds.some((id) =>
              selectedResources.has(id),
            );

            const isChecked = selectedIds.every((id) =>
              selectedResources.has(id),
            );

            const isSelectingAllInRange =
              !isChecked && (isSelecting || isIndeterminate);

            const newSelectedResources = new Set(currentSelectedResources);
            const newUnselectedResources = new Set(unselectedResources);

            selectedIds.forEach((id) => {
              if (isSelectingAllInRange) {
                newSelectedResources.add(id);
                newUnselectedResources.delete(id);
              } else {
                newSelectedResources.delete(id);
                newUnselectedResources.add(id);
              }
            });

            setUnselectedResources(newUnselectedResources);
            return newSelectedResources;
          });
          break;
      }
    },
    [
      dirty,
      allResourcesSelected,
      resourceFilter,
      unselectedResources,
      resources,
      selectedResources,
      resourceIDResolver,
    ],
  );

  const clearSelection = useCallback(() => {
    setSelectedResources(new Set());
    setUnselectedResources(new Set());
    setAllResourcesSelected(false);
  }, []);

  const removeSelectedResources = useCallback(
    (removeResources: readonly string[]) => {
      const removeResourcesSet = new Set(removeResources);

      const newSelectedResources = [...selectedResources].filter(
        (resource) => !removeResourcesSet.has(resource),
      );

      setSelectedResources(new Set(newSelectedResources));

      if (newSelectedResources.length === 0) {
        setAllResourcesSelected(false);
      }
    },
    [selectedResources],
  );

  return {
    unselectedResources: [...unselectedResources],
    selectedResources: [...selectedResources],
    allResourcesSelected,
    dirty,
    handleSelectionChange,
    clearSelection,
    removeSelectedResources,
  } as const;
}
