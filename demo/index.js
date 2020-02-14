import '@/../examples/assets/stylesheets/main.scss';

import { create, mount } from 'demoboard';
import TeachingElementCtor from '@/teaching-element';
import toReact from '@egoist/vue-to-react';

const Type = { Assessment: 'ASSESSMENT', Reflection: 'REFLECTION' };

const isAssessment = ({ type }) => !type ||
  [Type.Assessment, Type.Reflection].includes(type);

const data = importAll(require.context('@/../examples/data/', true, /\.json$/));
const TeachingElement = toReact(TeachingElementCtor);

const demoboard = create();
demoboard.addDecorator(buildTeachingElement);
demoboard
  .section('Teaching elements')
  .add('TE Audio', { element: data.AUDIO })
  .add('TE Break', { element: data.BREAK })
  .add('TE Embed', { element: data.EMBED })
  .add('TE Html', { element: data.HTML })
  .add('TE File', { element: data.FILE })
  .add('TE Image', { element: data.IMAGE })
  .add('TE Video', { element: data.VIDEO })
  .add('TE Accordion', { element: data.ACCORDION })
  .add('TE Carousel', { element: data.CAROUSEL })
  .add('TE Jodit Html', { element: data.JODIT_HTML })
  .add('TE Modal', { element: data.MODAL })
  .add('TE Table', { element: data.TABLE })
  // TODO: Add PDF demo
  // .add('TE Pdf', { element: data.PDF })
  .add('TE Brightcove Video', { element: data.BRIGHTCOVE_VIDEO });

mount(demoboard, '#app');

function buildTeachingElement({ options }) {
  let { element, props = {} } = options;
  props = {
    position: 0,
    ...props,
    options: {
      assessmentType: 'formative',
      ...props.options
    }
  };
  options.component = () => <TeachingElement element={element} {...props} />;
}

function importAll(r) {
  return r.keys().reduce((acc, key) => {
    const data = r(key);
    const type = !isAssessment(data) ? data.type : data.data.type;
    acc[type] = data;
    return acc;
  }, {});
}
