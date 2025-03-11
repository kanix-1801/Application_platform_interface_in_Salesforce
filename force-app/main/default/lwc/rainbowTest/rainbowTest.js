import { LightningElement } from 'lwc';

export default class RainbowTest extends LightningElement {
    selectedSeason = 'Summer';
    seasonOptions = [
        { label: 'Summer', value: 'Summer' },
        { label: 'Winter', value: 'Winter' },
        { label: 'Spring', value: 'Spring' }
    ];

    selectedTimeOfDay = 'Noon';
    timeOfDayOptions = [
        { label: 'Morning', value: 'Morning' },
        { label: 'Noon', value: 'Noon' },
        { label: 'Evening', value: 'Evening' }
    ];

    selectedHour = '12';
    hourOptions = [
        { label: '12  (North)', value: '12' },
        { label: '3  (East)', value: '3' },
        { label: '6  (South)', value: '6' },
        { label: '9  (West)', value: '9' }
    ];

    colorMaps = {
        Spring: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8F00FF'],
        Summer: ['#FF0000', '#FFA500', '#FFFF00', '#FF0000', '#FFA500', '#FFFF00', '#FF0000'],
        Winter: ['#00008f24', '#00008f42', '#00008f69', '#00008f8a', '#00008fa1', '#00008fd1', '#00008f']
    };

    handleSeasonChange(event) {
        this.selectedSeason = event.detail.value;
        this.updateRainbow();
    }

    handleTimeOfDayChange(event) {
        this.selectedTimeOfDay = event.detail.value;
        this.updateOverlay();
    }

    handleHourChange(event) {
        this.selectedHour = event.detail.value;
        this.updateDirection();
    }

    updateRainbow() {
        const colors = this.colorMaps[this.selectedSeason];
        const bands = this.template.querySelectorAll('.rainbow-band');

        bands.forEach((band, index) => {
            band.style.fill = colors[index];
        });
    }

    updateOverlay() {
        const overlay = this.template.querySelector('.overlay');
        const rainbowSvgContainer = this.template.querySelector('.rainbow-svg_container');
        switch (this.selectedTimeOfDay) {
            case 'Morning':
                overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                rainbowSvgContainer.style.boxShadow = ' -12px 32px 18.5px 32px rgb(255 255 255)';
                rainbowSvgContainer.style.borderRadius = '0px';
                rainbowSvgContainer.style.background = 'rgb(255 255 255 / 24%)';
                break;
            case 'Evening':
                overlay.style.backgroundColor = 'transparent';
                rainbowSvgContainer.style.borderRadius = '900px 900px 0px 9px';
                rainbowSvgContainer.style.background = '#8578783d';
                rainbowSvgContainer.style.boxShadow = ' -12px 32px 18.5px 32px #dddddd';
                break;
            default:
                rainbowSvgContainer.style.boxShadow = ' -12px 32px 18.5px 32px rgb(255 255 255)';
                overlay.style.backgroundColor = 'transparent';
                rainbowSvgContainer.style.background = 'rgb(255 255 255 / 24%)';
        }
    }

    updateDirection() {
        const directions = {
            '12': 'North',
            '3': 'East',
            '6': 'South',
            '9': 'West'
        };

        const rainbowContainer = this.template.querySelector('.rainbow-container');
        const directionClasses = ['North', 'East', 'South', 'West'];
        directionClasses.forEach(className => {
            rainbowContainer.classList.remove(className);
        });
        const currentDirection = directions[this.selectedHour];
        if (currentDirection) {
            rainbowContainer.classList.add(currentDirection);
        }
    }
}