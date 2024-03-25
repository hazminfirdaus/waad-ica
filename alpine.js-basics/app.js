// Apline basics

document.addEventListener('alpine:init', () => {
    Alpine.data('foo', () => ({
      myData: 'Hello World!',
      isVisible: true,
      newItem: '',
      items: [],
      counter: 0,
  
      init() {
        console.log('init');
      },

      changeData() {
        this.myData = 'Hello Alpine.js!';
      },

      toggleVisibility() {
        this.isVisible = !this.isVisible;
      },

      addItem() {
        if (this.newItem.trim() !== '') {
          this.items.push(this.newItem);
          this.newItem = '';
        }
      },

      incrementCounter() {
        this.counter++;
      },

      decrementCounter() {
        if (this.counter > 0) {
            this.counter--;
        }
      },

      get dynamicPlaceholder() {
        return `Your message is ${this.myData}`;
      }
    }));
  });
  
   