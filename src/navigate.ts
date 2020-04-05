import * as React from 'react';

export const navigationRef = React.createRef();

export default (name: string, params: any) => {
  navigationRef.current?.navigate(name, params);
};
