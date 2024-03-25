document.addEventListener('alpine:init', () => {
    Alpine.data('foo', () => ({
      myData: 'Hello World!',
      isVisible: true,
      newItem: '',
      items: [],
  
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
      }
    }));
  });
  
   