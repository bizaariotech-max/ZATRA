import React, { useEffect, useRef} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './MyEditor.css';  

const MyEditor = ({ content, setContent,desHeight }) => {
  const editorRef = useRef();
  useEffect(() => {
    // Reset content if it is empty
    if (content?.length === 0) {
      setContent("");
    }
  }, [content, setContent]);

  const handleEditorChange = (value) => {
    setContent(value);
  };
  useEffect(() => {
    if (editorRef.current) {
      // Set the minHeight on the .ql-container
      const quillEditor = editorRef.current.getEditor();
      const editorContainer = quillEditor.container.querySelector('.ql-editor'); 
      if (editorContainer) {
        editorContainer.style.height = desHeight;
      }
    }
  }, [desHeight]);

  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }], 
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }], 
        ['link',],
        [{ 'color': [] }, { 'background': [] }],
        ['clean'],
      ],
    },
    history: {
      delay: 1000,
      maxStack: 100,
      userOnly: true,
    },
  };

  return (
    <div>
      <ReactQuill 
        theme="snow" 
        ref={editorRef}
        modules={modules}  
        value={content} 
        onChange={handleEditorChange}
        placeholder='Start typing here....'
        
      />
    </div>
  );
};

export default MyEditor;
