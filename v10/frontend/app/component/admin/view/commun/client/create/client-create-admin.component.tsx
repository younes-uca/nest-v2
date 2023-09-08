import {Button} from 'primereact/button';
import {Column} from 'primereact/column';
import {TabView, TabPanel} from 'primereact/tabview';
import {Dialog} from 'primereact/dialog';
import {InputNumber, InputNumberChangeEvent} from 'primereact/inputnumber';
import {InputText} from 'primereact/inputtext';
import {classNames} from 'primereact/utils';
import { InputTextarea } from 'primereact/inputtextarea';
import React, {useEffect, useState} from 'react';
import {Calendar, CalendarChangeEvent} from 'primereact/calendar';
import { format } from 'date-fns';
import {InputSwitch, InputSwitchChangeEvent} from 'primereact/inputswitch';
import {Dropdown, DropdownChangeEvent} from 'primereact/dropdown';
import {MultiSelect, MultiSelectChangeEvent} from 'primereact/multiselect';
import {MessageService} from 'app/zynerator/service/MessageService';

import {RoleDto} from "app/zynerator/dto/RoleDto.model";
import RoleService from "app/zynerator/service/RoleService";
import {Password} from "primereact/password";
import {ClientAdminService} from 'app/controller/service/admin/ClientAdminService.service';
import  {ClientDto}  from 'app/controller/model/Client.model';
import {ClientCriteria} from "app/controller/criteria/ClientCriteria.model";

import {ClientCategoryDto} from 'app/controller/model/ClientCategory.model';
import {ClientCategoryAdminService} from 'app/controller/service/admin/ClientCategoryAdminService.service';
import {TFunction} from "i18next";
import {Toast} from "primereact/toast";
import useCreateHook from "app/component/zyhook/useCreate.hook";



