import {Button} from 'primereact/button';
import {Column} from 'primereact/column';
import {Dropdown, DropdownChangeEvent} from 'primereact/dropdown';
import {TabView, TabPanel} from 'primereact/tabview';
import {DataTable} from 'primereact/datatable';
import {Dialog} from 'primereact/dialog';
import {InputNumber, InputNumberChangeEvent} from 'primereact/inputnumber';
import {InputText} from 'primereact/inputtext';
import {classNames} from 'primereact/utils';
import { InputTextarea } from 'primereact/inputtextarea';
import React, {useEffect, useState} from 'react';
import {Calendar, CalendarChangeEvent} from 'primereact/calendar';
import { format } from 'date-fns';
import { parse } from 'date-fns';
import { InputSwitch } from 'primereact/inputswitch';
import {MultiSelect, MultiSelectChangeEvent} from 'primereact/multiselect';

import {MessageService} from 'app/zynerator/service/MessageService';



import {PurchaseAdminService} from 'app/controller/service/admin/PurchaseAdminService.service';
import  {PurchaseDto}  from 'app/controller/model/Purchase.model';
import {TFunction} from "i18next";
import {Toast} from "primereact/toast";

import {ClientDto} from 'app/controller/model/Client.model';
import {ClientAdminService} from 'app/controller/service/admin/ClientAdminService.service';
import {ProductDto} from 'app/controller/model/Product.model';
import {ProductAdminService} from 'app/controller/service/admin/ProductAdminService.service';
import {PurchaseItemDto} from 'app/controller/model/PurchaseItem.model';
import {PurchaseItemAdminService} from 'app/controller/service/admin/PurchaseItemAdminService.service';
import {PurchaseCriteria} from "app/controller/criteria/PurchaseCriteria.model";
import useEditHook from "app/component/zyhook/useEdit.hook";


