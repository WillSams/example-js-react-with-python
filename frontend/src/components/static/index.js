import React from 'react';

import { default as Partial } from './partials';
import { InvalidRoute } from '../../shared/components';

import { capitalizeFirstLetter } from '../../shared/utils';

const renderComponent = (componentType) => {
  switch (componentType) {
    case 'Privacy':
      return <Partial.PrivacyComponent />;
    case 'Terms':
      return <Partial.TermsComponent />;
    default:
      return <InvalidRoute />;
  }
};

const StaticComponent = ({ componentType }) => {
  const formattedComponentType = capitalizeFirstLetter(componentType);

  return (
    <div className='col-lg-12'>
      <div className='jumbotron p-3 p-md-5 text-white rounded bg-dark'>
        <div className='col-lg-12 px-0'>
          <h1 className='display-4 font-italic'>{formattedComponentType}</h1>
        </div>
      </div>
      {renderComponent(formattedComponentType)}
    </div>
  );
};




export default StaticComponent;