type ClientCreateAdminType = {
    visible: boolean,
    onClose: () => void,
    add: (item: ClientDto) => void,
    showToast: React.Ref<Toast>,
    list: ClientDto[],
    service: ClientAdminService,
    t: TFunction
}
const Create: React.FC<ClientCreateAdminType> = ({visible, onClose, add, showToast, list, service, t}) => {


    const isFormValid = () => {
    let errorMessages = new Array<string>();
                if(item.fullName == '')
                errorMessages.push("fullName is required")
        return errorMessages.length == 0 ;
    }
    const emptyItem = new ClientDto();
        const {
            item,
            setItem,
            submitted,
            setSubmitted,
            activeIndex,
            setActiveIndex,
            activeTab,
            setActiveTab,
            onInputTextChange,
            onInputDateChange,
            onInputNumerChange,
            onMultiSelectChange,
            onBooleanInputChange,
            onTabChange,
            onDropdownChange,
            hideDialog,
            saveItem,
            formateDate
        } = useCreateHook<ClientDto, ClientCriteria>({list, emptyItem, onClose, add, showToast,service, isFormValid})
    const [roles, setRoles] = useState<RoleDto[]>([]);
    const [clientCategorys, setClientCategorys] = useState<ClientCategoryDto[]>([]);


    const clientCategoryAdminService = new ClientCategoryAdminService();
    const roleService = new RoleService();
    useEffect(() => {
        clientCategoryAdminService.getList().then(({data}) => setClientCategorys(data)).catch(error => console.log(error));
        roleService.getList().then(({data}) => setRoles(data)).catch(error => console.log(error));
    }, []);








    const itemDialogFooter = ( <>
        <Button label={t("cancel")} icon="pi pi-times" text onClick={hideDialog} />
        <Button label={t("save")} icon="pi pi-check" onClick={saveItem} /> </>
    );

return(
        <Dialog visible={visible} style={{width: '70vw'}} header={t("client.tabPan")} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog} >
        <TabView activeIndex={activeIndex} onTabChange={onTabChange}>
            <TabPanel header={t("client.tabPan")}>
                <div className="formgrid grid">
                    <div className="field col-6">
                        <label htmlFor="fullName">{t("client.fullName")}</label>
                        <InputText id="fullName" value={item.fullName} onChange={(e) => onInputTextChange(e, 'fullName')} required className={classNames({'p-invalid': submitted && !item.fullName})} />
                        {submitted && !item.fullName && <small className="p-invalid">FullName is required.</small>}
                    </div>
                    <div className="field col-5">
                        <label htmlFor="clientCategory">{t("client.clientCategory")}</label>
                        <Dropdown  id="clientCategoryDropdown"  value={item.clientCategory} options={clientCategorys} onChange={(e) => onDropdownChange(e, 'clientCategory')}   placeholder={t("client.clientCategoryPlaceHolder")} filter filterPlaceholder={t("client.clientCategoryPlaceHolderFilter")} optionLabel="reference" showClear/>
                    </div>
                    <div className="field col-6">
                    <div  className="label-inputswitch">
                        <label htmlFor="credentialsNonExpired">{t("client.credentialsNonExpired")}</label>
                        <span className="p-float-label">
                        <InputSwitch  id="credentialsNonExpired" checked={item.credentialsNonExpired} onChange={(e) => onBooleanInputChange(e, 'credentialsNonExpired')} />
                        </span>
                    </div>
                    </div>
                    <div className="field col-6">
                    <div  className="label-inputswitch">
                        <label htmlFor="enabled">{t("client.enabled")}</label>
                        <span className="p-float-label">
                        <InputSwitch  id="enabled" checked={item.enabled} onChange={(e) => onBooleanInputChange(e, 'enabled')} />
                        </span>
                    </div>
                    </div>
                    <div className="field col-6">
                    <div  className="label-inputswitch">
                        <label htmlFor="accountNonExpired">{t("client.accountNonExpired")}</label>
                        <span className="p-float-label">
                        <InputSwitch  id="accountNonExpired" checked={item.accountNonExpired} onChange={(e) => onBooleanInputChange(e, 'accountNonExpired')} />
                        </span>
                    </div>
                    </div>
                    <div className="field col-6">
                    <div  className="label-inputswitch">
                        <label htmlFor="accountNonLocked">{t("client.accountNonLocked")}</label>
                        <span className="p-float-label">
                        <InputSwitch  id="accountNonLocked" checked={item.accountNonLocked} onChange={(e) => onBooleanInputChange(e, 'accountNonLocked')} />
                        </span>
                    </div>
                    </div>
                    <div className="field col-6">
                    <div  className="label-inputswitch">
                        <label htmlFor="passwordChanged">{t("client.passwordChanged")}</label>
                        <span className="p-float-label">
                        <InputSwitch  id="passwordChanged" checked={item.passwordChanged} onChange={(e) => onBooleanInputChange(e, 'passwordChanged')} />
                        </span>
                    </div>
                    </div>
                    <div className="field col-6">
                        <label htmlFor="username">{t("client.username")}</label>
                        <InputText id="username" value={item.username} onChange={(e) => onInputTextChange(e, 'username')} required className={classNames({'p-invalid': submitted && !item.username})} />
                        {submitted && !item.username && <small className="p-invalid">Username is required.</small>}
                    </div>
                    <div className="field col-6">
                        <label htmlFor="password">{t("client.password")}</label>
                        <InputText id="password" value={item.password} onChange={(e) => onInputTextChange(e, 'password')} required className={classNames({'p-invalid': submitted && !item.password})} />
                        {submitted && !item.password && <small className="p-invalid">Password is required.</small>}
                    </div>
                    <div className="field col-6">
                        <label htmlFor="roles">Roles</label>
                        <MultiSelect value={item.roles} options={roles} optionLabel="label" display="chip"
                                     placeholder="select roles" maxSelectedLabels={1}
                                     onChange={(e) => onMultiSelectChange(e, 'roles')}/>
                    </div>
                </div>
            </TabPanel>
        </TabView>
    </Dialog>
);
};
export default Create;
