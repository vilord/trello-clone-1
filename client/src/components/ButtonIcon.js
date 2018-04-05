import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import './ButtonIcon.css';

const ButtonIcon = ({ icon, label, flipped, onClick }) => (
  <Button
    className="ButtonIcon"
    icon
    onClick={onClick}
    size="large"
    style={label ? { minWidth: '90px' } : null}
  >
    <Icon name={icon} flipped={flipped ? 'horizontally' : null} /> {label}
  </Button>
);

ButtonIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default ButtonIcon;
