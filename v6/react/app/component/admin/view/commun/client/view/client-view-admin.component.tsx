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
                <label htmlFor="email">{t("client.email")}</label>
                <InputText id="email" value={selectedItem?.email} disabled   />
            </div>

                <div className="field col-6">
                    <label htmlFor="clientCategory">{t("client.clientCategory")}</label>
                    <InputText  id="clientCategoryDropdown"  value={selectedItem?.clientCategory?.reference}  disabled  />
                </div>
        </div>
</TabPanel>
</TabView>
</Dialog>
);
};
export default View;
