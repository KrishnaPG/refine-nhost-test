import classNames from 'classnames';

const Spinner = ({ size = '' }) => (
  <span
    className={classNames(
      'inline-block border-gray-300 border-t-blue-900 rounded-full animate-spin',
      size === 'sm' ? 'w-5 h-5 border-2' : 'w-10 h-10 border-[3px]'
    )}
  />
);

export default Spinner;
