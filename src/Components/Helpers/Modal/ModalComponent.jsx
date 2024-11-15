import React, { Children, useState } from "react";
import Modal from "react-awesome-modal";
import PagesIndex from "../../Pages/PagesIndex";

const ModalComponent = ({visible,setVisible,fields,form_title,formik}) => {



  const closeModal = () => {
    setVisible(false);
  };


 


  return (
    <section>
    
      <Modal
        visible={visible}
        width="400"
 
        effect="fadeInDown"
        onClickAway={closeModal}
      >
        <div className="p-4 modal-container">
          <a
            className="d-flex justify-content-end"
            href="#"
            onClick={closeModal}
          >
            X
          </a>
          <h3 className="border-bottom-text">{form_title}</h3>

          <PagesIndex.Formikform
            fieldtype={fields.filter((field) => !field.showWhen)}
            formik={formik}
            btn_name={"submit"}
            button_Size={"w-100"}
            show_submit={true}
          />
        </div>
      </Modal>
    </section>
  );
};

export default ModalComponent;
