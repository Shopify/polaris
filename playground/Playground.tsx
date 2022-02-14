import React from 'react';

export function Playground() {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <iframe
        width={300}
        height={220}
        src="http://localhost:6006/iframe.html?id=playground-playground--popover-frame&args="
      />
      <strong style={{width: 300}}>Click here ☝</strong>
    </div>
  );
}
