import React from 'react';
import { PhrasePropTypes } from '../utils/PropTypeShapes';

const Phrase = ({ phrase }) => (
  <div>
    <h3>{phrase.phrase}</h3>
    <h3 className="text-gray-500 truncate ">{phrase.definitions[0]}</h3>
  </div>
);

Phrase.propTypes = {
  phrase: PhrasePropTypes,
};

Phrase.defaultProps = {
  phrase: {},
};

export default Phrase;