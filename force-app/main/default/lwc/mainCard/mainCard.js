import { LightningElement } from 'lwc';

export default class MainCard extends LightningElement {
    // SummerColors = ["#FF0000", "#062dc9", "#e6f205", "#047502", "#b8445b", "#8706d1", "#8706d1"];
    firstColor = "#047502";
    secondColor = "#047502";
    thirdColor = "#047502";
    forthColor = "#047502";
    firstColor = "#047502";

    value = 'Summer';
    get options() {
        return [
            { label: 'Summer', value: 'Summer' },
            { label: 'Winter', value: 'Winter' },
            { label: 'Spring', value: 'Spring' },
        ];
    }

    onChangeSeasonsSelecter(e) {
        this.value = e.target.value;
        if (this.value == 'Summer') {
            console.log('Summer');
            this.fun();
        } else if (this.value == 'Winter') {
            this.fillColorAccordingToSummer()

        } else if (this.value == 'Spring') {

        }
    }

    fillColorAccordingToSummer() {
        this.template.querySelector('.first').setAttribute("fill", "yellow");
        this.template.querySelector('.Sec');
        this.template.querySelector('.third').setAttribute("fill", "red");
        this.template.querySelector('.four');
        this.template.querySelector('.five').setAttribute("fill", "red");
        this.template.querySelector('.six');
        this.template.querySelector('.seven');

    }

    fun() {
        console.log(this.template.querySelector('.first'));
        console.log(this.template.querySelector('.first').fill);
        const x = this.template.querySelector('.first');
        x.setAttribute("fill", "red");

    }
}