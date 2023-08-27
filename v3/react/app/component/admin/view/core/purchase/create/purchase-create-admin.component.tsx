import {Button} from 'primereact/button';
import {Column} from 'primereact/column';
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
import {InputSwitch, InputSwitchChangeEvent} from 'primereact/inputswitch';
import {Dropdown, DropdownChangeEvent} from 'primereact/dropdown';
import {MultiSelect, MultiSelectChangeEvent} from 'primereact/multiselect';
import {MessageService} from 'app/zynerator/service/MessageService';

import {PurchaseAdminService} from 'app/controller/service/admin/PurchaseAdminService.service';
import  {PurchaseDto}  from 'app/controller/model/Purchase.model';
import {PurchaseCriteria} from "app/controller/criteria/PurchaseCriteria.model";

import {ProductDto} from 'app/controller/model/Product.model';
import {ProductAdminService} from 'app/controller/service/admin/ProductAdminService.service';
import {ClientDto} from 'app/controller/model/Client.model';
import {ClientAdminService} from 'app/controller/service/admin/ClientAdminService.service';
import {PurchaseItemDto} from 'app/controller/model/PurchaseItem.model';
import {PurchaseItemAdminService} from 'app/controller/service/admin/PurchaseItemAdminService.service';
import {TFunction} from "i18next";
import {Toast} from "primereact/toast";
import useCreateHook from "app/component/zyhook/useCreate.hook";



type PurchaseCreateAdminType = {
    visible: boolean,
    onClose: () => void,
    add: (item: PurchaseDto) => void,
    showToast: React.Ref<Toast>,
    list: PurchaseDto[],
    service: PurchaseAdminService,
    t: TFunction
}
const Create: React.FC<PurchaseCreateAdminType> = ({visible, onClose, add, showToast, list, service, t}) => {


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
            onTabChange,
            onDropdownChange,
            hideDialog,
            saveItem,
            formateDate
        } = useCreateHook<PurchaseDto, PurchaseCriteria>({list, emptyItem, onClose, add, showToast,service, isFormValid})
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [clients, setClients] = useState<ClientDto[]>([]);

    const [purchaseItems, setPurchaseItems] = useState<PurchaseItemDto>(new PurchaseItemDto());

    const productAdminService = new ProductAdminService();
    const clientAdminService = new ClientAdminService();
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
            MessageService.showSuccess(showToast,'PurchaseItems Updated');
            setItem((prevState :any) => ({ ...prevState, purchaseItems: updatedItems}));
        }
        setPurchaseItems(new PurchaseItemDto());
    };

    const deletePurchaseItems = (rowData: any) => {
        const updatedItems = item.purchaseItems.filter((val) => val !== rowData);
        setItem((prevState ) => ({...prevState,purchaseItems: updatedItems }));
        setPurchaseItems(new PurchaseItemDto());
        MessageService.showSuccess(showToast, 'PurchaseItem Deleted');
    };

    const editPurchaseItems = (rowData: any) => {
         setActiveTab(0);
         setPurchaseItems(rowData);

    };

    const onInputNumerChangePurchaseItems = (e: any, name: string) => {
         const val = e.value || 0;
         setPurchaseItems((prevPurchaseItems) => ({...prevPurchaseItems, [name]: val, }));
    };
    const onDropdownChangePurchaseItems = (e: any, field: string) => {
        setPurchaseItems((prevState) => ({ ...prevState, [field]: e.value}));
    };

    const onBooleanInputChangePurchaseItems = (e: InputSwitchChangeEvent, name: string) => {
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
        <Button label={t("cancel")} icon="pi pi-times" text onClick={hideDialog} />
        <Button label={t("save")} icon="pi pi-check" onClick={saveItem} /> </>
    );

