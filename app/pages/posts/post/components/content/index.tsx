import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import './content.scss';
import { Placeholder } from 'react-bootstrap';

export interface ContentProps {
  content: string;
  onChange: (content: string) => void;
}

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
];

const MAX_LENGTH = 5000;

const PlaceHolder = () => {
  return (
    <div className="ql-placeholder">
      <Placeholder xs={12} bg="secondary" />
      <Placeholder xs={12} bg="secondary" />
      <Placeholder xs={12} bg="secondary" />
    </div>
  );
};

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <PlaceHolder />,
});

export const ContentInput: React.FC<ContentProps> = ({
  content,
  onChange,
}: ContentProps) => {
  const [c, setContent] = useState(content);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setContent(content);
  }, [content]);

  const handleChange = (v: string) => {
    setContent(v.substring(0, MAX_LENGTH));
  };

  const handleBlur = () => {
    onChange(c);
  };

  const handleClick = () => {
    if (ref.current) {
      const eles = ref.current.getElementsByClassName('ql-editor');
      if (eles && eles.length > 0) {
        (eles[0] as HTMLElement).focus();
      }
    }
  };

  return (
    <div onClick={handleClick} ref={ref}>
      <ReactQuill
        value={c}
        formats={formats}
        modules={modules}
        theme="snow"
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="填写详细信息，让更多人看到你！"
      />
    </div>
  );
};
