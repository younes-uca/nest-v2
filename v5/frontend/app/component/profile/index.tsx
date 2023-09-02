import {TabPanel, TabView} from "primereact/tabview";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import React, {useEffect, useRef, useState} from "react";
import {Password} from "primereact/password";
import {Toast} from "primereact/toast";
import {InputSwitch} from "primereact/inputswitch";
import {UtilisateurDto} from "../../../app/controller/model/Utilisateur.model";
import {MessageService} from "../../../app/zynerator/service/MessageService";
import {UtilisateurAdminService} from "../../../app/controller/service/admin/UtilisateurAdminService.service";
import {AuthService} from "../../../app/zynerator/security/Auth.service";


const Index = () => {


    const [enabled, setEnabled] = useState(null);
    const [connectedUser, setConnectedUser] = useState<UtilisateurDto>(new UtilisateurDto());

    const [password, setPassword] = useState('');

    const authService = new AuthService();
    const utilisateurAdminService = new UtilisateurAdminService();
    const [isEditMode, setIsEditMode] = useState(false);
    const [confirmPwd, setConfirmPwd] = useState('');
    //  const showToast = useRef<Toast>();
    const showToast = useRef(null); // Initialize the ref

    const handleModifyClick = () => {
        setIsEditMode(true);
    };
    const handlePwdChange = () => {
        if (password == confirmPwd) {

            authService.changePassword(username, password)
            MessageService.showSuccess(showToast, 'Password Changed ')
        } else if (password != confirmPwd) {
            MessageService.showError(showToast, 'Error password');
        }

    }

    useEffect(() => {
        const tokenDecoded = authService.decodeJWT();
        console.log(tokenDecoded)
        setConnectedUser(prevState => ({...prevState,username:tokenDecoded.sub, enabled : tokenDecoded.enabled, email:tokenDecoded.email}))
    }, []);

    return (

        <div>
            <Toast ref={showToast}/>
            <TabView>
                <TabPanel header="Profile">
                    <div className="formgrid grid">
                        <div className="field col-4">
                            <div className="field col-6">
                                <label htmlFor="username">Username</label>
                                <InputText id="username" value={connectedUser.username}
                                           onChange={(event) => connectedUser.username = (event.target.value)}/>
                            </div>
                        </div>
                        <div className="field col-4">
                            <div className="field col-6">
                                <label htmlFor="email">Email</label>
                                <InputText id="email" value={connectedUser.email} disabled={!isEditMode}
                                           onChange={(event) => connectedUser.email = (event.target.value)}/>
                            </div>
                        </div>
                        <div className="field col-4">
                            <div className="field col-6">
                                <label htmlFor="enabled">Enabled</label>
                                <span className="p-float-label">
                        <InputSwitch id="enabled" checked={connectedUser.enabled} disabled={!isEditMode}
                                     onChange={(event) => connectedUser.enabled = (event.value)}/>
                        </span></div>
                        </div>


                    </div>
                </TabPanel>

                <TabPanel header="Change Password">
                    <div className="formgrid grid">

                        <div className="field col-4">
                            <div className="field col-8">
                                <label htmlFor="new_password">New Password</label>

                                <Password value={password} onChange={(event) => setPassword(event.target.value)}
                                          toggleMask/>
                            </div>
                        </div>
                        <div className="field col-4">
                            <div className="field col-8">
                                <label htmlFor="new_password">Confirm Password</label>

                                <Password value={confirmPwd} onChange={(event) => setConfirmPwd(event.target.value)}
                                          toggleMask/>
                            </div>
                        </div>
                        <div className="field col-4">
                            <div className="field col-8" style={{marginTop: '7px'}}>
                                <br/>

                                <Button label="Change" onClick={handlePwdChange}/>
                            </div>
                        </div>
                    </div>
                </TabPanel>
            </TabView>
        </div>

    );
};
export default Index;