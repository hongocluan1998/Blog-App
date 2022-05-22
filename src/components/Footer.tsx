import * as React from 'react';

export interface IAppProps {
}

function Footer (props: IAppProps) {
  return (
    <div style={{ fontSize: '36px', fontWeight: 900, color: 'green', textTransform: 'uppercase', textAlign: 'center' }}>
      My footer for App
    </div>
  );
}
export default React.memo(Footer)
