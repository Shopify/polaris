export enum EditableTargets {
  INPUT = 'INPUT',
  TEXTAREA = 'TEXTAREA',
  SELECT = 'SELECT',
  CONTENT_EDITABLE = 'contenteditable',
}

const {INPUT, TEXTAREA, SELECT, CONTENT_EDITABLE} = EditableTargets;

function isInputFocused() {
  if (document == null) {
    return false;
  }

  const {tagName} = document.activeElement;
  return (
    tagName === INPUT ||
    tagName === TEXTAREA ||
    tagName === SELECT ||
    document.activeElement.hasAttribute(CONTENT_EDITABLE)
  );
}

export default isInputFocused;
