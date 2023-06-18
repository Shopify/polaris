import {useContext} from 'react';
import {StateContext} from '../App/App';
import {Dialog} from '@headlessui/react';
import {components} from '../../components';
import styles from './LayerAdder.module.scss';
import {
  className,
  getPropDefinition,
  propDefinitionHasUnparsableRequiredProps,
} from '../../utils';

interface Props {}

function LayerAdder({}: Props) {
  const {state, dispatch} = useContext(StateContext);

  const {layerAdderVisibility} = state;

  if (layerAdderVisibility === false) return null;
  return (
    <div className={styles.LayerAdder}>
      <Dialog
        open={state.layerAdderVisibility !== false}
        onClose={() => dispatch({type: 'HIDE_LAYER_ADDER'})}
      >
        <Dialog.Panel
          className={className(
            styles.LayerAdderModal,
            'reset-non-canvas-styles',
          )}
        >
          {/* <Dialog.Title>Add layer</Dialog.Title> */}

          <div className={styles.Layers}>
            <>
              {Object.entries(components)
                .sort((a, b) => a[0].localeCompare(b[0]))
                .map(([name, component]) => {
                  const handleClick = () => {
                    dispatch({
                      type: 'ADD_LAYER',
                      componentName: name,
                      parent: layerAdderVisibility,
                    });

                    dispatch({type: 'HIDE_LAYER_ADDER'});
                  };

                  const hasUnparsable =
                    propDefinitionHasUnparsableRequiredProps(component.props);

                  return (
                    <div key={name} style={{position: 'relative'}}>
                      <button onClick={handleClick}>
                        {name}{' '}
                        {hasUnparsable && <span style={{color: 'red'}}>!</span>}
                      </button>
                    </div>
                  );
                })}
            </>
          </div>
          {/*
          <button onClick={() => dispatch({type: 'HIDE_LAYER_ADDER'})}>
            Cancel
          </button> */}
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}

export default LayerAdder;
