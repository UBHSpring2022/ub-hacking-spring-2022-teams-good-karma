import React from 'react';

const ethContext = React.createContext(
    {
        ethContext : "",
        userAddress : "0xF0A6Be2F3abA0F39C451CA8f2083B9177c849E2a",
        setEthContext: (context) => {}
    }
)

export {ethContext};