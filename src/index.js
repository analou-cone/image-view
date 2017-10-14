import React from 'react';
import mirror, {render} from 'mirrorx';
import Routes from './Routes.js';

// style everything the same - someday maybe break it out
// and put sub-CSS's into each component's dir and source there
import './index.css';

mirror.defaults({
  historyMode: 'hash'
});

render(<Routes />, document.getElementById('root'));
