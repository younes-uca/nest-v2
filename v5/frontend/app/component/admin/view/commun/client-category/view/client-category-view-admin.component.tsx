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

import  {ClientCategoryDto}  from 'app/controller/model/ClientCategory.model';

type ClientCategoryViewAdminType = {
    visible: boolean,
    onClose: () => void,
    selectedItem: ClientCategoryDto,
    t: TFunction
}

const View: React.FC<ClientCategoryViewAdminType> = ({visible,onClose,selectedItem, t}) => {

    const {
    onTabChange,
    hideDialog,
    itemDialogFooter,
    formateDate,
    parse,
    parseToIsoFormat,
    adaptDate,
    activeIndex
    } = useViewHook<ClientCategoryDto>({selectedItem, onClose})

        return(
<Dialog visible={visible} style={{width: '70vw'}} header={{'TabPan' | translate}} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog} >
<TabView activeIndex={activeIndex} onTabChange={onTabChange}>
<TabPanel header={{'TabPan' | translate}}>
    <div className="formgrid grid">

            <div className="field col-6">
                <label htmlFor="reference">{{'Reference' | translate}}</label>
                <InputText id="reference" value={selectedItem?.reference} disabled   />
            </div>

            <div className="field col-6">
                <label htmlFor="code">{{'Code' | translate}}</label>
                <InputText id="code" value={selectedItem?.code} disabled   />
            </div>

        </div>
</TabPanel>
</TabView>
</Dialog>
);
};
export default View;
