import React from 'react';

type SectionContextType = {
  sectionId: string | undefined;
};

export const SectionContext = React.createContext<SectionContextType>({
  sectionId: undefined,
});
