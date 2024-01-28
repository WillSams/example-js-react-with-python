import React from 'react';

import { useParams } from 'react-router-dom';

import { default as StaticFragment } from './fragments';
import { InvalidRoute } from '../../shared/components';

import { capitalizeFirstLetter } from '../../shared/utils';

const renderComponent = (componentType) => {
  switch (componentType) {
    case 'Privacy':
      return <StaticFragment.PrivacyComponent />;
    case 'Terms':
      return <StaticFragment.TermsComponent />;
    default:
      return <InvalidRoute />;
  }
};

const StaticComponent = () => {
  const { componentType } = useParams();
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
