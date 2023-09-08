import {Column} from 'primereact/column';
import {TabPanel, TabView} from 'primereact/tabview';
import {DataTable} from 'primereact/datatable';
import {Dialog} from 'primereact/dialog';
import {InputNumber} from 'primereact/inputnumber';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';
import React from 'react';
import {Calendar} from 'primereact/calendar';
import {InputSwitch} from 'primereact/inputswitch';
import {TFunction} from "i18next";
import useViewHook from "app/component/zyhook/useViewhook";

import {RoleDto} from "app/zynerator/dto/RoleDto.model";
import  {ClientDto}  from 'app/controller/model/Client.model';

type ClientViewAdminType = {
    visible: boolean,
    onClose: () => void,
    selectedItem: ClientDto,
    t: TFunction
}

const View: React.FC<ClientViewAdminType> = ({visible,onClose,selectedItem, t}) => {

    const {
    onTabChange,
    hideDialog,
    itemDialogFooter,
    formateDate,
    parse,
    parseToIsoFormat,
    adaptDate,
    activeIndex
    } = useViewHook<ClientDto>({selectedItem, onClose})

        return(
<Dialog visible={visible} style={{width: '70vw'}} header={t("client.tabPan")} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog} >
<TabView activeIndex={activeIndex} onTabChange={onTabChange}>
<TabPanel header={t("client.tabPan")}>
    <div className="formgrid grid">

            <div className="field col-6">
                <label htmlFor="fullName">{t("client.fullName")}</label>
                <InputText id="fullName" value={selectedItem?.fullName} disabled   />
            </div>

                <div className="field col-6">
                    <label htmlFor="clientCategory">{t("client.clientCategory")}</label>
                    <InputText  id="clientCategoryDropdown"  value={selectedItem?.clientCategory?.reference}  disabled  />
                </div>
        <div className="field col-6">
            <div  className="label-inputswitch">
                    <label htmlFor="credentialsNonExpired">{t("client.credentialsNonExpired")}</label>
                    <span className="p-float-label">
                        <InputSwitch  id="credentialsNonExpired" checked={selectedItem?.credentialsNonExpired} disabled />
                    </span>
            </div>
            </div>

        <div className="field col-6">
            <div  className="label-inputswitch">
                    <label htmlFor="enabled">{t("client.enabled")}</label>
                    <span className="p-float-label">
                        <InputSwitch  id="enabled" checked={selectedItem?.enabled} disabled />
                    </span>
            </div>
            </div>

        <div className="field col-6">
            <div  className="label-inputswitch">
                    <label htmlFor="accountNonExpired">{t("client.accountNonExpired")}</label>
                    <span className="p-float-label">
                        <InputSwitch  id="accountNonExpired" checked={selectedItem?.accountNonExpired} disabled />
                    </span>
            </div>
            </div>

        <div className="field col-6">
            <div  className="label-inputswitch">
                    <label htmlFor="accountNonLocked">{t("client.accountNonLocked")}</label>
                    <span className="p-float-label">
                        <InputSwitch  id="accountNonLocked" checked={selectedItem?.accountNonLocked} disabled />
                    </span>
            </div>
            </div>

        <div className="field col-6">
            <div  className="label-inputswitch">
                    <label htmlFor="passwordChanged">{t("client.passwordChanged")}</label>
                    <span className="p-float-label">
                        <InputSwitch  id="passwordChanged" checked={selectedItem?.passwordChanged} disabled />
                    </span>
            </div>
            </div>

            <div className="field col-6">
                <label htmlFor="username">{t("client.username")}</label>
                <InputText id="username" value={selectedItem?.username} disabled   />
            </div>

            <div className="field col-6">
                <label htmlFor="password">{t("client.password")}</label>
                <InputText id="password" value={selectedItem?.password} disabled   />
            </div>

        <div className="field col-6">
            <label htmlFor="roles">Roles</label>
            <InputText id="roles" value={selectedItem?.roles?.map(e=>e.label).join(",")} disabled   />
        </div>
        </div>
</TabPanel>
</TabView>
</Dialog>
);
};
export default View;
