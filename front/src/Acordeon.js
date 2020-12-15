import { useState } from 'react';

function Acordeon({ children }) {
  const [show, setShow] = useState(false)

  return (
    <div className="acordeon">
      <button onClick={() => setShow(!show)}>
        {show ? 'Ver menos' : 'Ver más'}
      </button>
      {show &&
        <div>
          {children}
        </div>
      }
    </div>
  );
}

export default Acordeon;