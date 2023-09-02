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
                if(item.email == '')
                errorMessages.push("email is required")
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
    const [clientCategorys, setClientCategorys] = useState<ClientCategoryDto[]>([]);


    const clientCategoryAdminService = new ClientCategoryAdminService();
    useEffect(() => {
        clientCategoryAdminService.getList().then(({data}) => setClientCategorys(data)).catch(error => console.log(error));
    }, []);








    const itemDialogFooter = ( <>
        <Button label={t("cancel")} icon="pi pi-times" text onClick={hideDialog} />
        <Button label={t("save")} icon="pi pi-check" onClick={saveItem} /> </>
    );

return(
        <Dialog visible={visible} style={{width: '70vw'}} header={{'TabPan' | translate}} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog} >
        <TabView activeIndex={activeIndex} onTabChange={onTabChange}>
            <TabPanel header={{'TabPan' | translate}}>
                <div className="formgrid grid">
                    <div className="field col-6">
                        <label htmlFor="fullName">{{'FullName' | translate}}</label>
                        <InputText id="fullName" value={item.fullName} onChange={(e) => onInputTextChange(e, 'fullName')} required className={classNames({'p-invalid': submitted && !item.fullName})} />
                        {submitted && !item.fullName && <small className="p-invalid">FullName is required.</small>}
                    </div>
                    <div className="field col-6">
                        <label htmlFor="email">{{'Email' | translate}}</label>
                        <InputText id="email" value={item.email} onChange={(e) => onInputTextChange(e, 'email')} required className={classNames({'p-invalid': submitted && !item.email})} />
                        {submitted && !item.email && <small className="p-invalid">Email is required.</small>}
                    </div>
                    <div className="field col-5">
                        <label htmlFor="clientCategory">{{'ClientCategory' | translate}}</label>
                        <Dropdown  id="clientCategoryDropdown"  value={item.clientCategory} options={clientCategorys} onChange={(e) => onDropdownChange(e, 'clientCategory')}   placeholder={{'ClientCategoryPlaceHolder' | translate}} filter filterPlaceholder={{'ClientCategoryPlaceHolderFilter' | translate}} optionLabel="reference" showClear/>
                    </div>
                </div>
            </TabPanel>
        </TabView>
    </Dialog>
);
};
export default Create;
