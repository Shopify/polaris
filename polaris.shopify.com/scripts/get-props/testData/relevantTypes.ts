import {Animal} from './enums';

type Relationship = Friend | Family;

type Friend = 1;
type Family = Close | Extended;

type Close = 2;
type Extended = 3;

type Unused = 4;

// Intentionally the same same as in interfaces.ts.
// We want the script to handle colliding type names.
interface InterfaceProps {
  relationship: Relationship;
  imported: Animal;
  // The referenced type, "Animal", should be extracted
  referenced: TypeToBeReferenced['animal'];
}

type TypeToBeReferenced = {
  animal: Animal;
};
