import map from 'lodash/map';
import sortBy from 'lodash/sortBy';

function getElements(item, embeds) {
  const elements = map(item.body, (_, id) => embeds[id]);
  return sortBy(elements, 'position');
};

export default {
  props: {
    embeds: { type: Object, default: () => ({}) },
    items: { type: Object, required: true }
  },
  computed: {
    embeddedItems() {
      return map(this.items, item => ({
        elements: getElements(item, this.embeds),
        heading: item.header,
        id: item.id
      }));
    }
  }
};
