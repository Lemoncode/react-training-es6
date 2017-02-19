import * as React from 'react';

interface Props extends React.Props<{}> {
  visible?: boolean;
  text?: string;
}

const getStyles = (visible: boolean) => {
  const opacity = visible ? 1 : 0;
  const visibility = visible ? 'visible' : 'hidden';
  return { opacity, visibility };
}

const Modal: React.StatelessComponent<Props> = (props) => {
  const modalClassName = props.visible ? 'in' : '';
  const style = getStyles(props.visible);
  return (
    <div className="animated" style={style}>
      <div className={`modal fade ${modalClassName}`} aria-labelledby="myModalLabel" tabIndex={-1} role="dialog" >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header borderless" />
            <div className="modal-body text-center">
              <h1>{props.text}</h1>
            </div>
            <div className="modal-footer borderless" />
          </div>
        </div>
      </div>
      <div className={`modal-backdrop fade ${modalClassName}`} />
    </div>
  );
};

Modal.defaultProps = {
  visible: false,
  text: `You did not give me text`
};

export {
  Modal
};
