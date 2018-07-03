export const ASSESSMENT_TYPE = {
  MC: 'multiple-choice',
  MQ: 'matching-question',
  SC: 'single-choice',
  TF: 'true-false',
  NR: 'numerical-response',
  TR: 'text-response',
  FB: 'fill-blank',
  DD: 'drag-drop'
};

export const TE_TYPE = {
  BREAK: 'te-break',
  EMBED: 'te-embed',
  HTML: 'te-html',
  IMAGE: 'te-image',
  ASSESSMENT: 'te-assessment',
  VIDEO: 'te-video',
  ACCORDION: 'te-accordion',
  CAROUSEL: 'te-carousel',
  MODAL: 'te-modal',
  TABLE: 'te-table',
  PDF: 'te-pdf',
  BRIGHTCOVE_VIDEO: 'te-brightcove-video'
};

export const subTypeInfo = {
  MC: {
    type: 'MC',
    title: 'Multiple choice',
    class: 'multiple-choice',
    helperText: 'Select the choice(s) that best answers the question below.',
    feedback: true
  },
  SC: {
    type: 'SC',
    title: 'Single choice',
    class: 'single-choice',
    helperText: 'Select one choice that best answers the question below.',
    feedback: true
  },
  TR: {
    type: 'TR',
    title: 'Text response',
    class: 'text-response',
    helperText: 'Enter text into the empty field below and submit your answer to see the suggested answer.',
    feedback: true,
    allowRetake: false
  },
  NR: {
    type: 'NR',
    title: 'Numerical response',
    class: 'numerical-response',
    helperText: 'Enter a number in the field below.',
    feedback: false
  },
  TF: {
    type: 'TF',
    title: 'True - false',
    class: 'true-false',
    helperText: 'Answer the question with true or false.',
    feedback: true
  },
  FB: {
    type: 'FB',
    title: 'Fill in the blank',
    class: 'fill-blank',
    helperText: 'Enter text into the empty field(s) below and submit your answer for feedback.'
  },
  DD: {
    type: 'DD',
    title: 'Drag & Drop',
    class: 'drag-drop',
    helperText: 'Group items by dragging them into their corresponding boxes.'
  },
  MQ: {
    type: 'MQ',
    title: 'Matching question',
    class: 'matching-question',
    helperText: 'Match items by dragging and dropping each item into the corresponding box.'
  }
};
