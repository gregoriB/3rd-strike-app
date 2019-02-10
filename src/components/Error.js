import React from 'react';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <div>
      <Link to='/'><button>HOME</button></Link>
      <div className='error-message'>Error: Path does not exist!</div>
    </div>
  )
}
