/* eslint-disable no-unused-vars */
/* global React */

const element = React.createElement(
  'div',
  { id: 'A1', className: 'h-title' },
  React.createElement('div', { id: 'B1' }, React.createElement('div', { id: 'C1' }), React.createElement('div', { id: 'C2' })),
  React.createElement('div', { id: 'B2' })
);

({
  $$typeof: '',
  type: 'div',
  key: null,
  ref: null,
  props: {
    id: 'A1',
    className: 'h-title',
    children: [],
  },
});
