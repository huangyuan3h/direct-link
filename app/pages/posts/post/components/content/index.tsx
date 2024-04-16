import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import './content.scss';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export interface ContentProps {
  content: string;
  onChange: (content: string) => void;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ['bold', 'italic', 'underline', 'strike'],
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
    setContent(v);
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
