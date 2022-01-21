/* eslint-disable camelcase */

import { Language } from '@crc/shared';

export const identomatBody = (language: Language): Record<string, any> => {
  return {
    liveness: {
      skip_desktop: true,
      liveness: false,
      general_document_types: [],
      server: 'computer',
      skip_agreement: true,
      document_types: ['id', 'passport'],
      platform: 'desktop',
      language
    },
    selfie: {
      allow_document_upload: true,
      disable_document_capture: true,
      skip_document: false,
      allow_face_doc_upload: true,
      skip_face: true,
      allow_general_document_upload: false,
      allow_face_upload: true,
      require_face_document: false,
      allow_general_document_capture: false,
      liveness: false,
      general_document_types: [],
      server: 'computer',
      skip_agreement: true,
      document_types: ['id', 'passport'],
      language
    }
  };
};
