import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {
  useIndexResourceState,
  SelectionType,
} from '../use-index-resource-state';

interface TypedChildProps {
  onClick: ReturnType<typeof useIndexResourceState>['handleSelectionChange'];
  allResourcesSelected: ReturnType<
    typeof useIndexResourceState
  >['allResourcesSelected'];
  selectedResources: ReturnType<
    typeof useIndexResourceState
  >['selectedResources'];
}

describe('useIndexResourceState', () => {
  function TypedChild(_: TypedChildProps) {
    return null;
  }

  function MockComponent<T extends {[key: string]: unknown}>({
    resources = [],
    options,
  }: {
    resources?: T[];
    options?: Parameters<typeof useIndexResourceState>[1];
  }) {
    const {selectedResources, allResourcesSelected, handleSelectionChange} =
      useIndexResourceState(resources, options);

    return (
      <TypedChild
        onClick={handleSelectionChange}
        selectedResources={selectedResources}
        allResourcesSelected={allResourcesSelected}
      />
    );
  }

  function MockClearComponent<T extends {[key: string]: unknown}>({
    resources = [],
    options,
  }: {
    resources?: T[];
    options?: Parameters<typeof useIndexResourceState>[1];
  }) {
    const {selectedResources, allResourcesSelected, clearSelection} =
      useIndexResourceState(resources, options);

    return (
      <TypedChild
        onClick={clearSelection}
        selectedResources={selectedResources}
        allResourcesSelected={allResourcesSelected}
      />
    );
  }

  describe('options', () => {
    it('defaults selected resources to an empty list', () => {
      const mockComponent = mountWithApp(<MockComponent />);

      expect(mockComponent).toContainReactComponent(TypedChild, {
        selectedResources: [],
      });
    });

    it('accepts initial selected resources', () => {
      const initialResources = ['1'];
      const mockComponent = mountWithApp(
        <MockComponent options={{selectedResources: initialResources}} />,
      );

      expect(mockComponent).toContainReactComponent(TypedChild, {
        selectedResources: initialResources,
      });
    });

    it('defaults all resources selected to an empty list', () => {
      const mockComponent = mountWithApp(<MockComponent />);

      expect(mockComponent).toContainReactComponent(TypedChild, {
        allResourcesSelected: false,
      });
    });

    it('accepts initial all resources selected', () => {
      const initialAllResourcesSelected = true;
      const mockComponent = mountWithApp(
        <MockComponent
          options={{allResourcesSelected: initialAllResourcesSelected}}
        />,
      );

      expect(mockComponent).toContainReactComponent(TypedChild, {
        allResourcesSelected: initialAllResourcesSelected,
      });
    });

    it('defaults id resolver to `resource.id`', () => {
      const selectedID = '1';
      const resources = [{id: selectedID}];
      const mockComponent = mountWithApp(
        <MockComponent resources={resources} />,
      );

      mockComponent
        .find(TypedChild)!
        .trigger('onClick', SelectionType.Page, true);

      expect(mockComponent).toContainReactComponent(TypedChild, {
        selectedResources: [selectedID],
      });
    });

    it('throws an error when the default resolve cannot accept `resource.id`', () => {
      function throwResourceSelectionError() {
        const selectedID = '1';
        const resources = [{node: {id: selectedID}}];
        const mockComponent = mountWithApp(
          <MockComponent resources={resources} />,
        );

        mockComponent
          .find(TypedChild)!
          .trigger('onClick', SelectionType.Page, true);
      }

      expect(throwResourceSelectionError).toThrow(
        'Your resource does not directly contain an `id`. Pass a `resourceIDResolver` to `useIndexResourceState`',
      );
    });

    it('accepts a custom id resolver', () => {
      const selectedID = '1';
      const resources = [{node: {id: selectedID}}];
      const customIDResolver = (resource: {node: {id: string}}) =>
        resource.node.id;
      const mockComponent = mountWithApp(
        <MockComponent
          resources={resources}
          options={{resourceIDResolver: customIDResolver}}
        />,
      );

      mockComponent
        .find(TypedChild)!
        .trigger('onClick', SelectionType.Page, true);

      expect(mockComponent).toContainReactComponent(TypedChild, {
        selectedResources: [selectedID],
      });
    });

    it('defaults resource filter to undefined', () => {
      const selectedID = '1';
      const resources = [{id: selectedID}];
      const mockComponent = mountWithApp(
        <MockComponent resources={resources} />,
      );

      mockComponent
        .find(TypedChild)!
        .trigger('onClick', SelectionType.Page, true);

      expect(mockComponent).toContainReactComponent(TypedChild, {
        selectedResources: [selectedID],
      });
    });

    it('accepts a custom resource filter', () => {
      const selectedID = '1';
      const resources = [{id: selectedID}, {id: '2'}];
      const customResoureFilter = (item: typeof resources[0]) => {
        return item.id === selectedID;
      };
      const mockComponent = mountWithApp(
        <MockComponent
          resources={resources}
          options={{resourceFilter: customResoureFilter}}
        />,
      );

      mockComponent
        .find(TypedChild)!
        .trigger('onClick', SelectionType.Page, true);

      expect(mockComponent).toContainReactComponent(TypedChild, {
        selectedResources: [selectedID],
      });
    });
  });

  describe('handleSelectionChange', () => {
    describe('allResourcesSelected', () => {
      it('sets all resources selected true when SelectionType === All & isSelecting is true', () => {
        const mockComponent = mountWithApp(<MockComponent />);

        mockComponent
          .find(TypedChild)!
          .trigger('onClick', SelectionType.All, true);

        expect(mockComponent).toContainReactComponent(TypedChild, {
          allResourcesSelected: true,
        });
      });

      it('sets all resources selected false when SelectionType === All & isSelecting is false', () => {
        const mockComponent = mountWithApp(
          <MockComponent options={{allResourcesSelected: true}} />,
        );

        mockComponent
          .find(TypedChild)!
          .trigger('onClick', SelectionType.All, false);

        expect(mockComponent).toContainReactComponent(TypedChild, {
          allResourcesSelected: false,
        });
      });

      it('sets all resources selected false when allResouecesSelected is true & a selection is made that is not SelectionType === All', () => {
        const mockComponent = mountWithApp(
          <MockComponent options={{allResourcesSelected: true}} />,
        );

        mockComponent
          .find(TypedChild)!
          .trigger('onClick', SelectionType.Single, false, '1');

        expect(mockComponent).toContainReactComponent(TypedChild, {
          allResourcesSelected: false,
        });
      });
    });

    describe('SelectionType.Single', () => {
      it('selects a single resources', () => {
        const id = '1';
        const resources = [{id}];
        const mockComponent = mountWithApp(
          <MockComponent resources={resources} />,
        );

        mockComponent
          .find(TypedChild)!
          .trigger('onClick', SelectionType.Single, true, id);

        expect(mockComponent).toContainReactComponent(TypedChild, {
          selectedResources: [id],
        });
      });

      it('deselects a single resources', () => {
        const id = '1';
        const resources = [{id}];
        const mockComponent = mountWithApp(
          <MockComponent
            resources={resources}
            options={{selectedResources: [id]}}
          />,
        );

        mockComponent
          .find(TypedChild)!
          .trigger('onClick', SelectionType.Single, false, id);

        expect(mockComponent).toContainReactComponent(TypedChild, {
          selectedResources: [],
        });
      });
    });

    describe('SelectionType.All', () => {
      describe('with a custom resource filter', () => {
        it('only selects resources that match the filter', () => {
          const idOne = '1';
          const idTwo = '2';
          const resources = [{id: idOne}, {id: idTwo}];
          const customResoureFilter = (item: typeof resources[0]) => {
            return item.id === idOne;
          };
          const mockComponent = mountWithApp(
            <MockComponent
              resources={resources}
              options={{resourceFilter: customResoureFilter}}
            />,
          );

          mockComponent
            .find(TypedChild)!
            .trigger('onClick', SelectionType.All, true);

          expect(mockComponent).toContainReactComponent(TypedChild, {
            selectedResources: [idOne],
          });
        });
      });

      it('selects all resources', () => {
        const idOne = '1';
        const idTwo = '2';
        const resources = [{id: idOne}, {id: idTwo}];
        const mockComponent = mountWithApp(
          <MockComponent resources={resources} />,
        );

        mockComponent
          .find(TypedChild)!
          .trigger('onClick', SelectionType.All, true);

        expect(mockComponent).toContainReactComponent(TypedChild, {
          selectedResources: [idOne, idTwo],
        });
      });

      it('deselects all resources', () => {
        const idOne = '1';
        const idTwo = '2';
        const resources = [{id: idOne}, {id: idTwo}];
        const mockComponent = mountWithApp(
          <MockComponent
            resources={resources}
            options={{selectedResources: [idOne, idTwo]}}
          />,
        );

        mockComponent
          .find(TypedChild)!
          .trigger('onClick', SelectionType.All, false);

        expect(mockComponent).toContainReactComponent(TypedChild, {
          selectedResources: [],
        });
      });
    });

    describe('SelectionType.Page', () => {
      describe('with a custom resource filter', () => {
        it('only selects resources that match the filter', () => {
          const idOne = '1';
          const idTwo = '2';
          const resources = [{id: idOne}, {id: idTwo}];
          const customResoureFilter = (item: typeof resources[0]) => {
            return item.id === idOne;
          };
          const mockComponent = mountWithApp(
            <MockComponent
              resources={resources}
              options={{resourceFilter: customResoureFilter}}
            />,
          );

          mockComponent
            .find(TypedChild)!
            .trigger('onClick', SelectionType.All, true);

          expect(mockComponent).toContainReactComponent(TypedChild, {
            selectedResources: [idOne],
          });
        });
      });

      it('selects all resources', () => {
        const idOne = '1';
        const idTwo = '2';
        const resources = [{id: idOne}, {id: idTwo}];
        const mockComponent = mountWithApp(
          <MockComponent resources={resources} />,
        );

        mockComponent
          .find(TypedChild)!
          .trigger('onClick', SelectionType.Page, true);

        expect(mockComponent).toContainReactComponent(TypedChild, {
          selectedResources: [idOne, idTwo],
        });
      });

      it('deselects all resources', () => {
        const idOne = '1';
        const idTwo = '2';
        const resources = [{id: idOne}, {id: idTwo}];
        const mockComponent = mountWithApp(
          <MockComponent
            resources={resources}
            options={{selectedResources: [idOne, idTwo]}}
          />,
        );

        mockComponent
          .find(TypedChild)!
          .trigger('onClick', SelectionType.Page, false);

        expect(mockComponent).toContainReactComponent(TypedChild, {
          selectedResources: [],
        });
      });
    });

    describe('SelectionType.Multi', () => {
      describe('with a custom resource filter', () => {
        it('only selects resources that match the filter', () => {
          const idOne = '1';
          const idTwo = '2';
          const idThree = '3';
          const resources = [{id: idOne}, {id: idTwo}, {id: idThree}];
          const customResoureFilter = (item: typeof resources[0]) => {
            return item.id === idOne;
          };
          const mockComponent = mountWithApp(
            <MockComponent
              resources={resources}
              options={{resourceFilter: customResoureFilter}}
            />,
          );

          mockComponent
            .find(TypedChild)!
            .trigger('onClick', SelectionType.Multi, true, [0, 1]);

          expect(mockComponent).toContainReactComponent(TypedChild, {
            selectedResources: [idOne],
          });
        });
      });

      it('has no effect if selection is undefined', () => {
        const selectedResources = ['1', '2'];
        const mockComponent = mountWithApp(
          <MockComponent options={{selectedResources}} />,
        );

        mockComponent
          .find(TypedChild)!
          .trigger('onClick', SelectionType.Multi, true);

        expect(mockComponent).toContainReactComponent(TypedChild, {
          selectedResources,
        });
      });

      it('selects all resources between selection', () => {
        const idOne = '1';
        const idTwo = '2';
        const idThree = '3';
        const resources = [{id: idOne}, {id: idTwo}, {id: idThree}];
        const mockComponent = mountWithApp(
          <MockComponent resources={resources} />,
        );

        mockComponent
          .find(TypedChild)!
          .trigger('onClick', SelectionType.Multi, true, [0, 1]);

        expect(mockComponent).toContainReactComponent(TypedChild, {
          selectedResources: [idOne, idTwo],
        });
      });

      it('deselects all resources between selection', () => {
        const idOne = '1';
        const idTwo = '2';
        const idThree = '3';
        const resources = [{id: idOne}, {id: idTwo}, {id: idThree}];
        const mockComponent = mountWithApp(
          <MockComponent
            resources={resources}
            options={{selectedResources: [idOne, idTwo, idThree]}}
          />,
        );

        mockComponent
          .find(TypedChild)!
          .trigger('onClick', SelectionType.Multi, false, [0, 1]);

        expect(mockComponent).toContainReactComponent(TypedChild, {
          selectedResources: [idThree],
        });
      });
    });
  });

  describe('clearSelection', () => {
    it('clears the selection correctly', () => {
      const idOne = '1';
      const idTwo = '2';
      const idThree = '3';
      const resources = [{id: idOne}, {id: idTwo}, {id: idThree}];
      const mockComponent = mountWithApp(
        <MockClearComponent
          resources={resources}
          options={{selectedResources: [idOne, idTwo, idThree]}}
        />,
      );

      mockComponent.find(TypedChild)!.trigger('onClick');

      expect(mockComponent).toContainReactComponent(TypedChild, {
        selectedResources: [],
      });
    });
  });
});
