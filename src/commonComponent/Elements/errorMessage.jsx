/**
 * @author Prashant Chauhan
 */
import React from "react";
import PropTypes from "prop-types";

const ErrorMessage = (props) => {
  const { t, error, id } = props;

  return (
    <span id={id} className="helper-text error-message-style">
      {t(error)}
    </span>
  );
};

ErrorMessage.propTypes = {
  t: PropTypes.any.isRequired,
  error: PropTypes.string,
  id: PropTypes.string,
};

export default ErrorMessage;
