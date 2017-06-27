/**
 * Custom elements @ developers.google.com
 * https://developers.google.com/web/fundamentals/getting-started/primers/customelements
 */

(() => {
    class PieChart extends HTMLElement {
        static get observedAttributes() {
            return ['percent'];
        }

        constructor() {
            super();
            this.percent = 0;
            this.pieInnerEl = null;
            this.addEventListener('click', () => this.setRandomPercent());
        }

        setRandomPercent() {
            this.updatePercent(Math.floor(Math.random() * 100));
        }

        updatePercent(newPercent) {
            const percent = Number(newPercent || this.percent);
            const angle = (360 / 100) * percent;
            const normAngle = angle > 180 ? angle - 180 : angle;
            if (this.pieInnerEl) {
                this.pieInnerEl.style.transform = `rotate(${normAngle}deg)`;
                if (angle > 180) {
                    this.pieInnerEl.classList.add('pie__inner_second-half');
                } else {
                    this.pieInnerEl.classList.remove('pie__inner_second-half');
                }
            }
        }

        connectedCallback() {
            const pieEl = document.createElement('div');
            pieEl.className = 'pie';
            this.pieInnerEl = document.createElement('div');
            this.pieInnerEl.className = 'pie__inner';
            pieEl.appendChild(this.pieInnerEl);
            this.updatePercent();

            this.appendChild(pieEl);
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (name === 'percent') {
                if (Number(newValue) !== Number(newValue)) {
                    throw new Error('percent should be an Number');
                }
                if (Number(newValue) < 0) {
                    throw new Error('percent can\'t be negative');
                }
                this.percent = newValue > 100 ? 100 : newValue;
                this.updatePercent();
            }
        }
    }

    window.customElements.define('pie-chart', PieChart);
})();