import { render } from '@testing-library/react';

import React from 'react';

import InvalidRoute from '@/shared/components/InvalidRoute';

describe('InvalidRoute component', () => {
  it('should render without error', () => {
    const { getByText } = render(<InvalidRoute />);
    const title = getByText('Component not found');

    expect(title).toBeInTheDocument();
  });
});
