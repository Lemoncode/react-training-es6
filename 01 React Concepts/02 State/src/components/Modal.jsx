import * as React from 'react';

const getStyles = (isVisible) => {
  const opacity = isVisible ? 1 : 0;
  const visibility = isVisible ? 'visible' : 'hidden';
  return { opacity, visibility };
}

export const Modal = (props) => {
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

Modal.propTypes = {
  visible: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired,
};
