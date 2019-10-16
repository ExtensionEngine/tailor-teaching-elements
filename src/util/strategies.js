import every from 'lodash/every';
import includes from 'lodash/includes';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import toLower from 'lodash/toLower';
import xor from 'lodash/xor';

export default {
  default: (answer, correct) => isEqual(answer, correct),
  MC: (answers, correct) => !xor(answers, correct).length,
  FB: (answers, correct) => {
    answers = map(answers, toLower);
    correct = map(correct, group => map(group, toLower));
    return every(correct, (c, i) => includes(c, answers[i]));
  },
  NR: (answers, correct) => isEqual(answers, correct.map(Number)),
  DD: (answers, correct) => every(answers, (a, k) => isEqual(a.sort(), correct[k].sort())),
  MQ: (answers, correct) => isEqual(answers, correct)
};
