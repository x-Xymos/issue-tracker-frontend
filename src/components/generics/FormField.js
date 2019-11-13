class FormField {
  constructor({ displayName, value = '', error = '', type }) {
    this.displayName = displayName;
    this.value = value;
    this.error = error;
    this.type = type;
  }
}

export default FormField;