return(
        <Dialog visible={visible} style={{width: '70vw'}} header={t("purchase.tabPan")} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog} >
        <TabView activeIndex={activeIndex} onTabChange={onTabChange}>
            <TabPanel header={t("purchase.tabPan")}>
                <div className="formgrid grid">
                    <div className="field col-6">
                        <label htmlFor="reference">{t("purchase.reference")}</label>
                        <InputText id="reference" value={item.reference} onChange={(e) => onInputTextChange(e, 'reference')} required className={classNames({'p-invalid': submitted && !item.reference})} />
                        {submitted && !item.reference && <small className="p-invalid">Reference is required.</small>}
                    </div>
                    <div className="field col-6">
                        <label htmlFor="purchaseDate">{t("purchase.purchaseDate")}</label>
                        <Calendar id="purchaseDate" value={item.purchaseDate} onChange={(e) => onInputDateChange(e, 'purchaseDate')} dateFormat="dd/mm/yy"  showIcon={true} />
                    </div>
                    <div className="field col-6">
                        <label htmlFor="image">{t("purchase.image")}</label>
                        <InputText id="image" value={item.image} onChange={(e) => onInputTextChange(e, 'image')} required className={classNames({'p-invalid': submitted && !item.image})} />
                        {submitted && !item.image && <small className="p-invalid">Image is required.</small>}
                    </div>
                    <div className="field col-6">
                        <label htmlFor="total">{t("purchase.total")}</label>
                        <InputNumber id="total" value={item.total} onChange={(e) => onInputNumerChange(e, 'total')} />
                    </div>
                    <div className="field col-6">
                        <label htmlFor="description">{t("purchase.description")}</label>
                        <span className="p-float-label">
                        <InputTextarea id="description" value={item.description} onChange={(e) => onInputTextChange(e, 'description')} rows={5} cols={30}/>
                    </span>
                    </div>
                    <div className="field col-6">
                        <label htmlFor="client">{t("purchase.client")}</label>
                        <Dropdown  id="clientDropdown"  value={item.client} options={clients} onChange={(e) => onDropdownChange(e, 'client')}   placeholder={t("purchase.clientPlaceHolder")} filter filterPlaceholder={t("purchase.clientPlaceHolderFilter")} optionLabel="fullName" showClear/>
                    </div>
                </div>
            </TabPanel>
            <TabPanel header={t("purchase.purchaseItems")}>
                        <div className="grid">
                            <div className="field col-6">
                                <label htmlFor="product">{t("purchaseItem.product")}</label>
                                <Dropdown id="productDropdown" value={purchaseItems.product} options={products} onChange={(e) => onDropdownChangePurchaseItems(e, 'product')}    placeholder={t("purchaseItem.productPlaceHolder")} filter filterPlaceholder={t("purchaseItem.productPlaceHolderFilter")}  optionLabel="reference" showClear />
                             </div>
                            <div className="field col-6">
                                <label htmlFor="price">{t("purchaseItem.price")}</label>
                                <InputNumber id="price" value={purchaseItems.price}  onValueChange={(e) => onInputNumerChangePurchaseItems(e, 'price')}/>
                            </div>
                            <div className="field col-6">
                                <label htmlFor="quantity">{t("purchaseItem.quantity")}</label>
                                <InputNumber id="quantity" value={purchaseItems.quantity}  onValueChange={(e) => onInputNumerChangePurchaseItems(e, 'quantity')}/>
                            </div>
                            <div className="field col-1">
                                <Button icon="pi pi-plus" label="OK" className="mt-4" onClick={addPurchaseItems} />
                            </div>
                        </div>
                    <div className="p-col">
                    <div className="card">
                    <DataTable value={item.purchaseItems} tableStyle={{minWidth: '50rem'}} dataKey="id">
                        <Column field="product.reference" header={t("purchaseItem.product")}></Column>
                        <Column field="price" header={t("purchaseItem.price")} ></Column>
                        <Column field="quantity" header={t("purchaseItem.quantity")} ></Column>
                        <Column header={t("actions")} body={(rowData)=> (<div>
                        <Button icon="pi pi-times" rounded severity="warning" className="mr-2 p-button-danger" onClick={()=> deletePurchaseItems(rowData)} />
                        <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={()=> editPurchaseItems(rowData)} /> </div>)}></Column>
                    </DataTable>
                    </div>
                    </div>
            </TabPanel>
        </TabView>
    </Dialog>
);
};
export default Create;
