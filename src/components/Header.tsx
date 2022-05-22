import * as React from 'react';
import '../css/header.css'

export interface IAppProps {
}
function Header (props: IAppProps) {
  return (
    <div className='header'>
      welcome to my blog app
    </div>
  );
}
export default React.memo(Header)
