import React, { Component } from 'react';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';

class Breadcrumb extends Component {

  render() {

    return (
      <Breadcrumbs aria-label="Yield Curve Breadcrumb">
        <Chip label="Yield Curve" />
      </Breadcrumbs>
    );
  }
}

export default Breadcrumb;
