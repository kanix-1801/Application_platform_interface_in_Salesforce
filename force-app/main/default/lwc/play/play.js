import { LightningElement } from 'lwc';

export default class Play extends LightningElement {
    handleChildEvent(e) {
        const firstChild = this.template.querySelector(`[data-child="1"]`);
        const secondChild = this.template.querySelector(`[data-child="2"]`);


        const currentChildDataId = e.target.dataset.child;
        if (currentChildDataId == 1) {
            secondChild.checkBoxDataId = e.detail.checkBoxId;
            secondChild.checkBoxStatus = e.detail.checkBoxSDisabledStatus;
            secondChild.checkInCheckBoxByDataId();
        } else {
            firstChild.checkBoxDataId = e.detail.checkBoxId;
            firstChild.checkBoxStatus = e.detail.checkBoxSDisabledStatus;
            firstChild.checkInCheckBoxByDataId();
        }
    }
}