type PurchaseEditAdminType = {
    visible: boolean,
    onClose: () => void,
    showToast: React.Ref<Toast>,
    selectedItem: PurchaseDto
    update: (item: PurchaseDto) => void,
    list: PurchaseDto[],
    service: PurchaseAdminService,
    t: TFunction
}
const Edit: React.FC<PurchaseEditAdminType> = ({visible, onClose, showToast, selectedItem, update, list, service, t}) => {


    const isFormValid = () => {
    let errorMessages = new Array<string>();
        if(item.reference == '')
            errorMessages.push("reference is required")
        return errorMessages.length == 0 ;
    }
    const emptyItem = new PurchaseDto();


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
        onDropdownChange,
        onTabChange,
        hideDialog,
        editItem,
        formateDate,
        parseToIsoFormat,
        adaptDate
        } = useEditHook<PurchaseDto, PurchaseCriteria>({list, selectedItem, onClose, update, showToast,service, t, isFormValid})

    const [products, setProducts] = useState<ProductDto[]>([]);
    const [clients, setClients] = useState<ClientDto[]>([]);

    const [purchaseItems, setPurchaseItems] = useState<PurchaseItemDto>(new PurchaseItemDto());

    const clientAdminService = new ClientAdminService();
    const productAdminService = new ProductAdminService();
    const purchaseItemAdminService = new PurchaseItemAdminService();
    useEffect(() => {
    clientAdminService.getList().then(({data}) => setClients(data)).catch(error => console.log(error));


    productAdminService.getList().then(({data}) => setProducts(data)).catch(error => console.log(error));

        }, []);






    const addPurchaseItems = () => {
        setSubmitted(true);
        if( item.purchaseItems == null )
        item.purchaseItems = new Array<PurchaseItemDto>();
        let _item = purchaseItems;
        if (!_item.id) {
            item.purchaseItems.push(_item);
            MessageService.showSuccess(showToast, 'PurchaseItems Created');
            setItem((prevState :any) => ({...prevState, purchaseItems: item.purchaseItems }));
        } else {
            const updatedItems = item.purchaseItems.map((item) => item.id === purchaseItems.id ? {...purchaseItems} : item);
            MessageService.showSuccess(showToast, 'PurchaseItems Updated');
            setItem((prevState :any) => ({ ...prevState, purchaseItems: updatedItems}));
        }
        setPurchaseItems(new PurchaseItemDto());
    };

    const deletePurchaseItems = (rowData: any) => {
        const updatedItems = item.purchaseItems.filter((val) => val !== rowData);
        setItem((prevState ) => ({...prevState, purchaseItems: updatedItems }));
        setPurchaseItems(new PurchaseItemDto());
        MessageService.showSuccess(showToast, 'PurchaseItem Deleted');
    };

    const editPurchaseItems = (rowData: any) => {
        setActiveTab(0);
        setPurchaseItems(rowData);
    };

    const onInputNumerChangePurchaseItems = (e: any, name: string) => {
        const val = e.value || 0;
        setPurchaseItems((prevPurchaseItems) => ({ ...prevPurchaseItems, [name]: val, }));
    };

    const onDropdownChangePurchaseItems = (e: any, field: string) => {
        setPurchaseItems((prevState) => ({ ...prevState, [field]: e.value}));
    };


    const onMultiSelectChangePurchaseItems = (e: any, field: string) => {
        if (e && e.value && Array.isArray(e.value)) {
            const selectedValues = e.value.map(option => option && option.value);
            setPurchaseItems(prevState => ({ ...prevState, [field]: selectedValues, }));
        }
    };

    const onBooleanInputChangePurchaseItems = (e: any, name: string) => {
        const val = e.value;
        setPurchaseItems((prevItem) => ({ ...prevItem, [name]: val, }));
    };

    const onInputDateChangePurchaseItems = (e: CalendarChangeEvent, name: string) => {
        const val = e.value || '';
        setPurchaseItems({ ...purchaseItems, [name]:val})
    };

    const onInputTextChangePurchaseItems = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        setPurchaseItems({ ...purchaseItems, [name]:val})
    };

    const itemDialogFooter = ( <>
        <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
        <Button label="Save" icon="pi pi-check" onClick={editItem} /> </>
    );



    return(
    <Dialog visible={visible} style={{width: '70vw'}} header={{'TabPan' | translate}} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog}>
        <TabView activeIndex={activeIndex} onTabChange={onTabChange}>
            <TabPanel header={{'TabPan' | translate}}>
                <div className="formgrid grid">
                    <div className="field col-6">
                        <label htmlFor="reference">{{'Reference' | translate}}</label>
                        <InputText id="reference" value={item ? item.reference : ''} onChange={(e) => onInputTextChange(e, 'reference')} required className={classNames({'p-invalid': submitted && !item.reference})} />
                        {submitted && !item.reference && <small className="p-invalid">Reference is required.</small>}
                    </div>
                    <div className="field col-6">
                        <label htmlFor="purchaseDate">{{'PurchaseDate' | translate}}</label>
                        <Calendar id="purchaseDate" value={adaptDate(item?.purchaseDate)} onChange={(e) => onInputDateChange(e, 'purchaseDate')} dateFormat="dd/mm/yy" showIcon={true} />
                    </div>
                    <div className="field col-6">
                        <label htmlFor="image">{{'Image' | translate}}</label>
                        <InputText id="image" value={item ? item.image : ''} onChange={(e) => onInputTextChange(e, 'image')} required className={classNames({'p-invalid': submitted && !item.image})} />
                        {submitted && !item.image && <small className="p-invalid">Image is required.</small>}
                    </div>
                    <div className="field col-6">
                        <label htmlFor="total">{{'Total' | translate}}</label>
                        <InputNumber id="total" value={item ? item.total : 0} onChange={(e) => onInputNumerChange(e, 'total')}/>
                    </div>
                    <div className="field col-6">
                        <label htmlFor="description">{{'Description' | translate}}</label>
                        <span className="p-float-label">
                            <InputTextarea id="description" value={item ? item.description : ''} onChange={(e) => onInputTextChange(e, 'description')} rows={5} cols={30}/>
                        </span>
                    </div>
                    <div className="field col-6">
                        <label htmlFor="client">{{'Client' | translate}}</label>
                        <Dropdown  id="clientDropdown"  value={item ? item.client : ''} options={clients} onChange={(e) => onDropdownChange(e, 'client')}   placeholder="Sélectionnez un client" filter filterPlaceholder="Rechercher un client" optionLabel="fullName" showClear />
                    </div>
                </div>
            </TabPanel>
            <TabPanel header={{'PurchaseItems' | translate}}>
                        <div className="grid">
                            <div className="field col-6">
                                <label htmlFor="product">{{'Product' | translate}}</label>
                                <Dropdown id="productDropdown" value={purchaseItems.product} options={products} onChange={(e) => onDropdownChangePurchaseItems(e, 'product')} placeholder="Sélectionnez un product" filter  filterPlaceholder="Rechercher un product"  optionLabel="reference" showClear />
                            </div>
                            <div className="field col-6">
                                <label htmlFor="price">{{'Price' | translate}}</label>
                                <InputNumber id="price" value={purchaseItems.price}  onValueChange={(e) => onInputNumerChangePurchaseItems(e, 'price')}/>
                            </div>
                            <div className="field col-6">
                                <label htmlFor="quantity">{{'Quantity' | translate}}</label>
                                <InputNumber id="quantity" value={purchaseItems.quantity}  onValueChange={(e) => onInputNumerChangePurchaseItems(e, 'quantity')}/>
                            </div>

                            <div className="field col-1">
                                <Button icon="pi pi-plus" label="OK" className="mt-4" onClick={addPurchaseItems} />
                            </div>
                        </div>
                        <div className="p-col">
                        <div className="card">
                            <DataTable value={item.purchaseItems} tableStyle={{minWidth: '50rem'}} dataKey="id">
                                <Column field="product.reference" header={{'Product' | translate}}></Column>
                                <Column field="price" header={{'Price' | translate}} ></Column>
                                <Column field="quantity" header={{'Quantity' | translate}} ></Column>
                                <Column header="Actions" body={(rowData) => (
                                    <div>
                                        <Button icon="pi pi-times" rounded severity="warning" className="mr-2 p-button-danger" onClick={()=> deletePurchaseItems(rowData)} />
                                        <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={()=> editPurchaseItems(rowData)} />
                                    </div>
                                )}></Column>
                            </DataTable>
                        </div>
                        </div>
            </TabPanel>
        </TabView>
    </Dialog>
);
};
export default Edit;


