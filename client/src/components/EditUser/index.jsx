import React, { useState, useEffect } from 'react';
const EditUser = ({
    userField = {dn:"", field:{ label:"Carné de Identidad", type:"text", name:"identification", value:"", validation:(value="")=>""}},
    showModal=false,
    hideModal=()=>{},
}) => {
    const [information, setInformation] = useState({type:"success", value: ""})
    const [showLoading, setShowLoading] = useState(false)
    const [fieldValue, setFieldValue] = useState("")
    useEffect(()=>{
        setFieldValue(userField.field.value)
    },[userField.field.value])
    const submit = ()=>{
        console.log({dn:userField.dn, fieldValue})
        setTimeout(()=>setShowLoading(true),1000)
    }
    return (
        <div className='edit-modal'>            
            <div className={`modal-container ${showModal ? 'show' : 'hide'}`}>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <button className='modal-close' onClick={()=>hideModal()}><span></span></button>
                        <h2 className='modal-title'>{`Actualizar ${userField.field.label}`}</h2>
                        {information.value.length > 0 && 
                            <p className={`modal-information ${information.type}`}>
                                {information.value}
                            </p>
                        }
                    </div>
                    <div className='modal-body'>
                        <input id={`edit-user-${userField.field.name}`} type={userField.field.type} name={userField.field.name} onChange={(event)=>setFieldValue(event.target.value)} value={fieldValue} />
                    </div>
                    <div className='modal-footer'>
                        <button className='modal-cancel' onClick={()=>hideModal()}>
                            Cancelar
                        </button>
                        <button className='modal-confirm' onClick={()=>submit()} disabled={showLoading}>
                            {showLoading ? "Confirmando" : "Confirmar" }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUser;