import PropTypes from 'prop-types';

export const defaultReducer = PropTypes.shape({
    fetched: PropTypes.bool.isRequired,
    fetching: PropTypes.bool.isRequired,
    data: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.array]),
    error: PropTypes.shape(),
});
