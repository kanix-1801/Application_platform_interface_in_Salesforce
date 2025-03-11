import { LightningElement, api } from 'lwc';

export default class CheckBox extends LightningElement {
    @api checkBoxDataId;
    @api checkBoxStatus;

    checkBoxs = [
        { id: '1', disable: false, label: `Check Box 1` }, { id: '2', disable: false, label: `Check Box 2` }, { id: '3', disable: false, label: `Check Box 3` }, { id: '4', disable: false, label: `Check Box 4` }, { id: '5', disable: false, label: `Check Box 5` }];
    @api
    checkInCheckBoxByDataId() {
        const currentCheckBox = this.template.querySelector(`[data-id="${this.checkBoxDataId}"]`);
        if (!currentCheckBox.checked) {
            currentCheckBox.disabled = this.checkBoxStatus;
        }
    }

    handleCheckBox(e) {
        const checkBoxStatus = e.target.checked;
        const checkBoxDataId = e.target.dataset.id;
        this.sendCheckBoxStatusToParent(checkBoxDataId, checkBoxStatus);
    }
    sendCheckBoxStatusToParent(checkBoxDataId, checkBoxStatus) {
        const customEvent = new CustomEvent('childevent', {
            detail: {
                checkBoxId: checkBoxDataId,
                checkBoxSDisabledStatus: checkBoxStatus,
            }
        });
        this.dispatchEvent(customEvent);
    }
}