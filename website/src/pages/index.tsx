import React from 'react';
import {Redirect} from '@docusaurus/router';

export default (props) => {
  return <Redirect to={`${props.config.baseUrl}docs/`} />;
};