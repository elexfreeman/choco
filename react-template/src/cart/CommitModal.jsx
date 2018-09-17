import React from 'react';


const CommitModal = ({visible}) => {
  let classMod="modal modal-sm "
  if(visible) classMod+=' active';

  return (<div className={classMod}>

    <div className="modal-container">
      <div className="modal-header">
        <div className="modal-title h5">Готово</div>
      </div>
      <div className="modal-body">
        <div className="content">
          Товар добавлен в корзину
        </div>
      </div>
      <div className="modal-footer">
      </div>
    </div>
  </div>)

}
export default CommitModal;
