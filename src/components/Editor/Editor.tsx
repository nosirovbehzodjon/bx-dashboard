import { Fragment, useState } from 'react';
import Quill from 'react-quill-new';

import 'react-quill-new/dist/quill.snow.css';

import '@/components/Editor/editor.styles.css';

// Editor is an uncontrolled React component
export const Editor = () => {
  const [value, setValue] = useState('');
  console.log(value);

  return (
    <Fragment>
      <Quill theme="snow" className="" value={value} onChange={setValue} />
      <div dangerouslySetInnerHTML={{ __html: value }} />
    </Fragment>
  );
};
