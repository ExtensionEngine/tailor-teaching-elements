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
  AUDIO: 'te-audio',
  BREAK: 'te-break',
  EMBED: 'te-embed',
  HTML: 'te-html',
  FILE: 'te-file',
  IMAGE: 'te-image',
  ASSESSMENT: 'te-assessment',
  REFLECTION: 'te-reflection',
  VIDEO: 'te-video',
  ACCORDION: 'te-accordion',
  CAROUSEL: 'te-carousel',
  JODIT_HTML: 'te-jodit-html',
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
    helperText: 'Choose from the options below. Select all that apply.',
    feedback: true
  },
  SC: {
    type: 'SC',
    title: 'Single choice',
    class: 'single-choice',
    helperText: 'Select the one option below that best answers the question.',
    feedback: true
  },
  TR: {
    type: 'TR',
    title: 'Text response',
    class: 'text-response',
    helperText: 'Type your response in the box below.',
    feedback: true,
    allowRetake: false
  },
  NR: {
    type: 'NR',
    title: 'Numerical response',
    class: 'numerical-response',
    helperText: 'Enter a number in the box below. Note: use only whole numbers or decimals (e.g, 3.14); do not use commas.',
    feedback: false
  },
  TF: {
    type: 'TF',
    title: 'True - false',
    class: 'true-false',
    helperText: 'Select true or false.',
    feedback: true
  },
  FB: {
    type: 'FB',
    title: 'Fill in the blank',
    class: 'fill-blank',
    helperText: 'To fill in a blank, type your response in the corresponding box below.'
  },
  DD: {
    type: 'DD',
    title: 'Drag & Drop',
    class: 'drag-drop',
    helperText: 'Drag items into the appropriate boxes below to group them.'
  },
  MQ: {
    type: 'MQ',
    title: 'Matching question',
    class: 'matching-question',
    helperText: 'Match items by dragging each item on the left to its pair on the right.'
  }
};
