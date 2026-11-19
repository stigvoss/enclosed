import { makePersisted } from '@solid-primitives/storage';
import { createSignal } from 'solid-js';

// Whether the note content is displayed with long lines wrapped, remembered in this browser only
export function useWordWrapPreference() {
  const [getIsWordWrapEnabled, setIsWordWrapEnabled] = makePersisted(createSignal(true), { name: 'enclosed_word_wrap', storage: localStorage });

  return {
    getIsWordWrapEnabled,
    toggleWordWrap: () => setIsWordWrapEnabled(isEnabled => !isEnabled),
  };
}
