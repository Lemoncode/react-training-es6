import * as React from 'react';

interface Props extends React.Props<{}> {
  visible: boolean;
  onClick: () => void;
}

const getStyles = (isVisible: boolean) => {
  const opacity = isVisible ? 1 : 0;
  const visibility = isVisible ? 'visible' : 'hidden';
  return { opacity, visibility };
}

const Modal: React.StatelessComponent<Props> = (props) => {
  const modalClassName = props.visible ? 'in' : '';
  return (
    <div className="animated" style={getStyles(props.visible)}>
      <div
        className={`modal fade ${modalClassName}`} onClick={props.onClick}
        tabIndex={-1} role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header" style={{ borderBottom: 'none' }} />
            <div className="modal-body">
              <h1>Click to close</h1>
            </div>
            <div className="modal-footer" style={{ borderTop: 'none' }}>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal-backdrop fade ${modalClassName}`} />
    </div>
  );
};

Modal.defaultProps = {
  visible: false
};

export {
  Modal
};
