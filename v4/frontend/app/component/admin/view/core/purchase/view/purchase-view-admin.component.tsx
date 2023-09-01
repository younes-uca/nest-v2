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

import  {PurchaseDto}  from 'app/controller/model/Purchase.model';

type PurchaseViewAdminType = {
    visible: boolean,
    onClose: () => void,
    selectedItem: PurchaseDto,
    t: TFunction
}

const View: React.FC<PurchaseViewAdminType> = ({visible,onClose,selectedItem, t}) => {

    const {
    onTabChange,
    hideDialog,
    itemDialogFooter,
    formateDate,
    parse,
    parseToIsoFormat,
    adaptDate,
    activeIndex
    } = useViewHook<PurchaseDto>({selectedItem, onClose})

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
            <label htmlFor="purchaseDate">{{'PurchaseDate' | translate}}</label>
            <Calendar id="purchaseDate" value={adaptDate(selectedItem?.purchaseDate)} disabled dateFormat="dd/mm/yy" showIcon={true}  />
        </div>

            <div className="field col-6">
                <label htmlFor="image">{{'Image' | translate}}</label>
                <InputText id="image" value={selectedItem?.image} disabled   />
            </div>

                <div className="field col-6">
                    <label htmlFor="total">{{'Total' | translate}}</label>
                    <InputNumber id="total" value={selectedItem.total} disabled/>
                </div>

            <div className="field col-6">
                <label htmlFor="description">{{'Description' | translate}}</label>
                <span className="p-float-label">
                   <InputTextarea id="description" value={selectedItem?.description} disabled rows={5} cols={30} />
                </span>
            </div>

                <div className="field col-6">
                    <label htmlFor="client">{{'Client' | translate}}</label>
                    <InputText  id="clientDropdown"  value={selectedItem?.client?.fullName}  disabled  />
                </div>
        </div>
</TabPanel>
    <TabPanel header={{'PurchaseItems' | translate}}>
                <div className="card">
                    <DataTable value={selectedItem?.purchaseItems} tableStyle={{minWidth: '50rem'}} dataKey="id">
                                <Column field="product.reference" header={{'Product' | translate}}></Column>
                                <Column field="price" header={{'Price' | translate}}   ></Column>
                                <Column field="quantity" header={{'Quantity' | translate}}   ></Column>
                    </DataTable>
                </div>
        </TabPanel>
</TabView>
</Dialog>
);
};
export default View;
