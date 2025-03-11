import { LightningElement, track } from 'lwc';
import WatchIcon from '@salesforce/resourceUrl/watch';
import train from '@salesforce/resourceUrl/train';
import trackImg from '@salesforce/resourceUrl/track';
import platform from '@salesforce/resourceUrl/platform';
import stationMaster from '@salesforce/resourceUrl/Station_Master';
import createTrain from '@salesforce/apex/MarkusMetroController.createTrain';
import getTrains from '@salesforce/apex/MarkusMetroController.getTrains';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class MarkusMetro extends LightningElement {
    Watch = WatchIcon;
    Station_Master = stationMaster;
    Train_icon = train;
    Track_icon = trackImg;
    Platform_image = platform;

    @track isModalOpen = false;
    @track showTimePicker = false;
    @track showInputBox = false;
    @track selectedTime = '';
    @track trains = [];
    @track trackStatus = [];

    trainName = '';
    selectedTrack = '';
    arrivalTime = '';
    departureTime = '';

    get trackOptions() {
        return [
            { label: 'Track 1', value: '1' },
            { label: 'Track 2', value: '2' },
            { label: 'Track 3', value: '3' },
            { label: 'Track 4', value: '4' },
            { label: 'Track 5', value: '5' },
            { label: 'Track 6', value: '6' }
        ];
    }

    async connectedCallback() {
        const now = new Date();
        this.selectedTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        await this.getTrainData();
    }

    openTimeModal() {
        this.isModalOpen = true;
        this.showTimePicker = true;
        this.showInputBox = false;
    }

    openTrainModal() {
        this.isModalOpen = true;
        this.showInputBox = true;
        this.showTimePicker = false;
    }

    switchToTimeSection() {
        this.showTimePicker = true;
        this.showInputBox = false;
    }

    switchToTrainSection() {
        this.showInputBox = true;
        this.showTimePicker = false;
    }

    closeModal() {
        this.isModalOpen = false;
        this.showTimePicker = false;
        this.showInputBox = false;
        this.resetForm();
    }

    async handleTimeChange(event) {
        this.selectedTime = event.target.value;
        this.closeModal()
        await this.getTrainData();
    }

    handleNameChange(event) {
        this.trainName = event.target.value;
    }

    handleTrackChange(event) {
        this.selectedTrack = event.detail.value;
    }

    handleArrivalChange(event) {
        this.arrivalTime = event.detail.value;
    }

    handleDepartureChange(event) {
        this.departureTime = event.target.value;
    }

    async getTrainData() {
        try {
            const data = await getTrains({ str: this.selectedTime });
            this.trains = data;
            this.updateVisualization();
        } catch (error) {
            this.showToast('Error', error.body.message, 'error');
        }
    }

    async addTrain() {
        if (!this.validateForm()) return;

        try {
            const newTrain = {
                Name: this.trainName,
                Track_Number__c: this.selectedTrack,
                Arrival_Time__c: this.arrivalTime,
                Departure_Time__c: this.departureTime,
            };

            const result = await createTrain({ newTrain: newTrain });

            if (!result) {
                this.showToast('Error', 'Track occupied for selected timings', 'error');
                this.closeModal();
                return;
            }

            this.showToast('Success', 'Train added successfully', 'success');
            await this.getTrainData();
            this.closeModal();

        } catch (error) {
            this.showToast('Error', error.body.message, 'error');
        }
    }

    validateForm() {
        if (!this.trainName || !this.selectedTrack || !this.arrivalTime || !this.departureTime) {
            this.showToast('Error', 'All fields are required', 'error');
            return false;
        }

        if (this.departureTime <= this.arrivalTime) {
            this.showToast('Error', 'Departure time must be after arrival time', 'error');
            return false;
        }

        return true;
    }

    resetForm() {
        this.trainName = '';
        this.selectedTrack = '';
        this.arrivalTime = '';
        this.departureTime = '';
    }

    updateVisualization() {
        const totalTracks = 6;
        const tracks = Array.from({ length: totalTracks }, (_, i) => ({
            trackNumber: i + 1,
            status: false,
            url: this.Track_icon,
            platform: [2, 4].includes(i + 1) ? this.Platform_image : null
        }));

        this.trains.forEach(train => {
            const trackIndex = train.Track_Number__c - 1;
            if (trackIndex >= 0 && trackIndex < totalTracks) {
                tracks[trackIndex].status = true;
                tracks[trackIndex].url = this.Train_icon;
            }
        });

        this.trackStatus = tracks;
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}