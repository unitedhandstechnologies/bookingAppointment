import React from "react";
import JoditEditor from "jodit-react";

const JodItTextEditore = (props) => {
  const { content, setContent, submitContent } = props;

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    height: 500,
    askBeforePasteFromWord: false,
    askBeforePasteHTML: false,
  };

  return (
    <>
      <JoditEditor
        value={content}
        config={config}
        tabIndex={2} // tabIndex of textarea
        onBlur={(newContent) => {
          setContent(newContent);
        }} // preferred to use only this option to update the content for performance reasons
        // onChange={newContent => { }}
      />
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-success mt-4 align-end"
          onClick={() => submitContent()}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default JodItTextEditore;
